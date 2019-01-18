var datearray = [];
var colorrange = [];
var dataa = []

function chart(data, color) {

  if (color == "blue") {
    colorrange = ["#045A8D", "#2B8CBE", "#74A9CF", "#A6BDDB", "#D0D1E6", "#F1EEF6"];
  }
  else if (color == "pink") {
    colorrange = ["#980043", "#DD1C77", "#DF65B0", "#C994C7", "#D4B9DA", "#F1EEF6"];
  }
  else if (color == "orange") {
    colorrange = ["#B30000", "#E34A33", "#FC8D59", "#FDBB84", "#FDD49E", "#FEF0D9"];
  }
  strokecolor = colorrange[0];

  var format = d3.timeFormat("%m/%d/%y");

  var margin = {top: 200, right: 400, bottom: 300, left: 300};
  var width = document.body.clientWidth - margin.left - margin.right;
  var height = 400 - margin.top - margin.bottom;

  var tooltip = d3.select("body")
      .append("div")
      .attr("class", "remove")
      .style("position", "absolute")
      .style("z-index", "20")
      .style("visibility", "hidden")
      .style("top", "30px")
      .style("left", "55px");

      var x = d3v2.time.scale()
          .range([0, width]);

      var y = d3v2.scale.linear()
          .range([height-10, 0]);

      var z = d3v2.scale.ordinal()
          .range(colorrange);

      var xAxis = d3v2.svg.axis()
          .scale(x)
          .orient("bottom")
          .ticks(d3v2.time.days);

      var yAxis = d3v2.svg.axis()
          .scale(y);

      var yAxisr = d3v2.svg.axis()
          .scale(y);



  datum = data.dates


  // console.log(keys);

  var format = d3v2.time.format("%Y-%m-%d")	;

  superlijst = [{"key": "high", "values": []}, {"key": "low", "values": []}, {"key": "open", "values": []},{"key": "close", "values": []}]

  for (d in datum){
    // console.log(datum[d]);
    superlijst.forEach(function(lijst){
      if (lijst.key == "high"){
        lijst.values.push({"key": "high", "value": datum[d]["high"], "date": new Date(d)})
      }
      else if (lijst.key == 'open') {
        lijst.values.push({"key": "open", "value": datum[d]["open"], "date": new Date(d)})
      }
      else if(lijst.key == 'low'){
        lijst.values.push({"key": "low", "value": datum[d]["low"], "date": new Date(d)})
      }
      else{
        lijst.values.push({"key": "close", "value": datum[d]["close"], "date": new Date(d)})
      }
    })
  }


  x.domain(d3.extent(superlijst[0].values, function(d) {return d.date; }));
// console.log(x(('Thu Nov 14 2013 01:00:00 GMT+0100 (Midden-Europese standaardtijd)')));

  var svg = d3v2.select(".chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + 50 + "," + margin.top/2 + ")");

      var stack = d3v2.layout.stack()
        .offset("silhouette")
        .values(function(d) { return d.values; })
        .x(function(d) { return d.date; })
        .y(function(d) { return d.value; });

        // console.log(superlijst);
        var layers = stack((superlijst));
        // console.log(layers);


    var areaK = d3v2.svg.area()
        .interpolate("cardinal")
        .x(function(d) { return x(d.date); })
        .y0(function(d) { return y(d.y0); })
        .y1(function(d) { return y(d.y0 + d.y); });

// console.log(areaK(layers[0].values));

console.log(superlijst)
var value = []
for (i in superlijst){
  for (j in superlijst[i]){
    for(k in superlijst[i][j]){
          value.push(superlijst[i][j][k].value);
    }

  }
}
  // console.log§(d3.max(value));
// x.domain(d3.extent(data, function(d) { return d.date; }));
y.domain([0, d3.max(value)]);

svg.selectAll(".layer")
    .data(layers)
  .enter().append("path")
    .attr("class", "layer")
    .attr("d", function(d) {// console.log(areaK(d.values));
      return areaK(d.values); })
    .style("fill", function(d, i) { return z(i); });
    // console.log(y(0))


      //
      // svg.append("g")
      //     .attr("class", "x axis")
      //     // .attr("transform", "translate(0," + height + ")")
      //     .call(xAxis);

          // console.log(xAxis)

      // svg.append("g")
      //     .attr("class", "y axis")
      //     .attr("transform", "translate(" + width + ", 0)")
      //     .call(yAxis.orient("right"));

      // svg.append("g")
      //     .attr("class", "y axis")
      //     .call(yAxis.orient("left"));

      svg.selectAll(".layer")
        .attr("opacity", 1)
        .on("mouseover", function(d, i) {
          svg.selectAll(".layer").transition()
          .duration(250)
          .attr("opacity", function(d, j) {
            return j != i ? 0.6 : 1;
        })})

        .on("mousemove", function(d, i) {
          mousex = d3v2.mouse(this);
          mousex = mousex[0];
          var invertedx = x.invert(mousex);
          invertedx = invertedx.getMonth() + invertedx.getDate();
          var selected = (d.values);
          for (var k = 0; k < selected.length; k++) {
            datearray[k] = selected[k].date
            datearray[k] = datearray[k].getMonth() + datearray[k].getDate();
          }

          mousedate = datearray.indexOf(invertedx);
          pro = d.values[mousedate].value;
          console.log(pro)

          d3.select(this)
          .classed("hover", true)
          .attr("stroke", strokecolor)
          .attr("stroke-width", "0.5px"),
          tooltip.html( "<p>" + d.key + "<br>" + pro + "</p>" ).style("visibility", "visible")
          // .attr("transform", "translate("100 + 0 + ", 0)");

        })
        .on("mouseout", function(d, i) {
         svg.selectAll(".layer")
          .transition()
          .duration(250)
          .attr("opacity", "1");
          d3.select(this)
          .classed("hover", false)
          .attr("stroke-width", "0px"), tooltip.html( "<p>" + d.key + "<br>" + pro + "</p>" ).style("visibility", "hidden");
      })

      var vertical = d3v2.select(".chart")
            .append("div")
            .attr("class", "remove")
            .style("position", "absolute")
            .style("z-index", "19")
            .style("width", "1px")
            .style("height", "380px")
            .style("top", "10px")
            .style("bottom", "30px")
            .style("left", "0px")
            .style("background", "#fff");

      d3v2.select(".chart")
          .on("mousemove", function(){
             mousex = d3v2.mouse(this);
             mousex = mousex[0] + 5;
             vertical.style("left", mousex + "px" )})
          .on("mouseover", function(){
             mousex = d3v2.mouse(this);
             mousex = mousex[0] + 5;
             vertical.style("left", mousex + "px")});
}

//
// function streamGraph(csvpath, color) {
//
// if (color == "blue") {
//   colorrange = ["#045A8D", "#2B8CBE", "#74A9CF", "#A6BDDB", "#D0D1E6", "#F1EEF6"];
// }
// else if (color == "pink") {
//   colorrange = ["#980043", "#DD1C77", "#DF65B0", "#C994C7", "#D4B9DA", "#F1EEF6"];
// }
// else if (color == "orange") {
//   colorrange = ["#B30000", "#E34A33", "#FC8D59", "#FDBB84", "#FDD49E", "#FEF0D9"];
// }
// strokecolor = colorrange[0];
//
// var format = d3v2.time.format("%m/%d/%y");
//
// var margin = {top: 20, right: 40, bottom: 30, left: 30};
// var width = document.body.clientWidth - margin.left - margin.right;
// var height = 400 - margin.top - margin.bottom;
//
// var tooltip = d3v2.select("body")
//     .append("div")
//     .attr("class", "remove")
//     .style("position", "absolute")
//     .style("z-index", "20")
//     .style("visibility", "hidden")
//     .style("top", "30px")
//     .style("left", "55px");
//
// var x = d3v2.time.scale()
//     .range([0, width]);
//
// var y = d3v2.scale.linear()
//     .range([height-10, 0]);
//
// var z = d3v2.scale.ordinal()
//     .range(colorrange);
//
// var xAxis = d3v2.svg.axis()
//     .scale(x)
//     .orient("bottom")
//     .ticks(d3v2.time.weeks);
//
// var yAxis = d3v2.svg.axis()
//     .scale(y);
//
// var yAxisr = d3v2.svg.axis()
//     .scale(y);
//
// var stack = d3v2.layout.stack()
//     .offset("silhouette")
//     .values(function(d) { return d.values; })
//     .x(function(d) { return d.date; })
//     .y(function(d) { return d.value; });
//
// var nest = d3v2.nest()
//     .key(function(d) { return d.key; });
//
//
// var area = d3v2.svg.area()
//     .interpolate("cardinal")
//     .x(function(d) { return x(d.date); })
//     .y0(function(d) { return y(d.y0); })
//     .y1(function(d) { return y(d.y0 + d.y); });
//
// var svg = d3v2.select(".chart").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
// var graph = d3v2.csv(csvpath, function(data) {
//   data.forEach(function(d) {
//     d.date = format.parse(d.date);
//     d.value = +d.value;
//   });
//   // console.log(dates);
//
//   console.log(data);
//
//   var layers = stack(nest.entries(data));
//   console.log(layers);
// //   console.log(layers);
// // for(i in layers){
// //   // console.log(i)
// //   for(j in layers[i]){
// //     // console.log(j)
// //     // console.log(layers[i][j])
// //   }
// //   // console.log(layers[i])
// // }
// // if(y == 0.1){
// //   console.log(y(0.1))
// // }
//
//   x.domain(d3v2.extent(data, function(d) { return d.date; }));
//   y.domain([0, d3v2.max(data, function(d) { return d.y0 + d.y; })]);
//
//   svg.selectAll(".layer")
//       .data(layers)
//     .enter().append("path")
//       .attr("class", "layer")
//       .attr("d", function(d) { return area(d.values); })
//       .style("fill", function(d, i) { return z(i); });
//
//
//   svg.append("g")
//       .attr("class", "x axis")
//       .attr("transform", "translate(0," + height + ")")
//       .call(xAxis);
//
//   svg.append("g")
//       .attr("class", "y axis")
//       .attr("transform", "translate(" + width + ", 0)")
//       .call(yAxis.orient("right"));
//
//   svg.append("g")
//       .attr("class", "y axis")
//       .call(yAxis.orient("left"));
//
//   svg.selectAll(".layer")
//     .attr("opacity", 1)
//     .on("mouseover", function(d, i) {
//       svg.selectAll(".layer").transition()
//       .duration(250)
//       .attr("opacity", function(d, j) {
//         return j != i ? 0.6 : 1;
//     })})
//
//     .on("mousemove", function(d, i) {
//       mousex = d3v2.mouse(this);
//       mousex = mousex[0];
//       var invertedx = x.invert(mousex);
//       invertedx = invertedx.getMonth() + invertedx.getDate();
//       var selected = (d.values);
//       for (var k = 0; k < selected.length; k++) {
//         datearray[k] = selected[k].date
//         datearray[k] = datearray[k].getMonth() + datearray[k].getDate();
//       }
//
//       mousedate = datearray.indexOf(invertedx);
//       pro = d.values[mousedate].value;
//
//       d3.select(this)
//       .classed("hover", true)
//       .attr("stroke", strokecolor)
//       .attr("stroke-width", "0.5px"),
//       tooltip.html( "<p>" + d.key + "<br>" + pro + "</p>" ).style("visibility", "visible");
//
//     })
//     .on("mouseout", function(d, i) {
//      svg.selectAll(".layer")
//       .transition()
//       .duration(250)
//       .attr("opacity", "1");
//       d3.select(this)
//       .classed("hover", false)
//       .attr("stroke-width", "0px"), tooltip.html( "<p>" + d.key + "<br>" + pro + "</p>" ).style("visibility", "hidden");
//   })
//
//   var vertical = d3v2.select(".chart")
//         .append("div")
//         .attr("class", "remove")
//         .style("position", "absolute")
//         .style("z-index", "19")
//         .style("width", "1px")
//         .style("height", "380px")
//         .style("top", "10px")
//         .style("bottom", "30px")
//         .style("left", "0px")
//         .style("background", "#fff");
//
//   d3v2.select(".chart")
//       .on("mousemove", function(){
//          mousex = d3v2.mouse(this);
//          mousex = mousex[0] + 5;
//          vertical.style("left", mousex + "px" )})
//       .on("mouseover", function(){
//          mousex = d3v2.mouse(this);
//          mousex = mousex[0] + 5;
//          vertical.style("left", mousex + "px")});
// });
// }
