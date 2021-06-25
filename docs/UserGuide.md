# User Guide

This is a user guide to use the [DFDR Data Visualisation App](https://erinmayg.github.io/datavis)

The app is built using React.js and [Apexcharts](https://github.com/apexcharts/react-apexcharts)

## Table of Contents

1. [Getting Started](#getting-started)
   1. [Prepping the file](#1-prepping-the-file)
   1. [Uploading the file](#2-uploading-the-file)
   1. [Plotting the graphs](#3-plotting-the-graphs)
1. [Features](#features)

## Getting Started

### 1. Prepping the file

Please ensure that the file to be processed is an Excel Workbook (i.e. has a file extension of `.xls` or `.xlsx`).

The requirements for the data to be processed correctly is as follows:

- The first row of each Excel Sheet in the file is the name of the parameters
- There needs to be one time column in each Excel sheet with the format of `HH:mm:ss` _**or**_ `HH:mm`
  - In the event that there is no column that follows the given format, the X-axis displayed in the graph will simply be a numeric value from `1 ... n` where `n` is the number of data points.

### 2. Uploading the file

Click on the `Browse` button and choose a file to process.

<img src="https://user-images.githubusercontent.com/60438326/122011046-4b0d3780-cdee-11eb-8126-9a01f5ee6f38.png" width="500" alt="Browse File"/>
 
### 3. Plotting the graphs
1. Choose a sheet to display the data from
 
  <img src="https://user-images.githubusercontent.com/60438326/122012385-b1468a00-cdef-11eb-89cd-5a880a3ab3c5.png" width="500" alt="Choose Sheet"/>
4. Choose the columns to display in the graph

  <div>
    <img src="https://user-images.githubusercontent.com/60438326/122015472-b5c07200-cdf2-11eb-9ca5-40dbac0133f3.gif" height="300" alt="Choose columns"/>
    <img src="https://user-images.githubusercontent.com/60438326/122019392-4cdaf900-cdf6-11eb-9db2-37f5947e4e70.png" height="300" alt="Column Info"/>
  </div>

Icons inside the box are to add/remove columns <br/>
Icons outside the box are to add/remove graphs

## Features

- Plot multiple parameters in the same graph

- Auto-differentiate colours

  <img src="https://user-images.githubusercontent.com/60438326/122020530-6c265600-cdf7-11eb-8a5f-f93f93ad3fbd.gif" width="500" alt="Color Graph"/>

- Synced interaction across multiple graphs

  - Zooming

    Zooming is _independent_ across y-axis but _synced_ for x-axis (i.e. When zooming-in on a graph, the x-axis for all other graphs changes but the y-axis is only changed on the graph you're interacting with)

  - Panning

    Move across the x-axis on all graphs

  <img src="https://user-images.githubusercontent.com/60438326/122020909-c32c2b00-cdf7-11eb-8881-fd52f0e41f1f.gif" width="500" alt="Synced Interaction"/>

- Show table

  `Ctrl + Click` on any point in the graph to show the data points prior and post the clicked data point. <br/>
  You can modify the data points shown.

  <img src="https://user-images.githubusercontent.com/60438326/122021967-be1bab80-cdf8-11eb-98bb-b99adf1c54a7.png" width="500" alt="Show Table"/>

- Annotate on graph

  `Alt + Click` on any point in the graph to select the x and y values, type in the annotation and add it to the selected graph

- Resize graphs

  Click and drag on the selected icon (on the bottom right corner of each graph) to resize the graph

  <img src="https://user-images.githubusercontent.com/60438326/122029633-9d0a8900-cdff-11eb-8008-3523b9ebcab7.png" width="500" alt="Resize Graph"/>

- Download graph

  Click the `Download PDF` button to download _**all**_ the graphs as one PDF file.
  
  Alternatively, click the hamburger icon (the three lines) on the top left corner of each graph to download them individually as a `.png` file.
