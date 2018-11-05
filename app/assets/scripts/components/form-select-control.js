'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import c from 'classnames'

import { environment } from '../config'

export default class SelectControl extends React.PureComponent {
  render () {
    const {
      className,
      label,
      id,
      options,
      selectedOption,
      onChange
    } = this.props

    return (
      <div className={c('form__group', className)}>
        <label className='form__label' htmlFor={id}>{label}</label>
        <select className='form__control' id={id} name={id} value={selectedOption} onChange={onChange}>
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
    )
  }
}

if (environment !== 'production') {
  SelectControl.propTypes = {
    className: T.string,
    label: T.string,
    id: T.oneOfType([T.string, T.number]),
    options: T.array,
    selectedOption: T.oneOfType([T.string, T.number]),
    onChange: T.func
  }
}
