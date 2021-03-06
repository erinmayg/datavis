import React, { useState, useEffect } from 'react';
import DFDRTable from './DFDRTable';
import PDFDownloadButton from './PDFDownloadButton';
import AnnotationsForm from './AnnotationsForm';
import Chart from 'react-apexcharts';
import ApexCharts from 'apexcharts';
import moment from 'moment';

// Displays the graphs once the User Input is filled
function DFDRChart(props) {

  /* States */

  // the graph selected for annotation
  const [selectedGraph, setSelectedGraph] = useState(1);
  // the point selected for annotation
  const [selectedPoint, setSelectedPoint] = useState();
  // the row selected to display the Preview Table
  const [selectedRow, setSelectedRow] = useState();
  // the default height of the graph
  const [height, setHeight] = useState(500 / props.columnsList.length);
  const [showTable, setShowTable] = useState(false);
  const [annotations, setAnnotations] = useState([]);

  /* Use Effects */

  useEffect(
    () => setHeight(Math.max(200, 500 / props.columnsList.length)),
    [props.columnsList.length]
  );

  useEffect(
    () =>
      [...Array(props.columnsList.length + 1).keys()].slice(1).forEach((i) =>
        ApexCharts.exec('chart' + i, 'updateOptions', {
          annotations: {
            points: annotations
              .filter((a) => a.chartID === i)
              .map((a) => {
                return {
                  x: a.x,
                  y: a.y,
                  label: {
                    text: a.note,
                    offsetY: -15,
                    borderRadius: 5,
                    borderWidth: 2,
                    style: {
                      fontSize: '1rem',
                      padding: {
                        left: 8,
                        right: 8,
                        top: 4,
                        bottom: 4,
                      },
                    },
                  },
                  marker: { size: 4 },
                };
              }),
          },
        })
      ),
    [annotations, props.columnsList, selectedRow, showTable]
  );

  /* Functions */

  // Generates a unique ID for each of the graph
  const generateID = (id) => {
    return id.toString() + new Date().getTime().toString();
  };

  // Constructs a series for the graph to read
  const constructSeries = (columns) =>
    columns.map((tuple) => {
      const col = tuple[0];
      const rate = tuple[1];
      let series = {
        name: col,
        data: props.time
          .map((t, i) => [t, props.data[i][col]])
          .filter(
            (data, i) => i % rate === 0 && data[1] !== '' && !isNaN(data[1])
          ),
      };
      console.log(series);
      return series;
    });

  const palettes = [
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

  // Constructs the default graph settings
  const constructOptions = (id, isDate, setSelectedPoint) => {
    return {
      chart: {
        id: 'chart' + id,
        group: 'dfdr',
        type: 'line',
        toolbar: {
          tools: {
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
            if (yaxis === undefined) {
              ApexCharts.exec('chart' + id, 'updateOptions', {
                yaxis: [
                  {
                    min: (min) => Math.floor(min / 10) * 10,
                    max: (max) => Math.ceil(max / 10) * 10,
                    labels: {
                      minWidth: 40,
                      maxWidth: 40,
                    },
                    decimalsInFloat: 3,
                  },
                ],
              });
            } else {
              ApexCharts.exec('chart' + id, 'updateOptions', {
                yaxis: [{ min: yaxis[0].min, max: yaxis[0].max }],
              });
            }
          },
          markerClick: function (
            event,
            chartContext,
            { seriesIndex, dataPointIndex, config }
          ) {
            if (!event.ctrlKey && !event.altKey) return;
            if (selectedGraph !== id) return;
            let i = id - 1;
            let [col, rate] = props.columnsList[i][seriesIndex];
            let row = dataPointIndex * rate;
            let xVal = props.time[row];
            let yVal = props.data[row][col];
            setSelectedPoint(xVal, yVal, row);
            if (event.ctrlKey) setShowTable(true);
          },
        },
      },
      yaxis: {
        labels: {
          minWidth: 40,
          maxWidth: 40,
        },
        decimalsInFloat: 3,
      },
      xaxis: {
        type: isDate ? 'datetime' : 'numeric',
        labels: {
          show: id === props.columnsList.length,
          formatter: (val, timestamp) =>
            isDate
              ? moment(new Date(timestamp)).format('HH:mm:ss')
              : Math.round(val),
        },
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        fontSize: '16pt',
      },
      stroke: {
        show: true,
        width: 1,
      },
      theme: {
        palette: palettes[(id - 1) % 10],
      },
      markers: {
        size: props.showMarker ? 2 : 0,
        strokeWidth: 0,
      },
    };
  };

  // Constructs the graph based on the given series and default settings
  const charts = props.columnsList.map((columns, i) => {
    return (
      <div className='resize' style={{ height: height }} key={i}>
        <Chart
          className='chart'
          key={generateID(i)}
          series={constructSeries(columns)}
          options={constructOptions(
            i + 1,
            props.time[5] instanceof Date,
            (x, y, row) => {
              setSelectedPoint({
                x: props.time[5] instanceof Date ? new Date(x).getTime() : x,
                y: y,
              });
              setSelectedRow(row);
            }
          )}
          height='100%'
        />
      </div>
    );
  });

  return (
    <div>
      <AnnotationsForm
        annotations={annotations}
        setAnnotations={setAnnotations}
        countGraph={props.columnsList.length}
        graph={selectedGraph}
        setSelectedGraph={setSelectedGraph}
        row={selectedRow}
        point={selectedPoint}
        time={props.time}
        isDate={props.time[5] instanceof Date}
      />
      {showTable && (
        <div className={'flex center'}>
          <DFDRTable
            row={selectedRow}
            skipRow={props.skipRow}
            data={props.data}
            allColumns={props.allColumns}
            removeTable={() => setShowTable(false)}
          />
        </div>
      )}
      {props.columnsList.length > 0 && (
        <PDFDownloadButton rootElementId='dfdr-charts' />
      )}
      <div id='dfdr-charts'>{charts}</div>
    </div>
  );
}

export default DFDRChart;
