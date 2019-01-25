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

  var cryptoTotal = "crypto-markets.json";
  var nameDate= "name_date.json";
  var requests = [d3.json(cryptoTotal), d3.json(nameDate)];


  Promise.all(requests).then(function(responses) {

  var cryptoData = responses[0]
  var cryptoDate = responses[1]

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
    date.push((cryptoData[j].date))
  }

var cryptoDates = {}
  for ( i in cryptoData){
      crypto[cryptoData[i].name]={'info':{'symbol':symbol[i], 'ranking': ranking[i],'begin':cryptoDate[cryptoData[i].name]}, 'dates':{} }
  }
    for ( j in cryptoData){

      for(k in crypto){

        if (cryptoData[j].name == k){
          crypto[k].dates[ (cryptoData[j].date)]={'high':high[j], 'low':low[j], 'open':open[j], 'close':close[j], 'market':market[j]}
      }
    }
  }
// }

  //
  // var info = d3.select(".bubble")
  //     .append('svg')
  //     .attr("class", "info")
  //     .attr("id", "infoBubble")
  //     .attr('transform', 'translate(820,-300)')
  //     .attr("width", 200)
  //     .attr("height", 300)
  //
  //
  // var text =  info.append("text")
  //                 .style("font-size", "12px")
  //                 .attr('transform', 'translate(10,30)')
  //
  //
  //     text.text("Currency:")
  //     text.text("Market value:")
  d3.select("body")
      .append("div")
      .attr("id", "tooltip")
      .attr("class", "hidden");

bubbleData( crypto, date[0])
var begin = new Date (date[0]),
    end = new Date (date[(date.length-1)]);
timeSlider(begin, end, crypto)

streamChart(crypto['Bitcoin SV'])
scatter(crypto)
// console.log(crypto['Bitcoin'].dates['2013-04-28'].high);


  });

}



// vragen:
//
