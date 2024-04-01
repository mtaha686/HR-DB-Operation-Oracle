// hooks/useUploadData.js
import { useState } from "react";
import axios from "axios";

export const useUploadData = () => {
  const [uploadStatus, setUploadStatus] = useState({
    isLoading: false,
    error: null,
  });

  const uploadData = async (formData) => {
    setUploadStatus({ isLoading: true, error: null });
    try {
      await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadStatus({ isLoading: false, error: null });
    } catch (error) {
      setUploadStatus({ isLoading: false, error: error.message });
    }
  };

  return { uploadData, ...uploadStatus };
};
