/* jshint unused: false */
function chart__price_attractiveness_electricity(element, chartData) {

  var meta_info = null;
  var chart_data = null;
  var margin = {top: 0, right: 20, bottom: 82, left: 100};
  var width, height;

  // Svg element containing the chart.
  var chart_container = d3.select(element);
  var $chart_container = $(element);
  var svg = chart_container.append("svg")
    .append("g")
    .attr('class', 'chart-container');

  // svg element containing the bars
  var bars_group = svg.append("g")
    .attr("class", "bars-group");

  var x = d3.scale.linear();

  var xAxis = d3.svg.axis()
    .scale(x)
    .ticks(7)
    .orient("bottom");

  var y = d3.scale.ordinal()

  var yAxis = d3.svg.axis()
    .scale(y)
    .tickSize(0)
    .orient("left");

  //append axis 
  svg.append("g")
    .attr("class", "x axis")
    .append("text")
    .attr("class", "label")
    .style("text-anchor", "end");   

  svg.append("g")
    .attr("class", "y axis")
    .append("text")
    .attr("class", "label")
    .style("text-anchor", "end");

  var setData = function(data) {
    if (!data) {
      return false;
    }

    meta_info = data.meta;
    chart_data = data.data;

    console.log(chart_data);

    update();
  };

  var update = function(){

  // Update x range and domain
    x.domain([0, d3.max(chart_data, function(d){ return d.values[0].value}) ]);

    y.domain(chart_data.map(function(d) { return d.name; }));
    
    draw_chart();

  };

  var draw_chart = function() {


    var w = $chart_container.width();
    var h = $chart_container.height();

    width = w - margin.left - margin.right;
    height = h - margin.top - margin.bottom;

    chart_container.select("svg")
      .attr("width", "100%")
      .attr("height", "100%");

    chart_container.select(".chart-container")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.range([0, width]);

    var checkData = function(d){
      if(chart_data[3] == undefined){
        return y.rangeRoundBands([0, height/2], .5);
      }else{
       return  y.rangeRoundBands([0, height], .5);
      }
    };

    checkData();

    svg.select(".x.axis")
      .attr("transform", function(d){  
      if(chart_data[3] == undefined){
        return "translate(0," + (height - 32) + ")"
      }else{
        return "translate(0," + (height + 32) + ")"
      }
      })
      .call(xAxis);

    svg.select(".y.axis")
      .attr("transform", "translate(0," + 0 + ")")
      .call(yAxis);

    svg.select(".x.axis .label")
      .attr("x", width)
      .attr("y", -12)
      .text(meta_info['label-x']);

    svg.select(".y.axis")
      .attr("transform", "translate(-10,0)")
      .call(yAxis)
      .selectAll("text");

    svg.select(".y.axis .label")
      .attr("y", 20)
      .text(meta_info['label-y']);

    bars_group.selectAll("rect")
      .data(chart_data)
      .enter()
      .append("rect")
      .attr("class", "chart-background-bar")
      .attr("width", 700)
      .attr("height", 20)
      .attr("y", function(d) { return y(d.name); });

    bars_group.selectAll("g")
      .data(chart_data)
      .enter()
      .append("rect")
      .attr("class", "chart-price-bars")
      .attr("width", function(d){ return x(d.values[0].value)})
      .attr("y", function(d) { return y(d.name); })
      .attr('height', 20);

  };

  setData(chartData);

  return {
    draw: draw_chart,
    setData: setData

  };


};

