/* jshint unused: false */

function chart__trendline(element, chartData) {

  var chart_data = null;
  var all_data = null;
  var margin = {top: 0, right: 10, bottom: 5  , left: 10};
  var width, height;

  // Svg element containing the chart.
  var chart_container = d3.select(element);
  var $chart_container = $(element);
  var svg = chart_container.append("svg")
    .append("g")
      .attr('class', 'chart-container');

  var chartPopover = new DSPopover();
      
  /////////////////////////////////////////////////////
  // Svg element that will contain others.

  // Group to hold the line.
  var line_group = svg.append("g")
    .attr("class", "line-group");
    
  /////////////////////////////////////////////////////
  // Focus elements.
  // Focus line and circles show on hover.
  
  svg.append("rect")
    .attr('class', 'trigger-rect')
    .style("fill", "none")
    .style("pointer-events", "all");

  // Group to hold the focus elements.
  var focus = svg.append('g')
    .attr('class', 'focus-elements')
    .style('display', 'none');
  
  // Vertical focus line.
  focus.append('line')
   .attr('class', 'focus-line');
  
  /////////////////////////////////////////////////////
  // Draw functions.
  
  // X scale. Range updated in draw_chart() function.
  var x = d3.scale.linear();

  // Y scale. Range updated in draw_chart() function.
  var y = d3.scale.linear();

  // Line function for the area delimiter.
  var line = d3.svg.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.value); });


  var setData = function(data) {
    if (!data) {
      return false;
    }
    //all_data = data;
    all_data = data;
    chart_data = data.data.sort(function(a, b) { return a.year > b.year});

    update();
  };

  var update = function() {
    // Domain for the X Axis.
    // Since the years are the same for all the data, just create
    // the domain from one.
    x.domain(d3.extent(chart_data, function(d) { return d.year; }));

    // Compute the y domain.
    // If there is no data for a year, the y min will be set to 0
    var ymin = d3.min(chart_data, function (d) {
      if (d.value === null) {
        return 0;
      } else {
        return d.value;
      }
    });

    var ymax = d3.max(chart_data, function (d) { return d.value });

    // Give the domain some margin.
    ymin -= ((ymax - ymin) * 0.1);
    ymax += ((ymax - ymin) * 0.1);

    // When the values don't change ensure that the line is
    // more or less centered.
    if (ymin == 0 && ymax == 0) {
      ymin = -1;
      ymax = 1;
    }

    y.domain([ymin, ymax]);
    
    // Groups to hold the focus circles.
    // One group per line. Will hold two circles:
    // An outer and bigger and an inner and smaller one
    var focus_circles = focus.selectAll("g")
      .data([chart_data]);

    var enteringCircles = focus_circles.enter()
      .append('g');

    // Outer circle.
    enteringCircles.append('circle')
      .attr("r", 6)
      .attr('class', 'outer');
    // Inner circle.
    enteringCircles.append('circle')
      .attr("r", 2)
      .attr('class', 'inner');

    focus_circles.attr('class', 'focus-circles');

    focus_circles.exit().remove();

    // Add focus rectangle. Will be responsible to trigger the events.
    svg.select('rect.trigger-rect')
      //.on("mouseover", function() { focus.style("display", null); chart_tooltip.style("display", null); })
      .on("mouseover", function() { focus.style("display", null); })
      //.on("mouseout", function() { focus.style("display", "none"); chart_tooltip.style("display", "none"); })
      .on("mouseout", function() { focus.style("display", "none"); chartPopover.hide(); })
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
            doc_index = bisector(d, closest_year);
            var doc = d[doc_index];

            xpos = x(doc.year);

            return "translate(" + x(doc.year) + "," +  y(doc.value) + ")";
          });
    
        // Position the focus line.
        focus.select('.focus-line')
          .attr('x1', xpos).attr('y1', height)
          .attr('x2', xpos).attr('y2', 0);

        // Tooltip. Using this kind of placement allows us to avoid the
        // overflow problem.
        var activeCircleNode = focus.select(".focus-circles .inner").node();
        var matrix = activeCircleNode.getScreenCTM()
          .translate(activeCircleNode.getAttribute("cx"), activeCircleNode.getAttribute("cy"));

        var posX = window.pageXOffset + matrix.e;
        var posY =  window.pageYOffset + matrix.f - 8;

        // Tooltip content.
        var value_doc = chart_data[doc_index];
        var value = value_doc.value === null ? 'n/a' : round(value_doc.value, 2);
        var content = '<p class="trendline__tooltip">' + value_doc.year + ' &mdash; ' + value + '</p>';

        // Compute the paramId for the class.
        // id will be [pram_id].[indicator_id]
        var paramId = 'param-' + Math.floor(all_data.id);
        chartPopover.setContent(content, 'top trendline-tooltip ' + paramId).show(posX, posY);
    });

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

    // Compute the paramId for the class.
    // id will be [trendline].[indicator_id]
    // When NaN just append, if is a number floor it. This is needed
    // to get the param id out of the indicator id (Eg 1.25)
    var klass = 'trendline-' + (isNaN(all_data.id) ? all_data.id : Math.floor(all_data.id));

    // Line.
    var the_line = line_group.selectAll("path")
      .data([chart_data]);

    // Handle new.
    the_line.enter().append("path");
    // Remove old.
    the_line.exit().remove();
    // Update current.
    the_line
      .attr("d", line)
      .attr("class", function(d, i) { return "trendline " + klass; });

    // Terminal circle.
    var circles = line_group.selectAll("circle")
      .data(chart_data);

    // Handle new.
    circles.enter()
      .append("circle")
      .attr("r", function (d, i) {
        return i === chart_data.length - 1 ? 3 : 2;
      });
    // Remove old.
    circles.exit().remove();
    // Update current.
    circles
      .attr("cx", function(d) { return x(d.year); })
      .attr("cy", function(d) { return y(d.value); })
      .attr("class", function(d, i) {
        return i === chart_data.length - 1
          ? "trendline-point-end " + klass
          : "trendline-point " + klass;
      });

  };

  // GO!
  setData(chartData);
  
  return {
    draw: draw_chart,
    setData: setData
  };
}