import { HistorySection } from "../control/history/HistorySection";
import { ControlSection } from "../control/ControlSection";
import { HomeSection } from "../home/HomeSection";
import { useEffect } from "react";
import { SaleSection } from "../sale/SaleSection";
import { TitleSection } from "../shared/TitleSection";
import { useFetchData } from "../../services/UseFetchData";

export function MainContent({ selectedCat }) {

    const sectionComponents = {
        'Home': <HomeSection />,
        'Ventas': <SaleSection />,
        'Control': <ControlSection />
    };

    const { fetchAllSales, fetchDailyGain, fetchProducts } = useFetchData();

    useEffect(() => {
        fetchProducts();
        fetchDailyGain();
        fetchAllSales();
    }, [selectedCat]);

    return (
        <main className="lg:pl-24 grid grid-cols-1 xl:grid-cols-8 md:px-4 xl:pb-5 sm:h-auto bg-[#333332d2]">
            <TitleSection/>
            {sectionComponents[selectedCat] || <HomeSection />}
            <HistorySection/>
        </main>
    );
};