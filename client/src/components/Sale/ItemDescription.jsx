import { SellProducts } from "../control/products/SellProducts";
import { useEffect } from "react";

export function ItemDescription ({ products, removeProduct, total, subTotal, cancelOperation, chargeProducts, quantity, addQuantity, subtractQuantity }) {

    useEffect(() => {
        products
    }, []);

    return (
        <div className="data sm:bg-[#333332d8] bg-[#466822d8] flex flex-col rounded-lg min-h-[350px] sm:min-h-[600px]">
            <ul className="text-center grid grid-cols-5 sm:text-[13px] 2xl:text-lg text-[8.5px] border border-gray-600 p-1 sm:px-6 rounded-t-sm sm:rounded-t-xl">
                <li>
                    NOMBRE
                </li>
                <li>
                    CANTIDAD
                </li>
                <li>
                    PRECIO
                </li>
                <li>
                    BULTO
                </li>
                <li>
                    SUBTOTAL
                </li>
            </ul>
            <div className="col-span-6 overflow-y-auto overflow-x-auto bg-[#333332d8] sm:p-4 min-h-[320px] sm:min-h-[445px] border border-gray-700">
                { products.map((product, index) => (
                    <SellProducts key={ index } { ...product.dataValues } removeProduct={() => removeProduct(index, product, subTotal[product.dataValues.product_id])} quantity={quantity[product.dataValues.product_id]} addQuantity={() => addQuantity(product.dataValues.product_id, product.dataValues.price)} subtractQuantity={() => subtractQuantity(product.dataValues.product_id, product.dataValues.price)} subTotal={subTotal[product.dataValues.product_id]} />
                ))}
            </div>
            <div className="border border-gray-600 sm:rounded-bl-xl bg-gray-500 p-2 px-6 sm:px-14 text-sm sm:text-2xl flex flex-row justify-between">
                <h1 className="self-center text-3xl">TOTAL A PAGAR:</h1>
                <span className="border border-gray-600 bg-[#d8dccbd8] text-[#46493fd8] text-3xl rounded-md p-3 w-auto sm:px-12">${total}</span>
            </div>
            <div className="sm:flex sm:flex-row sm:justify-end">
                <button className="text-md border border-[#ca3232d8] text-[#d8dccbd8] bg-[#bd4444ec] hover:bg-[#da6f49d8] hover:text-[#d8dccbd8] rounded-b-sm sm:rounded-b-md p-1 px-10 sm:px-8 w-full sm:w-auto" onClick={ cancelOperation }>BORRAR</button>
                <button className="text-md border border-[#5c9c19d8] text-[#d8dccbd8] bg-[#266428e8] hover:bg-[#379935d8] hover:text-[#d8dccbd8] rounded-b-sm sm:rounded-b-md p-1 px-10 sm:px-8 w-full sm:w-auto" onClick={ chargeProducts }>COBRAR</button>
            </div>
        </div>
    )
}