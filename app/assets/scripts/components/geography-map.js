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
      style: 'mapbox://styles/climatescope/cjnoj0lpf1b7d2sqqp31ef6c9',
      minZoom: 2,
      zoom: 2,
      center: [-60.646, -26.153],
      interactive: false
    })

    this.map.on('load', () => {
      this.mapLoaded = true
      const geoISO = this.props.geographyISO

      this.map.setFilter('ne-countries-contour', ['==', 'ISO_A2', geoISO])
      this.map.setFilter('ne-countries', ['!=', 'ISO_A2', geoISO])
      this.map.setFilter('ne-capitals-bullet', ['==', 'ISO_A2', geoISO])
      this.map.setFilter('ne-capitals-label', ['==', 'ISO_A2', geoISO])

      // Get the width of the map to calculate the offset.
      // It's limited to the max content width of 1280px
      const mapWidth = Math.min(1280, this.refs.mapEl.getBoundingClientRect().width)

      const feats = this.map.querySourceFeatures('composite', { sourceLayer: 'ne_10m_admin_0_countries-aqr028' })
      const currentGeo = feats.find(f => f.properties.ISO_A2 === geoISO)
      if (!currentGeo) {
        console.warn('Geography not found on source:', geoISO)
      }
      const bounds = bbox(currentGeo)
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
    geographyISO: T.string
  }
}
