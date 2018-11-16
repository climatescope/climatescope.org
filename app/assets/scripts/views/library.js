'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { connect } from 'react-redux'
import c from 'classnames'
import ReactGA from 'react-ga'

import { environment, baseurl } from '../config'
import { downloadData, medium, tools } from '../utils/constants'

import App from './app'
import ShareOptions from '../components/share'
import SmartLink from '../components/smart-link'

const LibCard = ({ url, subtitle, linkTitle, footerTitle, title, description, isFeatured }) => (
  <article className={c('card card--short insight', { 'card--featured': isFeatured })}>
    <div className='card__contents'>
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
  <LibCard {...props} footerTitle='Explore the tool' />
)

const MediumCard = (props) => (
  <LibCard {...props} subtitle='Medium' footerTitle='View archive' />
)

class ReportCard extends React.PureComponent {
  onDownloadClick (url) {
    const pieces = url.split('/')
    ReactGA.event({
      category: 'Data',
      action: 'Download',
      label: pieces[pieces.length - 1]
    })
  }

  render () {
    const { isFeatured, report, model } = this.props
    return (
      <article className={c('card card--short insight', { 'card--featured': isFeatured })}>
        <div className='card__contents'>
          <header className='card__header'>
            <div className='card__headline'>
              <h1 className='card__title'>{report.label}</h1>
            </div>
          </header>
          <footer>
            {report && <SmartLink to={baseurl + report.url} title={report.title} className='card__go-link' onClick={this.onDownloadClick.bind(this, report.url)} target='_blank'><span>Download report (PDF)</span></SmartLink>}
            {model && <SmartLink to={baseurl + model.url} title={model.title} className='card__go-link' onClick={this.onDownloadClick.bind(this, model.url)} target='_blank'><span>Download model (Excel)</span></SmartLink>}
          </footer>
        </div>
      </article>
    )
  }
}

if (environment !== 'production') {
  ReportCard.propTypes = {
    isFeatured: T.bool,
    report: T.object,
    model: T.object
  }
}

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
                  <li className='library__list-item'>
                    <ReportCard
                      isFeatured
                      report={downloadData.current.report}
                      model={downloadData.current.model}
                    />
                  </li>
                  {downloadData.previous.map(({ report, model }) => (
                    <li key={report.url} className='library__list-item'>
                      <ReportCard
                        report={report}
                        model={model}
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
