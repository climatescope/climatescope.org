/* jshint unused: false */
function chart__carbon_offset(element_id) {
  // NOTE:
  // This chart was derived from the installed capacity.
  // It was modified to be a line chart, however some on the class names
  // remained the same to reuse styles.

  // Svg element containing the chart.
  var chart_container = d3.select("#" + element_id);
  var $chart_container = $("#" + element_id);
  var svg = chart_container.append("svg")
    .append("g")
      .attr('class', 'chart-container');
      
  /////////////////////////////////////////////////////
  // Svg elements that will contain others.

/*  // Group to hold the area delimiter lines.
  var area_delimiters_group = svg.append("g")
    .attr("class", "area-line-group");

  // Group to hold the area delimiter line points.
  var points_group = svg.append("g")
    .attr("class", "area-line-points-group");*/

  var donut_box = svg.append("g")
    .attr("class", "donut-box");

  var donut_legend_container = donut_box.append("g").attr('class', 'chart-legend');
  var donut_legend = donut_legend_container
    .append("text")
    .attr('class', 'label')
    .attr('text-anchor', 'middle')
    .attr("transform", "translate(0,-8)");
  var donut_legend_value = donut_legend_container
    .append("text")
    .attr('class', 'value')
    .attr('text-anchor', 'middle')
    .attr("transform", "translate(0,16)");

  /////////////////////////////////////////////////////
  // Draw functions.
  var arc = d3.svg.arc();
  var arc_over = d3.svg.arc();

  var pie = d3.layout.pie()
    .padAngle(.02)
    .sort(null)
    // To simplify the data processing the json format is the same for all the
    // charts. While the line chart can use it almost directly, for the pie
    // chart some tweaks are necessary. There's always only on year to show,
    // therefore we're accessing the 1st index.
    .value(function(d) { return d.values[0].value; });


  /////////////////////////////////////////////////////
  // Data request.

  var meta_info;
  var chart_data;
  var margin = {top: 10, right: 0, bottom: 10, left: 0};
  var width, height, radius;

  // Request data.
  var id = CS.stateId ? CS.stateId : CS.countryId;
  var url = CS.domain + '/' + CS.lang + '/api/auxiliary/carbon-offset/' + id + '.json';
  d3.json(url, function(error, DATA) {
    if (error) {
      return console.log(error);
    }
    
    meta_info = DATA.meta;
    chart_data = DATA.data;

    draw_chart();
  });
 
  
  var draw_chart = function() {
    var w = $chart_container.width();
    var h = $chart_container.height();

    // Size.
    width = w - margin.left - margin.right;
    height = h - margin.top - margin.bottom;
    radius = Math.min(width, height) / 2;

    arc.outerRadius(radius)
      .innerRadius(radius - 40);
    arc_over.outerRadius(radius + 5)
      .innerRadius(radius - 40 + 5);

    // Set chart size.
    chart_container.select("svg")
      //.attr("width", width + margin.left + margin.right)
      //.attr("height", height + margin.top + margin.bottom);
      .attr("width", "100%")
      .attr("height", "100%");

    // Chart container translate.
    chart_container.select(".chart-container")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var donut_cx = margin.left + (width / 2);
    var donut_cy = margin.top + (height / 2);
    donut_box.attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");

    // Pie arcs.
    var donut = donut_box.selectAll(".arc")
      .data(pie(chart_data));
    // Handle new.
    donut.enter().append("path")
      .attr("d", arc)
      .on("mouseover", function(d) {
        donut_legend.text(d.data.name);
        donut_legend_value.text(d.value);
        d3.select(this).transition()
          .duration(100)
          .attr("d", arc_over);
      })
      .on("mouseout", function(d) {
        donut_legend.text('');
        donut_legend_value.text('');
        d3.select(this).transition()
         .duration(100)
         .attr("d", arc);
      });
    // Remove old.
    donut.exit().remove();
    // Update current.
    donut
      .attr("d", arc)
      .attr("class", function(d) { return "arc segment " + d.data.id; });

  };
  
  return {
    draw: draw_chart
  };
}