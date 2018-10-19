'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import c from 'classnames'
import ReactSlider from 'react-slider'

import { environment } from '../config'
import { objectToArray, sumBy, round, distributedDivision } from '../utils/utils'

/**
 * Updates the value of the given prop or a slider and returns a new
 * values object.
 *
 * @param {object} base The base object
 * @param {string} id The id of the slider
 * @param {string} prop The property to update (lock|value)
 * @param {number|bool} value The new value to set
 *
 * @returns {object}
 */
const updateValueProp = (base, id, prop, value) => {
  return {
    ...base,
    [id]: {
      ...base[id],
      [prop]: value
    }
  }
}

export class SliderControl extends React.PureComponent {
  constructor (props) {
    super(props)

    this.onLockClick = this.onLockClick.bind(this)
  }

  onLockClick () {
    const { onLockChange, locked } = this.props
    onLockChange(!locked)
  }

  render () {
    const { title, id, value, locked, className, onSliderChange } = this.props
    return (
      <div className={c('control', className, id)}>
        <h3 className='control-title'>{title}</h3>
        <ReactSlider value={value} withBars disabled={locked} onChange={onSliderChange} />
        <span className={c('slider-value', id)}>{round(value, 0)}%</span>
        <label className='switch lock' htmlFor={`switch-${id}`}>
          <input type='checkbox' name='switch' className='switch-checkbox' id={`switch-${id}`} checked={locked} onChange={this.onLockClick} />
          <span className='switch-inner'></span>
          <span className='switch-switch'></span>
          <span className='swtich-text'>Lock</span>
        </label>
      </div>
    )
  }
}

if (environment !== 'production') {
  SliderControl.propTypes = {
    title: T.string,
    id: T.string,
    className: T.string,
    value: T.number,
    locked: T.bool,
    onSliderChange: T.func,
    onLockChange: T.func
  }
}

export class SliderControlGroup extends React.PureComponent {
  onLockChange (id, value) {
    const { values, onChange } = this.props
    onChange(updateValueProp(values, id, 'locked', value))
  }

  onSliderChange (id, sliderVal) {
    const { values, onChange } = this.props
    // Update the values so we're working with updated data.
    let updatedVals = updateValueProp(values, id, 'value', sliderVal)
    const updatedValsArray = objectToArray(updatedVals)

    // Sliders to update. Everyone except the disabled ones and the current.
    const slidersToUpdate = updatedValsArray.filter(slider => !slider.locked && slider.__key !== id)

    // Get by how much is over 100;
    const excess = 100 - sumBy(updatedValsArray, 'value')
    // By how much we need to update the sliders.
    // Since the steps are integers the deltas is an array with the value to
    // use to update each of the indexes.
    const deltas = distributedDivision(excess, slidersToUpdate.length)

    // Update the values of the other sliders.
    updatedVals = slidersToUpdate.reduce((acc, slider, i) => {
      // Calculate the new value and keep it between 0 - 100.
      const newVal = Math.max(0, Math.min(slider.value + deltas[i], 100))
      // If the sliding slider reached 100 then this is 0.
      // Otherwise use the value.
      return updateValueProp(acc, slider.__key, 'value', sliderVal === 100 ? 0 : newVal)
    }, updatedVals)

    // Total of other sliders.
    const otherTotalVal = sumBy(objectToArray(updatedVals), val => val.__key === id ? 0 : val.value)
    // Allowed value to ensure that the sum doesn't go over or below 100.
    const allowedSliderVal = 100 - otherTotalVal
    updatedVals = updateValueProp(updatedVals, id, 'value', allowedSliderVal)

    // Trigger change.
    onChange(updatedVals)
  }

  render () {
    const { sliders, values } = this.props

    return sliders.map(({ name, id }, i) => (
      <SliderControl
        key={id}
        title={name}
        className={c({ first: i === 0 })}
        value={values[id].value}
        locked={values[id].locked}
        // TODO: Change to a proper id.
        id={`param-${i + 1}`}
        onLockChange={this.onLockChange.bind(this, id)}
        onSliderChange={this.onSliderChange.bind(this, id)}
      />
    ))
  }
}

if (environment !== 'production') {
  SliderControlGroup.propTypes = {
    sliders: T.array,
    values: T.object,
    onChange: T.func
  }
}
