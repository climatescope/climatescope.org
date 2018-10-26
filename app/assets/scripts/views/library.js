'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { environment } from '../config'

import App from './app'
import ShareOptions from '../components/share'
const downloadData = {
  full: [
    {
      url: '/assets/data/reports/climatescope-2017-report-en.pdf',
      title: 'Download full report in PDF',
      label: 'PDF',
      size: '5Mb'
    }
  ],
  model: [
    {
      url: '/assets/data/model/climatescope-2017.xlsm',
      title: 'Download Climatescope model in Excel format',
      label: 'Excel',
      size: '8Mb'
    },
    {
      url: '/assets/data/climatescope-full-2017.csv',
      title: 'Download raw data in CSV format',
      label: 'CSV',
      size: '0.3Mb'
    }
  ],
  fullPrevious: [
    {
      url: '/assets/data/reports/climatescope-2016-report-en.pdf',
      title: 'Download full report in PDF',
      label: '2016 (PDF)',
      size: '9Mb'
    },
    {
      url: '/assets/data/reports/climatescope-2015-report-en.pdf',
      title: 'Download full report in PDF',
      label: '2015 (PDF)',
      size: '6Mb'
    },
    {
      url: '/assets/data/reports/climatescope-2014-report-en.pdf',
      title: 'Download full report in PDF',
      label: '2014 (PDF)',
      size: '6Mb'
    },
    {
      url: '/assets/data/reports/climatescope-2013-report-en.pdf',
      title: 'Download full report in PDF',
      label: '2013 (PDF)',
      size: '10Mb'
    },
    {
      url: '/assets/data/reports/climatescope-2012-report-en.pdf',
      title: 'Download full report in PDF',
      label: '2012 (PDF)',
      size: '9Mb'
    }
  ],
  sourcePrevious: [
    {
      url: '/assets/data/model/climatescope-2016.xlsm',
      title: 'Download Climatescope model in Excel format',
      label: '2016 (Excel)',
      size: '6Mb'
    },
    {
      url: '/assets/data/model/climatescope-2015.xlsm',
      title: 'Download Climatescope model in Excel format',
      label: '2015 (Excel)',
      size: '6Mb'
    },
    {
      url: '/assets/data/model/climatescope-2014.xlsm',
      title: 'Download Climatescope model in Excel format',
      label: '2014 (Excel)',
      size: '5Mb'
    },
    {
      url: '/assets/data/model/climatescope-2013.xlsm',
      title: 'Download Climatescope model in Excel format',
      label: '2013 (Excel)',
      size: '1Mb'
    }
  ]
}

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

const ToolCard = ({ url, linkTitle, title, description }) => (
  <article className='ccard ccard--tools'>
    <Link to={url} title={linkTitle} className='ccard__contents'>
      <h1 className='ccard__title'>{title}</h1>
      <p className='ccard__description'>{description}</p>
    </Link>
  </article>
)

if (environment !== 'production') {
  ToolCard.propTypes = {
    url: T.string,
    linkTitle: T.string,
    title: T.string,
    description: T.string
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

                <h2>Tools</h2>
                <ul className='tools'>
                  <li className='tools__list-item'>
                    <ToolCard
                      url='/compare'
                      linkTitle='View results side by side'
                      title='Geography Comparison'
                      description='Pick any two nations, see how they compare'
                    />
                  </li>
                  <li className='tools__list-item'>
                    <ToolCard
                      url='/off-grid-data-hub'
                      linkTitle='Use the Off-grid Data Hub'
                      title='Off-grid Data Hub'
                      description='Energy access rates, fuel prices, other key distributed power data'
                    />
                  </li>
                  <li className='tools__list-item'>
                    <ToolCard
                      url='/clean-energy-investments'
                      linkTitle='Use the Clean Energy Investment'
                      title='Clean Energy Investment'
                      description='Who backs clean energy in emerging markets?'
                    />
                  </li>
                  <li className='tools__list-item'>
                    <ToolCard
                      url='/capacity-generation'
                      linkTitle='Use the Capacity Generation'
                      title='Capacity Generation'
                      description='Who has the most (and least) clean enery today?'
                    />
                  </li>
                  <li className='tools__list-item'>
                    <ToolCard
                      url='/policies'
                      linkTitle='Browse the policy database'
                      title='Policies'
                      description='800+ policies to improve clean enery development'
                    />
                  </li>
                </ul>

                <h2>Download</h2>
                <ul className="well-list">
                  <li>
                    <DownloadWell
                      type='pdf'
                      title='Full Report'
                      description='Download the full Climatescope 2017 report.'
                      items={downloadData.full} />
                  </li>
                  <li>
                    <DownloadWell
                      type='data'
                      title='Model'
                      description='Download the Climatescope model and raw data.'
                      items={downloadData.model} />
                  </li>
                </ul>

                <h2>Previous editions</h2>
                <ul className="well-list">
                  <li>
                    <DownloadWell
                      type='pdf'
                      title='Full Report'
                      description='Download the full Climatescope report.'
                      items={downloadData.fullPrevious} />
                  </li>
                  <li>
                    <DownloadWell
                      type='data'
                      title='Source Data'
                      description='Download the complete set of underlying data.'
                      items={downloadData.sourcePrevious} />
                  </li>
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
