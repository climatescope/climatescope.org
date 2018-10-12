'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import c from 'classnames'

import { environment } from '../config'
import { fetchPage } from '../redux/static-page'

import App from './app'
// import Share from '../components/share'

class Results extends React.Component {
  render () {
    return (
      <App>
        <section className='layout--results' ng-app='globalApp'>
          <header className='layout--results__header sticky' id='parameters-controls'>
            <div className='row--contained'>
              <div className='layout--results__heading'>
                <h1 className='layout--results__title'>
                  <span>Results</span>
                </h1>
              </div>
              <div className='layout--results__tools'>
                {/* {% include actions_menu.html download_exc=true %} */}
              </div>
              <div className='layout--results__controls'>
              </div>
            </div>
          </header>

          <div className='layout--results__body'>
            <div id='index-viz' className='row--full intro'>MAP</div>
            <div className='row--contained'>
              Table
            </div>
          </div>
        </section>
      </App>
    )
  }
}

if (environment !== 'production') {
  Results.propTypes = {
    fetchPage: T.func,
    match: T.object,
    page: T.object
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

export default connect(mapStateToProps, dispatcher)(Results)
