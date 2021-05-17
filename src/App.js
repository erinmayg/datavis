import React, { useState } from 'react';
import './App.css';
import * as XLSX from 'xlsx';
import DFDRTable from './components/DFDRTable';
import DFDRChart from './components/DFDRChart';

function App() {
  let filetypes = '.xls, .xlsx';

  const [file, setFile] = useState([]);
  const [sheets, setSheets] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState();
  const [cols, setCols] = useState([]);
  const [selectedCol, setSelectedCol] = useState();
  const [data, setData] = useState([]);
  const [time, setTime] = useState([]);
  const [values, setValues] = useState([]);
  const [zipped, setZipped] = useState([]);

  const readCols = (file) => {
    const promise = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, {
          type: 'buffer',
          cellDates: true,
          sheets: 0,
          sheetRows: 1,
        });
        setSheets(wb.SheetNames);
        setSelectedSheet(wb.SheetNames[0]);
        const wsName = wb.SheetNames[0];
        const ws = wb.Sheets[wsName];
        const cols = XLSX.utils.sheet_to_csv(ws);
        resolve(cols);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((dataCols) => setCols(dataCols.split(',')));
  };

  const readSheet = (sheet) => {
    const promise = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, {
          type: 'buffer',
          cellDates: true,
          sheets: sheet,
        });
        const ws = wb.Sheets[sheet];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });

    let gmt = [];

    promise.then((data) => {
      setData(data);
      Object.values(data).forEach((row) => {
        gmt.push(row['GMT']);
      });
      setTime(gmt);
    });
  };

  const readData = (col) => {
    let values = [];
    data.forEach((row) => {
      values.push(row[col]);
    });
    setValues(values);
    let zipped = [];
    values.forEach((v, i) => zipped.push([time[i], v]));
    setZipped(zipped);
    console.log(zipped);
  };

  return (
    <div className='App'>
      <h1>DFDR Data Visualisation</h1>
      <label>
        Upload file ({filetypes}):
        <input
          type='file'
          accept={filetypes}
          onChange={(e) => {
            let file = e.target.files[0];
            setFile(file);
            readCols(file);
          }}
        />
      </label>
      {sheets.length > 0 && (
        <div>
          <label>Choose sheet:</label>
          <select
            onChange={(e) => {
              setSelectedSheet(e.target.value);
              readSheet(e.target.value);
            }}
          >
            {sheets?.map((sheet, key) => (
              <option key={key} value={sheet}>
                {sheet}
              </option>
            ))}
          </select>
        </div>
      )}
      {cols.length > 0 && (
        <div>
          <label>Choose column:</label>
          <select
            onChange={(e) => {
              setSelectedCol(e.target.value);
              readData(e.target.value);
            }}
          >
            {cols?.map((col, key) => (
              <option key={key} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>
      )}
      {values.length > 0 && (
        <DFDRChart time={time} values={values} column={selectedCol} />
      )}
    </div>
  );
}

export default App;
