'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactGA from 'react-ga'

import { environment, baseurl } from '../config'
import { tools, downloadData } from '../utils/constants'

import App from './app'
import { ToolCard } from '../components/lib-card'
import SmartLink from '../components/smart-link'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  onDownloadClick (url) {
    const pieces = url.split('/')
    ReactGA.event({
      category: 'Data',
      action: 'Download',
      label: pieces[pieces.length - 1]
    })
  }

  render () {
    const currentReport = downloadData.current.report

    return (
      <App className='page--has-hero'>
        <section className='inpage inpage--home'>
          <header className='inpage__header'>
            <div className='inner'>
              <div className='inpage__headline'>
                <h1 className='inpage__title'>Which emerging market is the most attractive for clean energy
investment?</h1>
                <p>
                  <Link to='/results' className='home-cta-button' title='View results'><span>Ranking</span></Link>
                  <SmartLink
                    to={baseurl + currentReport.url}
                    title={currentReport.title}
                    className='home-cta-button'
                    onClick={this.onDownloadClick.bind(this, currentReport.url)}
                    target='_blank'
                  >
                    <span>Full report</span>
                  </SmartLink>
                  <Link to='/key-findings' className='home-cta-button' title='View key findings'><span>Key findings</span></Link>
                </p>
              </div>
            </div>

            <figure className='inpage__hero inpage__hero--cover'>
              <div className='inpage__hero-item'>
                <img src='../assets/graphics/layout/hero--cover.jpg' width='1920' height='1280' alt='Illustration' />
              </div>
              <figcaption className='inpage__hero-caption'>Cover image</figcaption>
            </figure>

          </header>

          <div className='inpage__body'>
            <div className='inner'>
              <div className='col--main'>
                <ol className='card-list'>
                  {tools.map(({ url, title, label, description, image }) => (
                    <li key={url} className='card-list__item'>
                      <ToolCard
                        url={url}
                        linkTitle={title}
                        title={label}
                        description={description}
                        image={image}
                      />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <section className='fold fold--editions'>
              <div className='fold__contents'>
                <header className='fold__header'>
                  <h1 className='fold__title'>About Climatescope</h1>
                  <div className='fold__lead'>
                    <p>Climatescope is a snapshot of where clean energy policy and finance stand today, and a guide to what can happen in the future.</p>
                  </div>
                </header>
                {/* <div className='fold__body'>
                  <h2>View or download our previous reports</h2>
                  <ul className='editions-menu'>
                    {editions.map(o => (
                      <li key={o.url} className='editions-menu__item'>
                        <a href={o.url} title={o.title} className='editions-menu__link'><span>{o.label}</span></a>
                      </li>
                    ))}
                  </ul>
                </div> */}
              </div>
            </section>
          </div>
        </section>
      </App>
    )
  }
}

if (environment !== 'production') {
  Home.propTypes = {
    location: T.object,
    history: T.object
  }
}

function mapStateToProps (state) {}

function dispatcher (dispatch) {}

export default connect(mapStateToProps, dispatcher)(Home)
