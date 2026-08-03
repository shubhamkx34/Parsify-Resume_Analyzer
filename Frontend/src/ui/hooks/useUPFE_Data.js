import { uploadData, fetchAllData, fetchData } from "../services/UPFE_Data.api";
import { UPFE_DataContext } from "../context/UPFE_Data.context";
import { useContext } from "react";

export const useReport = () => {
  const context = useContext(UPFE_DataContext);
  const { loading, setLoading, report, setReport, reports, setReports } = context;

  //Being used in Home.jsx to generate a report when the user submits the form.
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

  //Being used in Report.jsx to fetch a specific report by its ID.
  const getReportById = async ({ reportId }) => {
    setLoading(true);
    let response = null;
    try {
      response = await fetchData(reportId);
      setReport(response.report);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    return response?.report;
  };

  //Being Used in Home.jsx to fetch all reports when the page loads.
  const getAllReport = async () => {
    setLoading(true);
    let response = null;
    try {
      response = await fetchAllData();
      setReports(response.reports);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    return response?.reports;
  };

  return { loading, report, reports, generateReport, getReportById, getAllReport };
};
