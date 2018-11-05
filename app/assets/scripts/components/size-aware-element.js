'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import elementResizeEvent from 'element-resize-event'

import { environment } from '../config'

class SizeAwareElement extends React.Component {
  constructor (props) {
    super(props)
    this.el = null

    this.width = null
    this.height = null

    this.resizeListener = this.resizeListener.bind(this)
  }

  getSize () {
    if (!this.el) return

    const { clientHeight, clientWidth } = this.el
    const { paddingTop, paddingBottom, paddingLeft, paddingRight } = getComputedStyle(this.el)
    return {
      width: clientWidth - parseFloat(paddingLeft) - parseFloat(paddingRight),
      height: clientHeight - parseFloat(paddingTop) - parseFloat(paddingBottom)
    }
  }

  resizeListener () {
    const { width, height } = this.getSize()
    if (width !== this.width || height !== this.height) {
      this.width = width
      this.height = height
      this.props.onChange({ width, height })
    }
  }

  componentDidMount () {
    elementResizeEvent(this.el, this.resizeListener)
    this.resizeListener()
  }

  render () {
    const { element: Element, children, ...rest } = this.props
    return <Element ref={el => { this.el = el }} {...rest}>{children}</Element>
  }
}

if (environment !== 'production') {
  SizeAwareElement.propTypes = {
    onChange: T.func,
    element: T.string,
    children: T.node
  }
}

SizeAwareElement.defaultProps = {
  element: 'div',
  onChange: () => {}
}

export default SizeAwareElement
