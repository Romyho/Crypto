/*
* dropdown.js
*
* Romy Ho
*
* 11007303
*
*
*
* A javascript file, makes dropdown with cryptonames and titles.
*/


// function that makes and updates dropdown
function makedropdown(crypto, currency){

    // make array of unique names
    var name =  Array.from(new Set(currency));

    // function that updates page elements when dropdown change
    var dropdownChange = function () {
        var newName = d3.select(this).property('value');
        updateStream(newName, crypto)
        updateNews(crypto[newName].info.name)
        titleUpdate(newName)
    };

    // sort name list
    name = name.sort()

    // make dropdown
    var dropdown = d3.selectAll(".dropdown")
        .insert("select", "svg")
        .on("change", dropdownChange)


        dropdown.selectAll("option")
        .data(name)
        .enter().append("option")
        .attr("value", function (d) {
            return d;
        })
        .text(function (d) {
            return d;
        })

        // begin value is first in name list
        dropdown.select("option[value = "+currency[0]+"]")
        .attr("selected", true)


    // make dropdown in html
    function dropdown() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }
}

// changes dropdown name
function changeDropdown(name){
  // when a name contains spaces delete spaces
  if(name.indexOf(' ') > -1){
    var name2 = name.split(' ').join('')
     d3.selectAll('.dropdown')
     .select("option[value = "+name2+"]")
     .attr("selected", true)
  }
  else if (name =="0x"){
    d3.selectAll('.dropdown')
    .select("option[value = '0x']")
    .attr("selected", true)

  }
  else{d3.selectAll('.dropdown')
  .select("option[value = "+name+"]")
  .attr("selected", true)
}}


// make title
function title(name){
  d3.select('#title-row2')
  .append('g')
  .attr("class", "title2")
  .html("<FONT SIZE='10'> "+name+" Information <br></FONT>")
}

// update title with new name
function titleUpdate(name) {
  d3.select(".title2").remove()
  d3.select('#title-row2')
  .append('g')
  .attr("class", "title2")
  .html("<FONT SIZE='10'> "+name+" Information <br></FONT>")
}
