$(document).ready(function() {

  var rank = function () {

    var mapSettings = {
      'world': {
        mapId: 'flipside.e6958sxs',
        zoom: 2,
        center: [0, 0]
      },
      'africa': {
        mapId: 'flipside.cdw17lf8',
        zoom: 3,
        center: [-9.6224, 25.8398]
      },
      'asia': {
        mapId: 'flipside.j7e3okc6',
        zoom: 3,
        center: [20.63278, 104.0625]
      },
      'lac': {
        mapId: 'flipside.b1dsv657',
        zoom: 2,
        center: [-15.6230, -59.0625]
      }
    };
    var mapConf = CS.regionId ?  mapSettings[CS.regionId] : mapSettings.world;
    var map = L.mapbox.map('index-viz', mapConf.mapId)
      .setView(mapConf.center, mapConf.zoom);

    var point = function(x, y) {
      var pt = map.latLngToLayerPoint([y, x]);
      this.stream.point(pt.x, pt.y);
    };

    var projection = d3.geo.transform({point: point});

    var path = d3.geo.path().projection(projection);
    var clicked = false;

    var tooltip = d3.tip().attr('class', 'rank-tooltip').html(function(d) {
      d = d.rank;

      // Never used.
      // var rank = d.overall_ranking < 10 ? '0' + d.overall_ranking : d.overall_ranking;
      
      var link_text = "";
      var rank_text = "";
      var score_text = "";

      switch(CS.lang) {
        case 'en':
          link_text = "View Country &rsaquo;";
          rank_text = "Rank";
          score_text = "Score";
        break;
        case 'es':
          link_text = "Ver País &rsaquo;";
          rank_text = "Posición";
          score_text = "Puntaje";
        break;
      }
          
      return [
        '<div class="rank-tooltip-head"><label>Region goes here</label>',
        '<h5>' + d.name, '</h5><span class="rank-tooltip-close">&#10005;</span></div>',
        '<div class="rank-tooltip-body">',
        '<table><tr><td class="first">' + d.overall_ranking + '</td><td>' + rank_text + '</td></tr>',
        '<tr><td class="first">' + d.score + '</td><td>' + score_text + '</td></tr>',

        // four indicators
        '<tr><td class="first">' + d.parameters[0].value,
        '</td><td class="tooltip-table-indicator indicator-0">' + d.parameters[0].name + '</td></tr>',

        '<tr><td class="first">' + d.parameters[1].value,
        '</td><td class="tooltip-table-indicator indicator-1">' + d.parameters[1].name + '</td></tr>',

        '<tr><td class="first">' + d.parameters[2].value,
        '</td><td class="tooltip-table-indicator indicator-2">' + d.parameters[2].name + '</td></tr>',

        '<tr><td class="first">' + d.parameters[3].value,
        '</td><td class="tooltip-table-indicator indicator-3">' + d.parameters[3].name + '</td></tr>',

        '</table>',
        '<button class="rank-tooltip-link">' + link_text + '</button>',
        '</div>'
      ].join(' ');

    });

      // UI element for toggling the map
    var $countryFilter = $('<ul>', {
        'class': 'leaflet-control bttn-group bttn-group-s bttn-list map-country-toggle'
    });
    var svg = d3.select(map.getPanes().overlayPane)
      .append('svg:svg')
      .call(tooltip);
    var g = svg.append('svg:g').attr('class', 'leaflet-zoom-hide');

    // var radius = d3.scale.sqrt().range([4, 24]);

    // placeholder variables to query via http request
    var land;
    var indicators;
    var markers;

    // 1: top ten; -1: bottom ten; 0: all
    var countryFilter = {
      'bottom-ten': -1,
      'top-ten': 1,
      'all': 0
    };
    var visibleCountries = countryFilter['top-ten'];
    var zoom = map.getZoom();

    var undef = void 0;

    var countryListUrl = CS.domain + '/' + CS.lang + '/api/countries.json';
    if (CS.regionId) {
      countryListUrl = CS.domain + '/' + CS.lang + '/api/regions/' + CS.regionId + '.json';
    }

    queue()
    .defer(d3.json, CS.domain + '/' + CS.lang + '/api/countries.topojson')
    .defer(d3.json, countryListUrl)

    // .defer(d3.json, 'en/api/countries.topojson')
    // .defer(d3.json, 'en/api/countries.json')
    .await(function(error, geography, countryRank) {
      land = topojson.feature(geography, geography.objects.countries).features;

      // If there's a region, the countries are inside an object.
      indicators = CS.regionId ? countryRank.countries : countryRank;

      var lookup = {};
      var max = [];
      var filtered = [];
      var iso;

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
          land[i].d = land[i].rank.overall_ranking;
          land[i].parameters = {};

          // create an object as a property of rank
          // object keys are ids of parameters
          for(var k = 0; k < 4; ++k) {
            land[i].parameters[
              land[i].rank.parameters[k].id
            ] = land[i].rank.parameters[k];
          }

          filtered.push(land[i]);
        }
      }

      land = filtered.sort(function(a, b) { return a.d - b.d; });
      reset();
      redraw();

      // creating the country filter
      $countryFilter.on('click', 'button', function(e) {
        var cls = e.currentTarget.className;
        var toShow = countryFilter[cls.slice(cls.indexOf('show') + 5)];

        if (visibleCountries === toShow) return;  // ignore if already showing
        $countryFilter.find('.active').removeClass('active');
        e.currentTarget.className = 'active ' + cls;  // selection class
        toZoom(visibleCountries = toShow);  // zoom to appropriate level
        redraw();
      });

      // Creating each button, making top-ten the first active button
      $.each(countryFilter, function(key) {
        var cls = 'bttn bttn-default show-' + key;
        if (key === 'top-ten') {
          cls = 'active ' + cls;
        }
        $('<button>', { 'type': 'button', 'class': cls, 'text': key.split('-').join(' ')})
          .appendTo($countryFilter);
      });

      $countryFilter.appendTo($('.leaflet-bottom.leaflet-left'));
    });

    function reset() {
      var bounds = path.bounds({type: 'FeatureCollection', features: land});
      var topLeft = bounds[0];
      var bottomRight = bounds[1];
      var transform = [-topLeft[0] + 50, -topLeft[1] + 50];

      svg.attr('width', bottomRight[0] - topLeft[0] + 100)
        .attr('height', bottomRight[1] - topLeft[1] + 100)
        .style('left', topLeft[0]-50 + 'px')
        .style('top', topLeft[1]-50 + 'px');

      g.attr('transform', 'translate(' + transform[0] + ',' + transform[1] + ')');
    }

    function getSlice(land, visibleCountries) {
      return visibleCountries === 0 ?
        land : visibleCountries === -1 ?
        land.slice(-10) : land.slice(0, 10);
    }

    function redraw() {
      // radius.domain([data[data.length-1].rank.score, data[0].rank.score]);
      var data = getSlice(land, visibleCountries);
      g.selectAll('.rank-marker').remove();
      markers = g.selectAll('.rank-marker')
        .data(data)
      .enter().append('g')
        .attr('class', 'rank-marker')
        .style('opacity', 0)
        .attr('transform', function(d) { return 'translate(' + path.centroid(d) + ')'; });

      // Never used.
      // var circles = markers.append('circle')
      markers.append('circle')
        .attr('r', 16)
        .on('mouseover', function(d) {
          if (!clicked) { tooltip.show(d); }
        })
        .on('mouseout', function() {
          if (!clicked) { tooltip.hide(); }
        })
        .on('click', function(d) {
          clicked = true;
          tooltip.show(d);
          // close tooltip on next click, unless it's on another circle el
          window.setTimeout(function() {
            $(document).one('click', function(e) {
              if (e.target.localName !== 'circle') {
                clicked = false;
                tooltip.hide();
              }
            });
          }, 100);
        })
      ;

      markers.append('text')
        .attr('dy', '6px')
        .text(function(d) { return d.d < 10 ? '0' + d.d : d.d; });

      markers.transition()
        .delay(function(d, i) { return 200 + i * 20; })
        .duration(200)
        .style('opacity', 1);
    }

    function toZoom(visibleCountries) {
      if (visibleCountries === 0 && zoom < 4) {
          map.setZoom(4);
      }
      else if (visibleCountries !== 0 && zoom > 2) {
        map.setZoom(2);
      }
    }

    map.on('dragstart', function() {
      tooltip.hide();
    });

    map.on('viewreset', function() {
      reset();
      zoom = map.getZoom();

      // zoomed too far out on all-countries filter, force redraw to top ten
      if (visibleCountries === 0 && zoom < 4) {
        visibleCountries = 1;
        redraw();
        $countryFilter.find('.active').removeClass('active');
        var topTen = document.querySelectorAll('.show-top-ten')[0];
        topTen.className = 'active ' + topTen.className;
      }

      // just need to re-translate the centroids
      else {
        markers
          .attr('transform', function(d) { return 'translate(' + path.centroid(d) + ')'; });
      }

      tooltip.hide();
    });

    // listening for weight changer changes
    var updateSliders = debounce(function(e, weight) {
      var keys = $.map(land[0].rank.parameters, function(d) { return d.id; });
      for(var d = {}, i = 0, ii = land.length; i < ii; ++i) {
        d = land[i].parameters;

        land[i].rank.score = (Math.round(
          weight[keys[0]] * d[keys[0]].value +
          weight[keys[1]] * d[keys[1]].value +
          weight[keys[2]] * d[keys[2]].value +
          weight[keys[3]] * d[keys[3]].value
                                        )) / 100;
      }
      land = land.sort(function(a, b) { return b.rank.score - a.rank.score; });
      for(i = 0; i < ii; ++i) {
        land[i].d = land[i].rank.overall_ranking = i + 1;
      }
      redraw();
    }, 100, false);

    $('.slider-group').on('update-sliders', updateSliders);
  };


  // Since the map holder is index-viz check if it exists.
  // if false, probably isn't the index page so do nothing
  var parent = document.querySelector('#index-viz');
  if (!parent) {
    return;
  }
  // load the map
  else {
    // Never used.
    // var ranking = new rank(parent);
    new rank();
  }

});
