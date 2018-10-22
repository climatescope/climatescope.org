'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import mapboxgl from 'mapbox-gl'
import bbox from '@turf/bbox'

import { mbtoken, environment } from '../config'

// set once
mapboxgl.accessToken = mbtoken

export default class GeographyMap extends React.Component {
  componentDidMount () {
    this.initMap()
  }

  initMap () {
    this.map = new mapboxgl.Map({
      container: this.refs.mapEl,
      style: 'mapbox://styles/devseed/cjna3z2oq3t8e2rppvva47o0e',
      minZoom: 2,
      zoom: 2,
      center: [-60.646, -26.153],
      interactive: false
    })

    window.map = this.map

    // this.map.addControl(new mapboxgl.NavigationControl(), 'top-left')

    // // Disable map rotation using right click + drag.
    // this.map.dragRotate.disable()

    // // Disable map rotation using touch rotation gesture.
    // this.map.touchZoomRotate.disableRotation()

    // // Disable scroll zoom
    // this.map.scrollZoom.disable()

    // // Remove compass.
    // document.querySelector('.mapboxgl-ctrl .mapboxgl-ctrl-compass').remove()

    this.map.on('load', () => {
      this.mapLoaded = true
      const countryISO = 'PRY'

      // Get the width of the map to calculate the offset.
      // It's limited to the max content width of 1280px
      const mapWidth = Math.min(1280, this.refs.mapEl.getBoundingClientRect().width)

      const feats = this.map.querySourceFeatures('composite', { sourceLayer: 'countries-9fgbap' })
      const currentCountry = feats.find(f => f.properties.ISO_A3 === countryISO)
      if (!currentCountry) {
        console.warn('Country not found on source:', countryISO)
      }
      const bounds = bbox(currentCountry)
      this.map.fitBounds([ [bounds[0], bounds[1]], [bounds[2], bounds[3]] ], {
        padding: { top: 32, bottom: 32, left: 0, right: 0 },
        // Offset pf 1/4
        offset: [mapWidth / 4, 0]
      })
    })
  }

  render () {
    return (
      <figure className='inpage__hero'>
        <div className='inpage__hero-item' ref='mapEl' />
        <figcaption className='inpage__hero-caption'>Geography map</figcaption>
      </figure>
    )
  }
}

if (environment !== 'production') {
  GeographyMap.propTypes = {
    fetchPage: T.func,
    match: T.object,
    page: T.object
  }
}
