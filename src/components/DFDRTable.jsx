import React, { useState, useEffect } from 'react';
import moment from 'moment';
import '../css/table.scss';
import { ReactComponent as RemoveButton } from '../svg/remove.svg';

// The Preview Table, appears when a data point is selected
function DFDRTable(props) {
  /* States */

  // The number of rows to display before and after the selected data point
  const [tableSeconds, setTableSeconds] = useState({ prior: 20, post: 20 });
  // The data (rows) to display on the Preview Table
  const [tableData, setTableData] = useState(() =>
    props.data
      .slice(props.skipRow)
      .filter(
        (_, i) =>
          i >= props.row - tableSeconds.prior &&
          i <= props.row + tableSeconds.post
      )
  );

  /* Use Effects */

  useEffect(() => {
    setTableData(
      props.data
        .slice(props.skipRow)
        .filter(
          (_, i) =>
            i >= props.row - tableSeconds.prior &&
            i <= props.row + tableSeconds.post
        )
    );
  }, [props.data, props.skipRow, tableSeconds, props.row]);

  /* Functions and Components */

  const constructHeader = (
    <thead>
      <tr>
        {props.allColumns.map((col) => (
          <th>{col}</th>
        ))}
      </tr>
    </thead>
  );

  const constructTableBody = (rows) => (
    <tbody>
      {rows.map((row, i) => (
        <tr
          className={
            (props.row < tableSeconds.prior && i === props.row) ||
            (props.row > tableSeconds.prior &&
              i === tableSeconds.prior &&
              'highlight')
          }
        >
          {Object.values(row).map((data) => (
            <td>
              {data instanceof Date
                ? new moment(data).format('HH:mm:ss')
                : data}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );

  return (
    <div className='flex center'>
      <div className='tableForm flex-col center'>
        <input
          type='number'
          min='0'
          max='99'
          placeholder='0'
          value={tableSeconds.prior === 0 ? '' : tableSeconds.prior}
          onChange={(e) => {
            let newTableSeconds = { ...tableSeconds };
            newTableSeconds.prior = isNaN(e.target.valueAsNumber)
              ? 0
              : e.target.valueAsNumber % 100;
            setTableSeconds(newTableSeconds);
            e.target.value = e.target.value.slice(0, 2);
          }}
        />{' '}
        seconds prior
        <input
          type='number'
          min='0'
          max='99'
          placeholder='0'
          value={tableSeconds.post === 0 ? '' : tableSeconds.post}
          onChange={(e) => {
            let newTableSeconds = { ...tableSeconds };
            newTableSeconds.post = isNaN(e.target.valueAsNumber)
              ? 0
              : e.target.valueAsNumber % 100;
            setTableSeconds(newTableSeconds);
            e.target.value = e.target.value.slice(0, 2);
          }}
        />{' '}
        seconds post
      </div>

      <div className='dfdrTable'>
        <table>
          {constructHeader}
          {constructTableBody(tableData)}
        </table>
      </div>

      <RemoveButton onClick={() => props.removeTable()} />
    </div>
  );
}

export default DFDRTable;
