import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import moment from 'moment';

function DFDRChart(props) {
  const [xAxis, setXAxis] = useState({
    min: props.time[0],
    max: props.time[props.time.length - 1],
  });

  const [yAxis, setYAxis] = useState([]);

  const generateID = (id) => {
    return id.toString() + new Date().getTime().toString();
  };

  let palettes = [
    'palette1',
    'palette10',
    'palette2',
    'palette9',
    'palette3',
    'palette8',
    'palette4',
    'palette7',
    'palette5',
    'palette6',
  ];

  let constructSeries = (columns) =>
    columns.map((tuple) => {
      const col = tuple[0];
      const rate = tuple[1];
      return {
        name: col,
        data: props.time
          .map((t, i) => [t, props.data[i][col]])
          .filter((data, i) => i % rate === 0 && !isNaN(data[1])),
      };
    });

  const constructOptions = (id, showMarker) => {
    return {
      chart: {
        id: id,
        group: 'dfdr',
        type: 'line',
        offsetY: -40 * (id - 1),
        zoom: {
          enabled: true,
          type: 'xy',
          autoScaleYaxis: true,
        },
        events: {
          zoomed: function (chartContext, { xaxis, yaxis }) {
            setXAxis(xaxis);
            let newYAxis = [...yAxis];
            if (yaxis === undefined) {
              newYAxis.fill(undefined);
            } else {
              newYAxis[id - 1] = { min: yaxis[0].min, max: yaxis[0].max };
            }
            setYAxis(newYAxis);
          },
        },
        toolbar: {
          show: id === 1,
        },
      },
      yaxis: {
        labels: {
          minWidth: 40,
          maxWidth: 40,
        },
        decimalsInFloat: 3,
        min: function (min) {
          return yAxis[id - 1] === undefined
            ? Math.floor(min / 10) * 10
            : yAxis[id - 1].min;
        },
        max: function (max) {
          return yAxis[id - 1] === undefined
            ? Math.ceil(max / 10) * 10
            : yAxis[id - 1].max;
        },
      },
      xaxis: {
        type: 'datetime',
        labels: {
          show: id === props.columnsList.length,
          formatter: function (val, timestamp) {
            return moment(new Date(timestamp)).format('HH:mm:ss');
          },
        },
        min: xAxis.min,
        max: xAxis.max,
      },
      legend: {
        show: true,
        showForSingleSeries: true,
      },
      stroke: {
        width: 1,
      },
      theme: {
        palette: palettes[(id - 1) % 10],
      },
      dataLabels: {
        enabled: false,
        enabledOnSeries: [0],
        formatter: function (val, opt) {
          return props.data[opt.dataPointIndex]['Comments'];
        },
      },
      markers: {
        size: showMarker ? 2 : 0,
        strokeWidth: 0,
      },
    };
  };

  return (
    <div>
      {props.columnsList.map((columns, i) => {
        return (
          <Chart
            key={generateID(i)}
            series={constructSeries(columns)}
            options={constructOptions(i + 1, props.showMarker)}
            height={
              (Math.floor(props.columnsList.length / 4) * 100 + 500) /
              props.columnsList.length
            }
          />
        );
      })}
    </div>
  );
}

export default DFDRChart;
