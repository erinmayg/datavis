import React, { useState } from 'react';
import './App.css';
import * as XLSX from 'xlsx';
import Select from 'react-select';
import DFDRChart from './components/DFDRChart';
import { ReactComponent as AddButton } from './svg/plus.svg';

function App() {
  let filetypes = '.xls, .xlsx';

  const [file, setFile] = useState([]);
  const [sheets, setSheets] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState();
  const [cols, setCols] = useState([]);
  const [selectedCols, setSelectedCols] = useState([]);
  const [data, setData] = useState([]);
  const [time, setTime] = useState([]);

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
        <div className='flex'>
          <label>Choose sheet:</label>
          <Select
            className='select'
            placeholder='Sheet'
            onChange={(selected) => {
              setSelectedCols([]);
              setSelectedSheet(selected.value);
              readSheet(selected.value);
            }}
            options={sheets.map((sheet) => {
              return { value: sheet, label: sheet };
            })}
          />
        </div>
      )}
      {selectedSheet && cols.length > 0 && (
        <div>
          <label>Choose column:</label>
          <div className='flex'>
            <Select
              className='select'
              placeholder='Column(s)'
              isMulti={true}
              isClearable={true}
              onChange={(selected) => {
                console.log(selected.map((opt) => opt.value));
                setSelectedCols(selected.map((opt) => opt.value));
              }}
              options={cols.map((col) => {
                return { value: col, label: col };
              })}
            />
            <AddButton />
          </div>
        </div>
      )}
      {selectedCols.length > 0 && (
        <DFDRChart time={time} data={data} columns={selectedCols} />
      )}
    </div>
  );
}

export default App;
