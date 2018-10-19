'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { environment } from '../config'
import { fetchCountries, fetchCountry } from '../redux/countries'
import { wrapApiResult, initializeArrayWithRange, getFromState } from '../utils/utils'

import App from './app'
import ShareOptions from '../components/share'
import SelectControl from '../components/form-select-control'
import { LoadingSkeleton, LoadingSkeletonGroup } from '../components/loading-skeleton'

const getCountriesFromUrl = (params = '') => {
  const split = params.split('/')
    .map(c => c.toLowerCase())

  return [
    split[0] || 'none',
    split[1] || 'none'
  ]
}

const getValidatedCountriesFromUrl = (countries, params) => {
  return getCountriesFromUrl(params)
    .map(c => countries.find(country => country.iso === c) ? c : 'none')
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
      countries: getCountriesFromUrl()
    }
  }

  componentDidMount () {
    this.props.fetchCountries()
      .then(() => {
        if (!this.props.countriesList.isReady()) return

        // Replace the countries on the state with the ones from the url if they
        // pass validation.
        const validCountries = this.props.countriesList.getData()
        const selectedCountries = getValidatedCountriesFromUrl(validCountries, this.props.match.params.country)
        this.setState({ countries: selectedCountries })
        // Update url with correct values.
        this.setCompareUrl(selectedCountries, 'replace')

        // Fetch country data.
        selectedCountries.forEach(c => {
          c !== 'none' && this.props.fetchCountry(c)
        })
      })
  }

  setCompareUrl (countries, type = 'push') {
    if (countries.every(c => c === 'none')) {
      this.props.history[type]('/compare')
    } else {
      this.props.history[type](`/compare/${countries.join('/')}`)
    }
  }

  onCountryValueChange (idx, e) {
    const val = e.target.value

    this.setState({
      // Replace index in array.
      // https://medium.com/@giltayar/immutably-setting-a-value-in-a-js-array-or-how-an-array-is-also-an-object-55337f4d6702
      countries: Object.assign([...this.state.countries], { [idx]: val })
    })
  }

  onCompareClick (e) {
    e.preventDefault()
    this.setCompareUrl(this.state.countries)
    this.state.countries.forEach(c => {
      c !== 'none' && this.props.fetchCountry(c)
    })
  }

  onCompareReset (e) {
    e.preventDefault()
    this.setState(this.getInitialState(), () => {
      this.setCompareUrl(this.state.countries)
    })
  }

  renderFatalError () {
    return this.props.countriesList.hasError()
      ? <p>Something went wrong. Try again later.</p>
      : null
  }

  renderControls () {
    // Error is handled in the main render function.
    if (this.props.countriesList.hasError()) return null

    const data = this.props.countriesList.getData([])

    const options = [
      { value: 'none', label: 'Choose location' },
      ...data.map(c => ({ value: c.iso, label: c.name }))
    ]

    return (
      <div className='layout--hub__controls'>
        <form>
          {initializeArrayWithRange(1).map(i => (
            <SelectControl
              key={`country-${i}`}
              id={`country-${i}`}
              label='Geography'
              options={options}
              selectedOption={this.state.countries[i]}
              onChange={this.onCountryValueChange.bind(this, i)}
            />
          ))}
          <div className='control'>
            <button className='bttn bttn-default bttn-m restart hide-txt' onClick={this.onCompareReset}><span>Reset</span></button>
            <button className='bttn bttn-dark bttn-m' onClick={this.onCompareClick}>Compare</button>
          </div>
        </form>
      </div>
    )
  }

  renderCountries () {
    const { match, countriesList, countryA, countryB } = this.props
    // Error is handled in the main render function.
    if (countriesList.hasError()) return null

    const urlCountries = getCountriesFromUrl(match.params.country)

    return (
      <>
        <div className='col--double'>
          <CountryCompare
            active={urlCountries[0] !== 'none'}
            error={countryA.hasError()}
            loading={!countryA.isReady()}
            source={countryA.getData()}
            target={countryB.getData()}
          />
        </div>
        <div className='col--double'>
          <CountryCompare
            active={urlCountries[1] !== 'none'}
            error={countryB.hasError()}
            loading={!countryB.isReady()}
            source={countryB.getData()}
            target={countryA.getData()}
          />
        </div>
      </>
    )
  }

  render () {
    return (
      <App>
        <section className='layout--hub compare'>
          <header className='layout--hub__header'>
            <div className='row--contained'>
              <div className='layout--hub__heading'>
                <h1 className='layout--hub__title'>Compare</h1>
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
              {this.renderCountries()}
            </div>
          </div>
        </section>
      </App>
    )
  }
}

if (environment !== 'production') {
  Compare.propTypes = {
    fetchCountries: T.func,
    fetchCountry: T.func,
    match: T.object,
    history: T.object,
    countriesList: T.object,
    countryA: T.object,
    countryB: T.object
  }
}

function mapStateToProps (state, props) {
  const params = getCountriesFromUrl(props.match.params.country)

  return {
    countriesList: wrapApiResult(state.countries.list),
    countryA: wrapApiResult(getFromState(state.countries.individualCountries, params[0])),
    countryB: wrapApiResult(getFromState(state.countries.individualCountries, params[1]))
  }
}

function dispatcher (dispatch) {
  return {
    fetchCountries: (...args) => dispatch(fetchCountries(...args)),
    fetchCountry: (...args) => dispatch(fetchCountry(...args))
  }
}

export default connect(mapStateToProps, dispatcher)(Compare)

class CountryCompare extends React.PureComponent {
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
        <p>An error occurred loading the country. Try again.</p>
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

    return (
      <>
        <div className='compare--entry__heading'>
          <h1 className='compare--entry__title'>{source.name}</h1>
          <p className='compare--entry__subtitle'>
            <Link to={`/results?region=${'reg'}`} title={`Go to`}>Region Name</Link>
          </p>
          <em className='label-grid label-grid-on'><span>On-grid</span></em>

          <dl className='stats-list'>
            <dt>Global rank</dt>
            <dd>02</dd>
            <dt>Global score</dt>
            <dd>0.78</dd>

            <dt className='param-1'>Param 1</dt>
            <dd>10.5</dd>
          </dl>

        </div>
      </>
    )
  }
}

if (environment !== 'production') {
  CountryCompare.propTypes = {
    active: T.bool,
    error: T.bool,
    loading: T.bool,
    source: T.object,
    target: T.object
  }
}
