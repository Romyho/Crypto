var datearray = [];
var colorrange = [];
//



function streamChart(data) {
  console.log(data);
    var formatDate = d3.timeFormat("%d %b %Y")
  var tooltip = d3.select("body")
      .append("div")
      .attr("class", "tipStream")
      .style("position", "absolute")
      .style("z-index", "20")
      .style("visibility", "hidden")
      // .style("top", "30px")
      // .style("left", "55px");



  colorrange = ["#B30000", "#E34A33", "#FC8D59", "#FDBB84", "#FDD49E", "#FEF0D9"];
  strokecolor = colorrange[0];


var margin = {top: 20, right: 40, bottom: 30, left: 30};
var width = document.body.clientWidth - margin.left - margin.right;
var height = 100 - margin.top - margin.bottom; //100 - margin.top - margin.bottom

datum = data.dates


var z = d3v2.scale.ordinal()
            .range(colorrange);

  dataset = [{"key": "low", "values": []},{"key": "close", "values": []},{"key": "open", "values": []},{"key": "high", "values": []}]

  var low = []
  var high = []
  var open = []
  var close = []

  for (d in datum){

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
      .range([100, width-500])
      .domain(d3.extent(dataset[0].values, function(d) {return d.date; }));


      var min = d3.min(low)

      var max = d3.max(high)

        var y = d3.scaleLinear()
            .range([height-10, 0])
            .domain([min, max]);


  var xAxis = d3.axisBottom()
                .scale(x)


  var svg = d3v2.select(".chart").append("svg")
      .attr('class', 'streamgraph')
      .attr("width", width + margin.left + margin.right)
      .attr("height", 8*height + margin.top + margin.bottom)


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




var layer = d3v2.select(".streamgraph").selectAll(".layer")
                .data(layers)
                .enter().append("path")
                .attr("class", "layer")
                .attr("transform", "translate(" + 50 + "," + 250 + ")")
                .attr("d", function(d) {
                  return areaK(d.values); })
                .style("fill", function(d, i) { return z(i); })


// console.log(xAxis);

  var axis = d3.select(".streamgraph")

    axis.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(50," + (height+300 )+ ")")
    .call(xAxis);

      axis.selectAll(".layer")
        .attr("opacity", 1)
        .on("mouseover", function(d, i) {
          // console.log(i);
          axis.selectAll(".layer").transition()
          .duration(250)
          .attr("opacity", function(d, j) {
            // console.log(j);
            // console.log(i);
            return j != i ? 0.6 : 1;
        })})

        .on("mousemove", function(d, i) {
          mousex = d3.mouse(this);
          mousex = mousex[0];
          var invertedx = x.invert(mousex);
          var date = formatDate(invertedx);
          console.log(date);
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
          tooltip.style("left", (d3.event.pageX) + -30 + "px")
          .style("top", (d3.event.pageY) + 15 + "px")

          .html( "<p>" + d.key + "<br>" + pro + "<br>" + date+"</p>").style("visibility", "visible")

        })
        .on("mouseout", function(d, i) {
          console.log(d);
         axis.selectAll(".layer")
          .transition()
          .duration(250)
          .attr("opacity", "1")
          console.log(i);
          d3.select(this)
          .attr("stroke-width", "0px"), tooltip.html( "<p>" + d.key + "<br>" + pro + "</p>" ).style("visibility", "hidden")
      })

      var vertical = d3.select(".chart")
            .append("div")
            .attr("class", "remove")
            .style("position", "absolute")
            .style("z-index", "19")
            .style("width", "1px")
            .style("height", "200px")
            .style("top", "900px")
            .style("bottom", "30px")
            .style("left", "0px")
            .style("background", "#fff")


      d3.select(".chart")
          .on("mousemove", function(){
             mousex = d3.mouse(this);
             mousex = mousex[0]-2 ;
             vertical.style("visibility", "visible")
             .style("left", mousex + "px" )})

          .on("mouseover", function(){

             mousex = d3.mouse(this);
             mousex = mousex[0] -2;
             vertical.style("visibility", "visible")
             .style("left", mousex + "px")})

          .on("mouseout",function(){
            vertical.style("visibility", "hidden")
          })


}


function updateStream(currency,crypto){

  d3.selectAll('.streamgraph').remove()
  streamChart(crypto[currency])

}
