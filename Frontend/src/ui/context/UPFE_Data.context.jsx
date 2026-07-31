import { useState, createContext } from "react";

export const UPFE_DataContext = createContext(); //The Storage Box

export const UPFE_DataProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [reports, setReports] = useState([]);


  return 
  <UPFE_DataContext.Provider value={{ loading, setLoading, report, setReport, reports, setReports }}>
    {children}
    </UPFE_DataContext.Provider>;
};
