'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { environment } from '../config'
import { fetchPage } from '../redux/static-page'
import { getFromState } from '../utils/utils'

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

const downloadSections = [
  {
    sectionName: 'Key Findings',
    sectionUrl: '/summary',
    downloadTitle: 'Download report in PDF format',
    downloadName: 'Report (PDF)',
    downloadUrl: '/assets/data/docs/climatescope-2017-key-findings-en.pdf'
  },
  {
    sectionName: 'Methodology',
    sectionUrl: '/methodology',
    downloadTitle: 'Download report in PDF format',
    downloadName: 'Report (PDF)',
    downloadUrl: '/assets/data/docs/climatescope-2017-methodology-en.pdf'
  }
]

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

class Download extends React.Component {
  render () {
    return (
      <App>
        <article className='layout--page full'>
          <header className='layout--page__header'>
            <div className='row--contained'>
              <div className='layout--page__heading'>
                <h1 className='layout--page__title'>Download</h1>
              </div>
              <div className='layout--page__tools'>
                <ul className='actions-menu'>
                  <li><ShareOptions url={window.location.toString()} /></li>
                </ul>
              </div>
            </div>
          </header>

          <div className='layout--page__body'>
            <div className='row--contained'>
              <div className='col--main prose-copy'>
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

                <h2>Download by section</h2>
                <table className="table download-table">
                  <thead>
                    <tr>
                      <th className="th-section">Section</th>
                      <th className="th-download">Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {downloadSections.map(section => (
                      <tr key={section.sectionUrl}>
                        <td className="cell-section"><Link to={section.sectionUrl} title={`View ${section.sectionUrl} page`}>{section.sectionName}</Link></td>
                        <td className="cell-download">
                          <a href={section.downloadUrl} title={section.downloadTitle} className="bttn bttn-s bttn-success download data-download">{section.downloadName}</a>
                        </td>
                      </tr>

                    ))}
                  </tbody>
                </table>

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
  Download.propTypes = {
    fetchPage: T.func,
    match: T.object,
    page: T.object
  }
}

function mapStateToProps (state, props) {
  return {
    page: getFromState(state.staticPages, props.match.params.page)
  }
}

function dispatcher (dispatch) {
  return {
    fetchPage: (...args) => dispatch(fetchPage(...args))
  }
}

export default connect(mapStateToProps, dispatcher)(Download)
