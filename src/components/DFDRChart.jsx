import React, { useState, useEffect } from 'react';
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
  const [tableSeconds, setTableSeconds] = useState({ prior: 20, post: 20 });
  const [tableData, setTableData] = useState(() =>
    props.data
      .slice(props.skipRow)
      .filter(
        (_, i) =>
          i >= selectedRow - tableSeconds.prior &&
          i <= selectedRow + tableSeconds.post
      )
  );

  useEffect(() => {
    setTableData(
      props.data
        .slice(props.skipRow)
        .filter(
          (_, i) =>
            i >= selectedRow - tableSeconds.prior &&
            i <= selectedRow + tableSeconds.post
        )
    );
  }, [props.data, props.skipRow, tableSeconds, selectedRow]);

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
        toolbar: {
          tools: {
            zoom: id === 1,
            zoomin: false,
            zoomout: false,
            pan: id === 1,
            reset: id === 1,
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
            } else {
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
      {selectedRow && (
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
          <DFDRTable
            row={selectedRow}
            prior={tableSeconds.prior}
            data={tableData}
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
