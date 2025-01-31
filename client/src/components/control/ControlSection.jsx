import { useState, useEffect } from "react";
import { NavbarSections } from "./NavbarSections";
import { AlmacenSection } from "./AlmacenSection";
import { loadProductsByCategory } from "../../services/productService";
import { UpdateProduct } from "./products/UpdateProduct";
import { useSearchContext } from "../providers/SearchProvider";
import { useProductContext } from "../providers/ProductProvider";

export function ControlSection() {

    const { filteredProducts } = useProductContext();
    const { productList } = useProductContext();
    const { currentCategory,
        setCurrentCategory, 
        setIsLoading 
    } = useSearchContext();

    const [products, setProducts] = useState([]);
    const [editOn, setEditOn] = useState(false);
    const [productEdit, setProductEdit] = useState([]);

    const loadProducts = async () => {
        try {
            setIsLoading(true);
            console.log(productList);
            console.log(currentCategory);
            const result = await loadProductsByCategory(currentCategory);
            setProducts(result);
            console.log('Productos cargados: ', result.length);
        } catch (error) {
            console.error('Error al cargar los productos:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, [currentCategory]);

    const handleCategoryChange = (category) => {
        setCurrentCategory(category);
    };

    const selectProductEdit = async (product) => {
        setProductEdit(product);
    }

    const editMode = async (product) => {
        setEditOn(!editOn);
        console.log(product);
        await selectProductEdit(product);
        loadProducts();
    }

    return (
        <div className="xl:col-span-6 sm:p-2 p-1 lg:p-4 xl:p-2 xl:h-screen">
            <NavbarSections currentPage={handleCategoryChange} />
            {editOn && <UpdateProduct 
                productList={products} 
                currentPage={currentCategory} 
                editMode={editMode} 
                productEdit={productEdit} 
            />}
            <div className="grid grid-cols-3 h-auto w-full mb-4 sm:px-2 xl:h-auto">
                <div className="md:bg-neutral-800 pt-4 sm:pb-8 sm:px-4 px-2 md:px-8 lg:px-8 lg:py-6 rounded-xl items-center text-center text-gray-300 col-span-3">
                    <AlmacenSection productsList={products} loadProducts={loadProducts} filteredProducts={filteredProducts} cat={currentCategory} editMode={editMode} />
                </div>
            </div>
        </div>
    );
};