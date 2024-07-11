import React, { useEffect, useState } from "react";

export default function AdminReportTable({
  data,
  tableHeads,
  handleDisplayTable,
  currentDisplay,
}) {
  const [tableHeadings, setTableHeadings] = useState([]);

  useEffect(() => {
    if (tableHeads && tableHeads.length > 0) {
      setTableHeadings(tableHeads);
    } else if (data && data.length > 0) {
      let uniqueKeys = new Set();
      data.forEach((obj) => {
        Object.keys(obj).forEach((key) => uniqueKeys.add(key));
      });
      setTableHeadings(Array.from(uniqueKeys));
    }
  }, [tableHeads, data]);

  return (
    <div className="adminReportTableMainBox">
      <table className="adminReportTable">
        <thead>
          <tr>
            {tableHeadings &&
              tableHeadings.map((x, index) => <th key={index}>{x}</th>)}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((rowData, rowIndex) => (
              <tr
                onClick={() => {
                  currentDisplay !== "Product"
                    ? handleDisplayTable(rowData)
                    : null;
                }}
                key={rowIndex}
              >
                {Object.keys(rowData).map((key, colIndex) => (
                  <td key={colIndex}>{rowData[key]}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
