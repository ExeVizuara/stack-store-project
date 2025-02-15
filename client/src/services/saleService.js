import { CurrentTime } from "../components/shared/Clock";
import moment from "moment-timezone";
import axios from "axios";

const API_URL = 'http://localhost:3000';

export const loadAllSales = async () => {
    try {
        console.log('Cargando Ventas...');
        const response = await axios.get(`${API_URL}/api/sales/getall`, {
            withCredentials: true, 
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error al obtener todos los productos', error);
        throw error; 
    }
};

export const loadHistorySales = async (sales) => {
    try {
        const responses = await Promise.all(sales.map(async (sale) => {
            try {
                const response = await axios.get(`${API_URL}/api/sales/${sale.id}`, {
                    withCredentials: true, 
                });
                return response.data;
            } catch (error) {
                console.error(`Error al cargar la venta con ID ${sale.sale_id}:`, error);
                return null;
            }
        }));
        return responses; 
    } catch (error) {
        console.error('Error general al cargar las ventas:', error);
        return [];
    }
}

export const getSaleById = async (saleId) => {
    try {
        const response = await axios.get(`${API_URL}/api/sales/${saleId}`, {
            withCredentials: true, 
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener todos los productos', error);
        throw error; 
    }
};


// export const loadWeeklySales = async () => {
//     const API = generateClient();
//     try {
//         const apiData = await API.graphql({ query: listWeeklySales });
//         const weeklySaleFromAPI = apiData.data.listWeeklySales.items;
//         return weeklySaleFromAPI;
//     } catch (error) {
//         console.error('Error al cargar registro de venta semanal:', error);zB< avvvvvvv|pCCFV V }{ -
//  CV erw   LV}
//     }
// };

export const loadDailySales = async (date) => {
    try {
        const response = await axios.get(`${API_URL}/api/sales/daily`, {
          params: { date: date }, // Envía la fecha en formato DD/MM/YYYY
          withCredentials: true,
        });
        if (!response.data) {
            console.log('No hay ventas hoy');
            return;
        }
        return response.data;
      } catch (error) {
        console.error('Error al cargar las ventas diarias:', error);
        throw error;
      }
};

// export const loadWeeklySale = async (date) => {
//     try {
//         const weeklySalesFromAPI = await loadWeeklySales(); // Carga todas las ventas
//         const filteredSales = weeklySalesFromAPI.filter((data) => data.date === date); // Compara la fecha exacta

//         if (filteredSales.length === 0) {
//             console.log(`No se encontraron ventas para la fecha: ${date}`);
//             return null; // Devuelve null si no hay ventas para esa fecha
//         }

//         console.log(`Ventas encontradas para ${date}: ${filteredSales.length}`);
//         console.log(filteredSales);
//         return filteredSales[0]; // Retorna la primera venta encontrada
//     } catch (error) {
//         console.error('Error al cargar las ventas de la semana:', error);
//         throw error;
//     }
// };

export const addSale = async (productList, quantity) => {
    try {
        const response = await axios.post(`${API_URL}/api/sales/create`, {
                products: productList,
                quantity: quantity,
            },{ withCredentials: true }
        );
        return response;
    } catch (error) {
        console.error("Error al realizar la operación", error);
        alert("Ocurrió un error al procesar la solicitud. Por favor, intenta nuevamente más tarde.");
    }
};
// export const addOrUpdateWeeklySale = async (totalAmount) => {
//     const API = generateClient();
//     const currentDateTime = CurrentTime();
//     console.log(totalAmount);
//     try {
//         const sales = await loadWeeklySale();
//         console.log(sales);

//         if (!sales || sales.length === 0) {
//             console.log('Creando registro del dia');
//             const createResult = await API.graphql({
//                 query: createWeeklySaleMutation,
//                 variables: {
//                     input: {
//                         date: currentDateTime,
//                         total: totalAmount
//                     },
//                 },
//             });
//             if (createResult.errors) {
//                 console.error("Errores de GraphQL:", createResult.errors);
//                 alert("Ocurrieron errores al procesar la solicitud. Por favor, revisa los datos ingresados.");
//                 return;
//             }

//             return createResult.data.createWeeklySaleMutation;
//         } else {
//             const existingSale = sales[0];
//             console.log('Actualizando registro del dia:', existingSale);
//             const updatedTotal = sales.total + totalAmount;
//             const updateResult = await API.graphql({
//                 query: updateWeeklySaleMutation,
//                 variables: {
//                     input: {
//                         id: sales.id,
//                         total: updatedTotal,
//                     },
//                 },
//             });
//             console.log('Registro semanal acualizado. Total: ', updatedTotal);
//             return updateResult.data.updateWeeklySaleMutation;
//         }
//     } catch (error) {
//         console.error("Error al actualizar o crear venta semanal:", error);
//     }
// }

// export const getWeeklySale = async (setAllWeeklySale) => {
//     const currentDateTime = CurrentTime();
//     try {
//         const sales = await loadWeeklySale(currentDateTime);
//         if (!sales) {
//             console.log("NO HAY VENTAS HOY")
//             setAllWeeklySale([]);
//         } else {
//             const sortedSales = await sales.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//             setAllWeeklySale(sortedSales);
//             console.log(sortedSales);
//         }
//         console.log(sales);
//     } catch (error) {
//         console.error('Error al obtener productos:', error);
//     }
// };

export const getDailyGain = async () => {
    const date = moment().tz('America/Argentina/Buenos_Aires').format("YYYY-MM-DD");
    try {
        const sales = await loadDailySales(date);
        if (!sales) return 0;
        const dailyGain = sales.reduce((total, sale) => {
            return total + sale.total;
        }, 0);

        console.log("Total de ventas hoy:", dailyGain);
        return dailyGain;
    } catch (error) {
        console.error('Error al cargar total de ganancias:', error);
        return 0;
    }
};