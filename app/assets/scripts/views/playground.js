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
              </div>
            </div>
          </div>

        </article>
      </App>
    )
  }
}
