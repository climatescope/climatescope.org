'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'

import { environment } from '../config'

/**
 * The tools available on Climatescope are inserted as embeds and need some
 * accompanying scripts to run. It is not possible to simply use
 * dangerouslySetInnerHTML to render the content, because the script tags won't
 * be executed.
 * The solution is to create DOM elements for each of the scripts individually
 * and then add them to the DOM. In this way the browser will execute them.
 *
 * Important: This component does not support updates to the content. If that is
 * needed use the key.
 */
class DangerouslySetScriptContent extends React.PureComponent {
  componentDidMount () {
    const containerEl = this.refs.container
    // Set the content to create the DOM structure.
    containerEl.innerHTML = this.props.dangerousContent
    // Get all the scripts in array format and create an element for each.
    ;[...containerEl.getElementsByTagName('script')].forEach(s => {
      // We have to create a new element and set its content, otherwise the
      // browser won't run it.
      const scriptEl = document.createElement('script')
      scriptEl.text = s.text
      containerEl.appendChild(scriptEl)
      // Remove the original script tag.
      s.remove()
    })
  }

  render () {
    const { dangerousContent, element: El, ...rest } = this.props
    return <El ref='container' {...rest}/>
  }
}

DangerouslySetScriptContent.defaultProps = {
  element: 'div'
}

if (environment !== 'production') {
  DangerouslySetScriptContent.propTypes = {
    dangerousContent: T.string
  }
}

export default DangerouslySetScriptContent
