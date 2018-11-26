'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import c from 'classnames'

import { environment } from '../config'
import { wrapApiResult, getFromState } from '../utils/utils'
import { fetchPolicyCountryStats } from '../redux/policies'
import { LoadingSkeletonGroup, LoadingSkeleton } from './loading-skeleton'

// Connected component.

class AvailabilityOfPolicies extends React.PureComponent {
  componentDidMount () {
    this.props.fetchPolicyCountryStats(this.props.geoIso)
  }

  componentDidUpdate (prevProps) {
    if (prevProps.geoIso !== this.props.geoIso) {
      this.props.fetchPolicyCountryStats(this.props.geoIso)
    }
  }

  render () {
    const { size, geoIso, stats: { isReady, hasError, getData } } = this.props
    const { total, mechanisms } = getData()

    return (
      <article className={c('info-card info-card--light chart-availability-policies', {
        [`info-card--${size}`]: !!size
      })}>
        <div className='info-card__headline'>
          <h1 className='info-card__title'>Availability of policies</h1>
          <Link to={`/policies?country=${geoIso}`} title='View all geography policies'>View all policies{isReady() && ` (${total})`}</Link>
        </div>

        {hasError() && (
          <p>Something went wrong. Try again.</p>
        )}

        {!isReady() && (
          <LoadingSkeletonGroup style={{ marginTop: '2rem' }}>
            <LoadingSkeleton size='large' width={1 / 8} />
            <LoadingSkeleton width={1 / 4} style={{ height: '10rem' }} />
          </LoadingSkeletonGroup>
        )}

        {isReady() && !hasError() && (
          <ul className='card-percent-list'>
            {mechanisms.map(mech => (
              <li key={mech.id}>
                <dl className='card-percent'>
                  <dt>{mech.name}</dt>
                  <dd>
                    <span>{mech.count}</span>
                    <div className='card-percent-bar'>
                      {mech.count > 0 && <div style={{ height: `${mech.count / total * 100}%` }}></div>}
                    </div>
                  </dd>
                </dl>
              </li>
            ))}
          </ul>
        )}
      </article>
    )
  }
}

if (environment !== 'production') {
  AvailabilityOfPolicies.propTypes = {
    fetchPolicyCountryStats: T.func,
    stats: T.object,
    size: T.string,
    geoIso: T.string
  }
}

function mapStateToProps (state, props) {
  return {
    stats: wrapApiResult(getFromState(state.policies.countryStats, props.geoIso))
  }
}

function dispatcher (dispatch) {
  return {
    fetchPolicyCountryStats: (...args) => dispatch(fetchPolicyCountryStats(...args))
  }
}

export default connect(mapStateToProps, dispatcher)(AvailabilityOfPolicies)
