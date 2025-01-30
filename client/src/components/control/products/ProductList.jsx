import { Product } from "./Product";
import { useSearchContext } from "../../../services/SearchProvider";

export function ProductList({ productList, filteredProducts, editMode, isLoading }) {

    const { search } = useSearchContext();
    const sortedProductList = productList.sort((a, b) => a.name.localeCompare(b.name));
    const sortedFilteredProducts = filteredProducts.sort((a, b) => a.dataValues.name.localeCompare(b.name));

    return (
        <div className="data bg-[#333332d8] flex flex-col pb-4 lg:p-4 gap-2 lg:gap-4 md:pb-18 mt-2 rounded-lg max-h-[500px]">
            <ul className="grid grid-cols-7 md:text-sm text-[8px] border-b-2 border-b-slate-400 pb-2 px-1">
                <li>
                    NOMBRE
                </li>
                <li>
                    CATEGORIA
                </li>
                <li>
                    VENCE
                </li>
                <li>
                    STOCK
                </li>
                <li>
                    COSTO
                </li>
                <li>
                    BULTO
                </li>
                <li>
                    PRECIO
                </li>
            </ul>
            {search ?
                <div className="overflow-y-auto overflow-x-auto sm:rounded-md bg-[#333332d8]">
                    {sortedFilteredProducts.map((product) => (
                        <Product key={product.dataValues.product_id} {...product.dataValues} editMode={editMode} />
                    ))}
                </div>
                :
                <div className="overflow-y-auto overflow-x-auto sm:rounded-md bg-[#333332d8]">
                    {isLoading ?
                        (<h1>CARGANDO...</h1>)
                        : (sortedProductList.map((product) => (
                            <Product key={product.product_id} {...product} editMode={editMode} />
                        )))
                    }
                </div>
            }
            <h3 className="flex flex-row justify-end">Resultados = {search ? sortedFilteredProducts.length : sortedProductList.length} productos</h3>
        </div>
    )
};