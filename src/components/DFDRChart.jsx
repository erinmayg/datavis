import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Chart from 'react-apexcharts';
import moment from 'moment';

function DFDRChart(props) {
  let series = [
    {
      name: props.column,
      data: props.time
        .map((t, i) => [t, props.values[i]])
        .filter((data) => !isNaN(data[1])),
    },
  ];
  let options = {
    chart: {
      id: 'fb',
      group: 'social',
      type: 'line',
      height: 160,
    },
    colors: ['#008FFB'],
    yaxis: {
      labels: {
        minWidth: 20,
      },
    },
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: function (val, timestamp) {
          return moment(new Date(timestamp)).format('LTS');
        },
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
