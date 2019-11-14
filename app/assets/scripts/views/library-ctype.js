'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { connect } from 'react-redux'
import c from 'classnames'
import ReactGA from 'react-ga'
import ReactPaginate from 'react-paginate'
import QsState from '../utils/qs-state'

import { fetchLibraryContenType } from '../redux/libraryctypes'
import { wrapApiResult, getFromState } from '../utils/utils'
import { environment, baseurl } from '../config'
import { tools } from '../utils/constants'

import App from './app'
import ShareOptions from '../components/share'
import SmartLink from '../components/smart-link'
import { ToolCard, MediumCard } from '../components/lib-card'

class ReportCard extends React.PureComponent {
  onDownloadClick (url) {
    const pieces = url.split('/')
    ReactGA.event({
      category: 'Data',
      action: 'Download',
      label: pieces[pieces.length - 1]
    })
  }

  render () {
    const { isFeatured, report, model } = this.props
    return (
      <article className={c('card card--short insight', { 'card--featured': isFeatured })} >
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
  constructor (props) {
    super(props)

    // Bindings.
    this.onFilterReset = this.onFilterReset.bind(this)
    this.onFilterClick = this.onFilterClick.bind(this)
    this.onPageChange = this.onPageChange.bind(this)

    this.qsState = new QsState({
      page: {
        accessor: 'page',
        hydrator: (v) => parseInt(v),
        default: 1,
        validator: (v) => !isNaN(v) && v > 0
      },
      sortField: {
        accessor: 'sort.field',
        default: 'name',
        validator: ['name', 'country', 'status']
      },
      sortDir: {
        accessor: 'sort.direction',
        default: 'asc',
        validator: ['asc', 'desc']
      }
    })
    this.state = {
      ...this.qsState.getState(this.props.location.search.substr(1))
    }
    this.fetchLibraryContenType()
  }

  fetchLibraryContenType () {
    const perPage = 9
    return this.props.fetchLibraryContenType(
      this.props.match.params.ctypes, {
        limit: perPage,
        offset: (this.state.page - 1) * perPage,
        'sort-on': this.state.sort.field,
        'sort-direction': this.state.sort.direction
      })
  }
  updateUrlAndFetch () {
    // Update location.
    const qString = this.qsState.getQs(this.state)
    this.props.history.push({ search: qString })
    // Fetch policies.
    return this.fetchLibraryContenType()
  }

  onFilterFieldChange (field, e) {
    const val = e.target.value
    this.setState({
      filters: {
        ...this.state.filters,
        [field]: val
      }
    })
  }
  onFilterClick (e) {
    e.preventDefault()
    // Reset page and sort.
    this.setState({
      page: 1,
      sort: this.qsState.getState('').sort
    }, () => {
      this.updateUrlAndFetch()
    })
  }
  onFilterReset (e) {
    e.preventDefault()
    this.setState({
      // Get the defaults.
      ...this.qsState.getState('')
    }, () => {
      this.updateUrlAndFetch()
    })
  }
  onPageChange ({ selected }) {
    this.setState({
      page: selected + 1
    }, () => {
      this.updateUrlAndFetch()
    })
  }

  renderNoResults () {
    if (!this.props.libraryContenTypeList.isReady()) return null

    if (!this.props.libraryContenTypeList.getData().length) {
      return <p>No posts avaliable in this library.</p>
    }
  }
  renderFatalError () {
    return this.props.libraryContenTypeList.hasError()
      ? <p>Something went wrong. Try again later.</p>
      : null
  }
  renderMediumPosts (mediumPosts) {
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

  renderPagination () {
    if (!this.props.libraryContenTypeList.isReady()) return null
    const meta = this.props.libraryContenTypeList.getMeta()

    const totalPages = Math.ceil(meta.total / meta.limit)
    if (totalPages <= 1) return null

    return (
      <div className='pagination-wrapper'>
        <ReactPaginate
          previousLabel={<span>previous</span>}
          nextLabel={<span>next</span>}
          breakLabel={<span className='pages__page'>...</span>}
          pageCount={totalPages}
          forcePage={meta.page - 1}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.onPageChange}
          containerClassName={'pagination'}
          subContainerClassName={'pages'}
          pageClassName={'pages__wrapper'}
          pageLinkClassName={'pages__page'}
          activeClassName={'active'}
        />
      </div>
    )
  }
  render () {
    const { getData } = this.props.libraryContenTypeList
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

                {this.renderPagination()}
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
    fetchLibraryContenType: T.func,
    filterLibraryContenType: T.func,
    libraryContenTypeList: T.object,
    location: T.object,
    history: T.object

  }
}

function mapStateToProps (state, props) {
  return {
    libraryContenTypeList: wrapApiResult(getFromState(state.libraryct.list, props.match.params.ctypes))
  }
}

function dispatcher (dispatch) {
  return {
    fetchLibraryContenType: (...args) => dispatch(fetchLibraryContenType(...args))

  }
}

export default connect(mapStateToProps, dispatcher)(LibraryCType)
