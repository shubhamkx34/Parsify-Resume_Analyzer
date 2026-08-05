import { uploadData, fetchAllData, fetchData, downloadResumePdf } from "../services/UPFE_Data.api";
import { UPFE_DataContext } from "../context/UPFE_Data.context";
import { useContext } from "react";

export const useReport = () => {
  const context = useContext(UPFE_DataContext);
  const { loading, setLoading, report, setReport, reports, setReports } = context;

  //Animation Delay
  const ensureMinDelay = async (startTime) => {
    const elapsedTime = Date.now() - startTime;
    const minLoadTime = 2000; 


    if (elapsedTime < minLoadTime) {
      // Pause execution for whatever time is left to reach 2 seconds
      await new Promise((resolve) => setTimeout(resolve, minLoadTime - elapsedTime));
    }
  };

  //Being used in Home.jsx to generate a report when the user submits the form.
  const generateReport = async ({ resume, selfDescription, jobDescription }) => {
    const startTime = Date.now(); // Start the timer
    setLoading(true);
    let response = null;
    try {
      response = await uploadData({ resume, selfDescription, jobDescription });
      setReport(response.FinalReport);
    } catch (error) {
      console.log(error);
    } finally {
      await ensureMinDelay(startTime); // Check the timer before turning off the loader
      setLoading(false);
    }
    return response?.FinalReport;
  };

  //Being used in Report.jsx to fetch a specific report by its ID.
  const getReportById = async ({ reportId }) => {
    const startTime = Date.now();
    setLoading(true);
    let response = null;
    try {
      response = await fetchData(reportId);
      setReport(response.report);
    } catch (error) {
      console.log(error);
    } finally {
      await ensureMinDelay(startTime);
      setLoading(false);
    }
    return response?.report;
  };

  //Being Used in Home.jsx to fetch all reports when the page loads.
  const getAllReport = async () => {
    const startTime = Date.now();
    setLoading(true);
    let response = null;
    try {
      response = await fetchAllData();
      setReports(response.reports);
    } catch (error) {
      console.log(error);
    } finally {
      await ensureMinDelay(startTime);
      setLoading(false);
    }
    return response?.reports;
  };

  //Generates and downloads the resume file 
  const getResumePdf = async reportId => {
    const startTime = Date.now();
    setLoading(true);
    let response = null;

    try {
      response = await downloadResumePdf(reportId);
      const url = window.URL.createObjectURL(new Blob([response], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `resume_${reportId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log(error);
    } finally {
      await ensureMinDelay(startTime);
      setLoading(false);
    }
  };
  return { loading, report, reports, generateReport, getReportById, getAllReport, getResumePdf };
};
