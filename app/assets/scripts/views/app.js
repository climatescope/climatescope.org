'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import c from 'classnames'
import ReactTooltip from 'react-tooltip'

import { environment, appTitle, appEdition, appDescription, baseurl } from '../config'

import PageHeader from '../components/page-header'
import PageFooter from '../components/page-footer'
import MetaTags from '../components/meta-tags'

class App extends React.Component {// The App component is always remounted when the page changes, therefore
  // scroll to the top.
  componentDidMount () {
    window.scrollTo(0, 0)
  }

  // Handle cases where the page is updated without changing
  componentDidUpdate (prevProps) {
    if (this.props.location && this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0)
    }
  }

  render () {
    const { pageTitle, className, location, children } = this.props

    const title = pageTitle ? `${pageTitle} — ` : ''
    return (
      <div className={c('page', className)}>
        <MetaTags
          title={`${title}${appTitle} ${appEdition}`}
          description={appDescription}
          imgUrl={`${baseurl}/assets/graphics/meta/default-meta-image.png`}
        >

          {/* Twitter */}
          <meta name='twitter:card' content='summary' />
          <meta name='twitter:site' content='@BloombergNEF' />

          {/* OG */}
          <meta property='og:site_name' content={appTitle} />
          <meta property='og:url' content={baseurl} />
          <meta property='og:type' content='website' />
        </MetaTags>

        <PageHeader location={location} />
        <main className='page__body' role='main'>
          {children}
        </main>
        <ReactTooltip
          id='popover-compact'
          effect='solid'
          type='custom'
          className='popover popover--compact'
          wrapper='article'
          getContent={(content) => <div className='popover__contents'>{content}</div>}
        />
        <PageFooter location={location} />
      </div>
    )
  }
}

if (environment !== 'production') {
  App.propTypes = {
    className: T.string,
    pageTitle: T.string,
    location: T.object,
    children: T.node
  }
}

export default App
