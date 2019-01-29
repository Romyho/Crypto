function news(currency){

var url= 'https://cryptocontrol.io/api/v1/public/news/coin/'+currency+'?key=6742ef75f0eae66af822a3608cdf79d5'

var req = new Request(url);
fetch(req)
    .then(function(response) {
      return response.json();
    }).then(function(data){

        articles = []
        for (i in data){
          if (i < 5){
            articles.push(data[i])
          }
        }


        var margin = {top: 20, right: 40, bottom: 30, left: 30};
        var width = 300 - margin.left - margin.right;
        var height = 200 - margin.top - margin.bottom;
        
        var svg = d3.select('.news')
        .append('div')
        .attr('class', 'articles')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)


for(i in articles){
  svg.append("g")
    .attr("class", "news-links")
    .html("-"+" "+"<a href=" + articles[i].url +'>' + articles[i].title +  "<br></a> "+"<br>")
      };

      if (data.length == 0){
        svg.append('text')
        .text("No news articles available")
      }


  } )
}



function updateNews(currency){

  d3.select('.articles').remove()
  news(currency)

}
