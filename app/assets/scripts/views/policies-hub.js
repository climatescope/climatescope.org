'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { connect } from 'react-redux'
import ReactPaginate from 'react-paginate'

import { environment } from '../config'
import { fetchPolicyFilters, fetchPolicies } from '../redux/policies'
import { wrapApiResult } from '../utils/utils'
import QsState from '../utils/qs-state'

import App from './app'
import SelectControl from '../components/form-select-control'
import PoliciesTable from '../components/policies-table'
import ShareOptions from '../components/share'

/**
 * Map the values from the policies filter api to the correct format expected
 * by the form selects.
 *
 * @param {array} data The data
 */
const prepareFilter = (data = []) => ([
  { value: 'all', label: 'All' },
  ...data.map(d => ({ value: d.id, label: d.name })).sort((a, b) => a > b ? 1 : -1)
])

class Policies extends React.Component {
  constructor (props) {
    super(props)

    // Bindings.
    this.onPolicyTableSort = this.onPolicyTableSort.bind(this)
    this.onFilterReset = this.onFilterReset.bind(this)
    this.onFilterClick = this.onFilterClick.bind(this)
    this.onPageChange = this.onPageChange.bind(this)

    this.qsState = new QsState({
      country: {
        accessor: 'filters.country',
        default: 'all'
      },
      mechanism: {
        accessor: 'filters.mechanism',
        hydrator: (v) => parseInt(v),
        default: 'all'
      },
      status: {
        accessor: 'filters.status',
        hydrator: (v) => parseInt(v),
        default: 'all'
      },
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

    this.props.fetchPolicyFilters()
      .then(() => {
        // After the filters are fetched from the database we can validate
        // the options from the query string.
        // If there are no errors update the qs definitions wwith a validator.
        const { fetched, data, error } = this.props.filters
        if (fetched && !error) {
          ;['country', 'mechanism', 'status'].forEach(f => {
            this.qsState.setDefinition(f, { validator: data[f].map(o => o.id) })
          })
          this.setState({
            ...this.qsState.getState(this.props.location.search.substr(1))
          })
        }

        // Fetch the policies
        return this.fetchPolicies()
      })
  }

  fetchPolicies () {
    const perPage = 50
    return this.props.fetchPolicies({
      limit: perPage,
      offset: (this.state.page - 1) * perPage,
      'sort-on': this.state.sort.field,
      'sort-direction': this.state.sort.direction,
      ...['country', 'mechanism', 'status'].reduce((acc, filter) => {
        const val = this.state.filters[filter]
        return val !== 'all' ? { ...acc, [filter]: val } : acc
      }, {})
    })
  }

  updateUrlAndFetch () {
    // Update location.
    const qString = this.qsState.getQs(this.state)
    this.props.history.push({ search: qString })
    // Fetch policies.
    return this.fetchPolicies()
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

  onPolicyTableSort (field, direction) {
    // When changing sort, page is reset to 1.
    this.setState({
      page: 1,
      sort: {
        field,
        direction
      }
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

  renderControls () {
    // Error is handled in the main render function.
    if (this.props.filters.hasError()) return null

    const data = this.props.filters.getData()

    const country = prepareFilter(data.country)
    const mechanism = prepareFilter(data.mechanism)
    const status = prepareFilter(data.status)

    return (
      <div className='layout--hub__controls'>
        <form>
          <SelectControl
            label='Geography'
            id='policy_country'
            options={country}
            selectedOption={this.state.filters.country}
            onChange={this.onFilterFieldChange.bind(this, 'country')}
          />
          <SelectControl
            label='Mechanism'
            id='policy_mechanism'
            options={mechanism}
            selectedOption={this.state.filters.mechanism}
            onChange={this.onFilterFieldChange.bind(this, 'mechanism')}
          />
          <SelectControl
            label='Status'
            id='policy_status'
            options={status}
            selectedOption={this.state.filters.status}
            onChange={this.onFilterFieldChange.bind(this, 'status')}
          />
          <div className='control wide'>
            <button className='bttn bttn-default bttn-m restart hide-txt' onClick={this.onFilterReset}><span>Reset</span></button>
            <button className='bttn bttn-dark bttn-m' onClick={this.onFilterClick}>Filter</button>
          </div>
        </form>
      </div>
    )
  }

  renderFatalError () {
    return this.props.filters.hasError() || this.props.policiesList.hasError()
      ? <p>Something went wrong. Try again later.</p>
      : null
  }

  renderPagination () {
    if (!this.props.policiesList.isReady()) return null
    const meta = this.props.policiesList.getMeta()

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

  renderNoResults () {
    if (!this.props.policiesList.isReady()) return null

    if (!this.props.policiesList.getData().length) {
      return <p>No results avaliable with current filters.</p>
    }
  }

  render () {
    return (
      <App pageTitle='Policies' >
        <section className='layout--hub policies'>
          <header className='layout--hub__header'>
            <div className='row--contained'>
              <div className='layout--hub__heading'>
                <h1 className='layout--hub__title'>Policies</h1>
                <p className='layout--hub__lead'>Analyze more than 800 policies intended to spur clean energy development in the nations and states surveyed by Climatescope.</p>
              </div>

              <div className='layout--hub__tools'>
                <ul className='actions-menu'>
                  <li><ShareOptions url={window.location.toString()} /></li>
                </ul>
              </div>
              {this.renderControls()}
            </div>
          </header>
          <div className='layout--hub__body'>
            <div className='row--contained'>
              {this.renderFatalError()}

              {this.renderNoResults()}

              <PoliciesTable
                sortField={this.state.sort.field}
                sortDirection={this.state.sort.direction}
                loading={!this.props.policiesList.isReady()}
                policies={this.props.policiesList.getData([])}
                onSort={this.onPolicyTableSort}
              />

              {this.renderPagination()}
            </div>
          </div>
        </section>
      </App>
    )
  }
}

if (environment !== 'production') {
  Policies.propTypes = {
    fetchPolicyFilters: T.func,
    fetchPolicies: T.func,
    location: T.object,
    history: T.object,
    filters: T.object,
    policiesList: T.object
  }
}

function mapStateToProps (state) {
  return {
    filters: wrapApiResult(state.policies.filters),
    policiesList: wrapApiResult(state.policies.list)
  }
}

function dispatcher (dispatch) {
  return {
    fetchPolicyFilters: (...args) => dispatch(fetchPolicyFilters(...args)),
    fetchPolicies: (...args) => dispatch(fetchPolicies(...args))
  }
}

export default connect(mapStateToProps, dispatcher)(Policies)
