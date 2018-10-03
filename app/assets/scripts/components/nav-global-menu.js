'use strict'
import React from 'react'

class NavGlobalMenu extends React.Component {
  render () {
    return (
      <nav id='prime-nav' role='navigation'>
        <ul className='global-menu'>
          <li><a href='#' title=''>Item 1</a></li>
          <li><a href='#' title=''>Item 2</a></li>
          <li><a href='#' title=''>Item 3</a></li>
          <li><a href='#' title=''>Item 4</a></li>
          <li><a href='#' title=''>Item 5</a></li>
          <li><a href='#' title=''>Item 6</a></li>
        </ul>
      </nav>
    )
  }
}

export default NavGlobalMenu
