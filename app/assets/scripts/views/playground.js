'use strict'
import React from 'react'

import App from './app'

export default class Playground extends React.Component {
  render () {
    return (
      <App>
        <article className='layout--page full'>
          <header className='layout--page__header'>
            <div className='row--contained'>
              <div className='layout--page__heading'>
                <h1 className='layout--page__title'>Playground</h1>
              </div>
            </div>
          </header>

          <div className='layout--page__body'>
            <div className='row--contained'>
              <div className='col--main prose-copy'>
                <p>Testing out new components.</p>

                <section className='par-section par-section--alpha'>
                  <header className='par-section__header'>
                    <h1 className='par-section__title'>Section title</h1>
                    <div className='par-section__description'>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                  </header>

                  <article className='info-card info-card--large info-card--plain info-card-1'>
                    <h1 className='info-card__title'>Card title</h1>
                    <div className='info-card__statement'>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur?</p>
                    </div>
                  </article>

                  <article className='info-card info-card--small info-card--dark info-card-2'>
                    <h1 className='info-card__title'>Card title</h1>
                    <div className='info-card__statement'>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur?</p>
                    </div>
                  </article>

                  <article className='info-card info-card--small info-card--dark info-card-3'>
                    <h1 className='info-card__title'>Card title</h1>
                    <div className='info-card__statement'>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur?</p>
                    </div>
                  </article>

                  <article className='info-card info-card--small info-card--dark info-card-4'>
                    <h1 className='info-card__title'>Card title</h1>
                    <div className='info-card__statement'>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur?</p>
                    </div>
                  </article>

                  <article className='info-card info-card--medium info-card--dark info-card-5'>
                    <h1 className='info-card__title'>Card title</h1>
                    <div className='info-card__statement'>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur?</p>
                    </div>
                  </article>
                </section>


              </div>
            </div>
          </div>

        </article>
      </App>
    )
  }
}
