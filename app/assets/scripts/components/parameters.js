'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'

import { environment } from '../config'
import { round } from '../utils/math'

/**
 * Renders a parameter bar
 *
 * @param {string} geographyIso ISO 2 code of the geography these parameters
 *                              belong to.
 * @param {data} data Parameters to render
 */
export function ParameterGraph ({ geographyIso, data }) {
  return (
    <div className='table-graph'>
      <ul className='table-bar' data-tip={geographyIso} data-for='param-graph-tooltip'>
        {data.map(({ id, value, weight }, idx) => (
          <li key={id} className={`param-${idx + 1}`} style={{ width: `${value * (weight / 100) * (100 / 5)}%` }}><span className='visually-hidden'>{value}</span>&nbsp;</li>
        ))}
      </ul>
    </div>
  )
}

if (environment !== 'production') {
  ParameterGraph.propTypes = {
    geographyIso: T.string,
    data: T.array
  }
}

/**
 * Renders a details list with any children before the parameters. Used to
 * create the details list of a geograhpy.
 *
 * @param {node} children Elements to render before the list.
 * @param {node} className Class name for the dl element
 * @param {data} data Parameters to render.
 */
export function ParameterBreakdown ({ className, children, data }) {
  return (
    <dl className={className}>
      {children}
      {data.map(({ id, name, value, weight }, idx) => (
        <React.Fragment key={id}>
          <dt className={`param-${idx + 1}`}>{name}</dt>
          <dd>{round(value)}<small>{weight}%</small></dd>
        </React.Fragment>
      ))}
    </dl>
  )
}

if (environment !== 'production') {
  ParameterBreakdown.propTypes = {
    className: T.string,
    children: T.node,
    data: T.array
  }
}
