'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Timeline } from 'react-twitter-widgets'
import c from 'classnames'

import { environment } from '../config'
import { editions, downloadData } from '../utils/constants'
import { fetchMediumPosts } from '../redux/medium'
import { wrapApiResult } from '../utils/utils'
import { initializeArrayWithRange } from '../utils/array'

import App from './app'
import { LoadingSkeletonGroup, LoadingSkeleton } from '../components/loading-skeleton'

const MediumCard = ({ isLoading, isFeatured, title, subtitle, url, description, tags }) => (
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
              <a href={url} title='Read insight' className='link-wrapper'>
                <p className='card__subtitle'>{subtitle}</p>
                <h1 className='card__title'>{title}</h1>
              </a>
            </div>
          </header>
          <div className='card__body'>
            <div className='card__prose'>
              <p>{description}</p>
            </div>
          </div>
          <footer>
            {tags.length && (
              <>
                <h2 className='visually-hidden'>Topics</h2>
                <ul className='topics-list'>
                  {tags.map(t => (
                    <li key={t.id}><a href={t.url} className='topic-link' title='Browse Insights by Topic'><span>{t.name}</span></a></li>
                  ))}
                </ul>
              </>
            )}
            <a href={url} title='Read insight' className='card__go-link'><span>Read article</span></a>
          </footer>
        </>
      )}
    </div>
  </article>
)

if (environment !== 'production') {
  MediumCard.propTypes = {
    isLoading: T.bool,
    isFeatured: T.bool,
    title: T.string,
    subtitle: T.string,
    url: T.string,
    description: T.string,
    tags: T.array
  }
}

class Home extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      twitterLoaded: false
    }
  }

  componentDidMount () {
    this.props.fetchMediumPosts()
  }

  renderMediumPosts () {
    const { isReady, getData, hasError } = this.props.mediumPosts
    const posts = getData([])

    if (hasError()) {
      return <p>Something went wrong. Try again.</p>
    }

    return (
      <ol className='card-list'>
        {isReady() ? (
          posts.slice(0, 9).map((post, i) => {
            // Get correct subtitle, based on tags.
            let subtitle = 'Explore'
            if (post.tags.find(t => t.id === 'off-grid')) {
              subtitle = 'Market outlook'
            } else if (post.tags.find(t => t.id === 'insights')) {
              subtitle = 'Insight'
            } else if (post.tags.find(t => t.id === 'updates')) {
              subtitle = 'Updates'
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
        ) : (
          initializeArrayWithRange(2).map(i => (
            <li key={i} className='card-list__item'>
              <MediumCard isLoading />
            </li>
          ))
        )}
      </ol>
    )
  }

  render () {
    return (
      <App className='page--has-hero'>
        <section className='inpage inpage--home'>
          <header className='inpage__header'>
            <div className='inner'>
              <div className='inpage__headline'>
                <h1 className='inpage__title'>Which emerging market is the most attractive for clean energy
investment?</h1>
                <p>
                  <Link to='/results' className='home-cta-button' title='View results'><span>Discover the ranking</span></Link>
                  <a href={downloadData.current.report.url} className='home-cta-button' title='View results' target='_blank'><span>Read the report</span></a>
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
                      <a href='https://medium.com/climatescope' title='View all insights' className='fsa-go'><span>View all</span></a>
                    </div>
                  </header>
                  {this.renderMediumPosts()}
                </section>
              </div>
              <div className='col--sec'>
                <section className='fsection fsection--tweets'>
                  <header className='fsection__header'>
                    <div className='fsection__headline'>
                      <h1 className='fsection__title'>Tweets</h1>
                    </div>
                    <div className='fsection__actions'>
                      <a href='https://twitter.com/BloombergNEF' title='View all tweets' className='fsa-go'><span>View all</span></a>
                    </div>
                  </header>
                  {!this.state.twitterLoaded && (
                    <>
                      <LoadingSkeletonGroup>
                        <LoadingSkeleton type='heading' width={3 / 4} />
                        <LoadingSkeleton type='heading' width={2 / 3} />
                        <LoadingSkeleton />
                        <LoadingSkeleton />
                        <LoadingSkeleton />
                        <LoadingSkeleton width={1 / 4} />
                      </LoadingSkeletonGroup>

                      <LoadingSkeletonGroup>
                        <LoadingSkeleton type='heading' width={1 / 3} />
                        <LoadingSkeleton />
                        <LoadingSkeleton />
                        <LoadingSkeleton width={1 / 4} />
                      </LoadingSkeletonGroup>
                    </>
                  )}
                  <div style={{ display: this.state.twitterLoaded ? 'block' : 'none' }} className='timeline-wrapper'>
                    <Timeline
                      dataSource={{
                        sourceType: 'profile',
                        screenName: 'BloombergNEF'
                      }}
                      options={{
                        chrome: 'noheader noborders nofooter noscrollbar',
                        height: '100%'
                      }}
                      onLoad={() => this.setState({ twitterLoaded: true })}
                    />
                  </div>
                </section>
              </div>
            </div>
            <section className='fold fold--editions'>
              <div className='fold__contents'>
                <header className='fold__header'>
                  <h1 className='fold__title'>About Climatescope</h1>
                  <div className='fold__lead'>
                    <p>The Climatescope project involves 42  BloombergNEF analysts compiling detailed data on 103 developing nations, and making visits to 54 countries in 2018.</p>
                  </div>
                </header>
                <div className='fold__body'>
                  <h2>Revisit Climatescope</h2>
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
    fetchMediumPosts: T.func,
    location: T.object,
    history: T.object,
    mediumPosts: T.object
  }
}

function mapStateToProps (state) {
  return {
    mediumPosts: wrapApiResult(state.medium.postList)
  }
}

function dispatcher (dispatch) {
  return {
    fetchMediumPosts: (...args) => dispatch(fetchMediumPosts(...args))
  }
}

export default connect(mapStateToProps, dispatcher)(Home)
