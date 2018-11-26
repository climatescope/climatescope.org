'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { Link } from 'react-router-dom'
import MailchimpSubscribe from 'react-mailchimp-subscribe'
import c from 'classnames'

import NavGlobalMenu from './nav-global-menu'

import { environment, appEdition, mailchimpUrl } from '../config'

export default class PageFooter extends React.PureComponent {
  render () {
    return (
      <footer className='page__footer footer' role='contentinfo'>
        <div className='inner'>
          <nav className='footer__block footer__block--nav nav'>
            <h2 className='footer__title'>Browse</h2>
            <NavGlobalMenu forFooter />
          </nav>

          <MailChimpNewsletter />

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

class MailChimpNewsletter extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      email: ''
    }

    this.onChange = this.onChange.bind(this)
  }

  isValid () {
    const idx = this.state.email.indexOf('@')
    return idx !== -1 && idx === this.state.email.lastIndexOf('@')
  }

  onChange (evt) {
    this.setState({ email: evt.target.value })
  }

  onSubmit (subscribe, e) {
    e.preventDefault()
    if (this.isValid()) {
      subscribe({
        EMAIL: this.state.email
      })
    }
  }

  render () {
    return (
      <MailchimpSubscribe
        url={mailchimpUrl || ''}
        render={({ subscribe, status, message }) => (
          <section className='footer__block footer__block--newsletter'>
            <h2 className='footer__title'>Stay up to date</h2>
            <p>Subscribe to the mailing list.</p>
            <form className={c('form newsletter-form', { disabled: status === 'sending' || !mailchimpUrl })} method='post' id='mc-embedded-subscribe-form' name='subscribe-form' disabled={status === 'sending'} onSubmit={this.onSubmit.bind(this, subscribe)}>
              <div className='form__group'>
                <label className='form__label'>Email</label>
                <div className='form__input-group form__input-group--medium'>
                  <input type='email' name='EMAIL' className='form__control required email' id='mce-EMAIL' aria-required='true' placeholder='Email' value={this.state.email} onChange={this.onChange} />
                  <button type='submit' name='subscribe' id='mc-embedded-subscribe' className='button button--primary-raised-dark'><span>Subscribe</span></button>
                </div>
              </div>
            </form>
            <div className='form__help' id='mce-responses'>
              {status === 'error' && <p className='mce-response' id='mce-error-response'>Something went wrong.</p>}
              {status === 'success' && <p className='mce-response' id='mce-success-response'>You're now subscribed!</p>}
            </div>
          </section>
        )}
      />
    )
  }
}
