'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { render } from 'react-dom'

import { environment } from '../config'

import Dropdown from './dropdown'

// Mapbox Control class.
export default class LayerControl {
  onAdd (map) {
    this.theMap = map
    this._container = document.createElement('div')
    this._container.className = 'mapboxgl-ctrl'

    render(<LayerControlDropdown
      onLayerChange={this._onLayerChange.bind(this)} />, this._container)

    return this._container
  }

  onRemove () {
    this._container.parentNode.removeChild(this._container)
    this.theMap = undefined
  }

  _onLayerChange (layer, active) {
    switch (layer) {
      case 'poi':
        this.theMap.setLayoutProperty('poi', 'visibility', active ? 'visible' : 'none')
        break
      case 'origins':
        this.theMap.setLayoutProperty('eta', 'visibility', active ? 'visible' : 'none')
        break
      case 'satellite':
        this.theMap.setLayoutProperty('satellite', 'visibility', active ? 'visible' : 'none')
        break
    }
  }
}

// React component for the layer control.
// It is disconnected from the global state because it needs to be included
// via the mapbox code.
class LayerControlDropdown extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      origins: true,
      poi: true,
      satellite: false
    }
  }

  toggleLayer (what) {
    this.setState({ [what]: !this.state[what] })
    this.props.onLayerChange(what, !this.state[what])
  }

  render () {
    return (
      <Dropdown
        className='eta-vis__overlays-menu'
        triggerClassName='etavb-overlays'
        triggerActiveClassName='button--active'
        triggerText='Map layers'
        triggerTitle='Toggle map layers'
        direction='down'
        alignment='left' >
        <h6 className='drop__title'>Toggle layers</h6>
        <Toggle
          text='Origins'
          name='switch-origins'
          title='Toggle on/off'
          checked={this.state['origins']}
          onChange={this.toggleLayer.bind(this, 'origins')}
        />
        <Toggle
          text='Destinations'
          name='switch-poi'
          title='Toggle on/off'
          checked={this.state['poi']}
          onChange={this.toggleLayer.bind(this, 'poi')}
        />
        <Toggle
          text='Satellite'
          name='switch-satellite'
          title='Toggle on/off'
          checked={this.state['satellite']}
          onChange={this.toggleLayer.bind(this, 'satellite')}
        />
      </Dropdown>
    )
  }
}

if (environment !== 'production') {
  LayerControlDropdown.propTypes = {
    onLayerChange: T.func
  }
}

const Toggle = (props) => {
  const {
    text,
    name,
    title,
    checked,
    onChange
  } = props

  return (
    <label htmlFor={name} className='form__option form__option--switch' title={title}>
      <input type='checkbox' name={name} id={name} value='on' checked={checked} onChange={onChange}/>
      <span className='form__option__text'>{text}</span>
      <span className='form__option__ui'></span>
    </label>
  )
}

if (environment !== 'production') {
  Toggle.propTypes = {
    text: T.string,
    name: T.string,
    title: T.string,
    checked: T.bool,
    onChange: T.func
  }
}
