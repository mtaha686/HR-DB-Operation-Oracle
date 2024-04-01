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
        console.error("Error:", error);
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
            default:
              console.error("Invalid table name:", selectedTable);
          }
          if (data) {
            setTableData(data);
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTableData();
  }, [selectedTable]);

  const handleTableChange = (event) => {
    setSelectedTable(event.target.value);
  };

  return { selectedTable, tableData, handleTableChange };
};
