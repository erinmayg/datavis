import React, { useState } from 'react';
import './App.scss';
import DFDRChart from './components/DFDRChart';
import UserInput from './components/UserInput';

function App() {
  const [skipRow, setSkipRow] = useState(0);
  const [cols, setCols] = useState([]);
  const [selectedColsList, setSelectedColsList] = useState([[[]]]);
  const [data, setData] = useState([]);
  const [time, setTime] = useState([]);
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
