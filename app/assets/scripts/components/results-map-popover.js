'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { Link } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import { createPortal } from 'react-dom'

import { environment } from '../config'
import OnGrid from './on-grid'
import { ParameterBreakdown } from './parameters'
import { equalsIgnoreCase } from '../utils/string'
import { round } from '../utils/math'

/**
 * Map popover
 * Inits the ReactTooltip portaling it to the .page__body.
 * This is needed because of stacking issues with the slider bar.
 *
 * Note that this is to be used by the map markers. They trigger the popover
 * according to the ReactTooltip's api.
 */
export default class MapPopover extends React.PureComponent {
  componentDidMount () {
    this.el = document.querySelector('#map-popover')

    if (!this.el) {
      this.el = document.createElement('div')
      this.el.id = '#map-popover'
      document.querySelector('.page__body').appendChild(this.el)
    }

    // Trigger render because the container is available now.
    this.forceUpdate()
  }

  render () {
    if (!this.el) return null

    const popoverContent = (geographyIso) => {
      const geography = this.props.data.find(geography => equalsIgnoreCase(geography.iso, geographyIso))
      if (!geography) return null

      const { iso, score, rank, name, topics, grid } = geography

      return (
        <MapPopoverContent
          iso={iso}
          rank={rank}
          name={name}
          topics={topics}
          grid={grid}
          score={score}
        />
      )
    }

    return createPortal(
      <ReactTooltip
        id='marker-tip'
        effect='solid'
        type='custom'
        delayHide={100}
        className='popover popover--map'
        wrapper='article'
        getContent={popoverContent}
      />,
      this.el
    )
  }
}

if (environment !== 'production') {
  MapPopover.propTypes = {
    data: T.array
  }
}

class MapPopoverContent extends React.PureComponent {
  componentDidMount () {
    // Rebuild tooltips to ensure the on grid appears.
    ReactTooltip.rebuild()
  }

  componentDidUpdate () {
    // Rebuild tooltips to ensure the on grid appears.
    ReactTooltip.rebuild()
  }

  render () {
    const { iso, score, rank, name, topics, grid } = this.props
    const hasScore = !!score

    return (
      <div className='popover__contents'>
        <header className='popover__header'>
          <div className='popover__headline'>
            <h1 className='popover__title'>
              <Link to={`/results/${iso}`} title={`View ${name} page`}>{name}</Link><OnGrid grid={grid} />
            </h1>
          </div>
          {/* <div className='popover__header-toolbar'><a href='#' title='Close' className='tba-xmark tba--text-hidden'><span>Close</span></a></div> */}
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
              <dl className='params-legend'>
                <dt>Global rank</dt>
                <dd>--</dd>
                <dt>Score</dt>
                <dd>--</dd>
              </dl>
              <p>There is no data for this geography.</p>
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
    iso: T.string,
    rank: T.number,
    name: T.string,
    topics: T.array,
    grid: T.bool,
    score: T.number
  }
}
