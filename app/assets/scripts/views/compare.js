'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { environment } from '../config'
import { fetchGeographies, fetchGeography } from '../redux/geographies'
import { wrapApiResult, getFromState } from '../utils/utils'
import { initializeArrayWithRange } from '../utils/array'
import { round } from '../utils/math'
import { padNumber } from '../utils/string'

import App from './app'
import ShareOptions from '../components/share'
import SelectControl from '../components/form-select-control'
import { LoadingSkeleton, LoadingSkeletonGroup } from '../components/loading-skeleton'
import OnGrid from '../components/on-grid'
import { ParameterBreakdown } from '../components/parameters'

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
    this.props.fetchGeographies()
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
          />
        </div>
        <div className='col col--diptic prose'>
          <GeographyCompare
            active={urlGeo[1] !== 'none'}
            error={geoB.hasError()}
            loading={!geoB.isReady()}
            source={geoB.getData()}
            target={geoA.getData()}
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
    match: T.object,
    history: T.object,
    geographiesList: T.object,
    geoA: T.object,
    geoB: T.object
  }
}

function mapStateToProps (state, props) {
  const params = getGeoISOFromUrl(props.match.params.geoIsos)

  return {
    geographiesList: wrapApiResult(state.geographies.list),
    geoA: wrapApiResult(getFromState(state.geographies.individualGeographies, params[0])),
    geoB: wrapApiResult(getFromState(state.geographies.individualGeographies, params[1]))
  }
}

function dispatcher (dispatch) {
  return {
    fetchGeographies: (...args) => dispatch(fetchGeographies(...args)),
    fetchGeography: (...args) => dispatch(fetchGeography(...args))
  }
}

export default connect(mapStateToProps, dispatcher)(Compare)

class GeographyCompare extends React.PureComponent {
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
    const { error, loading, active, source } = this.props

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
          <h1 className='compare--entry__title'>{source.name} <OnGrid grid={source.grid} noTip /></h1>
          <ParameterBreakdown
            className='legend par-legend'
            data={topics} >
            <dt>Global rank</dt>
            <dd>{padNumber(source.score.data[0].rank, 2)}</dd>
            <dt>Score</dt>
            <dd>{round(source.score.data[0].value)}</dd>
          </ParameterBreakdown>
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
    target: T.object
  }
}
