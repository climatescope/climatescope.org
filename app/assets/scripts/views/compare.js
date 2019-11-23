'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import c from 'classnames'

import { environment } from '../config'
import { fetchGeographies, fetchGeography, fetchChartsMeta } from '../redux/geographies'
import { wrapApiResult, getFromState } from '../utils/utils'
import { initializeArrayWithRange } from '../utils/array'
import { round } from '../utils/math'
import { padNumber } from '../utils/string'
import { compareLayoutDef } from '../utils/geographies-layout'
import {
  ParCard,
  getChartDef,
  getChildrenType,
  reconcileGroupChartData,
  renderParCardError,
  reconcileChartData,
  renderParCardAbsolute,
  renderParCardAnswer,
  renderParCardPercent,
  renderParCardRange,
  renderParCardAnswerGroup,
  renderParCardPercentGroup
} from '../components/geography-params'

import App from './app'
import ShareOptions from '../components/share'
import SelectControl from '../components/form-select-control'
import { LoadingSkeleton, LoadingSkeletonGroup } from '../components/loading-skeleton'
import OnGrid from '../components/on-grid'
import { ParameterBreakdown } from '../components/parameters'
import AvailabilityOfPolicies from '../components/con--availability-polices'
import AreaChart, { memoizedComputeAreaChartData } from '../components/area-chart'

const getGeoISOFromUrl = (params = '') => {
  const split = params.split('/')
    .map(c => c.toLowerCase())

  return [
    split[0] || 'none',
    split[1] || 'none'
  ]
}

const getValidatedGeoISOFromUrl = (geographies, params) => {
  return getGeoISOFromUrl(params)
    .map(c => geographies.find(geo => geo.iso === c) ? c : 'none')
}

class Compare extends React.Component {
  constructor (props) {
    super(props)

    // Bindings:
    this.onCompareClick = this.onCompareClick.bind(this)
    this.onCompareReset = this.onCompareReset.bind(this)

    this.state = this.getInitialState()
  }

  getInitialState () {
    return {
      geographies: getGeoISOFromUrl()
    }
  }

  componentDidMount () {
    Promise.all([
      this.props.fetchChartsMeta(),
      this.props.fetchGeographies()
    ])
      .then(() => {
        if (!this.props.geographiesList.isReady()) return

        // Replace the geographies on the state with the ones from the url if they
        // pass validation.
        const validGeographies = this.props.geographiesList.getData()
        const selectedGeographies = getValidatedGeoISOFromUrl(validGeographies, this.props.match.params.geoIsos)
        this.setState({ geographies: selectedGeographies })
        // Update url with correct values.
        this.setCompareUrl(selectedGeographies, 'replace')

        // Fetch geography data.
        selectedGeographies.forEach(c => {
          c !== 'none' && this.props.fetchGeography(c)
        })
      })
  }

  setCompareUrl (isos, type = 'push') {
    if (isos.every(c => c === 'none')) {
      this.props.history[type]('/compare')
    } else {
      this.props.history[type](`/compare/${isos.join('/')}`)
    }
  }

  onGeoSelectValueChange (idx, e) {
    const val = e.target.value

    this.setState({
      // Replace index in array.
      // https://medium.com/@giltayar/immutably-setting-a-value-in-a-js-array-or-how-an-array-is-also-an-object-55337f4d6702
      geographies: Object.assign([...this.state.geographies], { [idx]: val })
    })
  }

  onCompareClick (e) {
    e.preventDefault()
    this.setCompareUrl(this.state.geographies)
    this.state.geographies.forEach(c => {
      c !== 'none' && this.props.fetchGeography(c)
    })
  }

  onCompareReset (e) {
    e.preventDefault()
    this.setState(this.getInitialState(), () => {
      this.setCompareUrl(this.state.geographies)
    })
  }

  renderFatalError () {
    return this.props.geographiesList.hasError()
      ? <p>Something went wrong. Try again later.</p>
      : null
  }

  renderControls () {
    // Error is handled in the main render function.
    if (this.props.geographiesList.hasError()) return null

    const data = this.props.geographiesList.getData([])

    const options = [
      { value: 'none', label: 'Choose location' },
      ...data.map(c => ({ value: c.iso, label: c.name }))
    ]

    return (
      <form className='form controls compare-controls'>
        {initializeArrayWithRange(1).map(i => (
          <SelectControl
            key={`geo-${i}`}
            id={`geo-${i}`}
            label='Geography'
            options={options}
            selectedOption={this.state.geographies[i]}
            onChange={this.onGeoSelectValueChange.bind(this, i)}
          />
        ))}
        <div className='form__actions'>
          <button className='controls__button-reset' onClick={this.onCompareReset} title='Reset selection'><span>Reset</span></button>
          <button className='controls__button-submit' onClick={this.onCompareClick} title='Apply selection'><span>Compare</span></button>
        </div>
      </form>
    )
  }

  renderGeographies () {
    const { match, geographiesList, geoA, geoB } = this.props
    // Error is handled in the main render function.
    if (geographiesList.hasError()) return null

    const urlGeo = getGeoISOFromUrl(match.params.geoIsos)

    return (
      <>
        <div className='col col--diptic prose'>
          <GeographyCompare
            active={urlGeo[0] !== 'none'}
            error={geoA.hasError()}
            loading={!geoA.isReady()}
            source={geoA.getData()}
            target={geoB.getData()}
            chartsMeta={this.props.chartsMeta.getData([])}
          />
        </div>
        <div className='col col--diptic prose'>
          <GeographyCompare
            active={urlGeo[1] !== 'none'}
            error={geoB.hasError()}
            loading={!geoB.isReady()}
            source={geoB.getData()}
            target={geoA.getData()}
            chartsMeta={this.props.chartsMeta.getData([])}
          />
        </div>
      </>
    )
  }

  render () {
    return (
      <App>
        <section className='inpage inpage--compare'>
          <header className='inpage__header'>
            <div className='inner'>
              <div className='inpage__headline'>
                <h1 className='inpage__title'>Compare</h1>
              </div>
              <div className='inpage__actions'>
                <ShareOptions url={window.location.toString()} />
              </div>
            </div>
          </header>

          <nav className='inpage__nav' role='navigation'>
            <div className='inner'>
              {this.renderControls()}
            </div>
          </nav>

          <div className='inpage__body'>
            <div className='inner'>
              {this.renderFatalError()}
              {this.renderGeographies()}
            </div>
          </div>
        </section>
      </App>
    )
  }
}

if (environment !== 'production') {
  Compare.propTypes = {
    fetchGeographies: T.func,
    fetchGeography: T.func,
    fetchChartsMeta: T.func,
    match: T.object,
    history: T.object,
    geographiesList: T.object,
    geoA: T.object,
    geoB: T.object,
    chartsMeta: T.object
  }
}

function mapStateToProps (state, props) {
  const params = getGeoISOFromUrl(props.match.params.geoIsos)

  return {
    geographiesList: wrapApiResult(state.geographies.list),
    geoA: wrapApiResult(getFromState(state.geographies.individualGeographies, params[0])),
    geoB: wrapApiResult(getFromState(state.geographies.individualGeographies, params[1])),
    chartsMeta: wrapApiResult(state.geographies.chartsMeta)
  }
}

function dispatcher (dispatch) {
  return {
    fetchGeographies: (...args) => dispatch(fetchGeographies(...args)),
    fetchGeography: (...args) => dispatch(fetchGeography(...args)),
    fetchChartsMeta: (...args) => dispatch(fetchChartsMeta(...args))
  }
}

export default connect(mapStateToProps, dispatcher)(Compare)

class GeographyCompare extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      // Charts of type timeSeries that need state access.
      installedCapacity: this.getInitialChartTimeSeriesState(),
      powerGeneration: this.getInitialChartTimeSeriesState(),
      cleanEnergyInvestment: this.getInitialChartTimeSeriesState()
    }
  }

  getInitialChartTimeSeriesState () {
    return {
      hover: false,
      hoverDateValue: null
    }
  }

  onInteractionEvent (chartId, name, date) {
    switch (name) {
      case 'over':
        this.setState({ [chartId]: { ...this.state[chartId], hover: true } })
        break
      case 'out':
        this.setState({ [chartId]: { ...this.state[chartId], hover: false } })
        break
      case 'move':
        if (!this.state[chartId].hoverDateValue || this.state[chartId].hoverDateValue.getFullYear() !== date.getFullYear()) {
          this.setState({ [chartId]: { hover: true, hoverDateValue: date } })
        }
        break
    }
  }

  renderInactive () {
    return (
      <div className='placeholder'>
        <p>Nothing to compare. Choose a Geography.</p>
      </div>
    )
  }

  renderError () {
    return (
      <div className='placeholder'>
        <p>An error occurred loading the geography. Try again.</p>
      </div>
    )
  }

  renderLoading () {
    return (
      <LoadingSkeletonGroup>
        <LoadingSkeleton width={1 / 6} />
        <LoadingSkeleton type='heading' width={1 / 3} size='large' style={{ marginBottom: '2rem' }} />
        <LoadingSkeleton width={2 / 4} />
        <LoadingSkeleton width={2 / 4} />
        <LoadingSkeleton width={2 / 4} />
      </LoadingSkeletonGroup>
    )
  }

  render () {
    const { error, loading, active, source, target, chartsMeta } = this.props

    if (!active) {
      return this.renderInactive()
    }
    if (loading) {
      return this.renderLoading()
    }
    if (error) {
      return this.renderError()
    }

    // Flatten topics.
    const topics = source.topics.map(t => ({
      id: t.id,
      name: t.name,
      weight: t.weight,
      value: t.data[0].value
    }))

    return (
      <>
        <div className='compare--entry'>
          <p className='compare--entry__subtitle'>
            <Link to={`/results?region=${source.region.id}`} title={`View results for ${source.region.name} region`}>{source.region.name}</Link>
          </p>
          <h1 className='compare--entry__title'><Link to={`/results/${source.iso}`} title='View page'>{source.name}</Link> <OnGrid grid={source.grid} noTip /></h1>
          <ParameterBreakdown
            className='legend par-legend legend--compare'
            data={topics} >
            <dt>Global rank</dt>
            <dd>{padNumber(source.score.data[0].rank, 2)}</dd>
            <dt>Score</dt>
            <dd>{round(source.score.data[0].value)}</dd>
          </ParameterBreakdown>

          <div className='par-section'>
            {compareLayoutDef.map(layoutDef => {
              try {
                // Policies is a special element that needs to access specific data.
                if (layoutDef.id === 'availabilityPolicies') {
                  return (
                    <AvailabilityOfPolicies
                      key={layoutDef.id}
                      geoIso={source.iso}
                      size={layoutDef.size}
                    />
                  )
                }

                const [chartDef] = getChartDef(chartsMeta, layoutDef.id)

                // Group elements mut be handled differently.
                if (chartDef.type === 'group') {
                  // Get all children.
                  const chartDefChildren = getChartDef(chartsMeta, chartDef.children, layoutDef.id)
                  const childrenType = getChildrenType(chartDef.id, chartDefChildren)

                  const reconciledData = reconcileGroupChartData(layoutDef, chartDef, chartDefChildren, source.charts, source.iso)

                  // Children are all the same type. Render based off of that
                  switch (childrenType) {
                    case 'answer':
                      return renderParCardAnswerGroup(reconciledData)
                    case 'percent':
                      return renderParCardPercentGroup(reconciledData)
                    default:
                      console.warn(`Unable to render children type [${childrenType}] for chart group [${chartDef.id}]`)
                      throw new Error(`Unable to render children type [${childrenType}] for chart group [${chartDef.id}]`)
                  }
                } else {
                  // Reconcile chart data, i.e. merge all in an object.
                  const reconciledData = reconcileChartData(layoutDef, chartDef, source.charts, source)

                  switch (reconciledData.type) {
                    case 'answer':
                      return renderParCardAnswer(reconciledData)
                    case 'absolute':
                    case 'average':
                      return renderParCardAbsolute(reconciledData)
                    case 'percent':
                      return renderParCardPercent(reconciledData)
                    case 'range':
                      return renderParCardRange(reconciledData)
                    case 'timeSeries':
                      // Compute the chart data.
                      // Iso + chart id works as a cache key because the data is never
                      // going to be updated. If in the future this changes then the cache
                      // key needs to be dynamic.
                      const chartData = memoizedComputeAreaChartData(reconciledData.data, reconciledData.mainDataLayers, `${source.iso}-${chartDef.id}`)
                      const hasData = chartData.data.some(l => l.values.some(v => v.value !== null))

                      let yDomain = chartData.yDomain

                      if (hasData && target.iso) {
                        // We have to ensure that both charts use the same domains
                        // so we have to reconcile the data for the target as well.
                        const reconciledDataTarget = reconcileChartData(layoutDef, chartDef, target.charts, target)
                        // Compute the target chart data.
                        const chartDataTarget = memoizedComputeAreaChartData(reconciledDataTarget.data, reconciledDataTarget.mainDataLayers, `${target.iso}-${chartDef.id}`)
                        const [tmin, tmax] = chartDataTarget.yDomain
                        yDomain = [Math.min(yDomain[0], tmin || 0), Math.max(yDomain[1], tmax || 0)]
                      }

                      return (
                        <ParCard
                          key={reconciledData.id}
                          title={reconciledData.name}
                          description={hasData ? (reconciledData.description || null) : null}
                          size={reconciledData.size}
                          className={c(`chart-${reconciledData.id}`, { 'info-card--empty': !hasData })}
                        >
                          {!hasData && <p>No data is available for this chart</p>}
                          {hasData && <AreaChart
                            onBisectorEvent={this.onInteractionEvent.bind(this, reconciledData.id)}
                            interactionData={this.state[reconciledData.id]}
                            yLabel={chartData.yLabel}
                            yDomain={yDomain}
                            xDomain={chartData.xDomain}
                            data={chartData.data}
                          />}
                        </ParCard>
                      )
                    default:
                      throw new Error(`Unable to render chart type [${reconciledData.type}] for chart [${reconciledData.id}]`)
                  }
                }
              } catch (error) {
                if (!error.handled) console.error(error)
                return renderParCardError(layoutDef, error.message)
              }
            })}
          </div>
        </div>
      </>
    )
  }
}

if (environment !== 'production') {
  GeographyCompare.propTypes = {
    active: T.bool,
    error: T.bool,
    loading: T.bool,
    source: T.object,
    target: T.object,
    chartsMeta: T.array
  }
}
