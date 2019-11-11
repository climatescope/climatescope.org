'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { connect } from 'react-redux'
import c from 'classnames'
import ReactGA from 'react-ga'

import { fetchLibraryContenType } from '../redux/libraryctypes'
import { wrapApiResult ,getFromState} from '../utils/utils'
import { environment, baseurl } from '../config'
import { tools } from '../utils/constants'

import App from './app'
import ShareOptions from '../components/share'
import SmartLink from '../components/smart-link'
import { ToolCard, MediumCard } from '../components/lib-card'


class ReportCard extends React.PureComponent {
  onDownloadClick(url) {
    const pieces = url.split('/')
    ReactGA.event({
      category: 'Data',
      action: 'Download',
      label: pieces[pieces.length - 1]
    })
  }

  render() {
    const { isFeatured, report, model } = this.props
    return (
      <article className={c('card card--short insight', { 'card--featured': isFeatured })}>
        <div className='card__contents'>
          <header className='card__header'>
            <div className='card__headline'>
              <h1 className='card__title'>{report.label}</h1>
            </div>
          </header>
          <footer>
            {report && <SmartLink to={baseurl + report.url} title={report.title} className='card__download-link' onClick={this.onDownloadClick.bind(this, report.url)} target='_blank'><span>Report (PDF)</span></SmartLink>}
            {report && model && <br />}
            {model && <SmartLink to={baseurl + model.url} title={model.title} className='card__download-link' onClick={this.onDownloadClick.bind(this, model.url)} target='_blank'><span>Model (Excel)</span></SmartLink>}
          </footer>
        </div>
      </article>
    )
  }
}

if (environment !== 'production') {
  ReportCard.propTypes = {
    isFeatured: T.bool,
    report: T.object,
    model: T.object
  }
}

class LibraryCType extends React.Component {

  componentDidMount() {
    this.props.fetchLibraryContenType(this.props.match.params.ctypes)
  }

  renderNoResults() {
    if (!this.props.libraryContenTypeList.isReady()) return null

    if (!this.props.libraryContenTypeList.getData().length) {
      return <p>No posts avaliable in this library.</p>
    }
  }
  renderFatalError() {
    return this.props.libraryContenTypeList.hasError()
      ? <p>Something went wrong. Try again later.</p>
      : null
  }
  renderMediumPosts(mediumPosts) {
    return (
      <ol className='card-list'>
        {
          Array.from(mediumPosts).map((post, i) => {
            // Get correct subtitle, based on tags.
            let subtitle = 'Explore'
            if (post.tag) {
              if (post.tags.find(t => t.id === 'off-grid')) {
                subtitle = 'Market outlook'
              } else if (post.tags.find(t => t.id === 'insights')) {
                subtitle = 'Insight'
              } else if (post.tags.find(t => t.id === 'updates')) {
                subtitle = 'Updates'
              }
            }
            return (
              <li key={post.id} className='card-list__item'>
                <MediumCard
                  isFeatured={i === 0}
                  title={post.title}
                  subtitle={subtitle}
                  url={post.url}
                  description={post.description}
                  tags={post.tags}
                />
              </li>
            )
          })
        }
      </ol>
    )
  }

  render() {
    const { isReady, hasError, getData } = this.props.libraryContenTypeList
    const ctypesList = getData()
    return (
      <App pageTitle='Content Library' >
        <article className='inpage inpage--library'>
          <header className='inpage__header'>
            <div className='inner'>
              <div className='inpage__headline'>
                <h1 className='inpage__title'>Content library </h1>
              </div>
              <div className='inpage__actions'>
                <ShareOptions url={window.location.toString()} />
              </div>
            </div>
          </header>

          <div className='inpage__body'>
            <div className='inner'>
              <div className='col--main'>
                <h2>{this.props.match.params.ctypes.replace(/-/g, ' ')}</h2>

                {this.renderFatalError()}

                {this.renderNoResults()}

                {this.renderMediumPosts(ctypesList)}
              </div>

              <div className='col--sec tools'>
                <h2>Tools</h2>
                <ul className='card-list'>
                  {tools.map(({ url, title, label, description, image }) => (
                    <li key={url} className='card-list__item'>
                      <ToolCard
                        url={url}
                        linkTitle={title}
                        title={label}
                        description={description}
                        image={image}
                      />
                    </li>
                  ))}
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
  LibraryCType.propTypes = {

  }
}

function mapStateToProps(state, props) {
  return {
    libraryContenTypeList: wrapApiResult(state.libraryct.list,props.match.params.ctypes)  }
}

function dispatcher(dispatch) {
  return {
    fetchLibraryContenType: (...args) => dispatch(fetchLibraryContenType(...args))

  }
}

export default connect(mapStateToProps, dispatcher)(LibraryCType)
