# Developer Guide
This is the documentation for developing the DFDR Web Application

## Table of Contents

1. [Setting up the Developer Environment](#setting-up-the-developer-environment)
    1. [Obtaining a copy of the repository](#step-1-obtaining-a-copy-of-the-repository)
    1. [Installing the necessary tools](#step-2-installing-the-necessary-tools)
1. [Developing the Code](#developing-the-code)
    1. [Quick Overview](#quick-overview)

## Setting up the Developer Environment
This is a step-by-step guide for setting up a development environment on your local machine. Using this environment, you can contribute to the project by working on features, enhancements, bug fixes, etc.

### Step 1: Obtaining a copy of the repository
1. Install Git
1. Fork the repo at https://githtub.com/erinmayg/datavis. Clone the fork to your hard disk (PC)
1. Add a remote name (e.g upstream) for your copy of the main repo. Fetch the remote-tracking branches from the main repo to keep it in sync with your copy.
    ```
    git remote add upstream https://github.com/erinmayg/datavis.git
    git fetch upstream
    ```
1. Set your master branch to track the main repo's master branch.
    ```
    git checkout master
    git branch -u upstream/master
    ```
More info regarding forking a repository can be obtained [here](https://docs.github.com/en/github/getting-started-with-github/quickstart/fork-a-repo).

### Step 2: Installing the necessary tools

1. Install the latest version of [Node.js](https://nodejs.org/en/download/).
1. Install yarn via npm package manager by opening the terminal and typing in:
     ```
     npm install --global yarn
     ```
     
More info on installing yarn can be obtained [here](https://classic.yarnpkg.com/en/docs/install).

You can now open the repository using any code editor you want and start coding!

## Developing the Code
1. Open the root folder of the cloned repository.
1. Open the terminal and run the following code:
    ```
    yarn
    yarn start
    ```
1. You can now make changes to your code and see it live in your localhost (which is usually https://localhost:3000).
    > Most likely the only changes you'll be making are in the JSX Components which are located in the `src` folder.
1. Once you're done making your changes, go to the root folder and run the following code:
    ```
    yarn build
    ```
    The changes are committed to the `build` folder and you can publish/deploy the `build` folder to the site where you host the website.
    
### Quick Overview
- `UserInput.jsx` contains the code for the process of parsing the data (i.e. the Excel file).
- `DFDRChart.jsx` contains the code for constructing the chart, which is built using ApexCharts.js.  
   The documentation for the ApexCharts library can be found [here](https://apexcharts.com/docs/installation).
- `PDFDownload.jsx` contains the code for downloading the charts as a PDF file.
- Changes in the styling of the elements can be found in the `css` folder.

More info on developing a React App can be found [here](ReactApp.md).
 

