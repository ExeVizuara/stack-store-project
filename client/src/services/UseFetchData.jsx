import moment from "moment-timezone";
import { useStaticsContext } from "../components/providers/StaticsProvider";
import { useProductContext } from "../components/providers/ProductProvider";
import { loadDailySales, loadHistorySales, getDailyGain } from "../services/saleService";
import { loadAllProducts } from "../services/productService";

export function useFetchData () {

    const { setAllSales, setTotalSaleOfTheDay } = useStaticsContext();
    const { setProductList } = useProductContext();

    const fetchAllSales = async () => {
        const date = moment().tz('America/Argentina/Buenos_Aires').format("YYYY-MM-DD");
        try {
            const fetchedFilteredSales = await loadDailySales(date);
            const fetchedSales = await loadHistorySales(fetchedFilteredSales);
            const sortedSales = fetchedSales.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setAllSales(sortedSales);
        } catch (error) {
            console.error('Error al obtener la ganancia diaria:', error);
        }
    };

    const fetchDailyGain = async () => {
        try {
            const fetchedGain = await getDailyGain();
            setTotalSaleOfTheDay(fetchedGain);
        } catch (error) {
            console.error('Error al obtener la ganancia diaria:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const fetchedProducts = await loadAllProducts();
            setProductList(fetchedProducts);
        } catch (error) {
            console.error('Error al cargar los productos:', error);
        }
    };
    return { fetchAllSales, fetchDailyGain, fetchProducts };
};