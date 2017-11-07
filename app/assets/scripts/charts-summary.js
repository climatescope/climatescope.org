/* jshint unused: false */
function chart__score_summary(element, chartData) {
  // NOTE:
  // This chart was derived from the installed capacity.
  // It was modified to be a line chart, however some on the class names
  // remained the same to reuse styles.

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
  
  // X scale. Range updated in draw_chart() function.
  var x = d3.scale.linear();

  // Y scale. Range updated in draw_chart() function.
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
    
  // Line function for the area delimiter.
  var line = d3.svg.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.value); });


  var setData = function(data) {
    if (!data) {
      return false;
    }
    meta_info = data.meta;
    chart_data = data.data;

    update();
  };

  var update = function() {
    // Ticks is the same as the number of years.
    xAxis.ticks(chart_data[0].values.length);

    // Domain for the X Axis.
    // Since the years are the same for all the data, just create
    // the domain from one.
    x.domain(d3.extent(chart_data[0].values, function(d) { return d.year; }));
    
    // Compute the y domain.
    y.domain(meta_info.yDomain);
    
    // Groups to hold the focus circles.
    // One group per line. Will hold two circles:
    // An outer and bigger and an inner and smaller one
    var focus_circles = focus.selectAll("g")
      .data(chart_data);

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

            return "translate(" + x(doc.year) + "," +  y(doc.value) + ")";
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
            if (new_xpos <= 0) {
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
            chart_data.slice(0).forEach(function(doc) {
              // Correct object from values array.
              var value_doc = doc.values[doc_index];

              var rank = '<small>N/A</small>';
              if (value_doc.overall_ranking) {
                // Position suffix.
                var posSuf = 'th';
                if (value_doc.overall_ranking === 1) {
                  posSuf = 'st';
                } else if (value_doc.overall_ranking === 2) {
                  posSuf = 'nd';
                } else if (value_doc.overall_ranking === 3) {
                  posSuf = 'rd';
                }
                rank = '<small>' + value_doc.overall_ranking + posSuf + '</small>';
              } else {

              }

              content += '<dt class="param-' + doc.id + '">' + doc.name + '</dt>';
              content += '<dd>' + formatThousands(value_doc.value) + rank + '</dd>';
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

    // Area delimiters
    var area_delimiters = area_delimiters_group.selectAll("path")
      .data(chart_data);
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
      .data(chart_data);
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
      .attr("cy", function(d) { return y(d.value); })
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

/**
 * Static method to prepare the chart data to be used on the compare page.
 * Since this is to be used on the compare page, the yDomain must be the same
 * across all the charts of this type.
 * All the compare data is being passed as a parameter and the domain is being
 * computed.
 * The data array is then changed setting the same domain for all the charts
 * of this type.
 */
chart__score_summary.prepareDataCompare = function(compareData) {
}

/**
 * Static method to prepare the chart data for one instance alone.
 * Used by the charts on the country and states pages.
 */
chart__score_summary.prepareData = function(chartData) {
  chartData.meta.yDomain = [0, d3.max(chartData.data, function (d) {
    return d3.max(d.values, function(o) { return o.value });
  })];
}