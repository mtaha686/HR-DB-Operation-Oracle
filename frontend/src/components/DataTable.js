import React, { useState, useEffect } from "react";
import { useTableData } from "../hooks/useTableData";
import { useTableNames } from "../hooks/useTableNames";

// Custom Toast Component
const Toast = ({ message, show, onClose }) => {
  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        minWidth: "200px",
        padding: "10px",
        backgroundColor: "#333",
        color: "#fff",
        borderRadius: "5px",
        zIndex: 1000,
      }}
    >
      {message}
      <button
        onClick={onClose}
        style={{
          marginLeft: "10px",
          backgroundColor: "transparent",
          border: "none",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        ✖
      </button>
    </div>
  );
};

const DataTable = () => {
  const { selectedTable, tableData, handleTableChange, setTableData } =
    useTableData();
  const tableNames = useTableNames();

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [filter, setFilter] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newRow, setNewRow] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // State for editing rows
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [editRowData, setEditRowData] = useState({});

  const filteredData = tableData.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(filter.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [tableData, filter]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleAddRow = () => {
    setShowForm(true);
    setNewRow(
      Object.keys(tableData[0] || {}).reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {})
    );
  };

  const handleInputChange = (e, key) => {
    setNewRow({
      ...newRow,
      [key]: e.target.value,
    });
  };

  const handleSubmitNewRow = () => {
    setTableData([...tableData, newRow]);
    setShowForm(false);
    setToastMessage("Row added successfully!");
    setShowToast(true);
  };

  const handleCancelNewRow = () => {
    setShowForm(false);
    setNewRow({});
  };

  // Edit Handlers
  const handleEdit = (index) => {
    setEditRowIndex(index);
    setEditRowData(tableData[index]);
  };

  const handleChange = (e, key) => {
    setEditRowData({
      ...editRowData,
      [key]: e.target.value,
    });
  };

  const handleSave = () => {
    const updatedData = [...tableData];
    updatedData[editRowIndex] = editRowData;
    setTableData(updatedData);
    setEditRowIndex(null);
    setEditRowData({});
  };

  const handleCancel = () => {
    setEditRowIndex(null);
    setEditRowData({});
  };

  // Delete Handler
  const handleDelete = (index) => {
    const updatedData = tableData.filter((_, i) => i !== index);
    setTableData(updatedData);
    setToastMessage("Row deleted successfully!");
    setShowToast(true);
  };

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

          <div className="mb-3">
            <input
              type="text"
              placeholder="Filter"
              className="form-control"
              value={filter}
              onChange={handleFilterChange}
            />
          </div>

          <button className="btn btn-primary mb-3" onClick={handleAddRow}>
            Add New Row
          </button>

          {tableData && tableData.length > 0 ? (
            <>
              <table className="table">
                <thead>
                  <tr>
                    {Object.keys(tableData[0]).map((key, index) => (
                      <th key={index}>{key}</th>
                    ))}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {Object.entries(row).map(([key, value], colIndex) => (
                        <td key={colIndex}>
                          {editRowIndex === rowIndex ? (
                            <input
                              type="text"
                              value={editRowData[key]}
                              onChange={(e) => handleChange(e, key)}
                            />
                          ) : (
                            value
                          )}
                        </td>
                      ))}
                      <td>
                        {editRowIndex === rowIndex ? (
                          <>
                            <button
                              className="btn btn-sm btn-success"
                              onClick={handleSave}
                            >
                              Save
                            </button>
                            <button
                              className="btn btn-sm btn-secondary"
                              onClick={handleCancel}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() => handleEdit(rowIndex)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(rowIndex)}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-secondary"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="btn btn-secondary"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <p>No data available for the selected table.</p>
          )}

          {showForm && (
            <div className="mt-4">
              <h5>Add New Row</h5>
              <form>
                {Object.keys(newRow).map((key, index) => (
                  <div className="mb-3" key={index}>
                    <label className="form-label">{key}</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newRow[key]}
                      onChange={(e) => handleInputChange(e, key)}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleSubmitNewRow}
                >
                  Add Row
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancelNewRow}
                >
                  Cancel
                </button>
              </form>
            </div>
          )}

          <Toast
            message={toastMessage}
            show={showToast}
            onClose={() => setShowToast(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default DataTable;
