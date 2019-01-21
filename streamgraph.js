var datearray = [];
var colorrange = [];
// var dataa = []

function chart(data, color, date) {
  console.log(data);

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


      datum = data.dates

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

  var svg = d3v2.select(".chart").append("svg")
      .attr('class', 'streamgraph')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + 50 + "," + margin.top/2 + ")");

      var stack = d3v2.layout.stack()
        .offset("silhouette")
        .values(function(d) { return d.values; })
        .x(function(d) { return d.date; })
        .y(function(d) { return d.value; });

        var layers = stack((superlijst));



    var areaK = d3v2.svg.area()
        .interpolate("cardinal")
        .x(function(d) { return x(d.date); })
        .y0(function(d) { return y(d.y0); })
        .y1(function(d) { return y(d.y0 + d.y); });


// console.log(superlijst)
var value = []
for (i in superlijst){
  for (j in superlijst[i]){
    for(k in superlijst[i][j]){
          value.push(superlijst[i][j][k].value);
    }

  }
}
y.domain([0, d3.max(value)]);

svg.selectAll(".layer")
    .data(layers)
  .enter().append("path")
    .attr("class", "layer")
    .attr("d", function(d) {
      return areaK(d.values); })
    .style("fill", function(d, i) { return z(i); });


      svg.selectAll("streamgraph")
        .append("g")
          .attr("class", "x axis")
          // .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      //     // console.log(xAxis)
      //
      // svg.append("g")
      //     .attr("class", "y axis")
      //     .attr("transform", "translate(" + width + ", 0)")
      //     .call(yAxis.orient("right"));
      //
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

      //   .on("mousemove", function(d, i) {
      //     mousex = d3v2.mouse(this);
      //     mousex = mousex[0];
      //     var invertedx = x.invert(mousex);
      //     invertedx = invertedx.getMonth() + invertedx.getDate();
      //     var selected = (d.values);
      //     for (var k = 0; k < selected.length; k++) {
      //       datearray[k] = selected[k].date
      //       datearray[k] = datearray[k].getMonth() + datearray[k].getDate();
      //     }
      //
      //     mousedate = datearray.indexOf(invertedx);
      //     console.log(mousedate);
      //     pro = d.values[mousedate].value;
      //     // console.log(pro)
      //
      //     d3.select(this)
      //     .classed("hover", true)
      //     .attr("stroke", strokecolor)
      //     .attr("transform", "translate(" + 50 + "," + 1000 + ")")
      //     .attr("stroke-width", "0.5px"),
      //     tooltip.html( "<p>" + d.key + "<br>" + pro + "</p>" ).style("visibility", "visible")
      //
      //
      //   })
      //   .on("mouseout", function(d, i) {
      //    svg.selectAll(".layer")
      //     .transition()
      //     .duration(250)
      //     .attr("opacity", "1");
      //     d3.select(this)
      //     .classed("hover", false)
      //     .attr("stroke-width", "0px"), tooltip.html( "<p>" + d.key + "<br>" + pro + "</p>" ).style("visibility", "hidden");
      // })
      //
      // var vertical = d3v2.select(".chart")
      //       .append("div")
      //       .attr("class", "remove")
      //       .style("position", "absolute")
      //       .style("z-index", "19")
      //       .style("width", "1px")
      //       .style("height", "380px")
      //       .style("top", "10px")
      //       .style("bottom", "30px")
      //       .style("left", "0px")
      //       .style("background", "#fff");
      //
      // d3v2.select(".chart")
      //     .on("mousemove", function(){
      //        mousex = d3v2.mouse(this);
      //        mousex = mousex[0] + 5;
      //        vertical.style("left", mousex + "px" )})
      //     .on("mouseover", function(){
      //        mousex = d3v2.mouse(this);
      //        mousex = mousex[0] + 5;
      //        vertical.style("left", mousex + "px")});
}
