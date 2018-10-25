'use strict'
import React from 'react'
import { Link } from 'react-router-dom'

import App from './app'

export default class UhOh extends React.Component {
  render () {
    return (
      <App pageTitle='Not Found' >
        <article className='layout--page'>
          <header className='layout--page__header'>
            <div className='row--contained'>
              <div className='layout--page__heading'>
                <h1 className='layout--page__title'>Page not found</h1>
              </div>
            </div>
          </header>
          <div className='layout--page__body'>
            <div className='row--contained'>
              <div className='col--main prose-copy'>
                <p>We were not able to find the page you're looking for.</p>
                <p><Link className='bttn bttn-cta go' to='/' title='Go back to Global Index'>Take me home</Link></p>
              </div>
            </div>
          </div>
        </article>
      </App>
    )
  }
}
