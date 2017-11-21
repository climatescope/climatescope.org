(function() {
  var container = document.querySelector('[data-hook=country-map]');
  if (container && CS.countryId) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2xpbWF0ZXNjb3BlIiwiYSI6ImNpdzJmb2dwcjBhMzQyenBia2E1azBjODUifQ.9I6shKgqM1xeBA13VX5a4g';

    var map = new mapboxgl.Map({
      container: container,
      attributionControl: false,
      interactive: false,
      logoPosition: 'bottom-right',
      style: {
        version: 8,
        sources: {
          'countries': {
            'type': 'vector',
            'url': 'mapbox://climatescope.2mzfoqfz'
          },
          'capitals': {
            'type': 'vector',
            'url': 'mapbox://climatescope.72mkxkjn'
          }
        },
        glyphs: "mapbox://fonts/climatescope/{fontstack}/{range}.pbf",
        layers: [
          {
            'id': 'background',
            'type': 'background',
            'paint': {
              'background-color': '#f3f5f6'
            }
          },
          {
            'id': 'country',
            'type': 'fill',
            'source': 'countries',
            'source-layer': 'climatescope-admin0-polygons-716yo8',
            'paint': {
              'fill-color': '#7BAF8B'
            },
            'filter': ['==', 'iso', CS.countryId]
          },
          {
            'id': 'capital',
            'type': 'circle',
            'source': 'capitals',
            'source-layer': 'climatescope-admin0-capitals-0moqei',
            'paint': {
              'circle-color': '#4b8c6e'
            },
            'filter': ['==', 'iso', CS.countryId]
          },
          {
            'id': 'capital-label',
            'type': 'symbol',
            'source': 'capitals',
            'source-layer': 'climatescope-admin0-capitals-0moqei',
            'layout': {
              'visibility': 'visible',
              'text-field': '{name}',
              'text-font': [
                'Arial Unicode MS Regular'
              ],
              'text-offset': [0, -1]
            },
            'filter': ['==', 'iso', CS.countryId]
          }
        ]
      }
    });

    map.on('load', function () {
      var feats = map.querySourceFeatures('countries', {sourceLayer: 'climatescope-admin0-polygons-716yo8'});
      var currentCountry = feats.find(function (f) { return f.properties.iso === CS.countryId});
      if (!currentCountry) {
        console.warn('Country not found on source:', CS.countryId);
      }
      var bbox = turf.bbox(currentCountry);
      map.fitBounds([
        [bbox[0], bbox[1]],
        [bbox[2], bbox[3]]
      ], {
        padding: {top: 10, bottom: 10, left: 0, right: 0}
      })
    });
  }  
})();