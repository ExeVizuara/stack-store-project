import { React, useState, useEffect } from "react";
import { ItemDescription } from "./ItemDescription";
import { RiSearch2Line } from "react-icons/ri";
import { FindContent } from "./FindContent";
import { PrintReceipt } from "./PrintReceip";
import { actualizeStock, loadAllProducts } from "../../services/productService";
import { searchName } from "../../utils/SearchName";
import { addSale } from "../../services/saleService";
import { useSearchContext } from "../providers/SearchProvider";
import { calculateInGrams } from "../../services/mathematicalOperationsService";
import { useStaticsContext } from "../providers/StaticsProvider";
import { useProductContext } from "../providers/ProductProvider";
import { useFetchData } from "../../services/UseFetchData";

export function SaleSection() {

    const { fetchAllSales, fetchDailyGain, fetchProducts } = useFetchData();
    const { productList } = useProductContext();
    const { search,
        setSearch,
        searchProducts,
        setSearchProducts
    } = useSearchContext();

    const [selectProduct, setSelectProduct] = useState([]);
    const [inListProduct, setInListProduct] = useState({});
    const [initialStocks, setInitialStocks] = useState({});
    const [quantity, setQuantity] = useState({});
    const [newStock, setNewStock] = useState(0);
    const { filteredProducts, setFilteredProducts } = useProductContext();
    const [subTotal, setSubTotal] = useState({});
    const [total, setTotal] = useState(0);
    const [printReceipt, setPrintReceipt] = useState(false);

    useEffect(() => {
        setSearch("");
    }, []);

    const searchItem = () => {
        setSearchProducts(true);
        console.log("Buscando");
    }

    const handleFind = (e) => {
        let results = [];
        if (e.target.value) {
            setSearch(e.target.value);
            results = searchName(productList, e.target.value);
            setSearchProducts(true);
            setFilteredProducts(results);
        } else { setSearch("") }
        console.log(results);
    }

    const storeInitialStock = (productId, stock, price, product) => {
        setInitialStocks(({...initialStocks, [productId]: stock}));
        setSelectProduct([...selectProduct, product]);
        setTotal(total + price);
        setSearchProducts(!searchProducts);
        setNewStock(stock);
        setSearch("");
        console.log(product);
        setSubTotal({...subTotal, [productId]: price});
        if (product.dataValues.category != 'PorKG') {
            setQuantity({...quantity, [productId]: 1});
        }
    };

    const addProduct = async (product, stock) => {
        try {
            if (product && stock === 0) {
                alert("No hay stock disponible de ese producto!");
                return searchItem();
            }
            if (!initialStocks.hasOwnProperty(product.dataValues.product_id)) {
                if (product.dataValues.category === 'PorKG') {
                    const quantityInserted = prompt("Ingrese la cantidad en gramos", "");
                    if (!quantityInserted) {
                        alert("Debe ingresar una cantidad");
                        setSearchProducts(!searchProducts);
                        setSearch("");
                        return;
                    };
                    const totalPrice = calculateInGrams(quantityInserted, product.dataValues.price);
                    setQuantity({...quantity, [product.dataValues.product_id]: quantityInserted});
                    return await storeInitialStock(product.dataValues.product_id, stock - quantityInserted, totalPrice, product);
                } else await storeInitialStock(product.dataValues.product_id, product.dataValues.stock - 1, product.dataValues.price, product);
                setInListProduct({...inListProduct, [product.dataValues.product_id]: true});
            } else {
                if (initialStocks[product.dataValues.product_id] === 0) {
                    return alert("No hay stock disponible de ese producto!");
                }
                if (inListProduct[product.dataValues.product_id]) {
                    return alert("El producto ya esta en la lista. \nPuedes agregar mas cantidad con '+'")
                }
                if (product.dataValues.category === 'PorKG') {
                    const quantityInserted = prompt("Ingrese la cantidad en gramos", "");
                    if (!quantityInserted) {
                        alert("Debe ingresar una cantidad");
                        setSearchProducts(!searchProducts);
                        setSearch("");
                        return;
                    }
                    const totalPrice = calculateInGrams(quantityInserted, product.dataValues.price);
                    setQuantity({...quantity, [product.dataValues.product_id]: quantityInserted});
                    return await storeInitialStock(product.dataValues.product_id, initialStocks[product.dataValues.product_id] - quantityInserted, totalPrice, product);
                } else return await storeInitialStock(product.dataValues.product_id, initialStocks[product.dataValues.product_id] - 1, product.dataValues.price, product);
            };
        } catch (error) {
            console.error('Error al agregar el producto:', error);
        }
    };

    const addQuantity = (productId, productPrice) => {
        console.log('Stock inicial: ', initialStocks[productId]);
        if (initialStocks[productId] <= 0) {
            return alert("No hay stock disponible de ese producto!");
        } else {
            initialStocks[productId]--;
            setQuantity({...quantity, [productId]: (quantity[productId]) + 1});
            setSubTotal({...subTotal, [productId]: (subTotal[productId]) + productPrice});

            setTotal(prevTotal => prevTotal + productPrice); // Aumenta el total global con el precio del producto
        }
    }
    const subtractQuantity = (productId, productPrice) => {
        if (quantity[productId] === 1) {
            return alert("El minimo en cantidad es 1 \nPuedes eliminar el producto con 'x'");
        }
        initialStocks[productId]++;
        setQuantity({...quantity, [productId]: quantity[productId] - 1});
        setSubTotal({...subTotal, [productId]: (subTotal[productId]) - productPrice});

        setTotal(total - productPrice);
    }

    const removeProduct = (index, product) => {
        const updatedProducts = selectProduct.filter((_, i) => i !== index);
        setSelectProduct(updatedProducts);
        setInitialStocks({...initialStocks, 
            [product.dataValues.product_id]: 
                initialStocks[product.dataValues.id] + quantity[product.dataValues.product_id]
        });
        console.log("Stock: ", initialStocks[product.dataValues.product_id]);
        product.dataValues.category === 'PorKG' ? 
            setTotal((total) - subTotal[product.dataValues.product_id]) : 
            setTotal((total) - (subTotal[product.dataValues.product_id] * quantity[product.dataValues.product_id]));
        setInListProduct({...inListProduct, [product.dataValues.product_id]: false});
    };

    const cancelOperation = () => {
        setSelectProduct([]);
        setTotal(0);
        setInitialStocks({});
    }

    const chargeProducts = async () => {
        if (total === 0) return alert("Debe seleccionar al menos un producto primero");
        setPrintReceipt(!printReceipt);
        setInListProduct({});
        const simplifiedProducts = selectProduct.map(product => ({
            product_id: product.dataValues.product_id,
            price: product.dataValues.price,
        }));
        await addSale(simplifiedProducts, quantity, total);
        await actualizeStock(simplifiedProducts, initialStocks);
        await fetchProducts();
        await fetchAllSales();
        await fetchDailyGain();
        //await addOrUpdateWeeklySale(total);
    }

    const quit = () => {
        setPrintReceipt(!printReceipt);
        setSelectProduct([]);
        setTotal(0);
        setInitialStocks({});
    }

    return (
        <div className="xl:col-span-6 sm:p-2 lg:p-4 xl:p-2">
            <div className="px-1 md:bg-neutral-800 rounded-xl sm:px-2 md:px-4 sm:min-h-[720px]">
                <div className="sm:pt-8 text-gray-300 sm:p-6 xl:p-2">
                    <div className="grid sm:grid-cols-9 sm:text-2xl mb-2 py-2 px-1 sm:px-6 md:border md:border-[#5c9c19d8] rounded-xl gap-1 w-full">
                        <div className="sm:col-span-3 row-span-2 md:text-center px-2">
                            <label className="text-3xl xl:text-2xl">Busqueda de artículo: </label>
                        </div>
                        <div className="sm:col-span-6  relative bg-[#466822d8] pl-6 sm:pl-10 rounded-lg p-2 sm:p-0">
                            <RiSearch2Line className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                            <input type="text" className="text-gray-400 pl-2 text-[16px] sm:text-sm outline-none w-full bg-transparent" value={search} placeholder="NOMBRE" onChange={handleFind} onClick={searchItem} />
                            {searchProducts && (
                                <FindContent
                                    products={!filteredProducts && products.length > 0 ? products : filteredProducts}
                                    addProduct={addProduct}
                                />
                            )}
                        </div>
                        <div className="sm:col-span-6 relative bg-[#466822d8] pl-6 sm:pl-10 rounded-lg p-2 sm:p-0">
                            <RiSearch2Line className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                            <input type="text" className="text-gray-400 pl-2 text-[16px] sm:text-sm outline-none w-full bg-transparent" placeholder="CODIGO" />
                        </div>
                    </div>
                    <div className="relative bg-[#262837] rounded-xl">
                        {printReceipt && <PrintReceipt products={selectProduct} total={total} quantity={quantity} quit={quit} />}
                        <ItemDescription products={selectProduct} removeProduct={removeProduct} total={total} cancelOperation={cancelOperation} chargeProducts={chargeProducts} quantity={quantity} addQuantity={addQuantity} subtractQuantity={subtractQuantity} subTotal={subTotal} />
                    </div>
                </div>
            </div>
        </div>
    );
};