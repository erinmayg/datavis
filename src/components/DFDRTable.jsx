import React from 'react';
import moment from 'moment';
import '../css/table.scss';

function DFDRTable(props) {
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
        <tr className={i === 20 ? 'highlight' : ''}>
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
    <div className='dfdrTable'>
      <table>
        {constructHeader}
        {constructTableBody(props.data)}
      </table>
    </div>
  );
}

export default DFDRTable;
