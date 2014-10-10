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
    var map = L.mapbox.map('index-viz', mapConf.mapId, {
                          minZoom: 2,
                          maxBounds: [
                            [84.812743, -178.629215],
                            [-78.229733, 179.964543]
                          ],
                          tileLayer: {
                            continuousWorld: false,
                            noWrap: true
                          },
                          scrollWheelZoom: false,
    }).setView(mapConf.center, mapConf.zoom);

    var point = function(x, y) {
      var pt = map.latLngToLayerPoint([y, x]);
      this.stream.point(pt.x, pt.y);
    };

    var projection = d3.geo.transform({point: point});

    var path = d3.geo.path().projection(projection);

    var tooltip = d3.tip().attr('class', 'tooltip-map top')
      .attr('id', 'index-viz-tooltip')
      .html(function(d) {

        d = d.rank;
        var link_text, close_text, rank_text, score_text;

        switch(CS.lang) {
          case 'en':
            link_text = "View Country";
            close_text = "Close";
            rank_text = "Global rank";
            score_text = "Global score";
            grid_on_text = "On-grid";
            grid_off_text = "Off-grid";
          break;
          case 'es':
            link_text = "Ver País";
            close_text = "Cerrar";
            rank_text = "Posición global";
            score_text = "Puntuación global";
            grid_on_text = "On-grid ES";
            grid_off_text = "Off-grid ES";
          break;
        }

        var param_code = '';
        $.each(d.parameters, function(index, param) {
          var className = 'param-' + param.id;
          param_code += [
            '<dt class="' + className + '">' + param.name + '</dt>',
            '<dd>',
              round(param.value, 2),
              '<small>' + round(param.weight * 100, 2) + '%' + '</small>',
            '</dd>',
          ].join(' ');
        });

        var grid_code = d.grid == 'on' ? '<em class="label-grid label-grid-on" data-title="' + grid_on_text + '"><span>' + grid_on_text + '</span></em>' : '<em class="label-grid label-grid-off" data-title="' + grid_off_text + '"><span>' + grid_off_text + '</span></em>';

        return [
          '<article class="tooltip-inner">',
            '<header class="tooltip__header">',
              '<h1 class="tooltip__title"><a href="' + CS.countryIndex[d.iso] +'" title="' + link_text + '">' + d.name + '</a></h1>',
              '<p class="tooltip__subtitle">' + d.region.name + '</p>',
              grid_code,
              '<a href="#" title="' + close_text + '" class="close" onClick="return false;"><span>' + close_text + '</span></a>',
            '</header>',

            '<div class="tooltip__body">',
              '<dl class="params-legend">',
                '<dt>' + rank_text + '</dt>',
                '<dd>' + d.overall_ranking + '</dd>',
                '<dt>' + score_text + '</dt>',
                '<dd>' + round(d.score, 2) + '</dd>',
                param_code,
              '</dl>',
              '<a href="' + CS.countryIndex[d.iso] +'" class="bttn bttn-cta go" title="' + link_text + '">' + link_text + '</a>',
            '</div>',

          '</article>'
        ].join(' ');
    }); // end tooltip html fn

    // UI element for toggling the map
    var $countryFilter = $('<div>', {
        'class': 'leaflet-control bttn-group bttn-group-s bttn-list map-country-toggle'
    });
    var svg = d3.select(map.getPanes().overlayPane)
      .append('svg:svg')
      .call(tooltip);
    var g = svg.append('svg:g').attr('class', 'leaflet-zoom-hide');

    // placeholder variables to query via http request
    var land = null;
    var indicators;

    // object of svg markers to move on map viewreset
    var markers = {
      highlight: [],
      countries: []
    };

    // 1: top ten; -1: bottom ten; 0: all
    var countryFilter = [
      'top-ten',
      'bottom-ten'
    ];
    var countryFilterLabel = {};
    switch(CS.lang) {
      case 'en':
        countryFilterLabel['top-ten'] = "Top ten";
        countryFilterLabel['bottom-ten'] = "Bottom ten";
      break;
      case 'es':
        countryFilterLabel['top-ten'] = "Top diez";
        countryFilterLabel['bottom-ten'] = "Bottom ten";
      break;
    }

    var visibleCountries = 'top-ten';
    var zoom = map.getZoom();

    var undef = void 0;

    var countryListUrl = CS.domain + '/' + CS.lang + '/api/countries.json';
    if (CS.regionId) {
      countryListUrl = CS.domain + '/' + CS.lang + '/api/regions/' + CS.regionId + '.json';
    }

    // two switches to detect whether marker is clicked,
    // and whether mouse is over tooltip
    var clicked = false;
    var mouseInFeature = false;

    // allRanking is true when everything is ranked
    // this happens at zoom levels larger than allRankingLevel
    var allRanking = false;
    var allRankingLevel = 3;

    queue()
    // The topo json file is the same for all languages.
    //.defer(d3.json, CS.domain + '/en/api/countries.topojson')
    .defer(d3.json, CS.domain + '/en/api/centroids.topojson')
    .defer(d3.json, countryListUrl)

    // these are used for local testing only - Derek
    // .defer(d3.json, 'en/api/countries.topojson')
    // .defer(d3.json, 'en/api/countries.json')
    .await(function(error, geography, countryRank) {
      land = topojson.feature(geography, geography.objects.centroids).features;

      // If there's a region, the countries are inside an object.
      indicators = CS.regionId ? countryRank.countries : countryRank;

      // Sort parameters.
      $.each(indicators, function(index, country) {
        country.parameters.sort(function(a, b) {
          return a.id > b.id;
        });
      });

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
          land[i].d = CS.regionId ? land[i].rank.regional_ranking : land[i].rank.overall_ranking;
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
      resetSVG();
      redrawMarkers({reset: true});

      // creating the country filter
      $countryFilter.on('click', 'button', function(e) {

        var cls = e.currentTarget.className;
        var toShow = cls.slice(cls.indexOf('show') + 5);

        if (visibleCountries === toShow) return;  // ignore if already showing

        visibleCountries = toShow;
        $countryFilter.find('.active').removeClass('active');
        e.currentTarget.className = 'active ' + cls;  // selection class

        redrawMarkers({rankOnly: true });
      });

      // Creating each button, making top-ten the first active button
      $.each(countryFilter, function(index, key) {
        var cls = 'bttn bttn-default show-' + key;
        if (key === 'top-ten') {
          cls = 'active ' + cls;
        }
        $('<button>', { 'type': 'button', 'class': cls, 'text': countryFilterLabel[key]})
          .appendTo($countryFilter);
      });

      $countryFilter.appendTo($('.leaflet-bottom.leaflet-left'));

      // if someone moves their mouse from a marker to the tooltip,
      // marker hands off the responsibility of closing the tooltip
      // to the tooltip itself
      var $tooltip = $('#index-viz-tooltip');
      $tooltip.on('mouseenter', function() {
        mouseInFeature = true;
      })
      .on('mouseleave', function() {
        mouseInFeature = false;
        if (!clicked) {
          tooltip.hide();
        }
      })
      .on('click', '.close', function() {
        tooltip.hide();
        mouseInFeature = false;
      });
    });

    // resetSVG alters the SVG bounds when map changes
    // It does NOT alter the locations of markers.
    function resetSVG() {
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

    function redrawMarkers(options) {

      // full reset; draws all countries as country-markers,
      // then draws highlighted rank markers on top.
      if (options.reset) {
        g.selectAll('g').remove();
        markers.countries = drawCountries(land, '');
        markers.highlight = drawRanking(getSlice(visibleCountries), ' highlight');
      }

      // only draw rankings;
      // used when someone changes the top-/bottom-ten toggle,
      // and we're still drawing country markers as un-ranked (higher zoom levels)
      else if (options.rankOnly && !allRanking) {
        g.selectAll('.rank-marker').remove();
        markers.highlight = drawRanking(getSlice(visibleCountries), ' highlight');
      }

      // this is used for all draws in which all countries show rank (lower zooms)
      else if ((options.rankOnly && allRanking) || options.rankAll) {
        g.selectAll('g').remove();
        markers.countries = drawRanking(land, '');
        markers.highlight = drawRanking(getSlice(visibleCountries), ' highlight');
      }
    }

    function drawCountries(countries, cls) {
      var marker = drawMarker(countries, 'country-marker' + cls, 5);
      marker.transition()
          .delay(700)
          .duration(200)
          .style('opacity', 1);
      return marker;
    }

    function drawRanking(highlighted, cls) {
      var marker = drawMarker(highlighted, 'rank-marker' + cls, 16);
      marker.append('text')
        .attr('dy', '6px')
        .text(function(d) { return d.d < 10 ? '0' + d.d : d.d; });
      marker.transition()
        .delay(function(d, i) { return 200 + i * 20; })
        .duration(200)
        .style('opacity', 1);
      return marker;
    }

    function drawMarker(data, cls, radius) {
      var markers = g.selectAll('.' + cls)
        .data(data)
        .enter().append('g')
        .attr('class', cls)
        .style('opacity', 0)
        .attr('transform', function(d) {
          var coords = map.latLngToLayerPoint([
            d.geometry.coordinates[1],
            d.geometry.coordinates[0]
          ]);
          return 'translate(' + coords.x + ',' + coords.y + ')';
        })

        .on('mouseover', function(d) {
          mouseInFeature = true;
          if (!clicked) { tooltip.show(d); }
        })

        .on('mouseout', function() {
          mouseInFeature = false;
          if (!clicked) {
            window.setTimeout(function() {
              if (!mouseInFeature) {
                tooltip.hide();
              }
            }, 300);
          }
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
        });

      markers.append('circle')
        .attr('r', radius);

      return markers;
    }

    function getSlice(visible) {
      return visible === 'top-ten' ?
        land.slice(0, 10) : visible === 'bottom-ten' ?
        land.slice(-10) : land;
    }

    map.on('dragstart', function() {
      tooltip.hide();
    });

    map.on('viewreset', function() {
      resetSVG();
      zoom = map.getZoom();

      // we've zoomed in and need to show all markers as ranks
      if (zoom > allRankingLevel && !allRanking) {
        allRanking = true;
        $countryFilter.addClass('disabled');
        g.selectAll('.country-marker').remove();
        redrawMarkers({rankAll: true});
      }

      else if (zoom <= allRankingLevel && allRanking) {
        allRanking = false;
        $countryFilter.removeClass('disabled');
        g.selectAll('.rank-marker').remove();
        redrawMarkers({reset: true});
      }

      else {
        // Define function outside for loop because jshint doesn't like it.
        var transform_func = function(d) {
          var coords = map.latLngToLayerPoint([
            d.geometry.coordinates[1],
            d.geometry.coordinates[0]
          ]);
          return 'translate(' + coords.x + ',' + coords.y + ')';
        };

        for (var key in markers) {
          markers[key].attr('transform', transform_func);
        }
      }
      tooltip.hide();
    });

    // listening for weight changer changes
    var updateSliders = debounce(function(e, weight) {
      // Once the page loads the sliders fire a update-sliders event
      // and it may happens that the map didn't load yet. To avoid errors
      // we do a check.
      if (land === null) return;
      
      var keys = $.map(land[0].rank.parameters, function(d) { return d.id; });
      for(var d = {}, i = 0, ii = land.length; i < ii; ++i) {
        d = land[i].parameters;

        land[i].rank.score = (Math.round(
          weight['param-' + keys[0]] * d[keys[0]].value +
          weight['param-' + keys[1]] * d[keys[1]].value +
          weight['param-' + keys[2]] * d[keys[2]].value +
          weight['param-' + keys[3]] * d[keys[3]].value
                                        )) / 100;
      }
      land = land.sort(function(a, b) { return b.rank.score - a.rank.score; });
      for(i = 0; i < ii; ++i) {
        land[i].d = land[i].rank.overall_ranking = i + 1;
      }

      redrawMarkers({rankOnly: true });
    }, 100, false);

    $('.slider-group').on('update-sliders', updateSliders);
  };


  // Since the map holder is index-viz check if it exists.
  // if false, probably isn't the index page so do nothing
  var parent = document.querySelector('#index-viz');
  if (parent && CS.gtIE8) {
    // load the map
    new rank();
  }
});
