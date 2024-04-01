import React from "react";
import { useTableData } from "../hooks/useTableData";
import { useTableNames } from "../hooks/useTableNames";

const DataTable = () => {
  const { selectedTable, tableData, handleTableChange } = useTableData();
  const tableNames = useTableNames();

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="selectTable" className="form-label">
              Select Table:
            </label>
            <select
              id="selectTable"
              className="form-select"
              value={selectedTable}
              onChange={handleTableChange}
            >
              <option value="">Select a table</option>
              {tableNames.map((tableName, index) => (
                <option key={index} value={tableName}>
                  {tableName}
                </option>
              ))}
            </select>
          </div>
          {tableData && tableData.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  {Object.keys(tableData[0]).map((key, index) => (
                    <th key={index}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.values(row).map((value, colIndex) => (
                      <td key={colIndex}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No data available for the selected table.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataTable;
