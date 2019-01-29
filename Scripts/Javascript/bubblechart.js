/*
* bubblechart.js
*
* Romy Ho
*
* 11007303
*
*
*
* A javascript file, selects data and makes bubble chart.
*/

// makes a dictionary usable to make a bubble chart
function bubbleData(crypto, datum){

  var market = []
  var date = []

  // selects variables and makes a dictionary
  for (i in crypto){
       for (j in crypto[i].dates){
         date.push(j)
         if(j == datum){
             market.push([crypto[i].info.symbol,crypto[i].dates[j].market,crypto[i].dates[j].close,crypto[i].info.ranking, i, crypto[i].info.begin, crypto[i].info.name])
           }
         }
       }

  var data = {'children':market}
  bubble(data,crypto,date)
}

// makes bubble chart
function bubble(data,crypto,date){
  var diameter = 400

  // make tooltip
  var tooltip = d3.select(".tipBubble")

  tooltip.html("<FONT SIZE='5'> Bubble information <br></FONT>"+ "<br>" +" <strong>Currency: <br></strong>" + "<strong>Market value: <br></strong> " + "<strong>Current price: <br></strong>" + "<strong>Begin date: <br></strong>"+ "<strong>Ranking: <br></strong>")


  // give colors to domain
  var color = d3.scaleOrdinal()
                      .domain(data)
                      .range(['#9e0142','#d53e4f','#f46d43','#fdae61','#fee08b','#e6f598','#abdda4','#66c2a5','#3288bd','#5e4fa']);

  // makes bubble
  var bubble = d3.pack(data)
      .size([diameter, diameter])
      .padding(1.5);

  // make svg for bubble chart
  var svg = d3.select("#bubble-column")
      .append("svg")
      .attr("width", diameter)
      .attr("height", diameter)
      .attr("class", "bubbles");

  // make nodes with the data and append to svg
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
      })

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
              tooltip.style("visibility", "visible")
                     .html("<FONT SIZE='5'> Bubble information <br></FONT>"+ "<br>" +"<strong>Currency: </strong><span class='details'>" + d.data[4] + "<br></span>" + "<strong>Market value: </strong><span class='details'>" +  '$'+ (d.data[1]).toLocaleString()  + "<br></span>" + "<strong>Current price: </strong><span class='details'>" + '$'+ d.data[2] + "<br></span>" + "<strong>Begin date: </strong><span class='details'>" + d.data[5]+"<br></span>"+ "<strong>Ranking: </strong><span class='details'>" + d.data[3]+"<br></span>")
            d3.select(this)
              .style("stroke","white")
              .style("stroke-width",3)
          })
          .on('mouseout', function(d){
           tooltip.html("<FONT SIZE='5'> Bubble information <br></FONT>"+ "<br>" +"<strong>Currency: <br></strong>" + "<strong>Market value: <br></strong> " + "<strong>Current price: <br></strong>" + "<strong>Begin date: <br></strong>"+ "<strong>Ranking: <br></strong>")
            d3.select(this)
              .style("stroke","white")
              .style("stroke-width",0.3);
          })
          .on('click', function(d){
            updateAll(d.data[4], d.data[6], crypto)
      } );

  node.append("text")
      .attr("dy", ".2em")
      .text(function(d) {
          return d.data[0].substring(0, d.r / 3);
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", function(d){
          return d.r/5;
      })
      .attr("fill", "white")
      .on('mouseover',function(d){
          tooltip.style("visibility", "visible")
                 .html("<FONT SIZE='5'> Bubble information <br></FONT>"+ "<br>" +"<strong>Currency: </strong><span class='details'>" +    d.data[4] + "<br></span>" + "<strong>Market value: </strong><span class='details'>" + '$'+ (d.data[1]).toLocaleString() + "<br></span>" + "<strong>Current price: </strong><span class='details'>" + '$'+ d.data[2] + "<br></span>" + "<strong>Begin date: </strong><span class='details'>" + d.data[5]+"<br></span>"+ "<strong>Ranking: </strong><span class='details'>" + d.data[3]+"<br></span>")
      })
      .on('mouseout', function(d){
       tooltip.html("<FONT SIZE='5'> Bubble information <br></FONT>"+ "<br>" +"<strong>Currency: <br></strong>" + "<strong>Market value: <br></strong> " + "<strong>Current price: <br></strong>" + "<strong>Begin date: <br></strong>"+ "<strong>Ranking: <br></strong>")
      })
      .on('click', function(d){
        updateAll(d.data[4], d.data[6], crypto)
  } );


  node.append("text")
      .attr("dy", "1.3em")
      .text(function(d) {
        var number = d.data[1]/1000000
          return  number.toFixed(1) + "M";
      })
      .attr("font-family",  "Gill Sans", "Gill Sans MT")
      .attr("font-size", function(d){
          return d.r/5;
      })
      .attr("fill", "white")
      .on('mouseover',function(d){
          tooltip.style("visibility", "visible")
                 .html("<FONT SIZE='5'> Bubble information <br></FONT>"+ "<br>" +"<strong>Currency: </strong><span class='details'>" +    d.data[4] + "<br></span>" + "<strong>Market value: </strong><span class='details'>" + '$'+ (d.data[1]).toLocaleString()+ "<br></span>" + "<strong>Current price: </strong><span class='details'>" + '$' + d.data[2] + "<br></span>" + "<strong>Begin date: </strong><span class='details'>" + d.data[5]+"<br></span>"+ "<strong>Ranking: </strong><span class='details'>" + d.data[3]+"<br></span>")
      })
      .on('mouseout', function(d){
       tooltip.html("<FONT SIZE='5'> Bubble information </FONT>"+"<br>" +"<strong>Currency: <br></strong>" + "<strong>Market value: <br></strong> " + "<strong>Current price: <br></strong>" + "<strong>Begin date: <br></strong>"+ "<strong>Ranking: <br></strong>")
      })
      .on('click', function(d){
        updateAll(d.data[4], d.data[6], crypto)
  } );



     d3.select(self.frameElement)
         .style("height", diameter + "px");


}

// function to update graphs on click
function updateAll(name, name2, crypto){
  updateStream(name, crypto)
  updateNews(name2)
  changeDropdown(name)
  titleUpdate(name)
  ShowDiv()
}
