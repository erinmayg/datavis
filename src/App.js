import React, { useState } from 'react';
import './App.scss';
import * as XLSX from 'xlsx';
import Select from 'react-select';
import DFDRChart from './components/DFDRChart';
import { ReactComponent as HelpButton } from './svg/help.svg';
import { ReactComponent as AddButton } from './svg/plus.svg';
import { ReactComponent as RemoveButton } from './svg/remove.svg';
import { ReactComponent as AddColButton } from './svg/plusCol.svg';
import { ReactComponent as RemoveColButton } from './svg/removeCol.svg';

function App() {
  let filetypes = '.xls, .xlsx';

  const [file, setFile] = useState([]);
  const [sheets, setSheets] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState();
  const [cols, setCols] = useState([]);
  const [selectedColsList, setSelectedColsList] = useState([[[]]]);
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
    if (selectedColsList[i][0].length === 0) return;
    setSelectedColsList([...selectedColsList, [[]]]);
  };

  const removeColumnsList = (i) => {
    const list = [...selectedColsList];
    list.splice(i, 1);
    setSelectedColsList(list);
  };

  const handleChooseSheet = (selected) => {
    setSelectedColsList([[[]]]);
    setSelectedSheet(selected.value);
    readCols(selected.value);
    readSheet(selected.value);
  };

  const handleChooseColumn = (selected, i, j) => {
    const colsList = [...selectedColsList];
    colsList[i][j] = [...[selected.value, 1]];
    console.log(colsList);
    setSelectedColsList(colsList);
  };

  const handleRate = (val, i, j) => {
    const colsList = [...selectedColsList];
    colsList[i][j] = [...[colsList[i][j][0], val]];
    console.log(colsList);
    setSelectedColsList(colsList);
  };

  const addColumn = (i, j) => {
    if (selectedColsList[i][j].length === 0) return;
    const colsList = [...selectedColsList];
    colsList[i] = [...colsList[i], []];
    console.log(colsList);
    setSelectedColsList(colsList);
  };

  const removeColumn = (i, j) => {
    const colsList = [...selectedColsList];
    colsList[i].splice(j, 1);
    console.log(colsList);
    setSelectedColsList(colsList);
  };

  const colsLabel = (
    <label>
      Choose columns:{' '}
      <span className='tooltip'>
        <HelpButton />
        <span className='tooltip-text'>
          Select multiple parameters to plot on the same chart. To plot in a
          different graph click the 'Add' button
        </span>
      </span>
    </label>
  );

  const rateLabel = (
    <label>
      Sampling rate:{' '}
      <span className='tooltip'>
        <HelpButton />
        <span className='tooltip-text'>
          Sample 1 data every n seconds, where n is the user input
        </span>
      </span>
    </label>
  );

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
        <label>Show Marker</label>
        {sheets.length > 0 && (
          <div className='flex'>
            <label>
              Choose sheet:
              <Select
                className='select'
                placeholder='Sheet'
                value={{ value: selectedSheet, label: selectedSheet }}
                onChange={(selected) => handleChooseSheet(selected)}
                options={sheets.map((sheet) => {
                  return { value: sheet, label: sheet };
                })}
              />
            </label>
          </div>
        )}
        {selectedSheet && cols.length > 0 && (
          <div className='columns'>
            {selectedColsList.map((lst, i) => {
              return (
                <div className='flex graphForm--outer' key={i}>
                  <div className='graphForm'>
                    <h1>Graph {i + 1}</h1>
                    {lst.map((_, j) => {
                      return (
                        <div className='flex' key={j}>
                          <div className='selectCols'>
                            {i === 0 && j === 0 && colsLabel}
                            <Select
                              key={i}
                              className='select'
                              placeholder='Column(s)'
                              value={{
                                value: selectedColsList[i][j][0],
                                label: selectedColsList[i][j][0],
                              }}
                              onChange={(selected) =>
                                handleChooseColumn(selected, i, j)
                              }
                              options={cols.map((col) => {
                                return { value: col, label: col };
                              })}
                            />
                          </div>

                          <div>
                            {i === 0 && j === 0 && rateLabel}
                            <div className='flex'>
                              <p>1/</p>
                              <input
                                type='number'
                                className='rate'
                                min='1'
                                max={data.length}
                                placeholder='1'
                                onChange={(e) =>
                                  handleRate(e.target.value, i, j)
                                }
                              />
                            </div>
                          </div>

                          {j === lst.length - 1 && (
                            <AddColButton
                              alt='Add column'
                              onClick={(e) => addColumn(i, j)}
                            />
                          )}
                          {j !== 0 && (
                            <RemoveColButton
                              alt='Remove columnn'
                              onClick={(e) => removeColumn(i, j)}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {i === selectedColsList.length - 1 && (
                    <AddButton
                      alt='Add graph'
                      onClick={(e) => addColumnsList(i)}
                    />
                  )}
                  {i !== 0 && (
                    <RemoveButton onClick={(e) => removeColumnsList(i)} />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      {selectedColsList[0][0].length > 0 && (
        <DFDRChart
          time={time}
          data={data}
          columnsList={selectedColsList.filter(
            (lst) => lst.filter((cols) => cols.length > 0).length > 0
          )}
          showMarker={showMarker}
        />
      )}
    </div>
  );
}

export default App;
