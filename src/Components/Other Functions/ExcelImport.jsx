import React, { useState } from "react";
import * as XLSX from "xlsx";

export default function ExcelImport() {
  const [items, setItems] = useState([]);

  console.log(items, "items");
  console.log(items, "items");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      setItems(data); // Assuming data is an array of objects
    };
    reader.readAsBinaryString(file);
  };

  console.log(items, "items");
  console.log(items, "items");

  const generateExcel = (processedData) => {
    const ws = XLSX.utils.json_to_sheet(processedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ProcessedData");
    XLSX.writeFile(wb, "processed_data.xlsx");
  };

  const handleDownloadExcel = (processedData) => {
    const ws = XLSX.utils.json_to_sheet(processedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ProcessedData");
    XLSX.writeFile(wb, "processed_data.xlsx");
  };
  return (
    <div>
      <input type="file" accept=".xlsx,.xls" onChange={handleFileUpload} />
      {/* Render your data as needed, maybe a preview */}

      {/* <table>
        <tbody>
          {items.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table> */}
      <button type="button" onClick={() => handleDownloadExcel(items)}>
        Download
      </button>
    </div>
  );
}
