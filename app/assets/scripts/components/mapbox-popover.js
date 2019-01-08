'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { createPortal } from 'react-dom'

import { environment } from '../config'

/**
 * Mapbox popover
 *
 * This popover component can be used to attach a popover to a marker and have
 * the popover portaled to another container (like the body).
 * To be able to control the popover from detached components we need to keep
 * track of the popover instance and therefore there can only be one rendered
 * at any given time.
 * The popover will be shown on marker over and will stay if the mouse moves
 * to the tooltip. On marker click the popover will stay visible.
 *
 * Since the mapbox markers are rendered outside the scope of react, connecting
 * the markers with the popover requires some setup:
 *
 * 1) Create a div marker:
 * const htmlMarker = document.createElement('div')
 * htmlMarker.innerHTML = '<p>Marker</p>'
 *
 * 2) Attach the popover listeners:
 * MBPopover.attachMarker(htmlMarker, params)
 * // Any params passed to `attachMarker` will then be passed to the popover
 * // render function.
 *
 * 3) Create a mapbox marker:
 * new mapboxgl.Marker(htmlMarker).setLngLat([0, 0])
 *
 * 4) Add the popover element to be rendered:
 * <MBPopover render={(params) => <span>Popover content</span>} />
 * // By default MBPopover renders as a `div` but this can be customized. If the
 * // render function returns null the popover won't be rendered.
 *
 * The popover can be manually hidden using `MBPopover.hide()`. This can be
 * useful to hide the popover once the map moves, or on clicking close on the
 * popover.
 *
 * See the end on this file for an implementation example
 *
 * @param {string} element The element to render. Defaults to `div`.
 * @param {string} className Classes for the popover element.
 * @param {string} target Selector for the element to which the popover will be
 *                        appended. Defaults to `.page__body`.
 * @param {func} render Render function for the popover contents. Any parameters
 *                      that were passed to `attachMarker` will be passed to
 *                      this function. If the function returns `null` the
 *                      popover won't be rendered.
 *
 * @static attachMarker(el, params)
 * @static hide()
 */
export default class MBPopover extends React.PureComponent {
  constructor (props) {
    super(props)
    if (MBPopover.instance) {
      throw new Error('MBPopover instance already initialized')
    }
    // Store instance.
    MBPopover.instance = this

    this.onMarkerEvent = this.onMarkerEvent.bind(this)
    this.onPopoverEvent = this.onPopoverEvent.bind(this)

    this.fullHideState = {
      show: false,
      overPopover: false,
      overMarker: false,
      clickMarker: false,
      clickOrigin: null,
      markerData: null
    }

    this.state = {
      ...this.fullHideState,
      markerX: 0,
      markerY: 0,
      markerW: 0,
      markerH: 0
    }
  }

  /**
   * Attaches the needed event listeners to show the popover for the given
   * marker element.
   *
   * @static
   *
   * @param {node} el Marker element to which to attach the popover.
   * @param {object} params Paramenters to associate to the marker. Will be
   *                        passed to the popover render function.
   */
  static attachMarker (el, params) {
    // Mouse and touch envents to show and hide the tooltip.
    el.onmouseenter = () => {
      MBPopover.instance.onMarkerEvent('over', el, params)
    }
    el.ontouchstart = () => {
      MBPopover.instance.onMarkerEvent('over', el, params)
    }
    el.onmouseleave = () => {
      MBPopover.instance.onMarkerEvent('out', el, params)
    }
    el.onclick = () => {
      MBPopover.instance.onMarkerEvent('click', el, params)
    }
  }

  /**
   * Hides the popover.
   *
   * @static
   */
  static hide () {
    if (!MBPopover.instance) return

    MBPopover.instance.setState({
      ...MBPopover.instance.state,
      ...MBPopover.instance.fullHideState
    })
  }

  onMarkerEvent (evt, el, data) {
    const prevState = this.state
    let nextState = { ...prevState }
    // Over state.
    if (evt === 'over') {
      nextState = { ...nextState, overMarker: true }
    } else if (evt === 'out') {
      nextState = { ...nextState, overMarker: false }
    }

    const pos = el.getBoundingClientRect()
    const display = {
      show: true,
      markerData: data,
      markerX: pos.left,
      markerY: pos.top,
      markerW: pos.width,
      markerH: pos.height
    }

    // Show on over if there was no previous click.
    if (evt === 'over' && !nextState.clickMarker) {
      nextState = { ...nextState, ...display }

    // Show on click if was not clicked or if the initiator is different.
    } else if (evt === 'click') {
      nextState = { ...nextState, clickOrigin: el }
      if (!nextState.clickMarker || prevState.clickOrigin !== nextState.clickOrigin) {
        nextState = { ...nextState, ...display, clickMarker: true }
      } else {
        nextState = { ...nextState, ...this.fullHideState }
      }
    }

    this.setState(nextState)

    // Schedule hiding the tooltip on out if there was no click.
    if (evt === 'out' && !nextState.clickMarker) {
      return setTimeout(() => {
        // Since this is fired asynchronously we need access to the
        // current state.
        if (!this.state.overPopover && !this.state.overMarker) {
          this.setState({
            ...this.state,
            ...this.fullHideState
          })
        }
      }, 200)
    }
  }

  onPopoverEvent (evt) {
    if (evt === 'enter' && !this.state.clickMarker) {
      this.setState({
        ...this.state,
        overMarker: false,
        overPopover: true
      })
    } else if (evt === 'close' || (evt === 'leave' && !this.state.clickMarker)) {
      this.setState({
        ...this.state,
        ...this.fullHideState
      })
    }
  }

  componentDidMount () {
    this.el = document.querySelector('#map-popover')

    if (!this.el) {
      this.el = document.createElement('div')
      this.el.id = '#map-popover'
      document.querySelector(this.props.target).appendChild(this.el)
    }

    // Trigger render because the container is available now.
    this.forceUpdate()
  }

  componentWillUnmount () {
    MBPopover.instance = null
    this.el.remove()
  }

  render () {
    if (!this.el) return null

    const { show, markerX, markerY, markerW, markerData } = this.state
    if (!show) return null

    // Calc position.
    const x = markerX + window.pageXOffset + markerW / 2
    const y = markerY + window.pageYOffset

    const style = {
      transform: 'translate(-50%, -100%) translate(0, -0.5rem)',
      position: 'absolute',
      zIndex: 10,
      top: y,
      left: x
    }

    const { element: El, className, render } = this.props

    const content = render(markerData)
    if (content === null) return null

    return createPortal(
      <El
        className={className}
        style={style}
        onMouseEnter={this.onPopoverEvent.bind(this, 'enter')}
        onMouseLeave={this.onPopoverEvent.bind(this, 'leave')}
        children={content}
      />,
      this.el
    )
  }
}

MBPopover.instance = null

MBPopover.defaultProps = {
  element: 'div',
  target: '.page__body'
}

if (environment !== 'production') {
  MBPopover.propTypes = {
    element: T.string,
    target: T.string,
    className: T.string,
    render: T.func
  }
}

/*
class MapExample extends React.Component {
  constructor (props) {
    super(props)
    this.markers = []
    this.popoverRenderer = this.popoverRenderer.bind(this)
  }

  componentDidMount () {
    this.initMap()
  }

  initMap () {
    this.map = new mapboxgl.Map({
      center: [0, 0],
      container: this.refs.mapEl,
      style: 'mapbox://'
    })

    this.map.on('load', () => {
      this.mapLoaded = true
      this.renderMarkers()

      const onMapMove = () => { MBPopover.hide() }
      this.map.on('move', onMapMove)
    })
  }

  onPopoverCloseClick (e) {
    e.preventDefault()
    MBPopover.hide()
  }

  renderMarkers () {
    if (!this.mapLoaded) return

    // Clear previous markers.
    this.markers.forEach(m => m.remove())

    this.markers = ['cat', 'dog'].map(t => {
      const el = document.createElement('div')
      el.style.cursor = 'pointer'
      el.className = `marker--${t}`

      MBPopover.attachMarker(el, { type: t })

      return new mapboxgl.Marker(el).setLngLat([0, 0]).addTo(this.map)
    })
  }

  popoverRenderer ({ type }) {
    return (
      <div>
        <a href='#' title='Close' onClick={this.onPopoverCloseClick}>Close</a>
        <p>Hello, {type}</p>
      </div>
    )
  }

  render () {
    return (
      <figure className='results-map-viz media'>
        <div className='media__item' ref='mapEl' />
        <MBPopover element='article' className='popover popover--map' render={this.popoverRenderer} />
      </figure>
    )
  }
}
*/
