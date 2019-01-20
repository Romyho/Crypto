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


bubble('2018-11-28', crypto, date)


// chart(crypto['Bitcoin'], "orange");
// streamGraph("test.csv", "orange")


  });
}



// vragen:
//
