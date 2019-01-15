function bubble(datum,crypto, dates){
  // Set tooltips
  var tip = d3.tip()
              .attr('class', 'd3-tip')
              .offset([-20,100])
              .html(function(d) {
                console.log(d)
                return "<strong>Currency: </strong><span class='details'>" +    d.data[4] + "<br></span>" + "<strong>Market value: </strong><span class='details'>" + d.data[1] + "<br></span>" + "<strong>current price: </strong><span class='details'>" + d.data[2] + "<br></span>" + "<strong>Ranking: </strong><span class='details'>" + d.data[3]+"<br></span>";
              })
              
  var color = d3.scaleOrdinal()
                      .domain(crypto)
                      .range(['#9e0142','#d53e4f','#f46d43','#fdae61','#fee08b','#e6f598','#abdda4','#66c2a5','#3288bd','#5e4fa']);

  var market = []
  for (i in crypto){
       for (j in crypto[i].dates){
         if(j == datum)
             market.push([crypto[i].info.symbol,crypto[i].dates[j].market,crypto[i].dates[j].close,crypto[i].info.ranking, i])
           }
         }

  var data = {'children':market}

  var bubble = d3.pack(data)
      .size([diameter, diameter])
      .padding(1.5);

  var svg = d3.select("body")
      .append("svg")
      .attr('transform', 'translate(150,30)')
      .attr("width", diameter)
      .attr("height", diameter)
      .attr("class", "bubble");


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
        // update(interestbyCountry[d.properties.name],  d)
        console.log(d)
      } );
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


  //
  // d3.select(dropdown)
  //   .data(dates)
  //   .on('click',function(d){
  //     show(d)
  //   })
  // console.log(dates)
  //   margin = ({top: 20, right: 30, bottom: 30, left: 40})
  //   var x = d3.scaleTime()
  //       .domain(dates)
  //       .range([margin.left, diameter+margin.right])
  //   console.log(x(dates[0]))
  //
  //
  //   var axis = svg.append("g")
  //                .attr("class", "x axis")
  //                .attr("transform", "translate(," + diameter + 50%")")
  //                .call(d3.axisBottom(x).ticks(10));


     // var yScale = d3.scaleLinear()
     //    .domain([d3.min(values)-0.5, d3.max(values)+0.5])
     //    .range([height, padding]);

     d3.select(self.frameElement)
         .style("height", diameter + "px");
}

// var slider = d3
//    .sliderHorizontal()
//    .min(dates[0])
//    .max(dates[dates.length])
//    .step(1)
//    .width(300)
//    .displayValue(false)
//    .on('onchange', val => {
//      d3.select('#value').text(val);
//    });
//
//  d3.select('#slider')
//    .append('svg')
//    .attr('width', 600)
//    .attr('height', 700)
//    .append('g')
//    .attr('transform', 'translate(30,30)')
//    .call(slider);
// var dataTime = []
// for (i in date){
// dataTime.push(Date.parse(date[i]))
// }
//
//
//   var sliderTime = d3
//     .sliderBottom()
//     .min(d3.min(dataTime))
//     .max(d3.max(dataTime))
//     .step(1000 * 60 * 60 * 24 * 365)
//     .width(600)
//     .tickFormat(d3.timeFormat('%d-%m-%Y'))
//     .tickValues(dataTime)
//     // .default(new Date(, 10, 3))
//     // .on('onchange', val => {
//     //   d3.select('p#value-time').text(d3.timeFormat('%d-%m-%Y')(val));
//     // });
//
//   var gTime = d3
//     .select('div#slider-time')
//     .append('svg')
//     .attr('width', 600)
//     .attr('height', 100)
//     .append('g')
//     .attr('transform', 'translate(130,30)');
//
//   gTime.call(sliderTime);
//
//   d3.select('p#value-time').text(d3.timeFormat('%d-%m-%Y')(sliderTime.value()));
    //
