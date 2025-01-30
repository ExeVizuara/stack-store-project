import { useEffect, useState } from "react";

export function FindContent({ products, addProduct }) {

    useEffect(() => {
    }, []);

    function EvaluateStock(product) {
        console.log("Stock inicial: ", product.dataValues.stock)
        addProduct(product, product.dataValues.stock);
    }

    return (
        <div className="absolute flex flex-col items-center justify-center bg-slate-200 rounded-md z-10 text-slate-500 h-auto max-h-[300px]">
                <ul className="overflow-y-auto overflow-x-auto">
                    { products.map((product) => (
                        <li className="hover:bg-slate-300 w-full px-2 sm:px-10 py-1 cursor-pointer text-[14px] sm:text-lg" 
                            key={product.dataValues.id} 
                            onClick={() => EvaluateStock(product)}>
                            {product.dataValues.name} ({product.dataValues.stock}) 
                        </li>
                    ))
                    }
                </ul>
        </div>
    );
};