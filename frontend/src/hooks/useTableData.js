import { useState, useEffect } from "react";
import {
  getTableNames,
  getAllCountries,
  getAllDepartments,
  getAllEmployees,
  getAllJobHistory,
  getAllJobs,
  getAllLocations,
  getAllRegions,
  getAllstudents,
} from "../services/api";

export const useTableData = () => {
  const [selectedTable, setSelectedTable] = useState("");
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchTableNames = async () => {
      try {
        const names = await getTableNames();
        setSelectedTable(names[0]); // Set the default selected table
      } catch (error) {
        console.error("Error fetching table names:", error);
      }
    };

    fetchTableNames();
  }, []);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        if (selectedTable) {
          let data;
          switch (selectedTable.toUpperCase()) {
            case "COUNTRIES":
              data = await getAllCountries();
              break;
            case "DEPARTMENTS":
              data = await getAllDepartments();
              break;
            case "EMPLOYEES":
              data = await getAllEmployees();
              break;
            case "JOB_HISTORY":
              data = await getAllJobHistory();
              break;
            case "JOBS":
              data = await getAllJobs();
              break;
            case "LOCATIONS":
              data = await getAllLocations();
              break;
            case "REGIONS":
              data = await getAllRegions();
              break;
            case "STUDENTS":
              data = await getAllstudents();
              break;
            default:
              console.error("Invalid table name:", selectedTable);
          }
          if (data) {
            setTableData(data);
          }
        }
      } catch (error) {
        console.error("Error fetching table data:", error);
      }
    };

    fetchTableData();
  }, [selectedTable]);

  const handleTableChange = (event) => {
    setSelectedTable(event.target.value);
    // Call fetchTableData to load new data based on the selected table
    fetchTableData(event.target.value);
  };

  // Fetch table data when table changes
  const fetchTableData = async (tableName) => {
    try {
      let data;
      switch (tableName.toUpperCase()) {
        case "COUNTRIES":
          data = await getAllCountries();
          break;
        case "DEPARTMENTS":
          data = await getAllDepartments();
          break;
        case "EMPLOYEES":
          data = await getAllEmployees();
          break;
        case "JOB_HISTORY":
          data = await getAllJobHistory();
          break;
        case "JOBS":
          data = await getAllJobs();
          break;
        case "LOCATIONS":
          data = await getAllLocations();
          break;
        case "REGIONS":
          data = await getAllRegions();
          break;
        case "STUDENTS":
          data = await getAllstudents();
          break;
        default:
          console.error("Invalid table name:", tableName);
      }
      if (data) {
        setTableData(data);
      }
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  return { selectedTable, tableData, handleTableChange, setTableData };
};
