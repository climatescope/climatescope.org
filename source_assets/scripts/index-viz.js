$(document).ready(function() {

  var rank = function (parent) {

    var
      map = L.mapbox.map('index-viz', 'derrr.f5dvlsor')
        .setView([0,0], 2)

      ,point = function(x, y) {
        var pt = map.latLngToLayerPoint([y, x]);
        this.stream.point(pt.x, pt.y);
      }
      ,projection = d3.geo.transform({point: point})
      ,path = d3.geo.path().projection(projection)

      ,tooltip = d3.tip().attr('class', 'map-tooltip').html(function(d) {
        return ['<h5>#' + d.rank.overall_ranking, d.rank.name, '</h5><p>Score:<strong>',
          d.rank.score, '</strong></p>'].join(' ');
      })
      ,svg = d3.select(map.getPanes().overlayPane)
        .append('svg:svg')
        .call(tooltip)
      ,g = svg.append('svg:g').attr('class', 'leaflet-zoom-hide')

      ,radius = d3.scale.sqrt()
        .range([0, 15])

      // placeholder variables to query via http request
      ,land
      ,indicators
      ,markers
      ,slice

      ,undef
    ;

    queue()
    .defer(d3.json, CS.domain + '/' + CS.lang + '/api/countries.topojson')
    .defer(d3.json, CS.domain + '/' + CS.lang + '/api/countries.json')

    //.defer(d3.json, 'en/api/countries.topojson')
    //.defer(d3.json, 'en/api/countries.json')
    .await(function(error, geography, countryRank) {

      land = topojson.feature(geography, geography.objects.countries).features;
      indicators = countryRank;

      var lookup = {}
        ,max = []
        ,filtered = []
        ,iso
      ;

      // create a look-up table for each indicator by country code
      // also get a list of each overall ranking to create color scale
      for (var i = 0, ii = indicators.length; i < ii; ++i) {
        lookup[indicators[i].iso] = i;
        max.push(indicators[i].overall_ranking);
      }

      // using lookup, filter out geographies that don't have data;
      // join indicator data to countries with data
      for (i = 0, ii = land.length; i < ii; ++i) {
        iso = land[i].id;
        if (lookup[iso] !== undef) {
          land[i].rank = indicators[lookup[iso]];
          filtered.push(land[i]);
        }
      }
      land = filtered.sort(function(a, b) { return a.rank.overall_ranking - b.rank.overall_ranking });
      slice = land.slice(0,10);
      reset();

      radius.domain([0, land[0].rank.score]);
      markers = g.selectAll('circle')
        .data(slice)
      .enter().append('circle')
        .attr('class', 'ranking-marker')
        .attr('transform', function(d) { return 'translate(' + path.centroid(d) + ')'; })
        .attr('r', 0)
        .on('mouseover', tooltip.show)
        .on('mouseout', tooltip.hide)
      ;
      markers.transition()
        .delay(function(d, i) { return 600 + i * 20 })
        .duration(200)
        .attr('r', function(d) { return radius(d.rank.score); })
      ;
    });

    function reset() {
      var bounds = path.bounds({type: 'FeatureCollection', features: land})
        ,topLeft = bounds[0]
        ,bottomRight = bounds[1]
        ,transform = [-topLeft[0] + 50, -topLeft[1] + 50]
      ;

      svg.attr('width', bottomRight[0] - topLeft[0] + 100)
        .attr('height', bottomRight[1] - topLeft[1] + 100)
        .style('left', topLeft[0]-50 + 'px')
        .style('top', topLeft[1]-50 + 'px');

      g.attr('transform', 'translate(' + transform[0] + ',' + transform[1] + ')');
    }

    function redraw() {
      markers
        .attr('transform', function(d) { return 'translate(' + path.centroid(d) + ')'; })
    }

    map.on('viewreset', function() {
      reset();
      redraw();
    });
  };


  // check to see if anything has a class of map
  // if false, probably isn't the index page so do nothing
  var parent = document.querySelectorAll('.map');
  if (!parent.length) return;

  // load the map
  else {
    var ranking = new rank(parent);
  }

});
