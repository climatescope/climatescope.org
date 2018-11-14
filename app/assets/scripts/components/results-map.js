'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { render } from 'react-dom'
import mapboxgl from 'mapbox-gl'
import c from 'classnames'
import debounce from 'lodash.debounce'
import isEqual from 'lodash.isequal'

import { mbtoken, environment } from '../config'
import { equalsIgnoreCase, padNumber } from '../utils/string'
import { reverse } from '../utils/array'
import MapboxControl from '../utils/mapbox-react-control'

import MBPopover from './mapbox-popover'
import MapPopoverContent from './results-map-popover-contents'

// set once
mapboxgl.accessToken = mbtoken

/**
 * React component for the marker highlight control.
 * Will be added to the mapbox map as a detached control.
 *
 * @param {object} props React props
 */
const MarkersHighlight = ({ highlight, onClick }) => {
  return (
    <div className='rank-switcher'>
      <button type='button' title='Highlight top 10 geographies' className={c({ 'button--active': highlight === 'top' })} onClick={() => onClick('top')}><span>Top ten</span></button>
      <button type='button' title='Highlight bottom 10 geographies' className={c({ 'button--active': highlight === 'bottom' })} onClick={() => onClick('bottom')}><span>Bottom ten</span></button>
    </div>
  )
}

if (environment !== 'production') {
  MarkersHighlight.propTypes = {
    onClick: T.func,
    highlight: T.string
  }
}

/**
 * Create a maker to use on the map.
 * It adds over mouse events to show the marker tooltip. The marker passes
 * the geography iso to the tooltip which will be used to know what content to
 * render on the tooltip.
 *
 * @param {string} geoIso Geography iso. This will be passes to the tooltip
 * @param {number} value Value to show on the marker. Optional. If not provided
 *                       the marker will not be highlighted
 *
 * @returns {node} DOM element to use as marker
 */
const buildMarker = (geoIso, value) => {
  const el = document.createElement('div')
  el.style.cursor = 'pointer'

  if (value) {
    render((
      <div className='country-marker highlight'>{padNumber(value, 2)}</div>
    ), el)
  } else {
    render(<div className='country-marker' />, el)
  }

  MBPopover.attachMarker(el, { geoIso })
  return el
}

export default class ResultsMap extends React.Component {
  constructor (props) {
    super(props)

    this.markers = []

    this.popoverRenderer = this.popoverRenderer.bind(this)
  }

  componentDidMount () {
    this.initMap()
  }

  componentDidUpdate (prevProps) {
    if (!isEqual(this.props.highlightISO, prevProps.highlightISO)) {
      this.setHighlightedGeographies(this.props.highlightISO)
    }

    if (this.mapLoaded && !isEqual(this.props.bounds, prevProps.bounds)) {
      this.map.fitBounds(this.props.bounds)
    }

    if (!isEqual(this.props.data, prevProps.data)) {
      this.renderMarkers()
    }

    if (!isEqual(this.props.meta, prevProps.meta)) {
      this.renderMarkers()
    }

    if (!isEqual(this.props.markersHighlight, prevProps.markersHighlight)) {
      this.renderMarkers()
      // Manually render dectached component
      this.markersHighlightControl.render({ highlight: this.props.markersHighlight })
    }
  }

  setHighlightedGeographies (geographies) {
    if (!this.mapLoaded) return
    this.map.setFilter('ne-countries-highlight', ['in', 'ISO_A2', ...geographies])
  }

  renderMarkers () {
    if (!this.mapLoaded || !this.props.data.length || !this.props.meta.length) return

    // Clear previous markers.
    this.markers.forEach(m => m.remove())

    let highlightedMarkers = 0

    const data = this.props.markersHighlight === 'bottom'
      ? reverse(this.props.data)
      : this.props.data

    const markersToAdd = data.reduce((acc, geo) => {
      const currentGeo = this.props.meta.find(m => equalsIgnoreCase(m.iso, geo.iso))
      if (!currentGeo) {
        console.warn('Geography not found on meta data:', geo.iso)
        return acc
      }

      // Only the first 10 with scores are big markers.
      if (geo.score && highlightedMarkers < 10) {
        highlightedMarkers++
        const marker = new mapboxgl.Marker(buildMarker(geo.iso, geo.rank))
          .setLngLat(currentGeo.center)
        // If the marker is of the highlighted type add to the end of the array
        // to ensure that it will be added later to the map staying on top.
        return acc.concat(marker)
      } else {
        const marker = new mapboxgl.Marker(buildMarker(geo.iso))
          .setLngLat(currentGeo.center)
        // Add normal markers to the beginning on the array to ensure that
        // they're added first to the map.
        return [marker].concat(acc)
      }
    }, [])

    // Add the markers to the map on the correct order.
    this.markers = markersToAdd.map(m => {
      return m.addTo(this.map)
    })
  }

  initMap () {
    this.map = new mapboxgl.Map({
      center: [0, 0],
      container: this.refs.mapEl,
      style: 'mapbox://styles/climatescope/cjnn8lhdz04252rqkmbu8uexz',
      zoom: 2,
      pitchWithRotate: false,
      renderWorldCopies: false,
      dragRotate: false,
      logoPosition: 'bottom-right'
    })

    // Add zoom controls.
    this.map.addControl(new mapboxgl.NavigationControl(), 'top-left')

    // Disable map rotation using right click + drag.
    this.map.dragRotate.disable()

    // Disable map rotation using touch rotation gesture.
    this.map.touchZoomRotate.disableRotation()

    // Disable scroll zoom
    this.map.scrollZoom.disable()

    // Remove compass.
    document.querySelector('.mapboxgl-ctrl .mapboxgl-ctrl-compass').remove()

    // Country rank selector.
    this.markersHighlightControl = new MapboxControl(MarkersHighlight, {
      highlight: this.props.markersHighlight,
      onClick: this.props.onMarkerHighlightChange
    })

    this.map.addControl(this.markersHighlightControl, 'bottom-left')

    this.map.on('load', () => {
      this.mapLoaded = true
      this.map.setPaintProperty('background', 'background-opacity', 0)
      this.map.setPaintProperty('ne-countries-highlight', 'fill-color', '#02A87C')

      this.setHighlightedGeographies(this.props.highlightISO)
      this.map.fitBounds(this.props.bounds)

      this.renderMarkers()

      // Call the map move event debouces with a leading execution to ensure
      // that the tooltip get's hidden as fast as possible.
      const onMapMove = () => {
        MBPopover.hide()
      }
      this.map.on('move', debounce(onMapMove, 100, { leading: true, trailing: false }))
    })
  }

  onPopoverCloseClick (e) {
    e.preventDefault()
    MBPopover.hide()
  }

  popoverRenderer ({ geoIso }) {
    const geography = this.props.data.find(geography => equalsIgnoreCase(geography.iso, geoIso))
    if (!geography) return null

    const { iso, score, rank, name, topics, grid } = geography
    return (
      <MapPopoverContent
        onCloseClick={this.onPopoverCloseClick}
        iso={iso}
        rank={rank}
        name={name}
        topics={topics}
        grid={grid}
        score={score}
      />
    )
  }

  render () {
    return (
      <figure className='results-map-viz media'>
        <div className='media__item' ref='mapEl' />
        <figcaption className='media__caption'>Top and bottom ten geographies</figcaption>
        <MBPopover element='article' className='popover popover--map' render={this.popoverRenderer} />
      </figure>
    )
  }
}

if (environment !== 'production') {
  ResultsMap.propTypes = {
    highlightISO: T.array,
    bounds: T.array,
    data: T.array,
    meta: T.array,
    onMarkerHighlightChange: T.func,
    markersHighlight: T.string
  }
}
