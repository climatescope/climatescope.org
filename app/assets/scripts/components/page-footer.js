'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { Link } from 'react-router-dom'

import NavGlobalMenu from './nav-global-menu'

import { environment, appEdition } from '../config'

export default class PageFooter extends React.PureComponent {
  render () {
    return (
      <footer className='page__footer' role='contentinfo'>
        <div className='inner'>
          <nav className='ftr-nav'>
            <div className='ftr-nav__block'>
              <h2 className='ftr-title'>Browse</h2>
              <NavGlobalMenu forFooter />
            </div>
            <div className='ftr-nav__block'>
              <h2 className='ftr-title'>Editions</h2>
              <ul className='ftr-menu'>
                {[2017, 2016, 2015, 2014].map(ed => (
                  <li key={ed}><a href={`http://${ed}.global-climatescope.org`} title={`Visit ${ed} Edition`} target='_blank' rel='external'>{ed}</a></li>
                ))}
              </ul>
            </div>
          </nav>

          <section className='ftr-newsletter-subs'>
            <h2 className='ftr-title'>Stay up to date</h2>
            <p className='ftr-note'>Subscribe to the mailing list.</p>
            <form className='form newsletter-form' action='' method='post' id='mc-embedded-subscribe-form' name='subscribe-form'>
              <div className='form__group'>
                <label className='form__label'>Email</label>
                <div className='form__input-group'>
                  <input type='email' name='EMAIL' className='form__control required email' id='mce-EMAIL' aria-required='true' placeholder='Email' />
                  <button type='submit' name='subscribe' id='mc-embedded-subscribe' className='bttn bttn-success disabled'><span>Subscribe</span></button>
                </div>
              </div>
            </form>
          </section>

          <section className='ftr-supporters'>
            <h2 className='ftr-title'>Supporters</h2>
            <ul className='logo-list'>
              <li><a className='logo-bnef' href='http://www.newenergyfinance.com/' title='Visit Bloomberg' target='_blank'><img width='480' height='110' alt='Bloomberg New Energy Finance logo' src='/assets/graphics/layout/logo-bnef-flat-pos.svg' /><span>Bloomberg</span></a></li>
            </ul>
          </section>
        </div>

        <div className='ftr-credits'>
          <div className='inner'>
            <p>2012-{appEdition} Climatescope. <Link to='/license' title='About the license'>View license</Link>.</p>
          </div>
        </div>
      </footer>
    )
  }
}

if (environment !== 'production') {
  PageFooter.propTypes = {
    location: T.object
  }
}
