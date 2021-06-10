import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Select from 'react-select';
import { ReactComponent as HelpButton } from '../svg/help.svg';
import { ReactComponent as AddButton } from '../svg/plus.svg';
import { ReactComponent as RemoveButton } from '../svg/remove.svg';
import { ReactComponent as AddColButton } from '../svg/plusCol.svg';
import { ReactComponent as RemoveColButton } from '../svg/removeCol.svg';

function UserInput(props) {
  const filetypes = '.xls, .xlsx';

  const [selectedSheet, setSelectedSheet] = useState();
  const [file, setFile] = useState([]);
  const [sheets, setSheets] = useState([]);

  const readSheets = (file) => {
    const promise = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, {
          type: 'buffer',
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

    promise.then((dataCols) =>
      props.setCols(dataCols.split(',').filter((col) => col !== ''))
    );
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
        const data = XLSX.utils.sheet_to_json(ws, { defval: '' });
        resolve(data);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((data) => {
      props.setData(data);

      /* Find time column */
      let timeIdx = '';
      for (let key in data[5]) {
        if (data[5][key] instanceof Date) {
          timeIdx = key;
          break;
        }
      }

      /* Set x-axis as 1 to n if time column does not exists */
      if (timeIdx === '') {
        props.setTime([
          ...Array(props.data.length + 1)
            .keys()
            .slice(1),
        ]);
        return;
      }

      let timeArr = Object.values(data).map((row) => row[timeIdx]);

      let skipRow = 0;
      let isSameSeconds = true;
      let countFirstSameTime = 0;
      for (let i = 0; i < timeArr.length; i++) {
        if (!(timeArr[i] instanceof Date)) {
          skipRow++;
          continue;
        }

        if (i === 0 || !(timeArr[i - 1] instanceof Date)) continue;

        if (timeArr[i].getMinutes() !== timeArr[i - 1].getMinutes()) {
          break;
        }

        if (timeArr[i].getSeconds() === timeArr[i - 1].getSeconds()) {
          countFirstSameTime++;
        } else {
          isSameSeconds = false;
          break;
        }
      }

      props.setSkipRow(skipRow);

      timeArr = isSameSeconds
        ? timeArr.map((time, i) => {
            let secs = (i - skipRow + (60 - countFirstSameTime - 1)) % 60;
            return time instanceof Date ? time.setSeconds(secs) : time;
          })
        : timeArr;

      props.setTime(timeArr);
    });
  };

  const addColumnsList = (i) => {
    if (props.selectedColsList[i][0].length === 0) return;
    props.setSelectedColsList([...props.selectedColsList, [[]]]);
  };

  const removeColumnsList = (i) => {
    const list = [...props.selectedColsList];
    list.splice(i, 1);
    props.setSelectedColsList(list);
  };

  const handleChooseSheet = (selected) => {
    props.setSkipRow(0);
    props.setSelectedColsList([[[]]]);
    setSelectedSheet(selected.value);
    readCols(selected.value);
    readSheet(selected.value);
  };

  const handleChooseColumn = (selected, i, j) => {
    const colsList = [...props.selectedColsList];
    colsList[i][j] = [...[selected.value, 1]];
    props.setSelectedColsList(colsList);
  };

  const handleRate = (val, i, j) => {
    const colsList = [...props.selectedColsList];
    colsList[i][j] = [...[colsList[i][j][0], val]];
    props.setSelectedColsList(colsList);
  };

  const addColumn = (i, j) => {
    if (props.selectedColsList[i][j].length === 0) return;
    const colsList = [...props.selectedColsList];
    colsList[i] = [...colsList[i], []];
    props.setSelectedColsList(colsList);
  };

  const removeColumn = (i, j) => {
    const colsList = [...props.selectedColsList];
    colsList[i].splice(j, 1);
    props.setSelectedColsList(colsList);
  };

  const tooltip = (tip) => {
    return (
      <span className='tooltip'>
        <HelpButton />
        <span className='tooltip-text'>{tip}</span>
      </span>
    );
  };

  const colsLabel = (
    <label>
      Choose columns:{' '}
      {tooltip(
        "Select multiple parameters to plot on the same chart. To plot in a different graph click the 'Add' button"
      )}
    </label>
  );

  const rateLabel = (
    <label>
      Sampling rate:{' '}
      {tooltip('Sample 1 data every n seconds, where n is the user input')}
    </label>
  );

  const colButtons = (i, j) => {
    return (
      <div className='flex align-left'>
        {j === props.selectedColsList[i].length - 1 && (
          <AddColButton alt='Add column' onClick={(e) => addColumn(i, j)} />
        )}
        {props.selectedColsList[i].length > 1 && (
          <RemoveColButton
            alt='Remove columnn'
            onClick={(e) => removeColumn(i, j)}
          />
        )}
      </div>
    );
  };

  const graphButtons = (i) => {
    return (
      <>
        {i === props.selectedColsList.length - 1 && (
          <AddButton alt='Add graph' onClick={(e) => addColumnsList(i)} />
        )}
        {props.selectedColsList.length > 1 && (
          <RemoveButton onClick={(e) => removeColumnsList(i)} />
        )}
      </>
    );
  };

  const sheetInput = (
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
  );

  const colsInput = (i, j) => {
    return (
      <div className='selectCols'>
        {i === 0 && j === 0 && colsLabel}
        <Select
          key={i}
          className='select'
          placeholder='Column(s)'
          value={{
            value: props.selectedColsList[i][j][0],
            label: props.selectedColsList[i][j][0],
          }}
          onChange={(selected) => handleChooseColumn(selected, i, j)}
          options={props.cols.map((col) => {
            return { value: col, label: col };
          })}
        />
      </div>
    );
  };

  const rateInput = (i, j) => {
    return (
      <div>
        {i === 0 && j === 0 && rateLabel}
        <div className='flex'>
          <p>1/</p>
          <input
            type='number'
            className='rate'
            min='1'
            max={props.data.length}
            placeholder='1'
            onChange={(e) => handleRate(e.target.value, i, j)}
          />
          {colButtons(i, j)}
        </div>
      </div>
    );
  };

  const graphForms = (
    <div className='columns'>
      {props.selectedColsList.map((lst, i) => {
        return (
          <div className='flex graphForm--outer' key={i}>
            <div className='graphForm'>
              <h1>
                Graph {i + 1}{' '}
                {i === 0 && tooltip('Press Ctrl+Click to show table')}
              </h1>

              {lst.map((_, j) => {
                return (
                  <div className='flex' key={j}>
                    {colsInput(i, j)}
                    {rateInput(i, j)}
                  </div>
                );
              })}
            </div>
            {graphButtons(i)}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className='form'>
      <>
        <label className='file'>
          <input
            type='file'
            id='file'
            accept={filetypes}
            onChange={(e) => {
              props.setSkipRow(0);
              setSheets([]);
              setSelectedSheet();
              props.setCols([]);
              props.setSelectedColsList([[[]]]);

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
          Please ensure that the first row of each sheet is the parameters
        </p>
      </>
      <div
        className='pointer'
        onClick={() => props.setShowMarker(!props.showMarker)}
      >
        <input
          type='checkbox'
          className='checkbox'
          checked={props.showMarker}
          readOnly={true}
        />
        <label className='checkbox-label'>Show Marker</label>
      </div>
      {sheets.length > 0 && sheetInput}
      {selectedSheet && props.cols.length > 0 && graphForms}
    </div>
  );
}

export default UserInput;
