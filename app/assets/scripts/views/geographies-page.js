'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { environment } from '../config'

import App from './app'
import GeographyMap from '../components/geography-map'

class Geography extends React.Component {
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
              </div>
              <div className='inpage__details'>
                <ul>
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

          <div className='inpage__body'>
            <div className='inner'>
              The content
            </div>
          </div>

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
