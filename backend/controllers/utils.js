const parseCSVData = (fileStream) => {
  return new Promise((resolve, reject) => {
    const parsedData = [];
    fileStream
      .pipe(csv())
      .on("data", (row) => parsedData.push(row))
      .on("end", () => resolve(parsedData))
      .on("error", (error) => reject(error));
  });
};

// Function to parse Excel data
const parseExcelData = async (fileBuffer) => {
  const parsedData = [];
  try {
    const workbook = excel.read(fileBuffer);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = excel.utils.sheet_to_json(sheet);
    data.forEach((row) => {
      parsedData.push(row);
    });
    return parsedData;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  parseCSVData,
  parseExcelData,
};
