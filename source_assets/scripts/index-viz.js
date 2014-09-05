$(document).ready(function() {

  var rank = function (parent) {

    var $parent = $(parent)
      ,width = $parent.width()
      ,height = 256

      ,tooltipHTML = function(d) {
        return ['<h5>#' + d.overall_ranking, d.name, '</h5><p>Score:<strong>',
          d.score, '</strong></p>'
        ].join(' ');
      }

      ,tooltip = d3.tip().attr('class', 'map-tooltip')
        .html(tooltipHTML)

      ,mouseover = function(d) {
        if (d.rank) { tooltip.show(d.rank) }
        else { tooltip.hide(); }
      }

      ,mouseout = function() { tooltip.hide(); }

      ,redraw = function() { }

      // TODO select using element
      ,svg = d3.select('.map').append('svg')
        .attr('width', width)
        .attr('height', height)
        .call(tooltip)

      ,projection = d3.geo.mercator()
      ,path = d3.geo.path()
      ,g = svg.append('g')

      ,legendWidth = 320
      ,legendHeight = 50
      ,margin = [8, 15, 5, 15]
      ,legend = width < legendWidth + 20 + margin[1] + margin[3]  ? null : svg.append('g')
        .attr('class', 'map-legend')
        .attr('transform', 'translate(' + (width - legendWidth - 20 - margin[1] - margin[3])
              + ',' + (height - 20 - legendHeight - margin[0] - margin[2]) + ')')
    ;

    projection.translate([width / 2, height / 2 ])
      .scale(105);

    path.projection(projection);

    // TODO hook this up to weight changer
    // listen for re-draws
    $parent.on('weight:change', redraw);

    queue()
      // .defer(d3.json, CS.domain + '/' + CS.lang + '/api/countries.topojson')
      // .defer(d3.json, CS.domain + '/' + CS.lang + '/api/countries.json')

      .defer(d3.json, 'en/api/countries.topojson')
      .defer(d3.json, 'en/api/countries.json')
      .await(function(error, land, indicators) {

        var land = topojson.feature(land, land.objects.countries).features

          ,lookup = {}
          ,max = []

          ,undef
          ,iso
        ;

        // create a look-up table for each indicator by country code
        // also get a list of each overall ranking to create color scale
        for (var i = 0, ii = indicators.length; i < ii; ++i) {
          lookup[indicators[i].iso] = i;
          max.push(indicators[i].overall_ranking);
        }

        // using the lookup table, merge geography data with indicator data
        // this makes subsequent hover events much cleaner to deal with
        for (i = 0, ii = land.length; i < ii; ++i) {
          iso = land[i].id;
          if (lookup[iso] !== undef) {
            land[i].rank = indicators[lookup[iso]];
          } else {
            land[i].rank = undef;
          }
        }

        var colors = ['rgb(240,249,232)','rgb(204,235,197)','rgb(168,221,181)','rgb(123,204,196)','rgb(67,162,202)','rgb(8,104,172)']

          ,fill = d3.scale.quantize()
            .domain([0, d3.max(max)])
            .range(colors)

          ,defaultFill = '#fcfcfc'

       ;

        g.selectAll('path')
          .data(land)
        .enter()
          .append('path')
          .attr('d', path)
          .style('fill', function(d) {
            return d.rank === undef ? defaultFill : fill(d.rank.overall_ranking);
          })
          .on('mouseover', mouseover)
          .on('mouseout', mouseout)

        ;

        legend.append('rect')
          .attr('x', 0)
          .attr('y', 0)
          .attr('rx', 5)
          .attr('ry', 5)
          .attr('width', legendWidth + margin[1] + margin[3])
          .attr('height', legendHeight + margin[0] + margin[2])
          .style('fill', '#fff')
        ;

        legend.append('text')
          .attr('x', margin[3])
          .attr('y', margin[0])
          .attr('dy', '1em')
          .style('font-style', 'italic')
          .text('Overall ranking')
        ;

        var legendUnits = legend.append('g')
          .attr('transform', 'translate(' + margin[3] + ',' + margin[0] + ')')
          .selectAll('.legend-unit')
          .data(fill.range())
        .enter()
          .append('g')
          .attr('class', 'legend-unit')

          ,unitWidth = Math.floor(legendWidth / colors.length)
        ;

        legendUnits.append('rect')
          .attr('x', function(d, i) { return i * unitWidth })
          .attr('y', '1.275em')
          .attr('width', unitWidth)
          .attr('height', 10)
          .style('fill', function(d) { return d; })
        ;

        legendUnits.append('text')
          .attr('x', function(d, i) { return i * unitWidth + unitWidth/2 })
          .attr('y', '3em')
          .attr('dy', '1em')
          .style('text-anchor', 'middle')
          .text(function(d) {
            var extent = fill.invertExtent(d);
            return Math.ceil(extent[0]) + ' - ' + Math.floor(extent[1]);
          })
        ;

    });
  };

  // check to see if anything has a class of map
  // if false, probably isn't the index page so do nothing
  var parent = document.querySelectorAll('.map');
  if (!parent.length) return;

  // load the map
  else {
    rank(parent);
  }

});
