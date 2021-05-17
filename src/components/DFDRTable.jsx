import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import parse from 'html-react-parser';
import '../css/table.css';

function DFDRTable(props) {
  const [table, setTable] = useState();

  const readExcelSheet = (file) => {
    const promise = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, {
          type: 'buffer',
          cellDates: true,
          sheets: props.sheet,
          sheetRows: 1,
        });
        const ws = wb.Sheets[props.sheet];
        const data = XLSX.utils.sheet_to_json(ws);
        props.setData(data);
        const table = XLSX.utils.sheet_to_html(ws);
        // resolve(data);
        resolve(table);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });

    // promise.then((data) => console.log(data));
    promise.then((data) => setTable(data));
  };

  return (
    <div className='tableSection'>
      {props.file && readExcelSheet(props.file)}
      {table && parse(table)}
    </div>
  );
}

export default DFDRTable;
