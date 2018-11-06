'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { StickyContainer, Sticky } from 'react-sticky'
import { configureAnchors } from 'react-scrollable-anchor'
import get from 'lodash.get'
import memoize from 'lodash.memoize'
import c from 'classnames'

import { environment } from '../config'
import { fetchGeography, fetchGeographiesMeta, fetchChartsMeta } from '../redux/geographies'
import { equalsIgnoreCase } from '../utils/string'
import { wrapApiResult, getFromState } from '../utils/utils'
import { initializeArrayWithRange } from '../utils/array'
import { round } from '../utils/math'

import App from './app'
import UhOh from './uhoh'
import GeographyMap from '../components/geography-map'
import { ParSection, ParSectionHeader, AreaBeta, AreaAlpha, ParCard } from '../components/geography-params'
import { LoadingSkeleton } from '../components/loading-skeleton'
import AreaChart, { computeAreaChartData } from '../components/area-chart'
import OnGrid from '../components/on-grid'
import NavBar from '../components/geography-nav-bar'

configureAnchors({ offset: -76 })

const memoizedComputeAreaChartData = memoize(computeAreaChartData, (data, pass, cacheKey) => cacheKey)

const renewableTypes = [
  'Biomass & Waste',
  'Geothermal',
  'Small Hydro',
  'Solar',
  'Wind'
]
class Geography extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      installedChart: this.getInitialChartState(),
      powerGenChart: this.getInitialChartState()
    }
  }

  getInitialChartState () {
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

  onInteractionEvent (chart, name, date) {
    switch (name) {
      case 'over':
        this.setState({ [chart]: { ...this.state[chart], hover: true } })
        break
      case 'out':
        this.setState({ [chart]: { ...this.state[chart], hover: false } })
        break
      case 'move':
        if (!this.state[chart].hoverDateValue || this.state[chart].hoverDateValue.getFullYear() !== date.getFullYear()) {
          this.setState({ [chart]: { hover: true, hoverDateValue: date } })
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

  getChartData (id) {
    const { receivedAt, getData } = this.props.geography
    const chart = get(getData(), 'charts', []).find(o => o.id === id)
    const title = get(chart, ['meta', 'title'], '')
    return memoizedComputeAreaChartData(chart, renewableTypes, `${title}-${receivedAt}`)
  }

  renderProfile () {
    const { isReady, getData } = this.props.geography
    const geography = getData()

    return (
      <ul className='inpage__details'>
        {isReady() ? (
          geography.profile.map(o => (
            <li key={o.id}>
              <strong>{round(o.value)}<sub>{o.unit}</sub></strong>
              <span>{o.name}</span>
            </li>
          ))
        ) : (
          initializeArrayWithRange(5).map(o => (
            <li key={o}>
              <strong><LoadingSkeleton theme='light' size='large' width={3 / 4} /></strong>
              <span><LoadingSkeleton theme='light' size='small' width={1 / 3} /></span>
            </li>
          ))
        ) }
      </ul>
    )
  }

  render () {
    const { isReady, hasError, getData } = this.props.geography
    const geography = getData()

    if (hasError()) {
      return <UhOh />
    }

    const installedChart = this.getChartData('installedCapacity')
    const powerGenChart = this.getChartData('powerGeneration')

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
            <GeographyMap
              geographyBounds={this.getGeoBounds(geography.iso)}
              geographyISO={isReady() ? geography.iso.toUpperCase() : ''}
            />
          </header>

          <StickyContainer>
            <Sticky>
              {(props) => <NavBar {...props} currentItem={this.props.location.hash.substr(1)} geography={geography} />}
            </Sticky>

            <div className='inpage__body'>

              <ParSection id='power-market' type='linear' >
                <AreaAlpha>
                  <ParSectionHeader
                    title='Power Market'
                    description='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                  />
                </AreaAlpha>
                <AreaBeta>
                  <ParCard
                    title='Installed capacity since 2010'
                    size='large'
                  >
                    <AreaChart
                      onBisectorEvent={this.onInteractionEvent.bind(this, 'installedChart')}
                      interactionData={this.state.installedChart}
                      xLabel={installedChart.xLabel}
                      yLabel={installedChart.yLabel}
                      yDomain={installedChart.yDomain}
                      xDomain={installedChart.xDomain}
                      data={installedChart.data}
                    />
                  </ParCard>
                  <ParCard
                    title='Card title'
                    description='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.'
                    size='small'
                    theme='dark'
                  />
                  <ParCard
                    title='Card title'
                    description='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur?'
                    size='small'
                    theme='light'
                  />
                  <ParCard
                    title='Card title'
                    description='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.'
                    size='small'
                    theme='dark'
                  />

                  <ParCard
                    title='Power generation since 2010'
                    size='medium'
                  >
                    <AreaChart
                      onBisectorEvent={this.onInteractionEvent.bind(this, 'powerGenChart')}
                      interactionData={this.state.powerGenChart}
                      xLabel={powerGenChart.xLabel}
                      yLabel={powerGenChart.yLabel}
                      yDomain={powerGenChart.yDomain}
                      xDomain={powerGenChart.xDomain}
                      data={powerGenChart.data}
                    />
                  </ParCard>
                </AreaBeta>
              </ParSection>

              <ParSection id='clean-energy-policy' type='linear' >
                <AreaAlpha>
                  <ParSectionHeader
                    title='Clean Energy Policy'
                    description='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                  />
                </AreaAlpha>
                <AreaBeta>
                  <ParCard
                    title='Card title'
                    description='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.'
                    size='medium'
                  />
                  <ParCard
                    title='Card title'
                    description='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.'
                    size='small'
                    theme='dark'
                  />
                  <ParCard
                    title='Card title'
                    description='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.'
                    size='small'
                    theme='dark'
                  />
                </AreaBeta>
              </ParSection>

              <ParSection id='clean-energy-investment' type='linear' >
                <AreaAlpha>
                  <ParSectionHeader
                    title='Clean Energy Investment'
                    description='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                  />
                </AreaAlpha>
                <AreaBeta>
                  <ParCard
                    title='Card title'
                    description='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.'
                    size='medium'
                  />
                  <ParCard
                    title='Card title'
                    description='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.'
                    size='small'
                    theme='dark'
                  />
                  <ParCard
                    title='Card title'
                    description='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.'
                    size='small'
                    theme='dark'
                  />
                </AreaBeta>
              </ParSection>

              <ParSection id='price-environment' type='linear' >
                <AreaAlpha>
                  <ParSectionHeader
                    title='Price environment'
                    description='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                  />
                </AreaAlpha>
                <AreaBeta>
                  <ParCard
                    title='Card title'
                    description='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.'
                    size='small'
                    theme='dark'
                  />
                  <ParCard
                    title='Card title'
                    description='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.'
                    size='small'
                    theme='dark'
                  />
                  <ParCard
                    title='Card title'
                    description='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.'
                    size='small'
                    theme='light'
                  />
                </AreaBeta>

              </ParSection>
              <ParSection id='doing-business' type='split' >
                <AreaAlpha>
                  <ParSectionHeader
                    title='Doing Business'
                    description='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                  />
                  <ParCard hiddenTitle='Features' size='large'>
                    <table className='feature-table'>
                      <thead>
                        <tr>
                          <th><span className='visually-hidden'>Feature</span></th>
                          <th>Yes</th>
                          <th>No</th>
                          <th>Somewhat</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>
                            <h2>Standardized PPAS</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                          </th>
                          <td><strong className='feature-checked'><span>Checked</span></strong></td>
                          <td><strong className='feature-unchecked'><span>Unchecked</span></strong></td>
                          <td><strong className='feature-unchecked'><span>Unchecked</span></strong></td>
                        </tr>
                        <tr>
                          <th>
                            <h2>PPAS of sufficient duration</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut.</p>
                          </th>
                          <td><strong className='feature-unchecked'><span>Unchecked</span></strong></td>
                          <td><strong className='feature-unchecked'><span>Unchecked</span></strong></td>
                          <td><strong className='feature-checked'><span>Checked</span></strong></td>
                        </tr>
                      </tbody>
                    </table>
                  </ParCard>
                </AreaAlpha>
                <AreaBeta>
                  <ParCard
                    title='Card title'
                    description='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.'
                    size='small'
                    theme='light'
                  />
                  <ParCard
                    title='Card title'
                    description='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.'
                    size='small'
                    theme='dark'
                  />
                </AreaBeta>
              </ParSection>

              <ParSection id='barriers' type='split' >
                <AreaAlpha>
                  <ParSectionHeader
                    title='Barriers'
                    description='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                  />
                  <ParCard title='Features' size='large' theme='light'>
                    Content
                  </ParCard>
                </AreaAlpha>
                <AreaBeta>
                  <ParCard
                    title='Card title'
                    description='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.'
                    size='small'
                    theme='light'
                  />
                  <ParCard
                    title='Card title'
                    description='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.'
                    size='small'
                    theme='dark'
                  />
                </AreaBeta>
              </ParSection>

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
