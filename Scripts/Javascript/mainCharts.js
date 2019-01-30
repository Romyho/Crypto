/* mainChart.js
*
* Romy Ho
*
* 11007303
*
* Programmeerproject
*
* A javascript file, loading the data and calls graph functions.
*
*/

window.onload = function() {

  //select data files
  var cryptoTotal = "../../Data/crypto-markets.json";
  var nameDate= "../../Data/name_date.json";

  var requests = [d3.json(cryptoTotal), d3.json(nameDate)];

  // load data files
  Promise.all(requests).then(function(responses) {

  var cryptoData = responses[0]
  var cryptoDate = responses[1]

  // make dictionary of data
  var crypto = {};
  var high = [];
  var low = [];
  var open = [];
  var close = [];
  var market = [];
  var symbol = [];
  var ranking = [];
  var name = [];
  var date =[];
  var spread =[];
  var slug =[];

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
    spread.push(cryptoData[j].spread)
    slug.push(cryptoData[j].slug)
  }

var cryptoDates = {}
  for ( i in cryptoData){
      crypto[cryptoData[i].name]={'info':{'symbol':symbol[i], 'ranking': ranking[i],'begin':cryptoDate[cryptoData[i].name], 'name':slug[i]}, 'dates':{} }
  }
    for ( j in cryptoData){

      for(k in crypto){

        if (cryptoData[j].name == k){
          crypto[k].dates[ (cryptoData[j].date)]={'high':high[j], 'low':low[j], 'open':open[j], 'close':close[j], 'market':market[j], 'spread':spread[j]}
      }
    }
  }

  // make tooltip div's
    d3.select("#bubble-info")
    .append("div")
    .attr("class", "tipBubble")

    d3.select("#tip")
      .append("div")
      .attr("class", "tipStream")

// make graphs, sliders, titles, dropdown etc.
bubbleData( crypto, date[0])
var begin = new Date (date[0]),
    end = new Date (date[(date.length-1)]);
    news(crypto[name[0]].info.name)
timeSlider(begin, end, crypto)

scatterPlot(crypto)
title(name[0])
makedropdown(crypto,name)
streamChart(crypto[name[0]])

  });

}
