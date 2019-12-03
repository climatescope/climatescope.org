'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { StickyContainer, Sticky } from 'react-sticky'
import { configureAnchors } from 'react-scrollable-anchor'

import { environment } from '../config'
import { fetchGeography, fetchGeographiesMeta, fetchChartsMeta } from '../redux/geographies'
import { equalsIgnoreCase, padNumber } from '../utils/string'
import { wrapApiResult, getFromState } from '../utils/utils'
import { initializeArrayWithRange } from '../utils/array'
import { round } from '../utils/math'
import layoutDef from '../utils/geographies-layout'

import App from './app'
import UhOh from './uhoh'
import GeographyMap from '../components/geography-map'
import { ParSection, renderParArea } from '../components/geography-params'
import { LoadingSkeleton, LoadingSkeletonGroup } from '../components/loading-skeleton'
import OnGrid from '../components/on-grid'
import NavBar from '../components/geography-nav-bar'

configureAnchors({ offset: -76 })

class Geography extends React.Component {
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

  componentDidMount () {
    this.props.fetchGeography(this.props.match.params.geoIso)
    this.props.fetchGeographiesMeta()
    this.props.fetchChartsMeta()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.match.params.geoIso !== this.props.match.params.geoIso) {
      this.props.fetchGeography(this.props.match.params.geoIso)
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

  getGeoBounds (iso) {
    const { hasError, getData } = this.props.geoMeta
    if (hasError()) return []
    const geo = getData([]).find(m => equalsIgnoreCase(m.iso, iso))
    return geo ? geo.bounds : []
  }

  renderProfile () {
    const { isReady, getData } = this.props.geography
    const geography = getData()

    return (
      <ul className='inpage__details'>
        {isReady() && (
          <li>
            <strong>
              {padNumber(geography.score.data[0].rank, 2)}
              <small>/</small>
              {round(geography.score.data[0].value)}
            </strong>
            <span>Global rank / Score</span>
          </li>
        )}
        {isReady() && geography.topics.map(o => (
          <li key={o.id}>
            <strong>{round(o.data[0].value)}</strong>
            <span>{o.name} score</span>
          </li>
        ))}
        {isReady() && geography.profile.map(o => (
          <li key={o.id}>
            <strong>{round(o.value)}<sub>{o.unit}</sub></strong>
            <span>{o.name}</span>
          </li>
        ))}
        {!isReady() && initializeArrayWithRange(6).map(o => (
          <li key={o}>
            <strong><LoadingSkeleton theme='light' size='large' width={3 / 4} /></strong>
            <span><LoadingSkeleton theme='light' size='small' width={1 / 3} /></span>
          </li>
        ))}
      </ul>
    )
  }

  renderGeoSections () {
    const { isReady: isReadyGeo, hasError: hasErrorGeo, getData: getDataGeo } = this.props.geography
    const { isReady: isReadyCMeta, hasError: hasErrorCMeta, getData: getDataCMeta } = this.props.chartsMeta

    if (hasErrorGeo() || hasErrorCMeta()) {
      return (
        <div className='par-section'>
          <div className='par-section__contents'>
            <p>Something went wrong. Try again.</p>
          </div>
        </div>
      )
    }

    if (!isReadyGeo() || !isReadyCMeta()) {
      return initializeArrayWithRange(3).map(o => (
        <div key={o} className='par-section'>
          <div className='par-section-loading'>
            <LoadingSkeletonGroup>
              <LoadingSkeleton type='heading' size='large' width={1 / 3}/>
              <LoadingSkeleton size='small' width={1}/>
              <LoadingSkeleton size='small' width={1}/>
              <LoadingSkeleton size='small' width={1}/>
              <LoadingSkeleton size='small' width={1 / 5}/>
            </LoadingSkeletonGroup>
          </div>
        </div>
      ))
    }

    // Any data being visualized is considered a chart.
    const geography = getDataGeo()
    const chartMeta = getDataCMeta()

    return layoutDef.map(sec => (
      <ParSection key={sec.id} id={sec.id} type={sec.type}>
        {renderParArea('alpha', sec, chartMeta, geography, this)}
        {renderParArea('beta', sec, chartMeta, geography, this)}
      </ParSection>
    ))
  }

  render () {
    const { isReady, hasError, getData } = this.props.geography
    const geography = getData()

    if (hasError()) {
      return <UhOh />
    }

    return (
      <App className='page--has-hero' pageTitle={geography.name || 'Geograpghy'} >
        <article className='inpage inpage--single inpage--results'>
          <header className='inpage__header'>
            <div className='inner'>
              <div className='inpage__headline'>
                <p className='inpage__subtitle'>
                  <Link to='/results' title='View results page'>View all markets</Link>
                </p>
                <h1 className='inpage__title'>
                  {isReady() ? geography.name : <LoadingSkeleton theme='light' size='large' type='heading' inline />}
                  {isReady() && <OnGrid grid={geography.grid} theme='negative' noTip />}
                </h1>
                {this.renderProfile()}
              </div>
            </div>
            {
              (geography.iso === 'ru' || geography.iso === 'ua')
                ? <figure className='inpage__hero inpage__hero--cover'>
                  <div className='inpage__hero-item'>
                    <img src='../assets/graphics/layout/hero--cover.jpg' width='1920' height='1280' alt='Illustration' />
                  </div>
                  <figcaption className='inpage__hero-caption visually-hidden'>Cover image</figcaption>
                </figure>
                : <GeographyMap
                  geographyBounds={this.getGeoBounds(geography.iso)}
                  geographyISO={isReady() ? geography.iso.toUpperCase() : ''}
                />
            }

          </header>

          <StickyContainer>
            <Sticky>
              {(props) => <NavBar {...props} currentItem={this.props.location.hash.substr(1)} geography={geography} />}
            </Sticky>

            <div className='inpage__body'>
              {this.renderGeoSections()}
            </div>
          </StickyContainer>

        </article>
      </App>
    )
  }
}

if (environment !== 'production') {
  Geography.propTypes = {
    fetchGeography: T.func,
    fetchGeographiesMeta: T.func,
    fetchChartsMeta: T.func,
    match: T.object,
    geography: T.object,
    geoMeta: T.object
  }
}

function mapStateToProps (state, props) {
  return {
    geography: wrapApiResult(getFromState(state.geographies.individualGeographies, props.match.params.geoIso)),
    geoMeta: wrapApiResult(state.geographies.meta),
    chartsMeta: wrapApiResult(state.geographies.chartsMeta)
  }
}

function dispatcher (dispatch) {
  return {
    fetchGeography: (...args) => dispatch(fetchGeography(...args)),
    fetchGeographiesMeta: (...args) => dispatch(fetchGeographiesMeta(...args)),
    fetchChartsMeta: (...args) => dispatch(fetchChartsMeta(...args))
  }
}

export default connect(mapStateToProps, dispatcher)(Geography)
