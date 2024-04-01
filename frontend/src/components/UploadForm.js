import React, { useState } from "react";
import { useUploadData } from "../hooks/useUploadData";
import { useTableNames } from "../hooks/useTableNames";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [truncate, setTruncate] = useState(false);
  const [selectedTable, setSelectedTable] = useState("");
  const { uploadData, isLoading, error } = useUploadData();
  const tableNames = useTableNames();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleTruncateChange = (event) => {
    setTruncate(event.target.checked);
  };

  const handleTableChange = (event) => {
    setSelectedTable(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("table", selectedTable);
    formData.append("truncate", truncate);

    uploadData(formData);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
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
              <label htmlFor="file" className="form-label">
                Upload File:
              </label>
              <input
                type="file"
                id="file"
                className="form-control"
                onChange={handleFileChange}
              />
            </div>
            <div className="form-check mb-3">
              <input
                type="checkbox"
                id="truncate"
                className="form-check-input"
                checked={truncate}
                onChange={handleTruncateChange}
              />
              <label htmlFor="truncate" className="form-check-label">
                Truncate Table
              </label>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                {isLoading ? "Uploading..." : "Submit"}
              </button>
              {error && <p className="text-danger mt-2">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
