'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { connect } from 'react-redux'
import c from 'classnames'
import orderBy from 'lodash.orderby'
import get from 'lodash.get'
import isEqual from 'lodash.isequal'
import { StickyContainer, Sticky } from 'react-sticky'
import { OnGridTooltip } from '../components/on-grid'

import { environment } from '../config'
import QsState from '../utils/qs-state'
import { fetchGeographies, fetchGeographiesMeta } from '../redux/geographies'
import { wrapApiResult } from '../utils/utils'
import { regions } from '../utils/constants'

import App from './app'
import { SliderControlGroup } from '../components/slider-controls'
import ResultsMap from '../components/results-map'
import ResultsTable from '../components/results-table'
import Dropdown from '../components/dropdown'
import ShareOptions from '../components/share'

const getSliderState = (sliders) => sliders.reduce((acc, v) => ({
  ...acc,
  [v.id]: {
    value: v.startingValue,
    locked: false
  }
}), {})

class Results extends React.Component {
  constructor (props) {
    super(props)

    // Bindings
    this.onWeightsResetClick = this.onWeightsResetClick.bind(this)
    this.onSliderGroupChange = this.onSliderGroupChange.bind(this)
    this.onSortChange = this.onSortChange.bind(this)

    this.qsState = new QsState({
      region: {
        accessor: 'region',
        default: 'all',
        validator: regions.map(r => r.id)
      }
    })

    this.state = {
      ...this.qsState.getState(this.props.location.search.substr(1)),
      sliders: {},
      sort: {
        field: 'rank',
        dir: 'asc'
      }
    }
  }

  static getDerivedStateFromProps (props, state) {
    // Construct the slider state the first time.
    if (!isEqual(state.sliders, {})) return null
    return {
      sliders: getSliderState(props.sliders)
    }
  }

  componentDidMount () {
    this.props.fetchGeographies()
    this.props.fetchGeographiesMeta()
  }

  onWeightsResetClick (e) {
    e.preventDefault()
    this.setState({
      sliders: getSliderState(this.props.sliders)
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
        const topics = (geography.topics || []).map(t => {
          const weight = get(sliders, [t.id, 'value'], 0)
          return {
            id: t.id,
            name: t.name,
            // The first is always the most recent year.
            value: t.data[0].value,
            weight
          }
        })

        // Convert `on` to `true`, `off` to `false` and everything
        // else to `null`
        const grid = geography.grid === 'on'
          ? true
          : geography.grid === 'off'
            ? false
            : null

        return {
          iso: geography.iso.toUpperCase(),
          name: geography.name,
          grid,
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
      <h1 className='inpage__title'>
        <span>Results for&nbsp;</span>
        <em>
          <Dropdown
            className='regions-drop'
            triggerElement='a'
            triggerClassName='drop__toggle drop__toggle--caret'
            triggerActiveClassName='button--active'
            triggerText={triggerText}
            triggerTitle='Filter by region'
            direction='down'
            alignment='left' >
            <ul className='drop__menu drop__menu--select'>
              {regions.map(r => (
                <li key={r.id}><a href='#' title={`view ${r.name} results`} onClick={this.onRegionClick.bind(this, r.id)} data-hook='dropdown:close' className={c('drop__menu-item', { 'drop__menu-item--active': r.id === this.state.region })}>{r.name}</a></li>
              ))}
            </ul>
          </Dropdown>
        </em>
      </h1>
    )
  }

  renderHeaderFn ({ style, isSticky }) {
    const klass = c('inpage__nav', {
      'sticky': isSticky
    })

    return (
      <nav className={klass} style={style}>
        <div className='inner'>
          <div className='par-controls'>
            <div className='par-controls__headline'>
              <h2 className='par-controls__title'>Calculate your own score</h2>
              <a href='#' className='par-controls__reset-button' title='Reset topic weights' onClick={this.onWeightsResetClick}><span>Reset</span></a>
            </div>
            <SliderControlGroup
              sliders={this.props.sliders}
              values={this.state.sliders || {}}
              onChange={this.onSliderGroupChange}
            />
          </div>
        </div>
      </nav>
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
      <App pageTitle='Results'>
        <section className='inpage inpage--hub inpage--results'>
          <header className='inpage__header'>
            <div className='inner'>
              <div className='inpage__headline'>
                {this.renderTitle()}
              </div>
              <div className='inpage__actions'>
                <ShareOptions url={window.location.toString()} />
              </div>
            </div>
          </header>
          <StickyContainer>
            <Sticky>
              {(props) => this.renderHeaderFn(props)}
            </Sticky>
            <div className='inpage__body'>
              <ResultsMap
                bounds={activeRegion.bounds}
                highlightISO={highlightISO}
                meta={this.props.geoMeta.getData([])}
                data={rankedGeographies}
              />
              <div className='inner'>
                <div className='col col--main'>
                  {this.renderResultsTable()}
                </div>
              </div>
            </div>
          </StickyContainer>
          <OnGridTooltip />
        </section>
      </App>
    )
  }
}

if (environment !== 'production') {
  Results.propTypes = {
    history: T.object,
    location: T.object,
    fetchGeographies: T.func,
    fetchGeographiesMeta: T.func,
    geographiesList: T.object,
    geoMeta: T.object,
    sliders: T.array
  }
}

function mapStateToProps (state, props) {
  const geographiesList = wrapApiResult(state.geographies.list)

  // Compute slider options
  const { isReady, getData } = geographiesList
  let sliders = [
    // {
    //   id: 'fundamentals',
    //   name: 'Fundamentals',
    //   startingValue: 0
    // }
  ]

  if (isReady()) {
    // All geographies have the same topics. Acess 1st one.
    const topics = getData()[0].topics
    sliders = topics.map(t => ({
      id: t.id,
      name: t.name,
      startingValue: t.weight * 100
    }))
  }

  return {
    sliders,
    geographiesList,
    geoMeta: wrapApiResult(state.geographies.meta)
  }
}

function dispatcher (dispatch) {
  return {
    fetchGeographies: (...args) => dispatch(fetchGeographies(...args)),
    fetchGeographiesMeta: (...args) => dispatch(fetchGeographiesMeta(...args))
  }
}

export default connect(mapStateToProps, dispatcher)(Results)
