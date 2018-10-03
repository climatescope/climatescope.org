'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import c from 'classnames'

import { environment, appName, appDescription } from '../config'

import PageHeader from '../components/page-header'
import PageFooter from '../components/page-footer'
import MetaTags from '../components/meta-tags'

class App extends React.Component {
  render () {
    return (
      <div className={c('page', this.props.className)}>
        <MetaTags
          title={appName}
          description={appDescription} >

          {/* Twitter */}
          <meta name='twitter:card' content='summary' />
          <meta name='twitter:site' content='@wbg_transport' />
          <meta name='twitter:image:src' content='/assets/graphics/meta/default-meta-image.png' />

          {/* OG */}
          <meta property='og:site_name' content={appName} />
          <meta property='og:url' content='www.domain.org' />
          <meta property='og:type' content='website' />
          <meta property='og:image' content='/assets/graphics/meta/default-meta-image.png' />
        </MetaTags>

        <PageHeader location={this.props.location} />
        <main className='page__body' role='main'>
          {this.props.children}
        </main>
        <PageFooter location={this.props.location} />
      </div>
    )
  }
}

if (environment !== 'production') {
  App.propTypes = {
    className: T.string,
    location: T.object,
    children: T.node,
    _hideSplash: T.func,
    splashVisible: T.bool
  }
}

export default App
