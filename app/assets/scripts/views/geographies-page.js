'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { StickyContainer, Sticky } from 'react-sticky'
import { configureAnchors } from 'react-scrollable-anchor'

import { environment } from '../config'
import { fetchGeography, fetchGeographiesMeta } from '../redux/geographies'
import { getFromState, wrapApiResult, equalsIgnoreCase } from '../utils/utils'

import App from './app'
import UhOh from './uhoh'
import Dropdown from '../components/dropdown'
import GeographyMap from '../components/geography-map'
import { ParSection, ParSectionHeader, AreaBeta, AreaAlpha, ParCard } from '../components/geography-params'
import { LoadingSkeleton } from '../components/loading-skeleton'

configureAnchors({ offset: -76 })

class NavBar extends React.PureComponent {
  constructor (props) {
    super(props)

    this.menuItems = [
      {
        id: 'power-market',
        title: 'Jump to section Power Market',
        label: 'Power Market'
      },
      {
        id: 'clean-energy-policy',
        title: 'Jump to section Clean Energy Policy',
        label: 'Clean Energy Policy'
      },
      {
        id: 'clean-energy-investment',
        title: 'Jump to section Clean Energy Investment',
        label: 'Clean Energy Investment'
      },
      {
        id: 'price-environment',
        title: 'Jump to section Price environment',
        label: 'Price environment'
      },
      {
        id: 'doing-business',
        title: 'Jump to section Doing Business',
        label: 'Doing Business'
      },
      {
        id: 'barriers',
        title: 'Jump to section Barriers',
        label: 'Barriers'
      }
    ]
  }

  render () {
    const { isSticky, style, currentItem } = this.props

    const activeItem = (this.menuItems.find(i => i.id === currentItem) || { label: 'Sections' })

    return (
      <nav className='inpage__nav sections-nav' style={style}>
        <div className='inner'>
          {isSticky ? (
            <div className='sections-nav__headline'>
              <p className='sections-nav__subtitle'>
                <Link to='/results' title='View results page'>View all markets</Link>
              </p>
              <h1 className='sections-nav__title'>Democratic Republic of Congo</h1>
            </div>
          ) : null}
          <div className='sections-nav__sections-menu-wrapper'>
            {isSticky ? (
              <Dropdown
                className='dropdown-content'
                triggerElement='a'
                triggerClassName='dropdown-toggle caret'
                triggerActiveClassName='button--active'
                triggerText={activeItem.label}
                triggerTitle='Jump to section'
                direction='down'
                alignment='center' >
                <ul className='dropdown-menu'>
                  {this.menuItems.map(item => (
                    <li key={item.id}><a data-hook='dropdown:close' href={`#${item.id}`} title={item.title}>{item.label}</a></li>
                  ))}
                </ul>
              </Dropdown>
            ) : (
              <ul className='sections-nav__sections-menu'>
                {this.menuItems.map(item => (
                  <li key={item.id}><a href={`#${item.id}`} title={item.title}>{item.label}</a></li>
                ))}
              </ul>
            )}
          </div>
          <div className='sections-nav__tools'>
            <ul className='actions-menu'>
              <li>
                <button className='bttn bttn-success download'>Print</button>
              </li>
              <li>
                <button className='bttn bttn-success share'>Share</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

if (environment !== 'production') {
  NavBar.propTypes = {
    currentItem: T.string,
    isSticky: T.bool,
    style: T.object
  }
}

class Geography extends React.Component {
  componentDidMount () {
    this.props.fetchGeography(this.props.match.params.geoIso)
    this.props.fetchGeographiesMeta()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.match.params.geoIso !== this.props.match.params.geoIso) {
      this.props.fetchGeography(this.props.match.params.geoIso)
    }
  }

  getGeoBounds (iso) {
    const { hasError, getData } = this.props.geoMeta
    if (hasError()) return []
    const geo = getData([]).find(m => equalsIgnoreCase(m.iso, iso))
    return geo ? geo.bounds : []
  }

  render () {
    const { isReady, hasError, getData } = this.props.geography
    const geography = getData()

    if (hasError()) {
      return <UhOh />
    }

    return (
      <App className='page--has-hero' pageTitle={geography.name} >
        <article className='inpage inpage--single inpage--results'>

          <header className='inpage__header'>
            <div className='inner'>
              <div className='inpage__headline'>
                <p className='inpage__subtitle'>
                  <Link to='/results' title='View results page'>View all markets</Link>
                </p>
                <h1 className='inpage__title'>
                  {isReady() ? geography.name : <LoadingSkeleton size='large' type='heading' inline />}
                </h1>
                <ul className='inpage__details'>
                  <li>
                    <strong>26.28<sub>$Bn</sub></strong>
                    <span>GDP</span>
                  </li>
                  <li>
                    <strong>41.49<sub>M</sub></strong>
                    <span>Population</span>
                  </li>
                  <li>
                    <strong>18<sub>%</sub></strong>
                    <span>Share of emissions from the heat and power sector</span>
                  </li>

                  <li>
                    <strong>41.49<sub>M</sub></strong>
                    <span>Population</span>
                  </li>
                  <li>
                    <strong>18<sub>%</sub></strong>
                    <span>Share of emissions from the heat and power sector</span>
                  </li>
                  <li>
                    <strong>41.49<sub>M</sub></strong>
                    <span>Population</span>
                  </li>
                  <li>
                    <strong>18<sub>%</sub></strong>
                    <span>Share of emissions from the heat and power sector</span>
                  </li>
                </ul>
              </div>
            </div>
            <GeographyMap
              geographyBounds={this.getGeoBounds(geography.iso)}
              geographyISO={isReady() ? geography.iso.toUpperCase() : ''}
            />
          </header>

          <StickyContainer>
            <Sticky>
              {(props) => <NavBar {...props} currentItem={this.props.location.hash.substr(1)} />}
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
                    title='Card title'
                    description='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.'
                    size='large'
                  />
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
                    title='Card title'
                    description='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur?'
                    size='medium'
                  />
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
    match: T.object,
    geography: T.object,
    geoMeta: T.object
  }
}

function mapStateToProps (state, props) {
  return {
    geography: wrapApiResult(getFromState(state.geographies.individualGeographies, props.match.params.geoIso)),
    geoMeta: wrapApiResult(state.geographies.meta)
  }
}

function dispatcher (dispatch) {
  return {
    fetchGeography: (...args) => dispatch(fetchGeography(...args)),
    fetchGeographiesMeta: (...args) => dispatch(fetchGeographiesMeta(...args))
  }
}

export default connect(mapStateToProps, dispatcher)(Geography)
