import { useEffect } from "react";
import { HistoryNav } from "./HistoryNav";
import { HistoryItem } from "./HistoryItem";
import { CurrentDay } from "../../shared/Clock";
import { calculateInGrams } from "../../../services/mathematicalOperationsService";
import { useStaticsContext } from "../../providers/StaticsProvider";

export function HistorySection() {


  const currentDay = CurrentDay();
  const { totalSaleOfTheDay,
    totalWeeklySale,
    allSales } = useStaticsContext();

  useEffect(() => {
  }, []);

  return (
    <div className="xl:col-span-2 p-1 sm:px-4 lg:px-6 xl:static xl:p-0 bg-[#333332d8]">
      <div className="md:bg-neutral-800 rounded-xl sm:p-2 xl:p-2 mb-6">
        <div className="sm:pt-8 text-gray-300 p-2 sm:p-6 xl:p-2">
          <h1 className="text-3xl sm:text-xl mb-2">Historial de ventas</h1>
          <HistoryNav totalSaleOfTheDay={totalSaleOfTheDay} totalWeeklySale={totalWeeklySale} />
          <div>
            <div className="bg-neutral-800 sm:p-4 rounded-xl">
              <h4 className="text-center text-xs pl-1 border p-1 rounded-2xl border-gray-500">{currentDay}</h4>
              <div className="grid grid-cols-6 px-2 py-3">
                <div className="col-span-3">Producto</div>
                <div className="col-span-2">Cantidad</div>
                <div className="col-span-1">Total</div>
              </div>
              <div className="overflow-y-auto overflow-x-auto max-h-[450px]">
              {allSales.map((sale) => (
                  // Asegúrate de iterar sobre los productos de la venta
                  sale.products.map((product) => (
                    <HistoryItem
                      key={product.product_id} // Utiliza un identificador único para cada producto
                      product_name={product.name}
                      price={product.SaleProducts.quantity > 10 
                        ? calculateInGrams(product.SaleProducts.quantity, product.SaleProducts.price) 
                        : product.SaleProducts.price * product.SaleProducts.quantity}
                      quantity={product.SaleProducts.quantity}
                    />
                  ))
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};