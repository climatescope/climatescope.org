'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import c from 'classnames'

import { environment, baseurl } from '../config'

import App from './app'

class Home extends React.Component {
  render () {
    return (
      <App className='page--has-hero'>
        <section className='inpage inpage--home'>
          <header className='inpage__header'>
            <div className='inner'>
              <div className='inpage__headline'>
                <h1 className='inpage__title'>Which emerging market is most atractive for clear energy investment?</h1>
                <p><Link to='/results' className='home-cta-button' title='View results'><span>Find out</span></Link></p>
              </div>
            </div>

            <figure className='inpage__hero inpage__hero--cover'>
              <div className='inpage__hero-item'>
                <img src='../assets/graphics/layout/hero--cover.jpg' width='1920' height='1280' alt='Illustration' />
              </div>
              <figcaption className='inpage__hero-caption'>
                <a href='https://landsat.visibleearth.nasa.gov/view.php?id=92412' data-title="Image by NASA's Landsat Then and Now" className='info'><span>Image by NASA's Landsat Then and Now</span></a>
              </figcaption>
            </figure>

          </header>

          <div className='inpage__body'>
            <div className='inner'>
              <div className='col--main'>

                <section className='featured-section'>
                  <h1 className='featured-section__title'>Insights</h1>
                  <div className='featured-section__body'>

                    <ol className='entry-list'>
                      <li className='entry-list__item'>
                        <article className='entry entry--short update'>
                          <div className='entry__contents'>
                            <header className='entry__header'>
                              <p className='entry__subtitle'>Read the update: date</p>
                              <a href='' title='View more' className='link-wrapper'>
                                <h1 className='entry__title'>Entry title</h1>
                              </a>
                            </header>
                            <div className='entry__body'>
                              <div className='entry__prose'>
                                <p>The data for this list will come from Medium</p>
                              </div>
                            </div>
                          </div>
                        </article>
                      </li>
                    </ol>
                  </div>
                </section>
              </div>

              <div className='col--sec'>
                <ToolsList />
              </div>

            </div>
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

function mapStateToProps (state) {
  return {
  }
}

function dispatcher (dispatch) {
  return {
  }
}

export default connect(mapStateToProps, dispatcher)(Home)

class ToolsList extends React.PureComponent {
  constructor (props) {
    super(props)

    // Define the tools to render on mount.
    const toolsList = [
      {
        title: 'Capacity Generation',
        description: 'Who has the most (and least) clean energy today?',
        url: '/capacity-generation',
        image: 'feat-tool-thumb--capacity-generation.jpg',
        darken: true
      },
      {
        title: 'Emerging Markets Cross-Border Clean Energy Investment',
        description: 'Who backs clean energy in emerging markets?',
        url: '/clean-energy-investments',
        image: 'feat-tool-thumb--clean-energy-investments.jpg',
        darken: true
      },
      {
        title: 'Compare results',
        description: 'Pick any two nations, see how they compare',
        url: '/compare',
        image: 'feat-tool-thumb--compare.jpg'
      },
      {
        title: 'Discover the Data Hub',
        description: 'Energy access rates, fuel prices, other key distributed power data',
        url: '/off-grid-data-hub',
        image: 'feat-tool-thumb--ogdatahub.jpg',
        darken: true
      },
      {
        title: 'Analyse Policy Database',
        description: '800+ policies to improve clean energy development.',
        url: '/policies',
        image: 'feat-tool-thumb--policies.jpg'
      }
    ]

    this.tools = toolsList.slice(0, 3)
  }

  render () {
    return (
      <section className='featured-section'>
        <h1 className='featured-section__title'>Tools</h1>
        <div className='featured-section__body'>
          <ul className='tools-list'>
            {this.tools.map((tool, i) => <li key={i}><ToolsListCard {...tool} /></li>)}
          </ul>
        </div>
      </section>
    )
  }
}

class ToolsListCard extends React.PureComponent {
  render () {
    const { title, description, url, image, darken } = this.props

    let style = {}
    if (image) {
      style.backgroundImage = `url(${baseurl}/assets/graphics/content/feat-tools/${image})`
    }

    return (
      <article className={c('feat-tool', { 'feat-tool--darken': darken })}>
        <Link to={url} title='View tool page' style={style}>
          <h1 className='feat-tool__title'>{title}</h1>
          <p className='feat-tool__summary'>{description}</p>
        </Link>
      </article>
    )
  }
}

if (environment !== 'production') {
  ToolsListCard.propTypes = {
    title: T.string,
    description: T.string,
    url: T.string,
    image: T.string,
    darken: T.bool
  }
}
