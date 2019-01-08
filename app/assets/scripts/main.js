'use strict'
import 'babel-polyfill'
import 'isomorphic-fetch'
import React from 'react'
import ReactGA from 'react-ga'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'

import { gaTrackingID } from './config'
import store from './utils/store'
import history from './utils/history'

import RedirectRoute from './redirect-route'

import Home from './views/home'
import StaticPage from './views/static-page'
import Library from './views/library'
import Policies from './views/policies-hub'
import Policy from './views/policies-page'
import Results from './views/results'
import Compare from './views/compare'
import Geography from './views/geographies-page'
import Playground from './views/playground'
import UhOh from './views/uhoh'

// Google analytics
if (gaTrackingID) {
  ReactGA.initialize(gaTrackingID)
  ReactGA.pageview(window.location.pathname + window.location.search)
  history.listen(location => ReactGA.pageview(location.pathname + location.search))
}

// Root component. Used by the router.
const Root = () => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <RedirectRoute path='/en(/:path*)?' />
        <Route exact path='/' component={Home}/>
        <Route exact path='/results' component={Results}/>
        <Route exact path='/results/:geoIso' component={Geography}/>
        <Route exact path='/library' component={Library}/>
        <Route path='/compare/:geoIsos*' component={Compare}/>
        <Route exact path='/policies/:policyId' component={Policy}/>
        <Route exact path='/policies' component={Policies}/>
        <Route exact path='/playground' component={Playground}/>
        <Route exact path='/:page' component={StaticPage}/>
        <Route path='*' component={UhOh} />
      </Switch>
    </Router>
  </Provider>
)

render(
  <Root store={store} />,
  document.querySelector('#app-container')
);

// Polyfill for HTML Node remove();
// https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('remove')) {
      return
    }
    Object.defineProperty(item, 'remove', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function remove () {
        if (this.parentNode !== null) this.parentNode.removeChild(this)
      }
    })
  })
})([Element.prototype, CharacterData.prototype, DocumentType.prototype])
