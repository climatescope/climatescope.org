'use strict'
import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'

import store from './utils/store'
import history from './utils/history'

import Home from './views/home'
import UhOh from './views/uhoh'

// Root component. Used by the router.
const Root = () => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={Home}/>
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
