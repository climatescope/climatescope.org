'use strict'
import React from 'react'
// import { PropTypes as T } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { environment } from '../config'

import App from './app'
import ShareOptions from '../components/share'

class Library extends React.Component {
  render () {
    return (
      <App>
        <article className='layout--page full'>
          <header className='layout--page__header'>
            <div className='row--contained'>
              <div className='layout--page__heading'>
                <h1 className='layout--page__title'>Content library</h1>
              </div>
              <div className='layout--page__tools'>
                <ul className='actions-menu'>
                  <li><ShareOptions url={window.location.toString()} /></li>
                </ul>
              </div>
            </div>
          </header>

          <div className='layout--page__body'>
            <div className='row--contained'>
              <div className='col--main prose-copy'>
                Content library includes Insights and Tools, displayed as visually engaging tiles.
                <h2>Tools</h2>
                <ul className="well-list">
                  <li><Link to='/compare' title='View results side by side'>Geography Comparison</Link></li>
                  <li><Link to='/off-grid-data-hub' title='Use the Off-grid Data Hub'>Off-grid Data Hub</Link></li>
                  <li><Link to='/clean-energy-investments' title='Use the Clean Energy Investment'>Clean Energy Investment</Link></li>
                  <li><Link to='/capacity-generation' title='Use the Capacity Generation'>Capacity Generation</Link></li>
                  <li><Link to='/policies' title='Browse the policy database'>Policies</Link></li>
                  <li><Link to='/download' title='Download the data and report'>Download</Link></li>
                </ul>
              </div>
            </div>
          </div>

        </article>
      </App>
    )
  }
}

if (environment !== 'production') {
  Library.propTypes = {
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

export default connect(mapStateToProps, dispatcher)(Library)
