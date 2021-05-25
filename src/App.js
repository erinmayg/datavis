import React, { useState } from 'react';
import './App.scss';
import * as XLSX from 'xlsx';
import Select from 'react-select';
import DFDRChart from './components/DFDRChart';
import { ReactComponent as AddButton } from './svg/plus.svg';
import { ReactComponent as RemoveButton } from './svg/remove.svg';
import { ReactComponent as HelpButton } from './svg/help.svg';

function App() {
  let filetypes = '.xls, .xlsx';

  const [file, setFile] = useState([]);
  const [sheets, setSheets] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState();
  const [cols, setCols] = useState([]);
  const [selectedColsList, setSelectedColsList] = useState([[]]);
  const [data, setData] = useState([]);
  const [time, setTime] = useState([]);
  const [showMarker, setShowMarker] = useState(false);

  const readSheets = (file) => {
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
        resolve(wb.SheetNames);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((sheets) => setSheets(sheets));
  };

  const readCols = (sheet) => {
    const promise = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, {
          type: 'buffer',
          cellDates: true,
          sheets: sheet,
          sheetRows: 1,
        });
        const ws = wb.Sheets[sheet];
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

  const addColumnsList = (i) => {
    if (selectedColsList[i].length === 0) return;
    setSelectedColsList([...selectedColsList, []]);
  };

  const removeColumnsList = (i) => {
    const list = [...selectedColsList];
    list.splice(i, 1);
    console.log(list);
    setSelectedColsList(list);
  };

  return (
    <div className='App'>
      <div className='title'>
        <h1>DFDR Data Visualisation</h1>
      </div>
      <div className='form'>
        <label className='file'>
          <input
            type='file'
            id='file'
            accept={filetypes}
            onChange={(e) => {
              let file = e.target.files[0];
              setFile(file);
              readSheets(file);
            }}
          />
          <span className='file-custom'>
            <span className='filename'>
              {file.length === 0 ? 'Choose .xlsx file...' : file.name}
            </span>
            <span className='browse'>Browse</span>
          </span>
        </label>
        <p className='warning'>
          Please ensure that the first row of each sheet is the header column
          and that each sheet has a 'GMT' column
        </p>
        <input
          type='checkbox'
          className='checkbox'
          id='showMarker'
          name='marker'
          value='marker'
          checked={showMarker}
          onChange={() => setShowMarker(!showMarker)}
        />
        <label for='showMarker'>Show Marker</label>
        {sheets.length > 0 && (
          <div className='flex'>
            <label>
              Choose sheet:
              <Select
                className='select'
                placeholder='Sheet'
                value={{ value: selectedSheet, label: selectedSheet }}
                onChange={(selected) => {
                  setSelectedColsList([[]]);
                  setSelectedSheet(selected.value);
                  readCols(selected.value);
                  readSheet(selected.value);
                }}
                options={sheets.map((sheet) => {
                  return { value: sheet, label: sheet };
                })}
              />
            </label>
          </div>
        )}
        {selectedSheet && cols.length > 0 && (
          <div className='columns'>
            <label>
              Choose columns:{' '}
              <span className='tooltip'>
                <HelpButton />
                <span className='tooltip-text'>
                  Select multiple parameters to plot on the same chart. To plot
                  in a different graph click the 'Add' button
                </span>
              </span>
            </label>
            {selectedColsList.map((x, i) => {
              return (
                <div className='flex' key={i}>
                  <Select
                    key={i}
                    className='select'
                    placeholder='Column(s)'
                    isMulti={true}
                    isClearable={true}
                    value={selectedColsList[i].map((cols) => {
                      return { value: cols, label: cols };
                    })}
                    onChange={(selected) => {
                      let selectedOpts = selected.map((opt) => opt.value);
                      const colsList = [...selectedColsList];
                      colsList[i] = selectedOpts;
                      console.log(colsList);
                      setSelectedColsList(colsList);
                    }}
                    options={cols.map((col) => {
                      return { value: col, label: col };
                    })}
                  />
                  <AddButton onClick={(e) => addColumnsList(i)} />
                  {i !== 0 && (
                    <RemoveButton onClick={(e) => removeColumnsList(i)} />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      {selectedColsList[0].length > 0 && (
        <DFDRChart
          time={time}
          data={data}
          columnsList={selectedColsList}
          showMarker={showMarker}
        />
      )}
    </div>
  );
}

export default App;
