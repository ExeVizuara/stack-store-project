import { HistorySection } from "../control/history/HistorySection";
import { ControlSection } from "../control/ControlSection";
import { HomeSection } from "../Home/HomeSection";
import { useEffect } from "react";
import { SaleSection } from "../Sale/SaleSection";
import { TitleSection } from "../shared/TitleSection";
import { getDailyGain, loadDailySales, loadHistorySales } from "../../services/saleService";
import { useStaticsContext } from "../../services/StaticsProvider";
import { useProductContext } from "../../services/ProductProvider";
import { loadAllProducts } from "../../services/productService";
import moment from "moment-timezone";

export function MainContent({ selectedCat }) {

    const { setTotalSaleOfTheDay } = useStaticsContext();
    const { setProductList } = useProductContext();
    const { setAllSales } = useStaticsContext();

    const sectionComponents = {
        'Home': <HomeSection />,
        'Ventas': <SaleSection/>,
        'Control': <ControlSection/>
    };

    const fetchProducts = async () => {
        try {
            const fetchedProducts = await loadAllProducts();
            setProductList(fetchedProducts);
        } catch (error) {
            console.error('Error al cargar los productos:', error);
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

    const fetchAllSales = async () => {
        const date = moment().tz('America/Argentina/Buenos_Aires').format("YYYY-MM-DD");
        try {
            const fetchedFilteredSales = await loadDailySales(date);
            console.log(fetchedFilteredSales);
            const fetchedSales = await loadHistorySales(fetchedFilteredSales);
            setAllSales(fetchedSales);
        } catch (error) {
            console.error('Error al obtener la ganancia diaria:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchDailyGain();
        fetchAllSales();
    }, [selectedCat]);

    return (
        <main className="lg:pl-24 grid grid-cols-1 xl:grid-cols-8 py-2 md:px-4 xl:pb-5 sm:h-auto bg-[#333332d2]">
            <TitleSection/>
            {sectionComponents[selectedCat] || <HomeSection />}
            <HistorySection/>
        </main>
    );
};