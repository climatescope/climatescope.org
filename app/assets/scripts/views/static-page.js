import React from 'react'
import { PropTypes as T } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import c from 'classnames'
import ReactGA from 'react-ga'

import { environment, baseurl } from '../config'
import { fetchPage } from '../redux/static-page'
import { getFromState, wrapApiResult } from '../utils/utils'

import App from './app'
import UhOh from './uhoh'
import DangerouslySetScriptContent from '../components/dangerous-script-content'
import {
  LoadingSkeleton,
  LoadingSkeletonGroup
} from '../components/loading-skeleton'
import ShareOptions from '../components/share'
import Dropdown from '../components/dropdown'
import { languages } from '../utils/constants'

const statePathFromUrl = params => {
  return params.ctypes
    ? `library/${params.ctypes}/${params.page}`
    : params.page
}

class StaticPage extends React.Component {
  componentDidMount () {
    const page = statePathFromUrl(this.props.match.params)
    this.props.fetchPage(page)
  }

  componentDidUpdate (prevProps) {
    const prevPage = statePathFromUrl(prevProps.match.params)
    const page = statePathFromUrl(this.props.match.params)

    if (prevPage !== page) {
      this.props.fetchPage(page)
    }
  }
  renderLangSwitcher () {
    const { getData, isReady } = this.props.page
    if (!isReady()) return null
    const data = getData()

    if (!data.availableLanguages) return null

    const currLang = languages.find(l => l.id === data.language)

    return (
      <Dropdown
        className='dropdown-content'
        triggerClassName='ipa-language'
        triggerActiveClassName='button--active'
        triggerText={currLang.label}
        triggerTitle='Toggle language options'
        direction='down'
        alignment='right'
      >
        <h2 className='drop__title'>Also available in</h2>
        <ul className='drop__menu drop__menu--select'>
          {data.availableLanguages.map(l => {
            const lang = languages.find(lang => lang.id === l)
            return (
              <li key={lang.id}>
                <Link
                  to={l === 'en' ? `/${data.id}` : `/${data.id}-${lang.id}`}
                  className={c('drop__menu-item', {
                    'drop__menu-item--active': lang.id === currLang.id
                  })}
                  title={`View page in ${lang.label}`}
                  data-hook='dropdown:close'
                >
                  <span>{lang.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </Dropdown>
    )
  }
  onDownloadClick () {
    ReactGA.event({
      category: 'Data',
      action: 'Download',
      label: 'Download file'
    })
  }
  renderDownloadButton () {
    const { getData, isReady } = this.props.page
    if (!isReady()) return null
    const data = getData()

    if (!data.download_source) return null

    return (
      <a href={`${baseurl}${data.download_source}`}
        className='ipa-download' title={`${data.title}`} download
        onClick={this.onDownloadClick} target='_blank'><span>Download</span></a>
    )
  }

  render () {
    const { hasError, getData, isReady, receivedAt } = this.props.page
    if (hasError()) {
      return <UhOh />
    }

    const data = getData()

    return (
      <App pageTitle={data.title}>
        <article className='inpage inpage--single'>
          <header className='inpage__header'>
            <div className='inner'>
              <div className='inpage__headline'>
                <h1 className='inpage__title'>
                  {isReady() ? (
                    data.title
                  ) : (
                    <LoadingSkeleton
                      width={2 / 3}
                      size='large'
                      type='heading'
                      inline
                    />
                  )}
                </h1>
              </div>
              <div className='inpage__actions'>
                {this.renderDownloadButton()}
                {this.renderLangSwitcher()}
                <ShareOptions url={window.location.toString()} />
              </div>
            </div>
          </header>

          <div className='inpage__body'>
            <div className='inner'>
              {isReady() ? (
                <DangerouslySetScriptContent
                  key={receivedAt}
                  dangerousContent={data.content}
                  className={c('col', {
                    'col--main prose': !data.embedded,
                    'col--full': data.embedded
                  })}
                />
              ) : (
                <div
                  className={c('col', {
                    'col--main prose': !data.embedded,
                    'col--full': data.embedded
                  })}
                >
                  <LoadingSkeletonGroup>
                    <LoadingSkeleton width={1 / 3} />
                    <LoadingSkeleton />
                    <LoadingSkeleton />
                    <LoadingSkeleton />
                    <LoadingSkeleton width={3 / 4} />
                  </LoadingSkeletonGroup>
                </div>
              )}
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
  const nameState = statePathFromUrl(props.match.params)
  return {
    page: wrapApiResult(getFromState(state.staticPages, nameState))
  }
}

function dispatcher (dispatch) {
  return {
    fetchPage: (...args) => dispatch(fetchPage(...args))
  }
}

export default connect(mapStateToProps, dispatcher)(StaticPage)
