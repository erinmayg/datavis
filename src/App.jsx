import React, { useState } from 'react';
import './App.scss';
import DFDRChart from './components/DFDRChart';
import UserInput from './components/UserInput';


// Displays the main components of the Web Application
function App() {
  /* States */

  // the number of rows to skip after header row
  const [skipRow, setSkipRow] = useState(0);
  // the parameters in the sheet
  const [cols, setCols] = useState([]);
  /* the selected columns for all graphs
     format: [[[col1, rate1], [col2, rate2], ...], ...]
  */
  const [selectedColsList, setSelectedColsList] = useState([[[]]]);
  // the rows in the sheet
  const [data, setData] = useState([]);
  // the time column data, if none exist, it will be 1...n where n is the number of data points
  const [time, setTime] = useState([]);
  // set to true when markers are shown in the graph, default state: no markers
  const [showMarker, setShowMarker] = useState(false);

  return (
    <div className='App'>
      <div className='title'>
        <h1>DFDR Data Visualisation</h1>
      </div>
      <UserInput
        setSkipRow={setSkipRow}
        cols={cols}
        setCols={setCols}
        selectedColsList={selectedColsList}
        setSelectedColsList={setSelectedColsList}
        data={data}
        setData={setData}
        setTime={setTime}
        showMarker={showMarker}
        setShowMarker={setShowMarker}
      />
      {selectedColsList[0][0].length > 0 && (
        <DFDRChart
          time={time}
          data={data}
          columnsList={selectedColsList.filter(
            (lst) => lst.filter((cols) => cols.length > 0).length > 0
          )}
          allColumns={cols}
          showMarker={showMarker}
          skipRow={skipRow}
        />
      )}
    </div>
  );
}

export default App;
