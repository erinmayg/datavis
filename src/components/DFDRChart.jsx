import React from 'react';
import Chart from 'react-apexcharts';
import moment from 'moment';

function DFDRChart(props) {
  let constructSeries = (columns) =>
    columns.map((col) => {
      return {
        name: col,
        data: props.time
          .map((t, i) => [t, props.data[i][col]])
          .filter((data) => !isNaN(data[1])),
      };
    });
  const constructOptions = (id) => {
    return {
      chart: {
        id: id,
        group: 'dfdr',
        type: 'line',
      },
      yaxis: {
        labels: {
          minWidth: 20,
        },
      },
      xaxis: {
        type: 'datetime',
        labels: {
          formatter: function (val, timestamp) {
            return moment(new Date(timestamp)).format('HH:mm:ss');
          },
        },
      },
      stroke: {
        width: 1,
      },
      theme: {
        palette: 'palette1',
      },
      dataLabels: {
        enabled: false,
        enabledOnSeries: [0],
        formatter: function (val, opt) {
          return props.data[opt.dataPointIndex]['Comments'];
        },
      },
      markers: {
        size: 2,
        strokeWidth: 0,
      },
    };
  };

  return (
    <div>
      {props.columnsList.map((columns, i) => {
        if (columns.length === 0) return null;
        return (
          <Chart
            key={i}
            series={constructSeries(columns)}
            options={constructOptions(i + 1)}
            height={
              500 / props.columnsList.filter((cols) => cols.length > 0).length
            }
          />
        );
      })}
    </div>
  );
}

export default DFDRChart;
