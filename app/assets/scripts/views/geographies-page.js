'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { StickyContainer, Sticky } from 'react-sticky'

import { environment } from '../config'

import App from './app'
import GeographyMap from '../components/geography-map'

class Geography extends React.Component {
  renderNavFn ({ style }) {
    return (
      <nav className='inpage__nav' style={style}>
        <div className='inner'>
          <ul>
            <li><a href='#'>Item number 1</a></li>
            <li><a href='#'>Item number 2</a></li>
            <li><a href='#'>Item number 3</a></li>
          </ul>
        </div>
      </nav>
    )
  }

  render () {
    return (
      <App className='page--has-hero'>
        <article className='inpage inpage--geography'>

          <header className='inpage__header'>
            <div className='inner'>
              <div className='inpage__headline'>
                <p className='inpage__subtitle'>
                  <Link to='/results' title='View results page'>View all markets</Link>
                </p>
                <h1 className='inpage__title'>Geography {this.props.match.params.geoIso}</h1>
                <ul className='inpage__details'>
                  <li>
                    <strong>26.28<sub>$Bn</sub></strong>
                    <span>GDP</span>
                  </li>
                  <li>
                    <strong>41.49<sub>M</sub></strong>
                    <span>Population</span>
                  </li>
                  <li>
                    <strong>18<sub>%</sub></strong>
                    <span>Share of emissions from the heat and power sector</span>
                  </li>


                  <li>
                    <strong>41.49<sub>M</sub></strong>
                    <span>Population</span>
                  </li>
                  <li>
                    <strong>18<sub>%</sub></strong>
                    <span>Share of emissions from the heat and power sector</span>
                  </li>
                  <li>
                    <strong>41.49<sub>M</sub></strong>
                    <span>Population</span>
                  </li>
                  <li>
                    <strong>18<sub>%</sub></strong>
                    <span>Share of emissions from the heat and power sector</span>
                  </li>
                </ul>
              </div>
            </div>
            <GeographyMap />
          </header>

          <StickyContainer>
            <Sticky>
              {(props) => this.renderNavFn(props)}
            </Sticky>

            <div className='inpage__body'>


              <section className='par-section par-section--alpha'>
                <div className='par-section__contents'>
                  <header className='par-section__header'>
                    <h1 className='par-section__title'>Section title</h1>
                    <div className='par-section__description'>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                  </header>

                  <article className='info-card info-card--large info-card-1'>
                    <h1 className='info-card__title'>Card title</h1>
                    <div className='info-card__statement'>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur?</p>
                    </div>
                  </article>

                  <article className='info-card info-card--small info-card--dark info-card-2'>
                    <h1 className='info-card__title'>Card title</h1>
                    <div className='info-card__statement'>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur?</p>
                    </div>
                  </article>

                  <article className='info-card info-card--small info-card--light info-card-3'>
                    <h1 className='info-card__title'>Card title</h1>
                    <div className='info-card__statement'>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur?</p>
                    </div>
                  </article>

                  <article className='info-card info-card--small info-card--dark info-card-4'>
                    <h1 className='info-card__title'>Card title</h1>
                    <div className='info-card__statement'>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur?</p>
                    </div>
                  </article>

                  <article className='info-card info-card--medium info-card--dark info-card-5'>
                    <h1 className='info-card__title'>Card title</h1>
                    <div className='info-card__statement'>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur?</p>
                    </div>
                  </article>
                </div>
              </section>


              <section className='par-section par-section--alpha'>
                <div className='par-section__contents'>
                  <header className='par-section__header'>
                    <h1 className='par-section__title'>Section title</h1>
                    <div className='par-section__description'>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                  </header>

                  <article className='info-card info-card--small info-card--light'>
                    <h1 className='info-card__title'>Card title</h1>
                    <div className='info-card__statement'>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur?</p>
                    </div>
                  </article>

                  <article className='info-card info-card--small info-card--dark'>
                    <h1 className='info-card__title'>Card title</h1>
                    <div className='info-card__statement'>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur?</p>
                    </div>
                  </article>

                  <article className='info-card info-card--large'>
                    <h1 className='info-card__title visually-hidden'>Features</h1>
                    <table className='feature-table'>
                      <thead>
                        <tr>
                          <th><span className='visually-hidden'>Feature</span></th>
                          <th>Yes</th>
                          <th>No</th>
                          <th>Somewhat</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>
                            <h2>Standardized PPAS</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                          </th>
                          <td><span className='feature-checked'>Checked</span></td>
                          <td><span className='feature-unchecked'>Unchecked</span></td>
                          <td><span className='feature-unchecked'>Unchecked</span></td>
                        </tr>
                        <tr>
                          <th>
                            <h2>PPAS of sufficient duration</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut.</p>
                          </th>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <th>
                            <h2>Purchase obligation</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor?</p>
                          </th>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </article>
                </div>
              </section>

            </div>
          </StickyContainer>

        </article>
      </App>
    )
  }
}

if (environment !== 'production') {
  Geography.propTypes = {
    match: T.object
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

export default connect(mapStateToProps, dispatcher)(Geography)
