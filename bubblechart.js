

function bubbleData(crypto, datum){
  // console.log('new data');
  // console.log(datum);
  var market = []
  var date = []
// console.log(crypto);
  for (i in crypto){
       for (j in crypto[i].dates){
         date.push(j)
         // console.log(crypto[i].dates)
         if(j == datum){
         // console.log(i);
         // console.log(datum);
             market.push([crypto[i].info.symbol,crypto[i].dates[j].market,crypto[i].dates[j].close,crypto[i].info.ranking, i])
           }
         }
       }


  var data = {'children':market}
  // console.log(data);
  bubble(data,crypto,date)

}
function bubble(data,crypto,date){


  // console.log(datum);
  var diameter = 600
  // Set tooltips
  var tip = d3.tip()
              .attr('class', 'd3-tip')
              .offset([-20,100])
              .html(function(d) {
                return "<strong>Currency: </strong><span class='details'>" +    d.data[4] + "<br></span>" + "<strong>Market value: </strong><span class='details'>" + d.data[1] + "<br></span>" + "<strong>current price: </strong><span class='details'>" + d.data[2] + "<br></span>" + "<strong>Ranking: </strong><span class='details'>" + d.data[3]+"<br></span>";
              })

  var color = d3.scaleOrdinal()
                      .domain(data)
                      .range(['#9e0142','#d53e4f','#f46d43','#fdae61','#fee08b','#e6f598','#abdda4','#66c2a5','#3288bd','#5e4fa']);

// console.log(crypto)
  var bubble = d3.pack(data)
      .size([diameter, diameter])
      .padding(1.5);

  var svg = d3.select(".bubble")
      .append("svg")
      .attr('transform', 'translate(150,30)')
      .attr("width", diameter)
      .attr("height", diameter)
      .attr("class", "bubbles");


  svg.call(tip)


  var nodes = d3.hierarchy(data)
                .sum(function(d){
                      return d[1]})

  var node = svg.selectAll(".node")
      .data(bubble(nodes).descendants())
      .enter()
      .filter(function(d){
          return  !d.children
      })
      .append("g")
      .attr("class", "node")
      .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
      });

      node.append("title")
          .text(function(d) {
                      return d.data[0] + ": " + d.data[1]
          });

      node.append("circle")
          .attr("r", function(d) {
              return d.r;
          })
          .style("fill", function(d,i) {
              return color(i);
          })
          .on('mouseover',function(d){
            tip.show(d);

            d3.select(this)
              .style("stroke","white")
              .style("stroke-width",3);
          })
          .on('mouseout', function(d){
            tip.hide(d);

            d3.select(this)
              .style("stroke","white")
              .style("stroke-width",0.3);


          })
          .on('click', function(d){
            // console.log(d.data[4])

            updateStream(d.data[4], crypto)
      } );
  //
  node.append("text")
      .attr("dy", ".2em")
      .style("text-anchor", "middle")
      .text(function(d) {
        // console.log(d);
          return d.data[0].substring(0, d.r / 3);
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", function(d){
          return d.r/5;
      })
      .attr("fill", "white")
      .on('mouseover',function(d){
        tip.show(d);
      })
      .on('mouseout', function(d){
        tip.hide(d);
      });



  node.append("text")
      .attr("dy", "1.3em")
      .style("text-anchor", "middle")
      .text(function(d) {
          return d.data[1];
      })
      .attr("font-family",  "Gill Sans", "Gill Sans MT")
      .attr("font-size", function(d){
          return d.r/5;
      })
      .attr("fill", "white")
      .on('mouseover',function(d){
        tip.show(d);

      })
      .on('mouseout', function(d){
        tip.hide(d);

      });

     d3.select(self.frameElement)
         .style("height", diameter + "px");



}

function timeSlider(startDate, endDate, crypto){
  // console.log(crypto);

  var formatDateIntoYear = d3.timeFormat("%Y");
  var formatDate = d3.timeFormat("%d %b %Y");
  // var inverParse = d3.invert(endDate)

// console.log(inverParse);
// console.log(dataTime.length);
var margin = {top:50, right:50, bottom:0, left:50},
    width = 960 - margin.left - margin.right,
    height = 100 - margin.top - margin.bottom;

var svg = d3.select("#vis")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

////////// slider //////////

var moving = false;
var currentValue = 0;
var targetValue = width;

var playButton = d3.select("#play-button");

var x = d3.scaleTime()
    .domain([startDate, endDate])
    .range([0, targetValue])
    .clamp(true);

var slider = svg.append("g")
    .attr("class", "slider")
    .attr("transform", "translate(" + margin.left + "," + height + ")");

slider.append("line")
    .attr("class", "track")
    .attr("x1", x.range()[0])
    .attr("x2", x.range()[1])
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-inset")
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-overlay")
    .call(d3.drag()
        .on("start.interrupt", function() { slider.interrupt(); })
        .on("start drag", function() {
          currentValue = d3.event.x;
          updateBubble(x.invert(currentValue),crypto);
          // console.log(x.invert(currentValue));
        })
    );

slider.insert("g", ".track-overlay")
    .attr("class", "ticks")
    .attr("transform", "translate(0," + 18 + ")")
  .selectAll("text")
    .data(x.ticks(10))
    .enter()
    .append("text")
    .attr("x", x)
    .attr("y", 10)
    .attr("text-anchor", "middle")
    .text(function(d) { return formatDateIntoYear(d); });

var handle = slider.insert("circle", ".track-overlay")
    .attr("class", "handle")
    .attr("r", 9);

var label = slider.append("text")
    .attr("class", "label")
    .attr("text-anchor", "middle")
    .text(formatDate(startDate))
    .attr("transform", "translate(0," + (-25) + ")")


  playButton
    .on("click", function() {
    var button = d3.select(this);
    if (button.text() == "Pause") {
      moving = false;
      clearInterval(timer);
      // timer = 0;
      button.text("Play");
    } else {
      moving = true;
      timer = setInterval(step, 200);
      button.text("Pause");
    }
    console.log("Slider moving: " + moving);
  })



function step() {
  updateBubble(x.invert(currentValue),crypto);
  currentValue = currentValue + (targetValue/151);
  if (currentValue > targetValue) {
    moving = false;
    currentValue = 0;
    clearInterval(timer);
    // timer = 0;
    playButton.text("Play");
    console.log("Slider moving: " + moving);
  }
}


// console.log(crypto);
function updateBubble(h) {
  d3.selectAll('.bubbles').remove()
  // console.log(dataset);
  // update position and text of label according to slider scale
  handle.attr("cx", x(h));
  label
    .attr("x", x(h))
    .text(formatDate(h));
  var parseDate = d3.timeFormat("%Y-%m-%d")
  h = parseDate(h);

  bubbleData(crypto, h);
  // console.log(data);
}

}

function updateStream(currency,crypto){

  d3.selectAll('.streamgraph').remove()
  chart(crypto[currency], "orange")
  // var svg =  d3.select(".streamgraph").transition()
  // //
  // //                       svg2.select(".layer")
  //                       .duration(200)
  //                       .attr("d",node(dataset_new))

}
