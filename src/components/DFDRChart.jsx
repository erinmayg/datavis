import React from 'react';
import Chart from 'react-apexcharts';
import moment from 'moment';

function DFDRChart(props) {
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

  const constructOptions = (id, showMarker, syncCharts) => {
    return {
      chart: {
        id: id,
        group: syncCharts ? 'dfdr' : null,
        type: 'line',
        zoom: {
          enabled: true,
          type: syncCharts ? 'x' : 'xy',
          autoScaleYaxis: !syncCharts,
        },
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
            options={constructOptions(
              i + 1,
              props.showMarker,
              props.syncCharts
            )}
            height={500 / props.columnsList.length}
          />
        );
      })}
    </div>
  );
}

export default DFDRChart;
