'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'

import { environment } from '../config'

export default class PageFooter extends React.PureComponent {
  render () {
    return (
      <footer id='site-footer' role='contentinfo'>
        <div className='row--contained'>
          <nav className='ftr-nav'>
            <div className='ftr-nav__block'>
              <h2 className='ftr-title'>Browse</h2>
              <ul className='ftr-menu'>
                <li><a href='/results' title='View results'>Results</a></li>
                <li><a href='/insights' title='View insights'>Insights</a></li>
                <li><a href='/about' title='View tools'>About</a></li>
                <li><a href='' title='View contact'>Contact</a></li>
              </ul>
            </div>
            <div className='ftr-nav__block'>
              <h2 className='ftr-title'>Editions</h2>
              <ul className='ftr-menu'>
                <li><a href='http://2016.global-climatescope.org' title='Visit 2016 Edition' target='_blank' rel='external'>2016</a></li>
                <li><a href='http://2015.global-climatescope.org' title='Visit 2015 Edition' target='_blank' rel='external'>2015</a></li>
                <li><a href='http://2014.global-climatescope.org' title='Visit 2014 Edition' target='_blank' rel='external'>2014</a></li>
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
                  <button type='submit' name='subscribe' id='mc-embedded-subscribe' className='bttn bttn-success'><span>Subscribe</span></button>
                </div>
              </div>
            </form>
          </section>

          <section className='ftr-supporters'>
            <h2 className='ftr-title'>Supporters</h2>
            <ul className='logo-list'>
              <li><a className='logo-ukaid' href='https://www.gov.uk/government/organisations/department-for-international-development' title='Visit UK Aid' target='_blank'><img width='118' height='128' alt='UK Aid logo' src='{{ site.domain }}{{ site.path_prefix }}/assets/images/layout/logo-ukaid-flat-pos.svg' /><span>UK Aid</span></a></li>
              <li><a className='logo-bnef' href='http://www.newenergyfinance.com/' title='Visit Bloomberg' target='_blank'><img width='480' height='110' alt='Bloomberg New Energy Finance logo' src='{{ site.domain }}{{ site.path_prefix }}/assets/images/layout/logo-bnef-flat-pos.svg' /><span>Bloomberg</span></a></li>
            </ul>
          </section>
        </div>

        <div className='ftr-credits'>
          <div className='row--contained'>
            <p>2012-2018 Climatescope. <a href='' title='About the license'>View license</a>.</p>
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
