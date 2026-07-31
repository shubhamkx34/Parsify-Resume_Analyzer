import { uploadData, fetchAllData, fetchData } from "../services/UPFE_Data.api";
import { UPFE_DataContext } from "../context/UPFE_Data.context";
import { useContext } from "react";

export const useReport = () => {
  const context = useContext(UPFE_DataContext);
  const { loading, setLoading, report, setReport, reports, setReports } = context;

  const generateReport = async ({ resume, selfDescription, jobDescription }) => {
    setLoading(true);
    let response = null;
    try {
      response = await uploadData({ resume, selfDescription, jobDescription });
      setReport(response.FinalReport);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    return response?.FinalReport;
  };

  const getReportById = async ({ reportId }) => {
    setLoading(true);
    let response = null;
    try {
      response = await fetchData(reportId);
      setReport(response.Report);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    return response?.Report;
  };

  const getAllReport = async () => {
    setLoading(true);
    let response = null;
    try {
      response = await fetchAllData({ resume, selfDescription, jobDescription });
      setReports(response.Reports);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    return response?.Reports;
  };

  return { loading, report, reports, generateReport, getReportById, getAllReport };
};
