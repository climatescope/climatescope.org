'use strict'
import React from 'react'

import App from './app'

export default class Playground extends React.Component {
  render () {
    return (
      <App className='page--playground'>
        <article className='inpage'>
          <header className='inpage__header'>
            <div className='inner'>
              <div className='inpage__headline'>
                <h1 className='inpage__title'>Playground</h1>
              </div>
            </div>
          </header>

          <div className='inpage__body'>
            <div className='inner'>
              <div className='col col--main'>
                <p>Testing out new components.</p>

                <article className='popover popover--static' id='marker-tip'>
                  <div className='popover__contents'>
                    <header className='popover__header'>
                      <div className='popover__headline'>
                        <h1 className='popover__title'><a title='View Philippines page' href='/results/PH'>Showcasing is a really long title</a> <small className='label label--grid'><span>On-grid</span></small></h1>
                      </div>
                      <div className='popover__header-toolbar'><a href='#' title='Close' className='tba-xmark tba--text-hidden'><span>Close</span></a></div>
                    </header>
                    <div className='popover__body'>
                      <dl className='legend par-legend'>
                        <dt>Rank</dt>
                        <dd>10</dd>
                        <dt>Score</dt>
                        <dd>2.16</dd>
                        <dt className='legend__key--par-1'>Fundamentals</dt>
                        <dd>2.95 <small>50%</small></dd>
                        <dt className='legend__key--par-2'>Opportunities</dt>
                        <dd>1.18 <small>25%</small></dd>
                        <dt className='legend__key--par-3'>Experience</dt>
                        <dd>1.56 <small>25%</small></dd>
                      </dl>
                    </div>
                    <footer className='popover__footer'>
                      <a className='popover__cta' title='View Philippines page' href='/results/PH'><span>View more</span></a>
                    </footer>
                  </div>
                </article>

              </div>
            </div>
          </div>

        </article>
      </App>
    )
  }
}
