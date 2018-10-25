'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { Link } from 'react-router-dom'
import mapboxgl from 'mapbox-gl'
import ReactTooltip from 'react-tooltip'
import debounce from 'lodash.debounce'
import isEqual from 'lodash.isequal'
import turfCenter from '@turf/center'

import { render } from 'react-dom'

import { mbtoken, environment } from '../config'
import { padNumber, round } from '../utils/utils'
import OnGrid from './on-grid'
import { ParameterBreakdown } from './parameters'

// set once
mapboxgl.accessToken = mbtoken

/**
 * Create a maker to use on the map.
 * It adds over mouse events to show the marker tooltip. The marker passes
 * the country id to the tooltip which will be used to know what content to
 * render on the tooltip.
 *
 * @param {string} countryId Country id. This will be passes to the tooltip
 * @param {number} value Value to show on the marker. Optional. If not provided
 *                       the marker will not be highlighted
 *
 * @returns {node} DOM element to use as marker
 */
const buildMarker = (countryId, value) => {
  const el = document.createElement('div')
  el.style.cursor = 'pointer'

  if (value) {
    render((
      <div className='country-marker highlight' data-tip={countryId} data-for='marker-tip'>{padNumber(value, 3)}</div>
    ), el)
  } else {
    render(<div className='country-marker' data-tip={countryId} data-for='marker-tip' />, el)
  }

  // Add a property to the dom element containing the element to which the
  // tooltip is attached.
  el.markerTip = el.querySelector('.country-marker')

  // Mouse and touch envents to show and hide the tooltip.
  el.onmouseover = () => {
    ReactTooltip.show(el.markerTip)
  }
  el.ontouchstart = () => {
    ReactTooltip.show(el.markerTip)
  }
  el.onmouseout = () => {
    ReactTooltip.hide(el.markerTip)
  }

  return el
}

export default class ResultsMap extends React.Component {
  constructor (props) {
    super(props)

    this.markers = []
  }

  componentDidMount () {
    this.initMap()
  }

  componentDidUpdate (prevProps) {
    if (!isEqual(this.props.highlightISO, prevProps.highlightISO)) {
      this.setHighlightedCountries(this.props.highlightISO)
    }

    if (this.mapLoaded && !isEqual(this.props.bounds, prevProps.bounds)) {
      this.map.fitBounds(this.props.bounds)
    }

    if (!isEqual(this.props.data, prevProps.data)) {
      this.renderMarkers()
    }
  }

  setHighlightedCountries (countries) {
    if (!this.mapLoaded) return
    this.map.setFilter('ne-countries-highlight', ['in', 'ISO_A2', ...countries])
  }

  renderMarkers () {
    if (!this.mapLoaded) return

    // Clear previous markers.
    this.markers.forEach(m => m.remove())

    // TODO: Use a centroid file instead of the features as they're not reliable.
    const feats = this.map.querySourceFeatures('composite', { sourceLayer: 'ne_10m_admin_0_countries-aqr028' })
    this.markers = this.props.data.map((geo, idx) => {
      const currentCountry = feats.find(f => f.properties.ISO_A2 === geo.iso)
      if (!currentCountry) {
        console.warn('Country not found on source:', geo.iso)
      }
      const location = turfCenter(currentCountry)

      // Only the top 10 are big markers.
      const marker = idx < 10 ? buildMarker(geo.iso, geo.rank) : buildMarker(geo.iso)

      return new mapboxgl.Marker(marker)
        .setLngLat(location.geometry.coordinates)
        .addTo(this.map)
    })

    // After the markers are rendered we need to rebind the react tooltips.
    // This needs to be done on next tick or it won't work.
    setTimeout(() => { ReactTooltip.rebuild() }, 1)
  }

  initMap () {
    this.map = new mapboxgl.Map({
      center: [0, 0],
      container: this.refs.mapEl,
      style: 'mapbox://styles/climatescope/cjnn8lhdz04252rqkmbu8uexz',
      zoom: 2,
      pitchWithRotate: false,
      renderWorldCopies: false,
      dragRotate: false
    })

    window.map = this.map
    window.ReactTooltip = ReactTooltip

    this.map.addControl(new mapboxgl.NavigationControl(), 'top-left')

    // Disable map rotation using right click + drag.
    this.map.dragRotate.disable()

    // Disable map rotation using touch rotation gesture.
    this.map.touchZoomRotate.disableRotation()

    // Disable scroll zoom
    this.map.scrollZoom.disable()

    // Remove compass.
    document.querySelector('.mapboxgl-ctrl .mapboxgl-ctrl-compass').remove()

    this.map.on('load', () => {
      this.mapLoaded = true

      this.setHighlightedCountries(this.props.highlightISO)
      this.map.fitBounds(this.props.bounds)

      this.renderMarkers()

      // Call the map move event debouces with a leading execution to ensure
      // that the tooltip get's hidden as fast as possible.
      const onMapMove = () => {
        this.markers.forEach(m => ReactTooltip.hide(m.markerTip))
      }
      this.map.on('move', debounce(onMapMove, 100, { leading: true, trailing: false }))
    })
  }

  renderPopover () {
    const popoverContent = (geographyIso) => {
      const geography = this.props.data.find(geography => geography.iso === geographyIso)
      if (!geography) return null

      const { iso, score, rank, name, topics, grid } = geography

      return (
        <article className='tooltip-inner'>
          <header className='tooltip__header'>
            <h1 className='tooltip__title'>
              <Link to={`/results/${iso}`} title={`View ${name} page`}>{name}</Link>
            </h1>
            <OnGrid isOnGrid={grid} />
          </header>
          <div className='tooltip__body'>
            <ParameterBreakdown
              className='params-legend'
              data={topics} >
              <dt>Global rank</dt>
              <dd>{rank}</dd>
              <dt>Score</dt>
              <dd>{round(score)}</dd>
            </ParameterBreakdown>
            <Link to={`/results/${iso}`} className='bttn bttn-cta go' title={`View ${name} page`}>View Geography</Link>
          </div>
        </article>
      )
    }

    return (
      <ReactTooltip
        id='marker-tip'
        effect='solid'
        type='custom'
        delayHide={100}
        className='tooltip-map'
        getContent={popoverContent}
      />
    )
  }

  render () {
    return (
      <>
        <div id='index-viz' className='row--full intro' ref='mapEl' />
        {this.renderPopover()}
      </>
    )
  }
}

if (environment !== 'production') {
  ResultsMap.propTypes = {
    highlightISO: T.array,
    bounds: T.array,
    data: T.array
  }
}
