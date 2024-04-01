const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const excel = require("exceljs");
const fs = require("fs");

const app = express();
const upload = multer({ dest: "uploads/" });

// Endpoint to upload file and process data
app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;

  try {
    if (!file) {
      throw new Error("No file uploaded");
    }

    let parsedData = [];

    if (file.originalname.endsWith(".csv")) {
      fs.createReadStream(file.path)
        .pipe(csv())
        .on("data", (row) => {
          parsedData.push(row);
        })
        .on("end", () => {
          const jsonData = JSON.stringify(parsedData, null, 2);
          console.log(jsonData);
          fs.unlinkSync(file.path); // Remove the uploaded file
          res.status(200).json({ data: jsonData });
        })
        .on("error", (error) => {
          throw error;
        });
    } else if (
      file.originalname.endsWith(".xlsx") ||
      file.originalname.endsWith(".xls")
    ) {
      const workbook = new excel.Workbook();
      workbook.xlsx
        .readFile(file.path)
        .then(() => {
          const worksheet = workbook.worksheets[0];
          worksheet.eachRow((row, rowNumber) => {
            if (rowNumber !== 1) {
              // Skip header row
              const rowData = {};
              row.eachCell((cell, colNumber) => {
                rowData[`column${colNumber}`] = cell.value;
              });
              parsedData.push(rowData);
            }
          });
          const jsonData = JSON.stringify(parsedData, null, 2);
          console.log(jsonData);
          fs.unlinkSync(file.path); // Remove the uploaded file
          res.status(200).json({ data: jsonData });
        })
        .catch((error) => {
          throw error;
        });
    } else {
      throw new Error("Unsupported file format");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
