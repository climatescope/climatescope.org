function initDropdown() {
  $('[data-toggle="dropdown"]').once('dropdown').click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    var parent = $(this).parent('.dropdown');
    parent.toggleClass('open');
    
    $('.dropdown.open').not(parent).removeClass('open');
  });
  
  $('body').once('dropdown', function() {
    $(document).click(function() {
      $('.dropdown.open').removeClass('open');
    });
  });
  
}

$(function() {
  initDropdown();

  // Create cookie with language to use on the 404.
  createCookie('CS_lang', CS.lang, null, CS.domain);
  
  
  var DATA = [
    {
      name: 'clean energy',
      id: 'clean-energy',
      values: [
        { year: 2006, value: 10 },
        { year: 2007, value: 15 },
        { year: 2008, value: 38 },
        { year: 2009, value: 40 },
        { year: 2010, value: 41 },
        { year: 2011, value: 45 },
        { year: 2012, value: 44 },
        { year: 2013, value: 48 },
      ]
    },
    {
      name: 'dirty energy',
      id: 'dirty-energy',
      values: [
        { year: 2006, value: 13 },
        { year: 2007, value: 22 },
        { year: 2008, value: 25 },
        { year: 2009, value: 26 },
        { year: 2010, value: 30 },
        { year: 2011, value: 28 },
        { year: 2012, value: 27 },
        { year: 2013, value: 26 },
      ]
    },
  ];
  
  
  
  
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


  var x = d3.scale.linear()
      .range([0, width]);
  
  var y = d3.scale.linear()
      .range([height, 0]);
 
  
  x.domain(d3.extent(DATA[0].values, function(d) { return d.year; }));

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  
  

  var area = d3.svg.area()
    .x(function(d) { return x(d.year); })
    .y0(function(d) {
      return y(d.y0);
     })
    .y1(function(d) {
      return y(d.y0 + d.y);
    });
 
  var stack = d3.layout.stack()
    .values(function(d) { return d.values; })
    .x(function (d) { return d.year; })
    .y(function (d) { return d.value; });
  
  // Define the line
  var line = d3.svg.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.y0 + d.y); });
  
  var data_values = stack(DATA);
  
  y.domain([0, d3.max(data_values, function (c) { 
      return d3.max(c.values, function (d) { return d.y0 + d.y; });
    })]);



  var areas = svg.append("g")
    .attr("class", "area-group");
  
  areas.selectAll("path")
      .data(data_values)
    .enter().append("path")
      .attr("class", function(d) {
        return "area " + d.id;
      })
      .attr("d", function(d) { return area(d.values); });



  var area_delimiters = svg.append("g")
    .attr("class", "area-line-group");

  area_delimiters.selectAll("path")
      .data(data_values)
    .enter().append("path")
      .attr("class", function(d) {
        return "area-line " + d.id;
      })
      .attr("d", function(d) { return line(d.values); })
      .style("fill", "none");



  var points = svg.append("g")
    .attr("class", "area-line-points-group");
  
  points = points.selectAll(".area-line-points")
      .data(data_values)
    .enter().append("g")
      .attr("class", function(d) {
        return "area-line-points " + d.id;
      });
  
  points.selectAll("circle")
    .data(function(d) { return d.values; })
      .enter().append('circle')
      .attr("cx", function(d) { return x(d.year); })
      .attr("cy", function(d) { return y(d.y0 + d.y); })
      .attr("r", 2);


  var focus = svg.append('g')
    .style('display', 'none');
  
   focus.append('line')
      .attr('class', 'focusLine')
      .style("stroke", "black")
      .style("stroke-opacity", 1);
    
  focus.selectAll("circle")
    .data(data_values)
      .enter().append('circle')
      .attr("class", "y")
      //.style("fill", "none") 
      .style("fill", "white")
      .style("stroke-width", 2)
      //.style("stroke-opacity", 1)
      .attr("r", 8);
    
  svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .style("fill", "none")
        .style("pointer-events", "all")
        .on("mouseover", function() { focus.style("display", null); })
        .on("mouseout", function() { focus.style("display", "none"); })
        .on("mousemove", function() {
          var bisector = d3.bisector(function(d) { return d.year; }).left;
          var mousex = x.invert(d3.mouse(this)[0]);

          var xpos;
          var circles = focus.selectAll("circle.y")
            .attr("transform", function(d) {
              var i = bisector(d.values, mousex, 1);
              var d0 = d.values[i - 1];
              var d1 = d.values[i];
              var doc = mousex - d0.year > d1.year - mousex ? d1 : d0;
              
              xpos = x(doc.year);

              return "translate(" + x(doc.year) + "," +  y(doc.y + doc.y0) + ")";
            });

          focus.select('.focusLine')
            .attr('x1', xpos).attr('y1', height)
            .attr('x2', xpos).attr('y2', 0);
        });

// d3.tsv("data.tsv", function(error, data) {
  //color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

/*
  var browser = svg.selectAll(".browser")
      .data(browsers)
    .enter().append("g")
      .attr("class", "browser");

  browser.append("path")
      .attr("class", "area")
      .attr("d", function(d) { return area(d.values); })
      .style("fill", function(d) { return color(d.name); });

  browser.append("text")
      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.y0 + d.value.y / 2) + ")"; })
      .attr("x", -6)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });*/

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (height + 10) + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(-10,0)")
      .call(yAxis);
// });
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
});
