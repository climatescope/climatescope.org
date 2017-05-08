/* jshint unused: false */
function chart__installed_capacity(element, chartData) {

  var stacked_data = null;
  var meta_info = null;
  var chart_data = null;
  var margin = {top: 20, right: 20, bottom: 82, left: 100};
  var width, height;

  // Svg element containing the chart.
  var chart_container = d3.select(element);
  var $chart_container = $(element);
  var svg = chart_container.append("svg")
    .append("g")
      .attr('class', 'chart-container');
      
  /////////////////////////////////////////////////////
  // Svg element that will contain others.

  // Group to hold the areas.
  var areas_group = svg.append("g")
    .attr("class", "area-group");

  // Group to hold the area delimiter lines.
  var area_delimiters_group = svg.append("g")
    .attr("class", "area-line-group");

  // Group to hold the area delimiter line points.
  var points_group = svg.append("g")
    .attr("class", "area-line-points-group");
    
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
      
  /////////////////////////////////////////////////////
  // Append Axis.

  svg.append("g")
    .attr("class", "x axis")
    .append("text")
      .attr("class", "label")
      .style("text-anchor", "end");

  svg.append("g")
    .attr("class", "y axis")
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .style("text-anchor", "end");
  
  /////////////////////////////////////////////////////
  // Draw functions.
  
  // X scale. Range updated in function.
  var x = d3.scale.linear();

  // Y scale. Range updated in function.
  var y = d3.scale.linear();

  // Define xAxis function.
  var xAxis = d3.svg.axis()
    .scale(x)
    .ticks(6)
    .tickFormat(function(d) {
      return d.toString();
    })
    .orient("bottom");

  // Define yAxis function.
  var yAxis = d3.svg.axis()
    .scale(y)
    .ticks(6)
    .orient("left");
    
  // Area definition function.
  var area = d3.svg.area()
    .x(function(d) { return x(d.year); })
    // The y0 and y1 define the upper and lower positions for the
    // area. This will be used to stack the areas.
    .y0(function(d) { return y(d.y0); })
    .y1(function(d) { return y(d.y0 + d.y); });

  // Line function for the delimit the area.
  var line = d3.svg.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.y0 + d.y); });


  var setData = function(data) {
    if (!data) {
      return false;
    }

    meta_info = data.meta;
    chart_data = data.data;
    stacked_data = data.stacked_data;

    update();
  };

  var update = function() {
    // Domain for the X Axis.
    // Since the years are the same for all the data, just create
    // the domain from one.
    x.domain(d3.extent(chart_data[0].values, function(d) { return d.year; }));

    y.domain(meta_info.yDomain);

    // Groups to hold the focus circles.
    // One group per line. Will hold two circles:
    // An outer and bigger and an inner and smaller one
    var focus_circles = focus.selectAll("g")
      .data(stacked_data);

    var enteringCircles = focus_circles.enter()
      .append('g');

    // Outer circle.
    enteringCircles.append('circle')
      .attr("r", 8)
      .attr('class', 'outer');
    // Inner circle.
    enteringCircles.append('circle')
      .attr("r", 3)
      .attr('class', 'inner');

    focus_circles.attr('class', function(d) {
      return 'focus-circles ' + d.id;
    });

    focus_circles.exit().remove();

    // Add focus rectangle. Will be responsible to trigger the events.
    svg.append("rect")
      .attr('class', 'trigger-rect')
      .style("fill", "none")
      .style("pointer-events", "all")
      .on("mouseover", function() { focus.style("display", null); chart_tooltip.style("display", null); })
      .on("mouseout", function() { focus.style("display", "none"); chart_tooltip.style("display", "none"); })
      .on("mousemove", function() {
        // Define bisector function. Is used to find the closest year
        // to the mouse position.
        var bisector = d3.bisector(function(d) { return d.year; }).left;
        var mousex = x.invert(d3.mouse(this)[0]);

        var xpos;
        var doc_index;
        // Position the circles.
        focus.selectAll(".focus-circles") 
          .attr("transform", function(d) {
            var closest_year = Math.round(mousex);
            doc_index = bisector(d.values, closest_year);
            var doc = d.values[doc_index];

            xpos = x(doc.year);

            return "translate(" + x(doc.year) + "," +  y(doc.y + doc.y0) + ")";
          });

        // Position the focus line.
        focus.select('.focus-line')
          .attr('x1', xpos).attr('y1', height)
          .attr('x2', xpos).attr('y2', 0);

        // Position tooltip.
        chart_tooltip
          .attr('style', function() {
            // Calculate tooltip width, taking the margin into account.
            // add some extra margin.
            var tooltip_width = chart_tooltip.style('width').replace('px', '');
            // Remove left and right classes.
            chart_tooltip.classed({right: false, left: false});

            // Get chart container position in space.
            // Use jQuery object since it's easier.
            var container_left = $chart_container.offset().left;
            // By default the tooltip will be left of the line.
            // Calc where the tooltip would be if aligned to the left.
            var new_xpos = xpos - tooltip_width;
            // If it doesn't fit in the viewport show it at the right.
            if (container_left + new_xpos <= 0) {
              chart_tooltip.classed({right: true});
              return 'transform: translate(' + (xpos + margin.left + 10) + 'px, 50px)';
            }
            else {
              chart_tooltip.classed({left: true});
              return 'transform: translate(' + (xpos - tooltip_width + margin.left - 10) + 'px, 50px)';
            }

          })
          .html(function() {
            var content = '<div class="tooltip-inner">';
            content += '<dl class="chart-legend">';

            // Reverse the array to ensure the order is the same.
            stacked_data.slice(0).reverse().forEach(function(doc) {
              // Correct object from values array.
              var value_doc = doc.values[doc_index];
              content += '<dt class="param-' + doc.id + '">' + doc.name + '</dt>';
              content += '<dd>' + formatThousands(value_doc.value) + '</dd>';
            });

            content += '</dl>';
            content += '</div>';

            return content;
          });
    });

    var chart_tooltip = chart_container.append('div')
      .style('display', 'none')
      .attr('class', 'tooltip-map left tooltip-chart');

    draw_chart();

  }

  var draw_chart = function() {
    var w = $chart_container.width();
    var h = $chart_container.height();

    // Size..
    width = w - margin.left - margin.right;
    height = h - margin.top - margin.bottom;

    // Set chart size.
    chart_container.select("svg")
      //.attr("width", width + margin.left + margin.right)
      //.attr("height", height + margin.top + margin.bottom);
      .attr("width", "100%")
      .attr("height", "100%");

    // Chart container translate.
    chart_container.select(".chart-container")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    chart_container.select(".trigger-rect")
      .attr("width", width)
      .attr("height", height);

    // Update scale ranges
    x.range([0, width]);
    y.range([height, 0]);

    // Areas.
    var areas = areas_group.selectAll("path")
      .data(stacked_data);
    // Handle new.
    areas.enter().append("path");
    // Remove old.
    areas.exit().remove();
    // Update current.
    areas
        .attr("d", function(d) { return area(d.values); })
        .attr("class", function(d) { return "area " + d.id; });

    // Area delimiters
    var area_delimiters = area_delimiters_group.selectAll("path")
      .data(stacked_data);
    // Handle new.
    area_delimiters.enter().append("path");
    // Remove old.
    area_delimiters.exit().remove();
    // Update current.
    area_delimiters
        .attr("d", function(d) { return line(d.values); })
        .attr("class", function(d) { return "area-line " + d.id; });

    // Group to hold the line points.
    // One group for each line points.
    var points = points_group.selectAll(".area-line-points")
      .data(stacked_data);
    // Handle new.
    points.enter().append("g");
    // Remove old.
    points.exit().remove();
    // Update current.
    points
        .attr("class", function(d) { return "area-line-points " + d.id; });

    // Add the points.
    var individual_points = points.selectAll("circle")
      .data(function(d) { return d.values; });
    // Handle new.
    individual_points.enter().append('circle');
    // Remove old.
    individual_points.exit().remove();
    // Update current.
    individual_points
      .attr("cx", function(d) { return x(d.year); })
      .attr("cy", function(d) { return y(d.y0 + d.y); })
      .attr("r", 3);

    /////////////////////////////////////////////////////
    // Append Axis.

    svg.select(".x.axis")
      .attr("transform", "translate(0," + (height + 32) + ")")
      .call(xAxis);

    svg.select(".x.axis .label")
      .attr("x", width)
      .attr("y", -12)
      .text(meta_info['label-x']);

    svg.select(".y.axis")
      .attr("transform", "translate(-32,0)")
      .call(yAxis);

    svg.select(".y.axis .label")
      .attr("y", 20)
      .text(meta_info['label-y']);

  };

  // GO!
  setData(chartData);

  return {
    draw: draw_chart,
    setData: setData
  };
}

chart__installed_capacity.stackFn = function() {
  return d3.layout.stack()
    // Define where to get the values from.
    .values(function(d) { return d.values; })
    .x(function (d) { return d.year; })
    // Where to get the y value. This will be used by the
    // area function as y0 (which is used to stack.)
    .y(function (d) { return d.value; });
}

/**
 * Static method to prepare the chart data to be used on the compare page.
 * Since this is to be used on the compare page, the yDomain must be the same
 * across all the charts of this type.
 * All the compare data is being passed as a parameter and the domain is being
 * computed.
 * The data array is then changed setting the same domain for all the charts
 * of this type.
 */
chart__installed_capacity.prepareDataCompare = function(compareData) {
  // Stack definition function.
  var stack = chart__installed_capacity.stackFn();

  var maxY = [];
  // Stack values and compute y domain.
  for (var c in compareData) {
    if (compareData[c].chartData && compareData[c].chartData['installed-capacity']) {
      var data = compareData[c].chartData['installed-capacity'].data;

      var stacked_data = stack(data);
      
      compareData[c].chartData['installed-capacity'].stacked_data = stacked_data;

      var max = d3.max(stacked_data, function (c) {
        return d3.max(c.values, function (d) { return d.y0 + d.y; });
      });

      maxY.push(max);
    }
  }

  // Apply the computed domain to all the charts of this type.
  for (var c in compareData) {
    if (compareData[c].chartData && compareData[c].chartData['installed-capacity']) {
      compareData[c].chartData['installed-capacity'].meta.yDomain = [0, d3.max(maxY)];
    }
  }
}

/**
 * Static method to prepare the chart data for one instance alone.
 * Used by the charts on the country and states pages.
 */
chart__installed_capacity.prepareData = function(chartData) {
  var stacked_data = chart__installed_capacity.stackFn()(chartData.data);

  chartData.stacked_data = stacked_data;

  chartData.meta.yDomain = [0, d3.max(stacked_data, function (c) {
    return d3.max(c.values, function (d) { return d.y0 + d.y; });
  })];
}