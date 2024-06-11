import React, { useState, useEffect } from "react";
import { useTableData } from "../hooks/useTableData";
import { useTableNames } from "../hooks/useTableNames";
import {
  Container,
  Box,
  Select,
  MenuItem,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Pagination,
  Snackbar,
  Alert,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";

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

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
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
    <Container maxWidth="md">
      <Box mt={5}>
        <Box mb={3}>
          <Select
            fullWidth
            value={selectedTable}
            onChange={handleTableChange}
            displayEmpty
            inputProps={{ "aria-label": "Select Table" }}
          >
            <MenuItem value="">Select a table</MenuItem>
            {tableNames.map((tableName, index) => (
              <MenuItem key={index} value={tableName}>
                {tableName}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box mb={3}>
          <TextField
            fullWidth
            label="Filter"
            variant="outlined"
            value={filter}
            onChange={handleFilterChange}
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleAddRow}
        >
          Add New Row
        </Button>

        {tableData && tableData.length > 0 ? (
          <>
            <TableContainer component={Paper} sx={{ mt: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {Object.keys(tableData[0]).map((key, index) => (
                      <TableCell key={index}>{key}</TableCell>
                    ))}
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentData.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {Object.entries(row).map(([key, value], colIndex) => (
                        <TableCell key={colIndex}>
                          {editRowIndex === rowIndex ? (
                            <TextField
                              fullWidth
                              value={editRowData[key]}
                              onChange={(e) => handleChange(e, key)}
                            />
                          ) : (
                            value
                          )}
                        </TableCell>
                      ))}
                      <TableCell>
                        {editRowIndex === rowIndex ? (
                          <>
                            <Button
                              variant="contained"
                              color="success"
                              onClick={handleSave}
                              size="small"
                            >
                              Save
                            </Button>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={handleCancel}
                              size="small"
                              sx={{ ml: 1 }}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <IconButton
                              color="primary"
                              onClick={() => handleEdit(rowIndex)}
                              size="small"
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              color="error"
                              onClick={() => handleDelete(rowIndex)}
                              size="small"
                            >
                              <Delete />
                            </IconButton>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </>
        ) : (
          <p>No data available for the selected table.</p>
        )}

        {showForm && (
          <Box mt={4}>
            <h5>Add New Row</h5>
            <form>
              {Object.keys(newRow).map((key, index) => (
                <Box mb={2} key={index}>
                  <TextField
                    fullWidth
                    label={key}
                    value={newRow[key]}
                    onChange={(e) => handleInputChange(e, key)}
                    variant="outlined"
                  />
                </Box>
              ))}
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmitNewRow}
              >
                Add Row
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCancelNewRow}
                sx={{ ml: 1 }}
              >
                Cancel
              </Button>
            </form>
          </Box>
        )}

        <Snackbar
          open={showToast}
          autoHideDuration={6000}
          onClose={() => setShowToast(false)}
        >
          <Alert onClose={() => setShowToast(false)} severity="success">
            {toastMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default DataTable;
