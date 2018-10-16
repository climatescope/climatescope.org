'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import mapboxgl from 'mapbox-gl'
import ReactTooltip from 'react-tooltip'
import debounce from 'lodash.debounce'

import { render } from 'react-dom'

import { mbtoken, environment } from '../config'

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
      <div className='country-marker highlight' data-tip={countryId} data-for='marker-tip'>
        {value < 10 ? `0${value}` : value}
      </div>
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
  componentDidMount () {
    this.initMap()
  }

  initMap () {
    this.map = new mapboxgl.Map({
      center: [0, 0],
      container: this.refs.mapEl,
      style: 'mapbox://styles/mapbox/streets-v9',
      zoom: 4,
      pitchWithRotate: false,
      dragRotate: false
    })

    window.map = this.map

    this.map.addControl(new mapboxgl.NavigationControl(), 'top-left')

    // Disable map rotation using right click + drag.
    this.map.dragRotate.disable()

    // Disable map rotation using touch rotation gesture.
    this.map.touchZoomRotate.disableRotation()

    // Remove compass.
    document.querySelector('.mapboxgl-ctrl .mapboxgl-ctrl-compass').remove()

    this.map.on('load', () => {
      this.mapLoaded = true

      // TODO: Contruct markers dynamically.
      const marker1 = buildMarker('PT', 2)
      const marker2 = buildMarker('ES')

      new mapboxgl.Marker(marker1)
        .setLngLat([0, 0])
        .addTo(this.map)
      new mapboxgl.Marker(marker2)
        .setLngLat([5, 5])
        .addTo(this.map)

      // Call the map move event debouces with a leading execution to ensure
      // that the tooltip get's hidden as fast as possible.
      const onMapMove = () => {
        // TODO: Hide markers dynamically.
        ReactTooltip.hide(marker1.markerTip)
        ReactTooltip.hide(marker2.markerTip)
      }
      this.map.on('move', debounce(onMapMove, 100, { leading: true, trailing: false }))
    })
  }

  renderPopover () {
    // TODO: Add marker popover content.
    const popoverContent = (countryId) => {
      return (
        <article className='tooltip-inner'>
          <header className='tooltip__header'>
            <h1 className='tooltip__title'>
              <a href='http://global-climatescope.org/en/country/uruguay/' title='View country'>Uruguay {countryId}</a>
            </h1>
            <em className='label-grid label-grid-on' data-title='On-grid'>
              <span>On-grid</span>
            </em>
          </header>
          <div className='tooltip__body'>
            <dl className='params-legend'>
              <dt>Global rank</dt>
              <dd>9</dd>
              <dt>Score</dt>
              <dd>1.83</dd>
              <dt className='param-1'>Enabling framework</dt>
              <dd> 2.15 <small>40%</small>
              </dd><dt className='param-2'>Financing and Investments</dt>
              <dd> 1.99 <small>30%</small>
              </dd><dt className='param-3'>Value chains</dt>
              <dd> 2.04 <small>15%</small>
              </dd><dt className='param-4'>GHG management</dt>
              <dd> 0.47 <small>15%</small></dd>
            </dl>
            <a href='http://global-climatescope.org/en/country/uruguay/' className='bttn bttn-cta go' title='View country'>View country</a>
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
    fetchPage: T.func,
    match: T.object,
    page: T.object
  }
}
