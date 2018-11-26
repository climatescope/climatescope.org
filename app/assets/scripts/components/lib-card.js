'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import c from 'classnames'

import { environment } from '../config'

import { LoadingSkeletonGroup, LoadingSkeleton } from '../components/loading-skeleton'
import SmartLink from '../components/smart-link'

// Containers to have a named wrapper.
export const LibCardFooter = ({ children }) => children

export default function LibCard ({ isLoading, url, subtitle, linkTitle, title, description, isFeatured, children }) {
  const ch = React.Children.toArray(children)
  const footerCh = ch.find(c => c.type === LibCardFooter)

  return (
    <article className={c('card card--short insight', { 'card--featured': isFeatured })}>
      <div className='card__contents'>
        {isLoading ? (
          <LoadingSkeletonGroup>
            <LoadingSkeleton size='large' type='heading' width={3 / 4} />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton width={1 / 4} style={{ marginBottom: '4rem' }} />
            <LoadingSkeleton width={2 / 3} />
            <LoadingSkeleton width={1 / 4} />
          </LoadingSkeletonGroup>
        ) : (
          <>
            <header className='card__header'>
              <div className='card__headline'>
                <SmartLink to={url} title={linkTitle} className='link-wrapper'>
                  {subtitle && <p className='card__subtitle'>{subtitle}</p>}
                  <h1 className='card__title'>{title}</h1>
                </SmartLink>
              </div>
            </header>
            {description && (
              <div className='card__body'>
                <div className='card__prose'>
                  <p>{description}</p>
                </div>
              </div>
            )}
            <footer>
              {footerCh}
            </footer>
          </>
        )}
      </div>
    </article>
  )
}

if (environment !== 'production') {
  LibCard.propTypes = {
    isLoading: T.bool,
    isFeatured: T.bool,
    url: T.string,
    linkTitle: T.string,
    title: T.string,
    description: T.string,
    subtitle: T.string,
    footerTitle: T.string,
    children: T.node
  }
}

export const ToolCard = (props) => (
  <LibCard {...props}>
    <LibCardFooter>
      <SmartLink to={props.url} title={props.linkTitle} className='card__go-link'><span>Explore the tool</span></SmartLink>
    </LibCardFooter>
  </LibCard>
)

export const MediumCard = (props) => (
  <LibCard {...props} footerTitle='Explore the tool'>
    {!props.isLoading && (
      <LibCardFooter>
        {props.tags.length && (
          <>
            <h2 className='visually-hidden'>Topics</h2>
            <ul className='topics-list'>
              {props.tags.map(t => (
                <li key={t.id}><a href={t.url} className='topic-link' title='Browse Insights by Topic'><span>{t.name}</span></a></li>
              ))}
            </ul>
          </>
        )}
        <SmartLink to={props.url} title='Read article' className='card__go-link'><span>Read article</span></SmartLink>
      </LibCardFooter>
    )}
  </LibCard>
)

export const MediumCategoryCard = (props) => (
  <LibCard {...props} subtitle='Medium'>
    <LibCardFooter>
      <SmartLink to={props.url} title={props.linkTitle} className='card__go-link'><span>View archive</span></SmartLink>
    </LibCardFooter>
  </LibCard>
)
