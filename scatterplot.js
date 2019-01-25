/*
*
* Romy Ho
*
* 11007303
*
*
*
* A javascript file,
*/


function scatter(crypto){

var name = []
var date = []
var ranking = []

for (i in crypto){
  name.push(i)
  date.push(crypto[i].info.begin)
  ranking.push(crypto[i].info.ranking)
  }
  // Set tooltips
  var tip = d3.tip()
              .attr('class', 'd3-tip')
              .offset([-20,100])
              .html(function(d) {
                return "<strong>Currency: </strong><span class='details'>" +  d[2] + "<br></span>" + "<strong>Ranking: </strong><span class='details'>" + d[1] + "<br></span>" + "<strong>Begin datum: </strong><span class='details'>" + d[0] + "<br></span>" ;
              })

   // colors for data points showing the data
   const colors = d3.scaleOrdinal()
                       .domain(name)
                       .range(['#9e0142','#d53e4f','#f46d43','#fdae61','#fee08b','#e6f598','#abdda4','#66c2a5','#3288bd','#5e4fa']);

   // make coordinates of the data
   data = [date, ranking];
   var dataset = [];
   for (i in date){
     dataset.push([date[i], ranking[i], name[i]]);
   }

   // console.log(dataset);

   // screen margins, height, width and padding
   margin = {top: 30, right: 260, bottom: 50, left: 70},
       width = 1300 - margin.left - margin.right,
       height = 600 - margin.top - margin.bottom,
       padding = 40;

// console.log(d3.max(ranking));

   // scale x and y axis
   var xScale = d3.scaleTime()
    .domain([(new Date(date[0])), (new Date(date[8]))])
	  .range([padding+10, width- padding * 3]);

	 var yScale = d3.scaleLinear()
			.domain([d3.min(ranking), d3.max(ranking)])
			.range([height - padding, padding]);

      console.log(xScale(new Date(date[0])));


    // create axis
	 var xAxis = d3.axisBottom().scale(xScale).ticks(10);

	 var yAxis = d3.axisLeft().scale(yScale).ticks(10);

   // console.log(yScale(10));
   // create svg element
	 var svg = d3.select("body")
		     .append("svg")
		     .attr("width", width)
		     .attr("height", height)
         .attr('class', 'scatter')

    svg.call(tip)

    // make scatterpoints
		svg.selectAll("circle")
		 .data(dataset)
		 .enter()
		 .append("circle")
		 .attr("cx", function(d) {
       // console.log(new Date(d[0]));
			return xScale(new Date(d[0]));
		  })
		 .attr("cy", function(d) {
			 return yScale(d[1]);
		  })
		 .attr("r", 5)
       		.style("fill", function(d){
         return colors(d[2])
        })
        .on('mouseover',function(d){
          tip.show(d);

          d3.select(this)
            .style("stroke","white")
            .style("stroke-width",3)
            // .style(zoom:hover)
        })
        .on('mouseout', function(d){
          tip.hide(d);

          d3.select(this)
            .style("stroke","white")
            .style("stroke-width",0.3);


        })
        .on('click', function(d){
          updateStream(d[2], crypto)
        })

		// make x axis and y axis
		svg.append("g")
  		 .attr("class", "x axis")
  		 .attr("transform", "translate(0," + (height - padding) + ")")
  		 .call(xAxis);

		svg.append("g")
			 .attr("class", "y axis")
			 .attr("transform", "translate(" + (padding+10) + ", 0)")
			 .call(yAxis);

// regression=leastSquaresequation(new Date(date),rankin);


       // var line = d3.svg.line()
       //     .x(function(d) { return x(new Date(d[0])); })
       //     .y(function(d) { return y(regression(d[1])); });
       //
       //  svg.append("path")
       //     .datum(dataset)
       //     .attr("class", "line")
       //     .attr("d", line)

 }
//  function leastSquaresequation(XaxisData, Yaxisdata) {
//     var ReduceAddition = function(prev, cur) { return prev + cur; };
//
//     // finding the mean of Xaxis and Yaxis data
//     var xBar = XaxisData.reduce(ReduceAddition) * 1.0 / XaxisData.length;
//     var yBar = Yaxisdata.reduce(ReduceAddition) * 1.0 / Yaxisdata.length;
//
//     var SquareXX = XaxisData.map(function(d) { return Math.pow(d - xBar, 2); })
//       .reduce(ReduceAddition);
//
//     var ssYY = Yaxisdata.map(function(d) { return Math.pow(d - yBar, 2); })
//       .reduce(ReduceAddition);
//
//     var MeanDiffXY = XaxisData.map(function(d, i) { return (d - xBar) * (Yaxisdata[i] - yBar); })
//       .reduce(ReduceAddition);
//
//     var slope = MeanDiffXY / SquareXX;
//     var intercept = yBar - (xBar * slope);
//
// // returning regression function
//     return function(x){
//       return x*slope+intercept
//     }
//
//   }

//  /* When the user clicks on the button,
// toggle between hiding and showing the dropdown content */
// function myFunction() {
//     document.getElementById("dropdown").classList.toggle("show");
// }
//
// // Close the dropdown menu if the user clicks outside of it
// window.onclick = function(event) {
//   if (!event.target.matches('.dropbtn')) {
//
//     var dropdowns = document.getElementsByClassName("dropdown-content");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//   }
// }
