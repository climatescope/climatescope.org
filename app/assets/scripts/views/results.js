'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { connect } from 'react-redux'
import c from 'classnames'
import orderBy from 'lodash.orderby'
import { StickyContainer, Sticky } from 'react-sticky'

import { environment } from '../config'
import QsState from '../utils/qs-state'
import { fetchCountries } from '../redux/countries'
import { wrapApiResult } from '../utils/utils'

import App from './app'
import { SliderControlGroup } from '../components/slider-controls'
import ResultsMap from '../components/results-map'
import ResultsTable from '../components/results-table'
import Dropdown from '../components/dropdown'
import ShareOptions from '../components/share'

class Results extends React.Component {
  constructor (props) {
    super(props)

    // Bindings
    this.onWeightsResetClick = this.onWeightsResetClick.bind(this)
    this.onSliderGroupChange = this.onSliderGroupChange.bind(this)
    this.onSortChange = this.onSortChange.bind(this)

    this.sliders = [
      {
        id: 'fundamentals',
        name: 'Fundamentals',
        startingValue: 40
      },
      {
        id: 'opportunities',
        name: 'Opportunities',
        startingValue: 40
      },
      {
        id: 'experience',
        name: 'Experience',
        startingValue: 20
      }
    ]

    this.regions = [
      {
        id: 'all',
        name: 'All regions'
      },
      {
        id: 'asia',
        name: 'Asia'
      },
      {
        id: 'africa',
        name: 'Africa'
      },
      {
        id: 'eu',
        name: 'Europe'
      },
      {
        id: 'lac',
        name: 'Latin America and The Caribbean'
      },
      {
        id: 'me',
        name: 'Middle East'
      }
    ]

    this.qsState = new QsState({
      region: {
        accessor: 'region',
        default: 'all',
        validator: this.regions.map(r => r.id)
      }
    })

    this.state = {
      ...this.qsState.getState(this.props.location.search.substr(1)),
      sliders: this.getInitialSliderState(),
      sort: {
        field: 'rank',
        dir: 'asc'
      }
    }
  }

  getInitialSliderState () {
    return this.sliders.reduce((acc, v) => ({
      ...acc,
      [v.id]: {
        value: v.startingValue,
        locked: false
      }
    }), {})
  }

  componentDidMount () {
    this.props.fetchCountries()
  }

  onWeightsResetClick (e) {
    e.preventDefault()
    this.setState({
      sliders: this.getInitialSliderState()
    })
  }

  onSliderGroupChange (sliderValues) {
    this.setState({
      sliders: sliderValues
    })
  }

  onRegionClick (regionId, e) {
    e.preventDefault()
    this.setState({
      region: regionId
    }, () => {
      // Update location.
      const qString = this.qsState.getQs(this.state)
      this.props.history.push({ search: qString })
    })
  }

  onSortChange (field, dir) {
    this.setState({
      sort: { field, dir }
    })
  }

  renderTitle () {
    const triggerText = this.regions.find(r => r.id === this.state.region).name

    return (
      <h1 className='layout--results__title'>
        <span>Results for&nbsp;</span>
        <em>
          <Dropdown
            className='dropdown-content'
            triggerElement='a'
            triggerClassName='dropdown-toggle caret'
            triggerActiveClassName='button--active'
            triggerText={triggerText}
            triggerTitle='Filter by region'
            direction='down'
            alignment='center' >
            <ul className='dropdown-menu'>
              {this.regions.map(r => (
                <li key={r.id}><a href='#' title={`view ${r.name} results`} onClick={this.onRegionClick.bind(this, r.id)} data-hook='dropdown:close'>{r.name}</a></li>
              ))}
            </ul>
          </Dropdown>
        </em>
      </h1>
    )
  }

  renderHeaderFn ({ style, isSticky }) {
    const klass = c('layout--results__header', {
      'sticky': isSticky
    })

    return (
      <header id='parameters-controls' className={klass} style={style}>
        <div className='row--contained'>
          <div className='layout--results__heading'>
            {this.renderTitle()}
          </div>
          <div className='layout--results__tools'>
            <ul className='actions-menu'>
              <li><ShareOptions url={window.location.toString()} /></li>
            </ul>
          </div>
          <div className='layout--results__controls'>
            <div id='vis-controls' className='slider-group'>
              <h2 className='prime-title'>Calculate your own score</h2>
              <a href='#' className='reset' title='Reset topic weights' onClick={this.onWeightsResetClick}><span>Reset</span></a>

              <SliderControlGroup
                sliders={this.sliders}
                values={this.state.sliders}
                onChange={this.onSliderGroupChange}
              />

            </div>
          </div>
        </div>
      </header>
    )
  }

  renderResultsTable () {
    const { isReady, getData } = this.props.countriesList
    const { sliders } = this.state

    let tableData = getData([]).map(geography => {
      const topics = geography.topics.map(t => {
        return {
          id: t.id,
          name: t.name,
          // The first is always the most recent year.
          value: t.data[0].value,
          weight: sliders[t.id].value
        }
      })
      return {
        iso: geography.iso,
        name: geography.name,
        grid: geography.grid === 'on',
        topics,
        score: topics.reduce((acc, t) => acc + t.value * (t.weight / 100), 0)
      }
    })

    // Sort by the score.
    tableData = orderBy(tableData, 'score', 'desc')

    // Add the rank. After scoring, the rank is the index.
    tableData = tableData.map((geography, idx) => ({ ...geography, rank: idx + 1 }))

    return (
      <ResultsTable
        sortField={this.state.sort.field}
        sortDirection={this.state.sort.dir}
        data={tableData}
        onSort={this.onSortChange}
        loading={!isReady()}
      />
    )
  }

  render () {
    return (
      <App>
        <StickyContainer>
          <section className='layout--results' ng-app='globalApp'>
            <Sticky>
              {(props) => this.renderHeaderFn(props)}
            </Sticky>
            <div className='layout--results__body'>
              <ResultsMap />
              <div className='row--contained'>
                {this.renderResultsTable()}
              </div>
            </div>
          </section>
        </StickyContainer>
      </App>
    )
  }
}

if (environment !== 'production') {
  Results.propTypes = {
    history: T.object,
    location: T.object,
    fetchCountries: T.func,
    countriesList: T.object
  }
}

function mapStateToProps (state, props) {
  return {
    countriesList: wrapApiResult(state.countries.list)
  }
}

function dispatcher (dispatch) {
  return {
    fetchCountries: (...args) => dispatch(fetchCountries(...args))
  }
}

export default connect(mapStateToProps, dispatcher)(Results)
