/*
* scatterplot.js
*
* Romy Ho
*
* 11007303
*
*
* A javascript file, that makes a scatterplot with d3.
*/

// make scatterplot
function scatterPlot(crypto){

// make tooltip
var tooltip = d3.selectAll("#tipScatter")
                .append("div")
                .attr("class", "tipScat")


tooltip.html("<FONT SIZE='5'> Point information <br></FONT>"+ "<br>"
+"<strong>Currency: </strong><span class='details'>"  + "<br></span>"
+ "<strong>Ranking: </strong><span class='details'>" +  "<br></span>"
+ "<strong>Begin datum: </strong><span class='details'>" + "<br></span>" )
   .style("visibility", "visible")

// make data lists
var name = []
var date = []
var ranking = []
var slug =[]

for (i in crypto){
  name.push(i)
  date.push(crypto[i].info.begin)
  ranking.push(crypto[i].info.ranking)
  slug.push(crypto[i].info.name)
  }



   // colors for data points showing the data
   const colors = d3.scaleOrdinal()
                       .domain(name)
                       .range(['#9e0142','#d53e4f','#f46d43','#fdae61', '#fee08b', '#e6f598','#abdda4','#66c2a5','#3288bd','#5e4fa']);


   // make coordinates of the data
   data = [date, ranking];
   var dataset = [];
   for (i in date){
     dataset.push([date[i], ranking[i], name[i], slug[i]]);
   }



   // screen margins, height, width and padding
   margin = {top: 30, right: 260, bottom: 50, left: 70},
       width = 800 - margin.left ,
       height = 600 - margin.top - margin.bottom,
       padding = 40;


   // scale x and y axis
   var xScale = d3.scaleTime()
    .domain([(new Date(date[0])), (new Date(date[8]))])
	  .range([padding+10, width- padding * 3]);

	 var yScale = d3.scaleLinear()
			.domain([d3.min(ranking), d3.max(ranking)])
			.range([height - padding, padding]);


    // create axis
	 var xAxis = d3.axisBottom().scale(xScale).ticks(10);
	 var yAxis = d3.axisLeft().scale(yScale).ticks(10);

   // make svg
	 var svg = d3.select("#scatter")
		     .append("svg")
		     .attr("width", width)
		     .attr("height", height)
         .attr('class', 'scatterPlot')

         // make x axis and y axis
         svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (height - padding) + ")")
            .call(xAxis);

         svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + (padding+10) + ", 0)")
            .call(yAxis);

    // make scatterpoints
		svg.selectAll("circle")
		 .data(dataset)
		 .enter()
		 .append("circle")
		 .attr("cx", function(d) {
			return xScale(new Date(d[0]));
		  })
		 .attr("cy", function(d) {
			 return yScale(d[1]);
		  })
		 .attr("r", 5)
       		.style("fill", function(d){
         return colors(d[2])
        })
        // show info when mouse over
        .on('mouseover',function(d){
          tooltip.style("left", (d3.event.pageX) + -30 + "px")
                 .style("top", (d3.event.pageY) + 15 + "px")
                 .html(" <FONT SIZE='5'>Point information <br></FONT>" + "<br>"
                 +"<strong>Currency: </strong><span class='details'>" +  d[2]
                 + "<br></span>" + "<strong>Ranking: </strong><span class='details'>"
                  + d[1] + "<br></span>" +
                   "<strong>Begin datum: </strong><span class='details'>" +
                    d[0] + "<br></span>" )
                 .style("visibility", "visible")

          d3.select(this)
            .style("stroke","white")
            .style("stroke-width",3)
        })
        // hide info when mouse out
        .on('mouseout', function(d){
          tooltip.html("<FONT SIZE='5'> Point information <br></FONT>"+ "<br>"
          +"<strong>Currency: </strong><span class='details'>"  + "<br></span>"
           + "<strong>Ranking: </strong><span class='details'>" +  "<br></span>"
            + "<strong>Begin datum: </strong><span class='details'>" +
            "<br></span>" )
             .style("visibility", "visible")
          d3.select(this)
            .style("stroke","white")
            .style("stroke-width",0.3);


        })
        // make streamgraph for currency
        .on('click', function(d){
          updateAll(d[2], d[3], crypto)

        })

 }


// change screen to new location
 function ShowDiv() {
   window.scrollTo(0,1000);
}
