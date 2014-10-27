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
  
  
  
  // D3 margins.
  var margin = {top: 20, right: 20, bottom: 50, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  // Svg element containing the chart.
  var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // X scale.
  var x = d3.scale.linear()
    .range([0, width]);

  // Y scale.
  var y = d3.scale.linear()
    .range([height, 0]);

  // Define xAxis function.
  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  // Define yAxis function.
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
 
  // Domain for the X Axis.
  // Since the years are the same for all the data, just create
  // the domain from one.
  x.domain(d3.extent(DATA[0].values, function(d) { return d.year; }));

  // Area definition function.
  var area = d3.svg.area()
    .x(function(d) { return x(d.year); })
    // The y0 and y1 define the upper and lower positions for the
    // area. This will be used to stack the areas.
    .y0(function(d) { return y(d.y0); })
    .y1(function(d) { return y(d.y0 + d.y); });

  // Stack definition function.
  var stack = d3.layout.stack()
    // Define where to get the values from.
    .values(function(d) { return d.values; })
    .x(function (d) { return d.year; })
    // Where to get the y value. This will be used by the
    // area function as y0 (which is used to stack.)
    .y(function (d) { return d.value; });

  // Line function for the delimit the area.
  var line = d3.svg.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.y0 + d.y); });

  // Stack the values.
  var data_values = stack(DATA);
  
  // Compute the y domain taking into account the stacked values.
  y.domain([0, d3.max(data_values, function (c) { 
    return d3.max(c.values, function (d) { return d.y0 + d.y; });
  })]);


  /////////////////////////////////////////////////////
  // Start adding elements to the svg.

  // Group to hold the areas.
  var areas = svg.append("g")
    .attr("class", "area-group");

  areas.selectAll("path")
    .data(data_values)
    .enter().append("path")
      .attr("d", function(d) { return area(d.values); })
      .attr("class", function(d) { return "area " + d.id; });


  // Group to hold the area delimiter lines.
  var area_delimiters = svg.append("g")
    .attr("class", "area-line-group");

  area_delimiters.selectAll("path")
    .data(data_values)
    .enter().append("path")
      .attr("d", function(d) { return line(d.values); })
      .attr("class", function(d) { return "area-line " + d.id; });


  // Group to hold the area delimiter line points.
  var points = svg.append("g")
    .attr("class", "area-line-points-group");
  
  // Group to hold the line points.
  // One group for each line points.
  points = points.selectAll(".area-line-points")
    .data(data_values)
    .enter().append("g")
      .attr("class", function(d) { return "area-line-points " + d.id; });
  
  // Add the points.
  points.selectAll("circle")
    .data(function(d) { return d.values; })
      .enter().append('circle')
      .attr("cx", function(d) { return x(d.year); })
      .attr("cy", function(d) { return y(d.y0 + d.y); })
      .attr("r", 2);

  /////////////////////////////////////////////////////
  // Focus elements.
  // Focus line and circles show on hover.

  // Group to hold the focus elements.
  var focus = svg.append('g')
    .attr('class', 'focus-elements')
    .style('display', 'none');
  
  // Vertical focus line.
  focus.append('line')
   .attr('class', 'focus-line');

  // Groups to hold the focus circles.
  // One group per line. Will hold two circles:
  // An outer and bigger and an inner and smaller one
  var focus_circles = focus.selectAll("g")
    .data(data_values)
      .enter().append('g')
      .attr('class', 'focus-circles');
  
  // Outer circle.
  focus_circles.append('circle')
    .attr("r", 8)
    .attr('class', 'outer');

  // Inner circle.
  focus_circles.append('circle')
    .attr("r", 2)
    .attr('class', 'inner');
  
  // Chart tooltip.
  var chart_tooltip = d3.select("#chart").append('div')
    .style('display', 'none')
    .attr('id', 'chart-tooltip')
    .attr('class', 'tooltip-map left')
    .html(function(d) {
      return [
      '<div class="tooltip-inner">',
        '<dl class="params-legend">',
          '<dt class="param-1">Clean</dt>',
          '<dd>1.56</dd>',
          '<dt class="param-2">Dirty</dt>',
          '<dd>2.13</dd>',
        '</dl>',
        '</div>',
      ].join(' ');
    });

  // Add focus rectangle. Will be responsible to trigger the events.
  svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "none")
    .style("pointer-events", "all")
    .on("mouseover", function() { focus.style("display", null); chart_tooltip.style("display", null); })
    .on("mouseout", function() { focus.style("display", "none"); chart_tooltip.style("display", "none");})
    .on("mousemove", function() {
      // Define bisector function. Is used to find the closest year
      // to the mouse position.
      var bisector = d3.bisector(function(d) { return d.year; }).left;
      var mousex = x.invert(d3.mouse(this)[0]);
  
      var xpos;
      // Position the circles.
      focus.selectAll(".focus-circles circle") 
        .attr("transform", function(d) {
          var i = bisector(d.values, mousex, 1);
          var d0 = d.values[i - 1];
          var d1 = d.values[i];
          var doc = mousex - d0.year > d1.year - mousex ? d1 : d0;
          
          xpos = x(doc.year);
  
          return "translate(" + x(doc.year) + "," +  y(doc.y + doc.y0) + ")";
        });
  
      // Position the focus line.
      focus.select('.focus-line')
        .attr('x1', xpos).attr('y1', height)
        .attr('x2', xpos).attr('y2', 0);
      
      // Position tooltip.
      chart_tooltip.attr('style', function() {
        // Calculate tooltip width, taking the margin into account.
        // add some extra margin.
        var tooltip_width = chart_tooltip.style('width').replace('px', '') - margin.left + 10;
        return 'transform: translate(' + (xpos - tooltip_width) + 'px, 50px)';
      });
      
  });

  /////////////////////////////////////////////////////
  // Append Axis.

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (height + 10) + ")")
    .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Sepal Width (cm)");

  svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(-10,0)")
    .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Sepal Length (cm)");
      

  function draw_chart() {
    
  }
  
  draw_chart();
  
  
  
  
  
  
  
  
});
