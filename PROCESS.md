# Process - Programming Project - UvA
Name: Romy Ho<br>
Student number: 11007303
Minor Programming

## Week 1
### 07-01
README.md is done. Downloaded data, made a python script to convert the csv file to  json.

### 08-01
Started working on the DESIGN.md document. The document contains the data source, diagram of technical components, visualization page sketch, description and implementation and external components.

### 09-01
Started with the first HTML page, making a nav-bar, a background image. Making a json file for only two currencies, because it contains a lot of data. The convert file will now only select the first 3987 rows.

### 10-01
Started with making a bubble chart and reading the json file. Making a dictionary of the data, with own format. Made visualization.html and the css file. Added the d3-tip.js file for the bubblechart tooltip.


### 11-01
Append more variables for the bubble chart, like closing rate and ranking. Use a tooltip when mouseover and show currency name, market value, current price and ranking.


### 14-01
Started with the streamgraph, the example is made in d3 v2. Copy example code, change d3 v2 functions to v5 functions. Stack and nest functions don't work in v5! [streamgraph example](http://bl.ocks.org/WillTurman/4631136)


### 15-01
Made a mainChart.js to read json file, and maked a useable dictionary. In this file the functions to make  graphs and chart will be called.

### 17-01
When on click bubble chart, update stream graph. Add streamgraph styling to css file. Make STYLE.md during team meeting.

### 18-01
Changed input data for streamgraph, make a dictionary format like the example format. Import d3 v2 and v5, select d3 v2 as d3v2. Use d3v2 for stack and area, the data format is already nested.


### 21-01
Changed README.md language to english. Make a time slider for the bubble chart with playbutton. Add update stream and update bubble function.


### 22-01
Made a new json file, with only the currencie names and begin dates that the dataset contains.

### 23-01
Make Scatterplot with ranking and begin date for each currency. With the new json file, update stream graph when clicked on scatterplot.

### 25-01
Maked a title that changes when clicked on scatterplot or bubble chart and a dropdown. Titles for all visualizations

### 28-01
Make bootstrap styling for html visualization page, add rows and columns with id's. Change javascript class names to the new id names. Got a API, to show news items specified for currency names.


### 29-01
Make final changes to html pages, add backgrounds, locations for tips, graphs etc. Made the additional information page.

### 30-1
Delete all console.log lines, add comment lines.
