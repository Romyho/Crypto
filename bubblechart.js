/* bubbleChart.js
*
* Romy Ho
*
* 11007303
*
* Programmeerproject
*
* A javascript file, making a bubble chart
*
*/

window.onload = function() {
  // console.log('ja')
  var data = $.getJSON("crypto-markets.json", function(respons) {

  var cryptoData = respons

  var crypto = {};
  var dates = {};
  var total = {};
  var high = [];
  var low = [];
  var open = [];
  var close = [];
  var market = [];
  var symbol = [];
  var ranking = [];
  var name = [];
  var date =[];

  for (j in cryptoData){
    high.push(cryptoData[j].high)
    low.push(cryptoData[j].low)
    open.push(cryptoData[j].open)
    close.push(cryptoData[j].close)
    market.push(cryptoData[j].market)
    symbol.push(cryptoData[j].symbol)
    ranking.push(cryptoData[j].ranknow)
    name.push(cryptoData[j].name)
    date.push(cryptoData[j].date)
  }

  for ( i in cryptoData){

      crypto[cryptoData[i].name]={'info':{'symbol':symbol[i], 'ranking': ranking[i]}, 'dates':{} }
    }
    for ( j in cryptoData){
      for(k in crypto){

        if (cryptoData[j].name == k){
          crypto[k].dates[cryptoData[j].date]={'high':high[j], 'low':low[j], 'open':open[j], 'close':close[j], 'market':market[j]}
        }
      }
    }
    bubble('2018-11-28', crypto)
      // console.log(crypto)
function bubble(datum,crypto){
  var diameter = 600;
  var color = d3.scaleOrdinal()
                      .domain(crypto)
                      .range(['#9e0142','#d53e4f','#f46d43','#fdae61','#fee08b','#e6f598','#abdda4','#66c2a5','#3288bd','#5e4fa']);

  var market = []
  for (i in crypto){
       for (j in crypto[i].dates){
         if(j == datum)
             market.push([crypto[i].info.symbol,crypto[i].dates[j].market])
           }
         }


  var data = {'children':market}

  var bubble = d3.pack(data)
      .size([diameter, diameter])
      .padding(1.5);

  var svg = d3.select("body")
      .append("svg")
      .attr("width", diameter)
      .attr("height", diameter)
      .attr("class", "bubble");

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
        // console.log(d)
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
          });
  //
  node.append("text")
      .attr("dy", ".2em")
      .style("text-anchor", "middle")
      .text(function(d) {
          return d.data[0].substring(0, d.r / 3);
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", function(d){
          return d.r/5;
      })
      .attr("fill", "white");

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
      .attr("fill", "white");

  d3.select(self.frameElement)
      .style("height", diameter + "px");

      // scale x and y axis
     //  var xScale = d3.scaleOrdinal()
     //  .domain()
     //  .range(pad);
     //
     // var yScale = d3.scaleLinear()
     //    .domain([d3.min(values)-0.5, d3.max(values)+0.5])
     //    .range([height, padding]);
}

  });
}
