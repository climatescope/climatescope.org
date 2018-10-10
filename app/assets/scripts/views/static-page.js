'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { connect } from 'react-redux'

import { environment } from '../config'
import { fetchPage } from '../redux/static-page'
import { getFromState, wrapApiResult } from '../utils/utils'

import App from './app'
import UhOh from './uhoh'
import DangerouslySetScriptContent from '../components/dangerous-script-content'
import { LoadingSkeleton, LoadingSkeletonGroup } from '../components/loading-skeleton'
// import Share from '../components/share'

class StaticPage extends React.Component {
  componentDidMount () {
    this.props.fetchPage(this.props.match.params.page)
  }

  componentDidUpdate (prevProps) {
    if (prevProps.match.params.page !== this.props.match.params.page) {
      this.props.fetchPage(this.props.match.params.page)
    }
  }

  render () {
    const { hasError, data, isReady, receivedAt } = this.props.page
    if (hasError()) {
      return <UhOh />
    }

    return (
      <App>
        <article className='layout--page'>
          <header className='layout--page__header'>
            <div className='row--contained'>
              <div className='layout--page__heading'>
                <h1 className='layout--page__title'>
                  {isReady() ? data.title : <LoadingSkeleton width={2 / 3} size='large' type='heading' inline />}
                </h1>
              </div>
              <div className='layout--page__tools'>
                {/* {% include actions_menu.html download_exc=true %} */}
              </div>
            </div>
          </header>

          <div className='layout--page__body'>
            <div className='row--contained'>
              <div className='col--main prose-copy'>
                {isReady() ? (
                  <DangerouslySetScriptContent key={receivedAt} dangerousContent={data.content} />
                ) : (
                  <LoadingSkeletonGroup>
                    <LoadingSkeleton width={1 / 3} />
                    <LoadingSkeleton />
                    <LoadingSkeleton />
                    <LoadingSkeleton />
                    <LoadingSkeleton width={3 / 4} />
                  </LoadingSkeletonGroup>
                )}
              </div>
            </div>
          </div>

        </article>
      </App>
    )
  }
}

if (environment !== 'production') {
  StaticPage.propTypes = {
    fetchPage: T.func,
    match: T.object,
    page: T.object
  }
}

function mapStateToProps (state, props) {
  return {
    page: wrapApiResult(getFromState(state.staticPages, props.match.params.page))
  }
}

function dispatcher (dispatch) {
  return {
    fetchPage: (...args) => dispatch(fetchPage(...args))
  }
}

export default connect(mapStateToProps, dispatcher)(StaticPage)
