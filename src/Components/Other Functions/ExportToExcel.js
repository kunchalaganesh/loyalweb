import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const ExportToExcel = (data, fileName) => {
  // Convert JSON data to worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Append worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Generate Excel file as a binary string
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  // Save the Excel file
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, `${fileName}.xlsx`);
};
