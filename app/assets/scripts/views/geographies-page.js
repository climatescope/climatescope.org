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
              <div className='inner'>
                The content
              </div>
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
