'use strict'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

export default class MapboxControl {
  constructor (component, props = {}) {
    if (!component) throw new Error('Missing component')

    this.component = component
    this.props = props
    this._container = null
  }

  render (newProps = {}) {
    const props = { ...this.props, ...newProps }
    render(<this.component {...props} />, this._container)
  }

  onAdd (map) {
    this._container = document.createElement('div')
    this._container.className = 'mapboxgl-ctrl'

    // Since this is a react component disconnencted from the global application
    // state, it's not possible to pass props the normal way. To solve this we
    // store a render function associated with the map control and call it
    // when the component needs to be rendered with different props.
    // We're also caching the props to avoid having to pass them all every time
    // we call the render function.
    this.render()

    return this._container
  }

  onRemove () {
    unmountComponentAtNode(this._container)
    this._container.parentNode.removeChild(this._container)
  }
}
