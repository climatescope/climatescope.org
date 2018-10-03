'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { environment } from '../config'

import App from './app'

class Home extends React.Component {
  render () {
    return (
      <App>
        <section className='layout--home'>
          <header className='layout--home__header visually-hidden'>
            <div className='row--contained'>
              <div className='layout--home__heading'>
                <h1 className='layout--home__title'>Home</h1>
              </div>
            </div>
          </header>

          <div className='layout--home__body'>
            <div className='row--contained'>
              <div className='featured-col featured-col--main'>

                <section className='featured-section'>
                  <h1 className='featured-section__title'>Insights</h1>
                  <div className='featured-section__body'>
                    <ol className='entry-list'>
                      <li>
                        <article className='entry entry--short update'>
                          <div className='entry__contents'>
                            <header className='entry__header'>
                              <p className='entry__subtitle'>Read the update: date</p>
                              <a href='' title='View more' className='link-wrapper'>
                                <h1 className='entry__title'>from medium</h1>
                              </a>
                            </header>
                            <div className='entry__body'>
                              <div className='entry__prose'>
                                <p>description</p>
                              </div>
                            </div>
                          </div>
                        </article>
                      </li>
                    </ol>
                  </div>
                </section>
              </div>

              <div className='featured-col featured-col--sec'>
                <section className='featured-section'>
                  <h1 className='featured-section__title'>Tools</h1>
                  <div className='featured-section__body'>
                    <ul className='tools-list'>
                      <li>
                        <article>
                          <a href='' title='View tool page'>
                            <h1 className='feat-tool__title'>%% tool.title %%</h1>
                            <p className='feat-tool__summary'>%% tool.description %%</p>
                          </a>
                        </article>
                      </li>
                    </ul>
                  </div>
                </section>
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
