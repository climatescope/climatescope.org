'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { Link } from 'react-router-dom'

import NavGlobalMenu from './nav-global-menu'

import { environment, appEdition } from '../config'

export default class PageFooter extends React.PureComponent {
  render () {
    return (
      <footer className='page__footer footer' role='contentinfo'>
        <div className='inner'>
          <nav className='footer__block footer__block--nav nav'>
            <h2 className='footer__title'>Browse</h2>
            <NavGlobalMenu forFooter />
          </nav>

          <section className='footer__block footer__block--newsletter'>
            <h2 className='footer__title'>Stay up to date</h2>
            <p>Subscribe to the mailing list.</p>
            <form className='form newsletter-form disabled' action='' method='post' id='mc-embedded-subscribe-form' name='subscribe-form'>
              <div className='form__group'>
                <label className='form__label'>Email</label>
                <div className='form__input-group form__input-group--medium'>
                  <input type='email' name='EMAIL' className='form__control required email' id='mce-EMAIL' aria-required='true' placeholder='Email' />
                  <button type='submit' name='subscribe' id='mc-embedded-subscribe' className='button button--primary-raised-dark'><span>Subscribe</span></button>
                </div>
              </div>
            </form>
          </section>

          <section className='footer__block footer__block--supporters'>
            <h2 className='footer__title'>Supporters</h2>
            <ul className='logo-list'>
              <li>
                <a className='logo-dfid' href='https://www.gov.uk/government/organisations/department-for-international-development' title='Visit Department for International Development' target='_blank'>
                  <img src='/assets/graphics/layout/logo-dfid-flat-pos.svg' alt='Department for International Development logo' />
                  <span>Department for International Development</span>
                </a>
              </li>
              <li>
                <a className='logo-ukaid' href='https://www.gov.uk/government/organisations/department-for-international-development' title='Visit UK Aid' target='_blank'>
                  <img src='/assets/graphics/layout/logo-ukaid-flat-pos.svg' alt='UK Aid logo' />
                  <span>UK Aid</span>
                </a>
              </li>
            </ul>
          </section>
        </div>

        <div className='footer__credits'>
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
