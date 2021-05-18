import React from 'react';
import Chart from 'react-apexcharts';
import moment from 'moment';

function DFDRChart(props) {
  let series = props.columns.map((col) => {
    return {
      name: col,
      data: props.time
        .map((t, i) => [t, props.data[i][col]])
        .filter((data) => !isNaN(data[1])),
    };
  });
  let options = {
    chart: {
      id: 'dfdr',
      type: 'line',
      height: 160,
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
  };

  return (
    <div>
      <Chart options={options} series={series} type='line' height={500} />
    </div>
  );
}

export default DFDRChart;
