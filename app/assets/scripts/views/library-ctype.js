'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { connect } from 'react-redux'
import c from 'classnames'
import ReactPaginate from 'react-paginate'
import QsState from '../utils/qs-state'

import { fetchLibraryContentType } from '../redux/libraryctypes'
import { wrapApiResult, getFromState } from '../utils/utils'
import { environment } from '../config'
import { libraryCType } from '../utils/constants'

import App from './app'
import ShareOptions from '../components/share'
import { MediumCard } from '../components/lib-card'
import Dropdown from '../components/dropdown'

const contentTypes = libraryCType.pages

class LibraryCType extends React.Component {
  constructor (props) {
    super(props)

    // Bindings.
    this.onCTClick = this.onCTClick.bind(this)
    this.onPageChange = this.onPageChange.bind(this)

    this.qsState = new QsState({
      page: {
        accessor: 'page',
        hydrator: v => parseInt(v),
        default: 1,
        validator: v => !isNaN(v) && v > 0
      },
      type: {
        accessor: 'contentType',
        default: 'all',
        validator: ['all'].concat(contentTypes.map(r => r.id))
      }
    })
    this.state = {
      ...this.qsState.getState(this.props.location.search.substr(1))
    }
    this.fetchLibraryContentType()
  }

  fetchLibraryContentType () {
    const perPage = 11
    return this.props.fetchLibraryContentType({
      limit: perPage,
      offset: (this.state.page - 1) * perPage,
      'contentType': this.state.contentType
    })
  }

  updateUrlAndFetch () {
    // Update location.
    const qString = this.qsState.getQs(this.state)
    this.props.history.push({ search: qString })
    // Fetch policies.
    return this.fetchLibraryContentType()
  }

  onCTClick (ctId, e) {
    e.preventDefault()
    this.setState({
      contentType: ctId,
      page: 1
    }, () => {
      // Update location.
      const qString = this.qsState.getQs(this.state)
      this.props.history.push({ search: qString })
      this.fetchLibraryContentType()
    }
    )
  }

  onPageChange ({ selected }) {
    this.setState({
      page: selected + 1
    }, () => {
      this.updateUrlAndFetch()
    })
  }

  renderTitle () {
    const ctType = contentTypes.find(r => r.id === this.state.contentType)
    const triggerText = ctType ? ctType.label : 'All insights'

    return (
      <h1 className='inpage__title'>
        <span>Viewing&nbsp;</span>
        <em>
          <Dropdown
            className='insights-drop'
            triggerElement='a'
            triggerClassName='drop__toggle drop__toggle--caret'
            triggerActiveClassName='button--active'
            triggerText={triggerText}
            triggerTitle='Filter by content type'
            direction='down'
            alignment='left'
          >
            <h6 className='drop__title'>Select Insight</h6>
            <ul className='drop__menu drop__menu--select'>
              <li>
                <a
                  href='#'
                  title='View all articles'
                  onClick={this.onCTClick.bind(this, 'all')}
                  data-hook='dropdown:close'
                  className={c('drop__menu-item', {
                    'drop__menu-item--active': this.state.contentType === 'all'
                  })}
                >
                  All insights
                </a>
              </li>
              {contentTypes.map(r => (
                <li key={r.id}>
                  <a
                    href='#'
                    title={`View ${r.label} articles`}
                    onClick={this.onCTClick.bind(this, r.id)}
                    data-hook='dropdown:close'
                    className={c('drop__menu-item', {
                      'drop__menu-item--active': r.id === this.state.contentType
                    })}
                  >
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </Dropdown>
        </em>
      </h1>
    )
  }

  renderNoResults () {
    if (!this.props.libraryContenTypeList.isReady()) return null

    if (!this.props.libraryContenTypeList.getData().length) {
      return <p>No posts available in this library.</p>
    }
  }

  renderFatalError () {
    return this.props.libraryContenTypeList.hasError() ? (
      <p>Something went wrong. Try again later.</p>
    ) : null
  }

  renderMediumPosts (mediumPosts) {
    const { contentType, page } = this.state
    return (
      <ol className='card-list'>
        {Array.from(mediumPosts).map((post, i) => {
          // Get correct subtitle, based on tags.
          const ctType = contentTypes.find(r => r.id === post.type)
          const subtitle = ctType ? ctType.label : 'Explore'
          const match = post.date.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)
          const postDate = match ? match[0] : null

          return (
            <li
              key={post.id}
              className={c('card-list__item', {
                'card-list__item--hero':
                  i === 0 && contentType === 'all' && page === 1
              })}
            >
              <MediumCard
                className={`card-medium--${post.type}`}
                title={post.title}
                subtitle={subtitle}
                url={post.url}
                date={postDate}
                description={post.description}
                tags={post.tags}
              />
            </li>
          )
        })}
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
      <App pageTitle='Content Library'>
        <article className='inpage inpage--library'>
          <header className='inpage__header'>
            <div className='inner'>
              <div className='inpage__headline'>{this.renderTitle()}</div>
              <div className='inpage__actions'>
                <ShareOptions url={window.location.toString()} />
              </div>
            </div>
          </header>

          <div className='inpage__body'>
            <div className='inner'>
              <div className='col--main'>
                {this.renderFatalError()}
                {this.renderNoResults()}

                {this.renderMediumPosts(ctypesList)}
                {this.renderPagination()}
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
    fetchLibraryContentType: T.func,
    filterLibraryContenType: T.func,
    libraryContenTypeList: T.object,
    location: T.object,
    history: T.object
  }
}

function mapStateToProps (state, props) {
  return {
    libraryContenTypeList: wrapApiResult(getFromState(state.libraryct, 'list'))
  }
}

function dispatcher (dispatch) {
  return {
    fetchLibraryContentType: (...args) =>
      dispatch(fetchLibraryContentType(...args))
  }
}

export default connect(mapStateToProps, dispatcher)(LibraryCType)
