import axios from "axios";

const baseURL = "http://localhost:8080/tables"; // Update with your API base URL

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getTableNames = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    console.error("Error fetching table names:", error);
    throw error;
  }
};

// Get all countries
export const getAllCountries = async () => {
  try {
    const response = await api.get("/countries");
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// Get all departments
export const getAllDepartments = async () => {
  try {
    const response = await api.get("/departments");
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// Get all employees
export const getAllEmployees = async () => {
  try {
    const response = await api.get("/employees");
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// Get all job history
export const getAllJobHistory = async () => {
  try {
    const response = await api.get("/jobhistory");
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// Get all jobs
export const getAllJobs = async () => {
  try {
    const response = await api.get("/jobs");
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// Get all locations
export const getAllLocations = async () => {
  try {
    const response = await api.get("/locations");
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// Get all regions
export const getAllRegions = async () => {
  try {
    const response = await api.get("/regions");
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const uploadData = async (formData) => {
  try {
    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading data:", error);
    throw error;
  }
};
