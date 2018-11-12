'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { connect } from 'react-redux'
import c from 'classnames'

import { environment } from '../config'
import { downloadData, medium, tools } from '../utils/constants'

import App from './app'
import ShareOptions from '../components/share'
import SmartLink from '../components/smart-link'

const DownloadWell = ({ type, title, description, items }) => (
  <div className={`well well-l download download-${type}`}>
    <h2>{title}</h2>
    <p>{description}</p>
    <ul className='download-list'>
      {items.map(o => (
        <li key={o.url}><DownloadButton url={o.url} title={o.title} label={o.label} size={o.size} /></li>
      ))}
    </ul>
  </div>
)

if (environment !== 'production') {
  DownloadWell.propTypes = {
    type: T.string,
    title: T.string,
    description: T.string,
    items: T.array
  }
}

const DownloadButton = ({ url, title, label, size }) => (
  <a href={url} title={title} className="bttn bttn-success download data-download">{label} <span className="badge">{size}</span></a>
)

if (environment !== 'production') {
  DownloadButton.propTypes = {
    url: T.string,
    title: T.string,
    label: T.string,
    size: T.string
  }
}

const LibCard = ({ url, subtitle, linkTitle, footerTitle, title, description, isFeatured }) => (
  <article className={c('card card--short insight', { 'card--featured': isFeatured })}>
    <div className='card__contents'>
      <header className='card__header'>
        <div className='card__headline'>
          <SmartLink to={url} title={linkTitle} className='link-wrapper'>
            <p className='card__subtitle'>{subtitle}</p>
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
        <SmartLink to={url} title={linkTitle} className='card__go-link'><span>{footerTitle}</span></SmartLink>
      </footer>
    </div>
  </article>
)

if (environment !== 'production') {
  LibCard.propTypes = {
    isFeatured: T.bool,
    url: T.string,
    linkTitle: T.string,
    title: T.string,
    description: T.string,
    subtitle: T.string,
    footerTitle: T.string
  }
}

const ToolCard = (props) => (
  <LibCard {...props} subtitle='Tool' footerTitle='Explore the tool' />
)

const MediumCard = (props) => (
  <LibCard {...props} subtitle='Medium' footerTitle='View archive' />
)

const ReportCard = (props) => (
  <LibCard {...props} subtitle='Report' footerTitle='Download report' />
)

class Library extends React.Component {
  render () {
    return (
      <App pageTitle='Content Library' >
        <article className='inpage inpage--library'>
          <header className='inpage__header'>
            <div className='inner'>
              <div className='inpage__headline'>
                <h1 className='inpage__title'>Content library</h1>
              </div>
              <div className='inpage__actions'>
                <ShareOptions url={window.location.toString()} />
              </div>
            </div>
          </header>

          <div className='inpage__body'>
            <div className='inner'>
              <div className='col--main prose'>

                <h2 className='visually-hidden'>Medium</h2>
                <ul className='library__list'>
                  {medium.pages.map(({ url, title, label, description }) => (
                    <li key={url} className='library__list-item'>
                      <MediumCard
                        url={url}
                        linkTitle={title}
                        title={label}
                        description={description}
                      />
                    </li>
                  ))}
                </ul>

                <h2>Tools</h2>
                <ul className='library__list'>
                  {tools.map(({ url, title, label, description }) => (
                    <li key={url} className='library__list-item'>
                      <ToolCard
                        url={url}
                        linkTitle={title}
                        title={label}
                        description={description}
                      />
                    </li>
                  ))}
                </ul>

                <h2>Reports</h2>
                <ul className='library__list library__list--small'>
                  {downloadData.full.map(({ url, title, label, description }) => (
                    <li key={url} className='library__list-item'>
                      <ReportCard
                        isFeatured
                        url={url}
                        linkTitle={title}
                        title={label}
                      />
                    </li>
                  ))}
                  {downloadData.fullPrevious.map(({ url, title, label, description }) => (
                    <li key={url} className='library__list-item'>
                      <ReportCard
                        url={url}
                        linkTitle={title}
                        title={label}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </article>
      </App>
    )
  }
}

if (environment !== 'production') {
  Library.propTypes = {
  }
}

function mapStateToProps (state, props) {
  return {
  }
}

function dispatcher (dispatch) {
  return {
  }
}

export default connect(mapStateToProps, dispatcher)(Library)
