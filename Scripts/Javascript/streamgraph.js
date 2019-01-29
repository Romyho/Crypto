/*
* streamgraph.js
*
* Romy Ho
*
* 11007303
*
*
*
* A javascript file, that makes a streamgraph and updates streamgraph
*/


var datearray = [];

function streamChart(data) {

    var formatDate = d3.timeFormat("%d %b %Y")

    var tooltip = d3.select(".tipStream")

  colorrange = ["#B30000", "#E34A33", "#FC8D59", "#FDBB84", "#FDD49E", "#FEF0D9"];
  strokecolor = colorrange[0];


var margin = {top: 20, right: 40, bottom: 30, left: 30};
var width = 600 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

datum = data.dates



var z = d3v2.scale.ordinal()
            .range(colorrange);

  dataset = [{"key": "low", "values": []},{"key": "close", "values": []},{"key": "open", "values": []},{"key": "high", "values": []}]

  var low = []
  var high = []
  var open = []
  var close = []
  var date = []

  for (d in datum){
    date.push(d)
    low.push(datum[d]['low'])
    open.push(datum[d]['open'])
    close.push(datum[d]['close'])
    high.push(datum[d]['high'])


    dataset.forEach(function(data){
      if (data.key == "high"){
        data.values.push({"key": "high", "value": datum[d]["high"], "date": new Date(d)})
      }
      else if (data.key == 'open') {
        data.values.push({"key": "open", "value": datum[d]["open"], "date": new Date(d)})
      }
      else if(data.key == 'low'){
        data.values.push({"key": "low", "value": datum[d]["low"], "date": new Date(d)})
      }
      else{
        data.values.push({"key": "close", "value": datum[d]["close"], "date": new Date(d)})
      }
    })
  }

  var x = d3.scaleTime()
      .range([100, width])
      .domain(d3.extent(dataset[0].values, function(d) {return d.date; }));


      var min = d3.min(low)

      var max = d3.max(high)


  var xAxis = d3.axisBottom()
                .scale(x)

  var svg = d3v2.select(".chart").append("svg")
      .attr('class', 'streamgraph')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)


      var stack = d3v2.layout.stack()
        .offset("silhouette")
        .values(function(d) { return d.values; })
        .x(function(d) { return d.date; })
        .y(function(d) { return d.value; });

        var layers = stack((dataset));

    var areaK = d3v2.svg.area()
        .interpolate("cardinal")
        .x(function(d) { return x(d.date); })
        .y0(function(d) { return y(d.y0); })
        .y1(function(d) { return y(d.y0 + d.y); });

        for(i in dataset){
          for (j in dataset[i].values){
            for(k in dataset[i].values[j]){
              if(dataset[i].values[j]["value"]== max){
                var total_max =  dataset[i].values[j]["y0"] + dataset[i].values[j]["y"]
              }
            }
          }
        }

    var y = d3.scaleLinear()
        .range([height-100, 0])
        .domain([0, total_max])


        var yAxis = d3.axisLeft()
                      .scale(y)



var layer = d3v2.select(".streamgraph").selectAll(".layer")
                .data(layers)
                .enter().append("path")
                .attr("class", "layer")
                .attr("d", function(d) {
                  return areaK(d.values); })
                .style("fill", function(d, i) { return z(i); })


  var axis = d3.select(".streamgraph")

    axis.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height)+ ")")
        .call(xAxis)
        .selectAll('text')
        .attr("transform", "translate(-20,"+20+"),rotate(-30)")

    axis.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(100," + 100+ ")")
    .call(yAxis)

      axis.selectAll(".layer")
        .attr("opacity", 1)
        .attr("transform", "translate(0," + 90+ ")")

        .on("mouseover", function(d, i) {
          axis.selectAll(".layer").transition()
          .duration(250)
          .attr("opacity", function(d, j) {
            return j != i ? 0.6 : 1;
        })})

        .on("mousemove", function(d, i) {
          mousex = d3.mouse(this);
          mousex = mousex[0];
          var invertedx = x.invert(mousex);
          var date = formatDate(invertedx);
          invertedx = invertedx.getMonth() + invertedx.getDate();
          var selected = (d.values);
          for (var k = 0; k < selected.length; k++) {
            datearray[k] = selected[k].date
            datearray[k] = datearray[k].getMonth() + datearray[k].getDate();
          }

          mousedate = datearray.indexOf(invertedx);

          pro = d.values[mousedate].value;

          d3.select(this)
          .attr("stroke-width", "0.5px"),
          tooltip
          .html( "<p>" + d.key + "<br>" + pro + "<br>" + date+"</p>").style("visibility", "visible")

        })
        .on("mouseout", function(d, i) {
         axis.selectAll(".layer")
          .transition()
          .duration(250)
          .attr("opacity", "1")

          d3.select(this)
          .attr("stroke-width", "0px"), tooltip.style("visibility", "hidden")
      })


}


function updateStream(currency,crypto){
  d3.selectAll('.streamgraph').remove()
  streamChart(crypto[currency])

}
