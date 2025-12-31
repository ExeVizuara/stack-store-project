import { RiSearch2Line } from "react-icons/ri";
import { useState } from "react";
import { Clock } from "./Clock";
import { useSearchContext } from "../providers/SearchProvider";
import { searchName } from "../../utils/SearchName";
import { useProductContext } from "../providers/ProductProvider";

export function TitleSection() {

    const { productList,
        setFilteredProducts
    } = useProductContext();
    const { search,
        setSearch,
        currentCategory,
        setSearchProducts
    } = useSearchContext();
    const [isExpanded, setIsExpanded] = useState(false);
    const [productsByCategory, setProductsByCategory] = useState([]);

    const handlePageChange = (category, prod) => {
        console.log("Lista de productos:", prod);
    
        const results = prod.filter((data) => {
            return data.dataValues?.category?.toLowerCase() === category.toLowerCase();
        });
        return results;
    };

    const handleFocus = () => {
        setIsExpanded(true);
    };

    const handleBlur = () => {
        if (search === '') {
            setIsExpanded(false);
        }
    };

    const handleSearch = async (e) => {
        let results = [];
        if (e.target.value) {
            setSearch(e.target.value);
            results = searchName(productsByCategory, e.target.value);
            setSearchProducts(true);
            setFilteredProducts(results);
        } else { setSearch("") }
    };

    const searchItem = async () => {
        console.log('Buscar  en: ', currentCategory);
        const products = handlePageChange(currentCategory, productList);
        setProductsByCategory(products);
    }

    return (

        <div className="xl:col-span-8 flex flex-row justify-around bg-neutral-800 py-1 mb-4">
            <h1 className="text-2xl text-gray-300">StackStore v2.1.0</h1>
            <Clock />
            <div className="">
                <div className="w-full relative">
                    <RiSearch2Line className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 cursor-pointer" onClick={searchItem} />
                    <input type="text"
                        placeholder="Producto"
                        value={search ? search : ""}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleSearch}
                        onClick={searchItem}
                        className={`bg-neutral-900 py-2 p-10 pr-4 rounded-lg text-gray-300 outline-none transition-width duration-300 ease-in-out cursor-pointer ${isExpanded ? 'w-40' : 'w-10'}`}
                    />
                </div>
            </div>
        </div>
    );
};