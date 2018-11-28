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
import { MediumCategoryCard, ToolCard } from '../components/lib-card'

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
            {report && <SmartLink to={baseurl + report.url} title={report.title} className='card__download-link' onClick={this.onDownloadClick.bind(this, report.url)} target='_blank'><span>Report (PDF)</span></SmartLink>}
            {model && <SmartLink to={baseurl + model.url} title={model.title} className='card__download-link' onClick={this.onDownloadClick.bind(this, model.url)} target='_blank'><span>Model (Excel)</span></SmartLink>}
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
              <div className='col--main'>

                <h2>Insights</h2>
                <ul className='library__list'>
                  {medium.pages.map(({ url, title, label, description }) => (
                    <li key={url} className='library__list-item'>
                      <MediumCategoryCard
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

              <div className='col--sec tools'>
                <h2>Tools</h2>
                <ul className='library__list tool'>
                  {tools.map(({ url, title, label, description, image }) => (
                    <li key={url} className='library__list-item tool'>
                      <ToolCard
                        url={url}
                        linkTitle={title}
                        title={label}
                        description={description}
                        image={image}
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
