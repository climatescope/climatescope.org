'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { Link } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'

import { environment } from '../config'
import OnGrid from './on-grid'
import { ParameterBreakdown } from './parameters'
import { round } from '../utils/math'

export default class MapPopoverContent extends React.PureComponent {
  componentDidMount () {
    // Rebuild tooltips to ensure the on grid appears.
    ReactTooltip.rebuild()
  }

  componentDidUpdate () {
    // Rebuild tooltips to ensure the on grid appears.
    ReactTooltip.rebuild()
  }

  render () {
    const { iso, score, rank, name, topics, grid, onCloseClick } = this.props
    const hasScore = !!score

    return (
      <div className='popover__contents'>
        <header className='popover__header'>
          <div className='popover__headline'>
            <h1 className='popover__title'>
              <Link to={`/results/${iso}`} title={`View ${name} page`}>{name}</Link><OnGrid grid={grid} />
            </h1>
          </div>
          <div className='popover__header-toolbar'><a href='#' title='Close' className='tba-xmark tba--text-hidden' onClick={onCloseClick}><span>Close</span></a></div>
        </header>
        <div className='popover__body'>
          {hasScore ? (
            <ParameterBreakdown
              className='legend par-legend'
              data={topics} >
              <dt>Global rank</dt>
              <dd>{rank}</dd>
              <dt>Score</dt>
              <dd>{round(score)}</dd>
            </ParameterBreakdown>
          ) : (
            <>
              <dl className='legend par-legend'>
                <dt>Global rank</dt>
                <dd>--</dd>
                <dt>Score</dt>
                <dd>--</dd>
              </dl>
              <p className='empty'>There is no data for this geography</p>
            </>
          )}
        </div>
        <footer className='popover__footer'>
          <Link to={`/results/${iso}`} className='popover__cta' title={`View ${name} page`}>View more</Link>
        </footer>
      </div>
    )
  }
}

if (environment !== 'production') {
  MapPopoverContent.propTypes = {
    onCloseClick: T.func,
    iso: T.string,
    rank: T.number,
    name: T.string,
    topics: T.array,
    grid: T.bool,
    score: T.number
  }
}
