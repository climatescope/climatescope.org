'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import c from 'classnames'
import ScrollableAnchor from 'react-scrollable-anchor'

import { environment } from '../config'

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
