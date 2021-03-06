/* timeSlider.js
*
* Romy Ho
*
* 11007303
*
*
*
* A javascript file, makes timeslider with playbutton.
*/

// make slider
function timeSlider(startDate, endDate, crypto){

// format date
  var formatDateIntoYear = d3.timeFormat("%Y");
  var formatDate = d3.timeFormat("%d %b %Y");

// make svg
var margin = {top:50, right:50, bottom:0, left:50},
    width = 650 - margin.left - margin.right,
    height = 100 - margin.top - margin.bottom;

var svg = d3.select("#bubble-slider")
    .append("svg")
    .attr("width", width + margin.left*2 + margin.right)
    .attr("height", height + margin.top + margin.bottom);

// make slider
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
    .attr("transform", "translate(" + margin.left + "," + height + ")")

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

// make handle
var handle = slider.insert("circle", ".track-overlay")
    .attr("class", "handle")
    .attr("r", 9);

// make labels
var label = slider.append("text")
    .attr("class", "label")
    .attr("text-anchor", "middle")
    .text(formatDate(startDate))
    .attr("transform", "translate(0," + (-25) + ")")

// make playbutton
  playButton
    .on("click", function() {
    var button = d3.select(this);
    if (button.text() == "Pause") {
      moving = false;
      clearInterval(timer);
      button.text("Play");
    } else {
      moving = true;
      timer = setInterval(step, 200);
      button.text("Pause");
    }
  })

// change slider when played
function step() {
  updateBubble(x.invert(currentValue),crypto);
  currentValue = currentValue + (targetValue/151);
  if (currentValue > targetValue) {
    moving = false;
    currentValue = 0;
    clearInterval(timer);
    playButton.text("Play");
  }
}

// change bubble chart when played
function updateBubble(h) {
  d3.selectAll('.bubbles').remove()

  // update position and text of label according to slider scale
  handle.attr("cx", x(h));
  label
    .attr("x", x(h))
    .text(formatDate(h));
  var parseDate = d3.timeFormat("%Y-%m-%d")
  h = parseDate(h);
  bubbleData(crypto, h);

}

}
