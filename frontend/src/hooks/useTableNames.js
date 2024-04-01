import { useState, useEffect } from "react";
import { getTableNames } from "../services/api";

export const useTableNames = () => {
  const [tableNames, setTableNames] = useState([]);

  useEffect(() => {
    const fetchTableNames = async () => {
      try {
        const names = await getTableNames();
        setTableNames(names);
      } catch (error) {
        console.error("Error fetching table names:", error);
      }
    };

    fetchTableNames();
  }, []);

  return tableNames;
};
