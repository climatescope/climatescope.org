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
                <a href='https://landsat.visibleearth.nasa.gov/view.php?id=92412' data-tip="Image by NASA's Landsat Then and Now" data-for='popover-compact' className='info'><span>Image by NASA's Landsat Then and Now</span></a>
              </figcaption>
            </figure>

          </header>

          <div className='inpage__body'>
            <div className='inner'>
              <div className='col--main'>
                <section className='fsection'>
                  <h1 className='fsection__title'>Insights</h1>
                  <ol className='card-list'>
                    <li className='card-list__item'>
                      <article className='card card--short card--featured insight'>
                        <div className='card__contents'>
                          <header className='card__header'>
                            <div className='card__headline'>
                              <a href='#' title='Read insight' className='link-wrapper'>
                                <p className='card__subtitle'>Explore the Report</p>
                                <h1 className='card__title'>Lorem ipsum dolor sit amet</h1>
                              </a>
                            </div>
                          </header>
                          <div className='card__body'>
                            <div className='card__prose'>
                              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
                            </div>
                          </div>
                          <footer>
                            <h2 className='visually-hidden'>Topics</h2>
                            <ul className='topics-list'>
                              <li><a href='#' class="topic-link" title='Brose Insights by Topic'><span>Energy</span></a></li>
                              <li><a href='#' class="topic-link" title='Brose Insights by Topic'><span>Investment</span></a></li>
                              <li><a href='#' class="topic-link" title='Brose Insights by Topic'><span>Policies</span></a></li>
                            </ul>
                            <a href='#' title='Read insight' className='card__go-link'><span>Read article</span></a>
                          </footer>
                        </div>
                      </article>
                    </li>

                    <li className='card-list__item'>
                      <article className='card card--short insight'>
                        <div className='card__contents'>
                          <header className='card__header'>
                            <div className='card__headline'>
                              <a href='#' title='Read insight' className='link-wrapper'>
                                <p className='card__subtitle'>Explore the Report</p>
                                <h1 className='card__title'>Lorem ipsum dolor sit amet</h1>
                              </a>
                            </div>
                          </header>
                          <div className='card__body'>
                            <div className='card__prose'>
                              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
                            </div>
                          </div>
                          <footer>
                            <h2 className='visually-hidden'>Topics</h2>
                            <ul className='topics-list'>
                              <li><a href='#' class="topic-link" title='Brose Insights by Topic'><span>Energy</span></a></li>
                              <li><a href='#' class="topic-link" title='Brose Insights by Topic'><span>Investment</span></a></li>
                              <li><a href='#' class="topic-link" title='Brose Insights by Topic'><span>Policies</span></a></li>
                            </ul>
                            <a href='#' title='Read insight' className='card__go-link'><span>Read article</span></a>
                          </footer>
                        </div>
                      </article>
                    </li>

                    <li className='card-list__item'>
                      <article className='card card--short insight'>
                        <div className='card__contents'>
                          <header className='card__header'>
                            <div className='card__headline'>
                              <a href='#' title='Read insight' className='link-wrapper'>
                                <p className='card__subtitle'>Explore the Report</p>
                                <h1 className='card__title'>Lorem ipsum dolor sit amet</h1>
                              </a>
                            </div>
                          </header>
                          <div className='card__body'>
                            <div className='card__prose'>
                              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
                            </div>
                          </div>
                          <footer>
                            <h2 className='visually-hidden'>Topics</h2>
                            <ul className='topics-list'>
                              <li><a href='#' class="topic-link" title='Brose Insights by Topic'><span>Energy</span></a></li>
                              <li><a href='#' class="topic-link" title='Brose Insights by Topic'><span>Investment</span></a></li>
                              <li><a href='#' class="topic-link" title='Brose Insights by Topic'><span>Policies</span></a></li>
                            </ul>
                            <a href='#' title='Read insight' className='card__go-link'><span>Read article</span></a>
                          </footer>
                        </div>
                      </article>
                    </li>

                    <li className='card-list__item'>
                      <article className='card card--short insight'>
                        <div className='card__contents'>
                          <header className='card__header'>
                            <div className='card__headline'>
                              <a href='#' title='Read insight' className='link-wrapper'>
                                <p className='card__subtitle'>Explore the Report</p>
                                <h1 className='card__title'>Lorem ipsum dolor sit amet</h1>
                              </a>
                            </div>
                          </header>
                          <div className='card__body'>
                            <div className='card__prose'>
                              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
                            </div>
                          </div>
                          <footer>
                            <h2 className='visually-hidden'>Topics</h2>
                            <ul className='topics-list'>
                              <li><a href='#' class="topic-link" title='Brose Insights by Topic'><span>Energy</span></a></li>
                              <li><a href='#' class="topic-link" title='Brose Insights by Topic'><span>Investment</span></a></li>
                              <li><a href='#' class="topic-link" title='Brose Insights by Topic'><span>Policies</span></a></li>
                            </ul>
                            <a href='#' title='Read insight' className='card__go-link'><span>Read article</span></a>
                          </footer>
                        </div>
                      </article>
                    </li>

                    <li className='card-list__item'>
                      <article className='card card--short insight'>
                        <div className='card__contents'>
                          <header className='card__header'>
                            <div className='card__headline'>
                              <a href='#' title='Read insight' className='link-wrapper'>
                                <p className='card__subtitle'>Explore the Report</p>
                                <h1 className='card__title'>Lorem ipsum dolor sit amet</h1>
                              </a>
                            </div>
                          </header>
                          <div className='card__body'>
                            <div className='card__prose'>
                              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
                            </div>
                          </div>
                          <footer>
                            <h2 className='visually-hidden'>Topics</h2>
                            <ul className='topics-list'>
                              <li><a href='#' class="topic-link" title='Brose Insights by Topic'><span>Energy</span></a></li>
                              <li><a href='#' class="topic-link" title='Brose Insights by Topic'><span>Investment</span></a></li>
                              <li><a href='#' class="topic-link" title='Brose Insights by Topic'><span>Policies</span></a></li>
                            </ul>
                            <a href='#' title='Read insight' className='card__go-link'><span>Read article</span></a>
                          </footer>
                        </div>
                      </article>
                    </li>
                  </ol>
                </section>
              </div>
              <div className='col--sec'>
                <section className='fsection'>
                  <h1 className='fsection__title'>Tweets</h1>
                  <p>Twitter feed.</p>
                </section>
              </div>
            </div>
            <section className='fold fold--editions'>
              <div className='fold__contents'>
                <header className='fold__header'>
                  <h1 className='fold__title'>About Climatescope</h1>
                  <div className='fold__lead'>
                    <p>Climatescope is a snapshot of where clean energy policy and finance stand today, and a guide to what can happen in the feature.</p>
                  </div>
                </header>
                <div className='fold__body'>
                  <h2>View or download our previous reports</h2>
                  <ul className='editions-menu'>
                    <li className='editions-menu__item'>
                      <a href='http://2014.global-climatescope.org' title='View 2014 Edition' className='editions-menu__link'><span>2014</span></a>
                    </li>
                    <li className='editions-menu__item'>
                      <a href='http://2015.global-climatescope.org' title='View 2015 Edition' className='editions-menu__link'><span>2015</span></a>
                    </li>
                    <li className='editions-menu__item'>
                      <a href='http://2016.global-climatescope.org' title='View 2016 Edition' className='editions-menu__link'><span>2016</span></a>
                    </li>
                    <li className='editions-menu__item'>
                      <a href='http://2017.global-climatescope.org' title='View 2017 Edition' className='editions-menu__link'><span>2017</span></a>
                    </li>
                  </ul>
                </div>
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
