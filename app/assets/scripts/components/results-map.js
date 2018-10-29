'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { Link } from 'react-router-dom'
import mapboxgl from 'mapbox-gl'
import ReactTooltip from 'react-tooltip'
import debounce from 'lodash.debounce'
import isEqual from 'lodash.isequal'

import { render } from 'react-dom'

import { mbtoken, environment } from '../config'
import { padNumber, round, equalsIgnoreCase } from '../utils/utils'
import OnGrid from './on-grid'
import { ParameterBreakdown } from './parameters'

// set once
mapboxgl.accessToken = mbtoken

/**
 * Create a maker to use on the map.
 * It adds over mouse events to show the marker tooltip. The marker passes
 * the geography iso to the tooltip which will be used to know what content to
 * render on the tooltip.
 *
 * @param {string} geoId Geography id. This will be passes to the tooltip
 * @param {number} value Value to show on the marker. Optional. If not provided
 *                       the marker will not be highlighted
 *
 * @returns {node} DOM element to use as marker
 */
const buildMarker = (geoId, value) => {
  const el = document.createElement('div')
  el.style.cursor = 'pointer'

  if (value) {
    render((
      <div className='country-marker highlight' data-tip={geoId} data-for='marker-tip'>{padNumber(value, 2)}</div>
    ), el)
  } else {
    render(<div className='country-marker' data-tip={geoId} data-for='marker-tip' />, el)
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

    const markersToAdd = this.props.data.reduce((acc, geo) => {
      console.log('geo', geo);
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
      this.map.setPaintProperty('background', 'background-opacity', 0)

      this.setHighlightedGeographies(this.props.highlightISO)
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
      const geography = this.props.data.find(geography => equalsIgnoreCase(geography.iso, geographyIso))
      if (!geography) return null

      const { iso, score, rank, name, topics, grid } = geography
      const hasScore = !!score

      return (
        <article className='tooltip-inner'>
          <header className='tooltip__header'>
            <h1 className='tooltip__title'>
              <Link to={`/results/${iso}`} title={`View ${name} page`}>{name}</Link>
            </h1>
            <OnGrid grid={grid} />
          </header>
          <div className='tooltip__body'>
            {hasScore ? (
              <ParameterBreakdown
                className='params-legend'
                data={topics} >
                <dt>Global rank</dt>
                <dd>{rank}</dd>
                <dt>Score</dt>
                <dd>{round(score)}</dd>
              </ParameterBreakdown>
            ) : (
              <>
                <dl className='params-legend'>
                  <dt>Global rank</dt>
                  <dd>--</dd>
                  <dt>Score</dt>
                  <dd>--</dd>
                </dl>
                <p>There is no data for this geography.</p>
              </>
            )}
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
        <figure className='results-map-viz media'>
          <div className='media__item' ref='mapEl'>
            {this.renderPopover()}
          </div>
          <figcaption className='media__caption'>Top and bottom ten geographies</figcaption>
        </figure>
      </>
    )
  }
}

if (environment !== 'production') {
  ResultsMap.propTypes = {
    highlightISO: T.array,
    bounds: T.array,
    data: T.array,
    meta: T.array
  }
}
