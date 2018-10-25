'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { connect } from 'react-redux'
import c from 'classnames'
import orderBy from 'lodash.orderby'
import { StickyContainer, Sticky } from 'react-sticky'

import { environment } from '../config'
import QsState from '../utils/qs-state'
import { fetchGeographies } from '../redux/geographies'
import { wrapApiResult } from '../utils/utils'
import { regions } from '../utils/constants'

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
        name: 'Fundamentals'
      },
      {
        id: 'opportunities',
        name: 'Opportunities'
      },
      {
        id: 'experience',
        name: 'Experience'
      }
    ]

    this.qsState = new QsState({
      region: {
        accessor: 'region',
        default: 'all',
        validator: regions.map(r => r.id)
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
        value: 0,
        locked: false
      }
    }), {})
  }

  componentDidMount () {
    this.props.fetchGeographies()
      .then(() => {
        // Update slider starting values.
        const { isReady, getData } = this.props.geographiesList
        if (isReady()) {
          // All geographies have the same topics. Acess 1st one.
          const topics = getData()[0].topics
          let sliders = this.state.sliders
          // Update the slider values.
          topics.forEach(t => {
            sliders = {
              ...sliders,
              [t.id]: {
                ...sliders[t.id],
                value: t.weight * 100
              }
            }
          })

          this.setState({ sliders })
        }
      })
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

  getRankedGeographies () {
    const { getData } = this.props.geographiesList
    const { sliders, region } = this.state

    let tableData = getData([])
      // Filter by active region
      .filter(geography => {
        return region === 'all' ? true : geography.region.id === region
      })
      .map(geography => {
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
          iso: geography.iso.toUpperCase(),
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

    return tableData
  }

  renderTitle () {
    const triggerText = regions.find(r => r.id === this.state.region).name

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
              {regions.map(r => (
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
    const { isReady } = this.props.geographiesList

    return (
      <ResultsTable
        sortField={this.state.sort.field}
        sortDirection={this.state.sort.dir}
        data={this.getRankedGeographies()}
        onSort={this.onSortChange}
        loading={!isReady()}
      />
    )
  }

  render () {
    const { region } = this.state

    const rankedGeographies = this.getRankedGeographies()
    const highlightISO = rankedGeographies.map(g => g.iso)
    const activeRegion = regions.find(r => r.id === region)

    return (
      <App pageTitle='Results' >
        <StickyContainer>
          <section className='layout--results' ng-app='globalApp'>
            <Sticky>
              {(props) => this.renderHeaderFn(props)}
            </Sticky>
            <div className='layout--results__body'>
              <ResultsMap
                bounds={activeRegion.bounds}
                highlightISO={highlightISO}
                data={rankedGeographies}
              />
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
    fetchGeographies: T.func,
    geographiesList: T.object
  }
}

function mapStateToProps (state, props) {
  return {
    geographiesList: wrapApiResult(state.geographies.list)
  }
}

function dispatcher (dispatch) {
  return {
    fetchGeographies: (...args) => dispatch(fetchGeographies(...args))
  }
}

export default connect(mapStateToProps, dispatcher)(Results)
