'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { environment } from '../config'
import { editions, tools } from '../utils/constants'
import { fetchLibraryContenType } from '../redux/libraryctypes'
import { wrapApiResult, getFromState } from '../utils/utils'

import App from './app'
import { MediumCard, ToolCard } from '../components/lib-card'

class Home extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      twitterLoaded: false
    }
  }

  componentDidMount () {
    const filter = {
      contentype: 'insights',
      limit: 6
    }
    this.props.fetchInsight(filter)
  }

  renderMediumPosts (insights) {
    return (
      <ol className='card-list'>
        {
          Array.from(insights).slice(0, 9).map((post, i) => {
            // Get correct subtitle, based on tags.
            let subtitle = 'Explore'
            if (post.tag) {
              if (post.tags.find(t => t.id === 'off-grid')) {
                subtitle = 'Market outlook'
              } else if (post.tags.find(t => t.id === 'insights')) {
                subtitle = 'Insight'
              } else if (post.tags.find(t => t.id === 'updates')) {
                subtitle = 'Updates'
              }
            }
            return (
              <li key={post.id} className='card-list__item'>
                <MediumCard
                  isFeatured={i === 0}
                  title={post.title}
                  subtitle={subtitle}
                  url={post.url}
                  description={post.description}
                  tags={post.tags}
                />
              </li>
            )
          })
        }
      </ol>
    )
  }

  render () {
    const { getData } = this.props.insightList
    const ctypesList = getData()
    return (
      <App className='page--has-hero'>
        <section className='inpage inpage--home'>
          <header className='inpage__header'>
            <div className='inner'>
              <div className='inpage__headline'>
                <h1 className='inpage__title'>Which emerging market is the most attractive for clean energy
investment?</h1>
                <p>
                  <Link to='/results' className='home-cta-button' title='View results'><span>Find out</span></Link>
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
                <section className='fsection'>
                  <header className='fsection__header'>
                    <div className='fsection__headline'>
                      <h1 className='fsection__title'>Insights</h1>
                    </div>
                    <div className='fsection__actions'>
                      <a href='/library/insights' title='View all insights' className='fsa-go'><span>View all</span></a>
                    </div>
                  </header>
                  {this.renderMediumPosts(ctypesList)}
                </section>
              </div>
              <div className='col--sec'>
                <section className='fsection fsection--tweets'>
                  <header className='fsection__header'>
                    <div className='fsection__headline'>
                      <h1 className='fsection__title'>Tools</h1>
                    </div>
                    <div className='fsection__actions'></div>
                  </header>
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
                </section>
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
                <div className='fold__body'>
                  <h2>View or download our previous reports</h2>
                  <ul className='editions-menu'>
                    {editions.map(o => (
                      <li key={o.url} className='editions-menu__item'>
                        <a href={o.url} title={o.title} className='editions-menu__link'><span>{o.label}</span></a>
                      </li>
                    ))}
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
    history: T.object,
    fetchInsight: T.func,
    insightList: T.object
  }
}

function mapStateToProps (state) {
  return {
    insightList: wrapApiResult(getFromState(state.libraryct, 'list'))
  }
}

function dispatcher (dispatch) {
  return {
    fetchInsight: (...args) => dispatch(fetchLibraryContenType(...args))

  }
}

export default connect(mapStateToProps, dispatcher)(Home)
