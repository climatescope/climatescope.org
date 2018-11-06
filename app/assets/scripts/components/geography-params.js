'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import c from 'classnames'
import ScrollableAnchor from 'react-scrollable-anchor'

import { environment } from '../config'
import AreaChart, { memoizedComputeAreaChartData } from './area-chart'

// Containers to have a named wrapper.
export const AreaAlpha = ({ children }) => children
export const AreaBeta = ({ children }) => children

/**
 * Parameter section with a Scrollable Anchor and two content sections.
 *
 * @param {string} id The section id for the ScrollableAnchor
 * @param {string} type The type of section (linear|split). Used to construct
 *                      the class `par-section--${type}`
 * @param {node} children Children for each section using the components
 *                        <AreaAlpha /> and <AreaBeta />.
 */
export const ParSection = ({ id, type, children }) => {
  const ch = React.Children.toArray(children)
  const alphaChild = ch.find(c => c.type === AreaAlpha)
  const betaChild = ch.find(c => c.type === AreaBeta)

  return (
    <ScrollableAnchor id={id}>
      <section className={c('par-section', {
        [`par-section--${type}`]: !!type
      })}>
        <div className='par-section__contents'>
          {alphaChild && <div className='area-alpha'>{alphaChild}</div>}
          {betaChild && <div className='area-beta'>{betaChild}</div>}
        </div>
      </section>
    </ScrollableAnchor>
  )
}

if (environment !== 'production') {
  ParSection.propTypes = {
    id: T.string,
    type: T.string,
    children: T.node
  }
}

/**
 * Parameter section header with a title and a description.
 *
 * @param {string} title The header title.
 * @param {string} description The header description.
 */
export const ParSectionHeader = ({ title, description }) => (
  <header className='par-section__header'>
    <h1 className='par-section__title'>{title}</h1>
    <div className='par-section__description'>
      <p>{description}</p>
    </div>
  </header>
)

if (environment !== 'production') {
  ParSectionHeader.propTypes = {
    title: T.string,
    description: T.string
  }
}

/**
 * Parameter card.
 *
 * @param {string} title The title of the card. Used interchangeably
 *                       with `hiddenTitle`.
 * @param {string} hiddenTitle The hidden title of the card. Used interchangeably
 *                       with `title`. When used the h1 will be visually hidden.
 * @param {string} description The card statement.
 * @param {string} size The size of the card (small|medium|large). Used to
 *                      construct the class `info-card--${size}`.
 * @param {string} theme The theme of the card (light|dark). Used to
 *                      construct the class `info-card--${theme}`.
 * @param {node} children Content of the card.
 */
export const ParCard = ({ title, hiddenTitle, description, size, theme, children }) => (
  <article className={c('info-card', {
    [`info-card--${size}`]: !!size,
    [`info-card--${theme}`]: !!theme
  })}>
    <h1 className={c('info-card__title', { 'visually-hidden': hiddenTitle })}>{title || hiddenTitle}</h1>
    {description ? (
      <div className='info-card__statement'>
        <p>{description}</p>
      </div>
    ) : null }
    {children}
  </article>
)

if (environment !== 'production') {
  ParCard.propTypes = {
    title: T.string,
    hiddenTitle: T.string,
    description: T.string,
    size: T.string,
    theme: T.string,
    children: T.node
  }
}

/**
 * Renders the specified parameter section
 *
 * @param {string} area Area to render (alpha|beta)
 * @param {object} sectionDef Definition of the section being rendered.
 * @param {object} chartsMeta Definition of all charts.
 * @param {array} chartsData Chart data
 * @param {react} reactComponent The react component. Needed for the interative
 *                               charts that need access to the state and other
 *                               functions.
 */
export const renderParArea = (area, sectionDef, chartsMeta, chartsData, reactComponent) => {
  if (['alpha', 'beta'].indexOf(area) === -1) return null

  const AreaElement = area === 'alpha' ? AreaAlpha : AreaBeta
  const key = area === 'alpha' ? 'areaAlpha' : 'areaBeta'

  // If there's nothing in the area, don't render it.
  if (!sectionDef[key].length) return null

  const areaContents = sectionDef[key].map(el => {
    // Section headers are considered special elements.
    if (el.id === 'sectionHeader') {
      return (
        <ParSectionHeader
          key={el.id}
          title={sectionDef.title}
          description='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        />
      )
    }

    // Reconcile chart data, i.e. merge all in an object.
    // Find the definition and data of the chart to render.
    const chartDef = chartsMeta.find(def => def.id === el.id)
    const chartData = chartsData.find(data => data.id === el.id)
    if (!chartDef) {
      return renderParCardError(el, `Definition not found for chart [${el.id}]`)
    }

    if (!chartData) {
      return renderParCardError(el, `Data not found for chart [${el.id}]`)
    }

    return renderParCard({
      ...chartDef,
      data: chartData,
      size: el.size
    }, reactComponent)
  })

  // Fitler out empty sections.
  if (!areaContents.filter(Boolean).length) return null

  return (
    <AreaElement>
      {areaContents}
    </AreaElement>
  )
}

/**
 * Renders the correct card type taking into account the layout definition and
 * the chart data.
 *
 * @param {object} chart Chart data
 * @param {react} reactComponent The react component. Needed for the interative
 *                               charts that need access to the state and other
 *                               functions.
 */
export const renderParCard = (chart, reactComponent) => {
  switch (chart.type) {
    case 'answer':
      return renderParCardAnswer(chart, reactComponent)
    case 'timeSeries':
      return renderParCardTimeSeries(chart, reactComponent)
    default:
      console.warn(`Unrecognized chart type [${chart.type}] for chart [${chart.id}]`)
      return renderParCardError(chart, `Unrecognized chart type [${chart.type}] for chart [${chart.id}]`)
  }
}

// /////////////////////////////////////////////////////////////////////////////
// Types of chart cards
// /////////////////////////////////////////////////////////////////////////////

/**
 * Renders an error card.
 *
 * @param {object} chart Chart data.
 * @param {string} error The error to display.
 */
const renderParCardError = (chart, error) => {
  return (
    <ParCard
      key={chart.id}
      size={chart.size}
      title='Chart error'
      description={error}
      theme={'light'} />
  )
}

/**
 * Renders an "answer" card type.
 *
 * @param {object} chart Chart data
 * @param {react} reactComponent The react component. Needed for the interative
 *                               charts that need access to the state and other
 *                               functions.
 */
const renderParCardAnswer = (chart, reactComponent) => {
  return (
    <ParCard
      key={chart.id}
      title={chart.name}
      description={chart.description || null}
      size={chart.size}
      theme={'light'}>

    </ParCard>
  )
}

/**
 * Renders an "timeSeries" card type.
 *
 * @param {object} chart Chart data
 * @param {react} reactComponent The react component. Needed for the interative
 *                               charts that need access to the state and other
 *                               functions.
 */
const renderParCardTimeSeries = (chart, reactComponent) => {
  const renewableTypes = [
    'Biomass & Waste',
    'Geothermal',
    'Small Hydro',
    'Solar',
    'Wind'
  ]
  // Chart id works as a cache key because the data is never going to be
  // updated. If in the future this changes then the cache key needs to
  // be dynamic.
  const chartData = memoizedComputeAreaChartData(chart.data, renewableTypes, chart.id)
  return (
    <ParCard
      key={chart.id}
      title={chart.name}
      size={chart.size}
    >
      <AreaChart
        onBisectorEvent={reactComponent.onInteractionEvent.bind(reactComponent, chart.id)}
        interactionData={reactComponent.state[chart.id]}
        xLabel={chartData.xLabel}
        yLabel={chartData.yLabel}
        yDomain={chartData.yDomain}
        xDomain={chartData.xDomain}
        data={chartData.data}
      />
    </ParCard>
  )
}
