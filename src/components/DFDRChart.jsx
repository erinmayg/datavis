import React, { useState } from 'react';
import DFDRTable from './DFDRTable';
import Chart from 'react-apexcharts';
import moment from 'moment';
import { ReactComponent as RemoveButton } from '../svg/remove.svg';
import { ReactComponent as ExpandButton } from '../svg/expand.svg';
import PDFDownloadButton from './PDFDownloadButton';

function DFDRChart(props) {
  const [xAxis, setXAxis] = useState(() => {
    return {
      min: props.time[0],
      max: props.time[props.time.length - 1],
    };
  });

  const [yAxis, setYAxis] = useState([]);
  const [selectedGraph, setSelectedGraph] = useState(1);
  const [selectedPoint, setSelectedPoint] = useState();
  const [selectedRow, setSelectedRow] = useState();

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

  const constructSeries = (columns) =>
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

  const constructOptions = (id, showMarker, setSelectedPoint) => {
    return {
      chart: {
        id: id,
        group: 'dfdr',
        type: 'line',
        animations: {
          enabled: true,
          dynamicAnimation: {
            enabled: false,
          },
        },
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
            } else if (yaxis.min !== undefined && yaxis.max !== undefined) {
              newYAxis[id - 1] = { min: yaxis[0].min, max: yaxis[0].max };
            }
            setYAxis(newYAxis);
          },
          markerClick: function (
            event,
            chartContext,
            { seriesIndex, dataPointIndex, config }
          ) {
            if (!event.ctrlKey) return;
            if (selectedGraph !== id) return;
            let i = id - 1;
            let [col, rate] = props.columnsList[i][seriesIndex];
            let row = dataPointIndex * rate;
            let xVal = props.time[row];
            let yVal = props.data[row][col];
            setSelectedPoint(xVal, yVal, row);
          },
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
      },
      markers: {
        size: showMarker ? 2 : 0,
        strokeWidth: 0,
      },
    };
  };

  return (
    <div>
      {/* {selectedPoint && (
        <div>
          Graph: {selectedGraph} x: {selectedPoint.x} y: {selectedPoint.y}
        </div>
      )} */}
      {selectedRow && (
        <div className='flex center'>
          <DFDRTable
            row={selectedRow}
            data={props.data
              .slice(props.skipRow)
              .filter((_, i) => i >= selectedRow - 20 && i <= selectedRow + 10)}
            allColumns={props.allColumns}
          />
          <RemoveButton
            onClick={() => {
              setSelectedPoint();
              setSelectedRow();
            }}
          />
        </div>
      )}
      {props.columnsList.length > 0 && (
        <PDFDownloadButton rootElementId='dfdr-charts' />
      )}
      <div id='dfdr-charts'>
        {props.columnsList.map((columns, i) => {
          return (
            <div
              className='resize'
              style={{ height: 500 / props.columnsList.length }}
              onDrag={console.log('i')}
            >
              <Chart
                className='chart'
                key={generateID(i)}
                series={constructSeries(columns)}
                options={constructOptions(
                  i + 1,
                  props.showMarker,
                  (x, y, row) => {
                    setSelectedPoint({
                      x: moment(new Date(x)).format('HH:mm:ss'),
                      y: y,
                    });
                    setSelectedRow(row);
                  }
                )}
                height='100%'
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DFDRChart;
