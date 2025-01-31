import React, { createContext, useContext, useState } from 'react';

const StaticsContext = createContext();

export const StaticsProvider = ({ children }) => {
    const [totalSaleOfTheDay, setTotalSaleOfTheDay] = useState(null);
    const [totalWeeklySale, setTotalWeeklySale] = useState(null);
    const [allSales, setAllSales] = useState([]);
    const [allWeeklySale, setAllWeeklySale] = useState([]);

  return (
    <StaticsContext.Provider value={{ 
        totalSaleOfTheDay,
        setTotalSaleOfTheDay,
        totalWeeklySale,
        setTotalWeeklySale,
        allSales,
        setAllSales,
        allWeeklySale,
        setAllWeeklySale
     }}>
        {children}
    </StaticsContext.Provider>
  );
};

export const useStaticsContext = () => useContext(StaticsContext);