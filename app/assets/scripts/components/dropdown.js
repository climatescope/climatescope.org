'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import TetherComponent from 'react-tether'
import { CSSTransition } from 'react-transition-group'

let activeDropdowns = []

/*
<Dropdown
  className='browse-menu'
  triggerClassName='browse-button'
  triggerActiveClassName='button--active'
  triggerText='Menu'
  triggerTitle='Toggle menu options'
  direction='down'
  alignment='right' >

  <h6 className='drop__title'>Browse</h6>
  <ul className='drop__menu drop__menu--select'>
    <li><Link to='' className='drop__menu-item' activeClassName='drop__menu-item--active'>Label</Link></li>
  </ul>

</Dropdown>
*/

export default class Dropdown extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      open: false
    }

    this._bodyListener = this._bodyListener.bind(this)
    this._toggleDropdown = this._toggleDropdown.bind(this)
  }

  static closeAll () {
    activeDropdowns.forEach(d => d.close())
  }

  _bodyListener (e) {
    // Get the dropdown that is a parent of the clicked element. If any.
    let theSelf = e.target
    if (theSelf.tagName === 'BODY' ||
        theSelf.tagName === 'HTML' ||
        e.target.getAttribute('data-hook') === 'dropdown:close') {
      this.close()
      return
    }

    // If the trigger element is an "a" the target is the "span", but it is a
    // button, the target is the "button" itself.
    // This code handles this case. No idea why this is happening.
    // TODO: Unveil whatever black magic is at work here.
    if (theSelf.tagName === 'SPAN' &&
        theSelf.parentNode === this.triggerRef &&
        theSelf.parentNode.getAttribute('data-hook') === 'dropdown:btn') {
      return
    }
    if (theSelf.tagName === 'SPAN' &&
        theSelf.parentNode.getAttribute('data-hook') === 'dropdown:close') {
      this.close()
      return
    }

    if (theSelf && theSelf.getAttribute('data-hook') === 'dropdown:btn') {
      if (theSelf !== this.triggerRef) {
        this.close()
      }
      return
    }

    do {
      if (theSelf && theSelf.getAttribute('data-hook') === 'dropdown:content') {
        break
      }
      theSelf = theSelf.parentNode
    } while (theSelf && theSelf.tagName !== 'BODY' && theSelf.tagName !== 'HTML')

    if (theSelf !== this.dropdownRef) {
      this.close()
    }
  }

  _toggleDropdown (e) {
    e.preventDefault()
    this.toggle()
  }

  // Lifecycle method.
  // Called once as soon as the component has a DOM representation.
  componentDidMount () {
    activeDropdowns.push(this)
    window.addEventListener('click', this._bodyListener)
  }

  // Lifecycle method.
  componentWillUnmount () {
    activeDropdowns.splice(activeDropdowns.indexOf(this), 1)
    window.removeEventListener('click', this._bodyListener)
  }

  toggle () {
    this.setState({ open: !this.state.open })
  }

  open () {
    !this.state.open && this.setState({ open: true })
  }

  close () {
    this.state.open && this.setState({ open: false })
  }

  renderTriggerElement () {
    const {
      id,
      triggerTitle,
      triggerText,
      triggerClassName,
      triggerActiveClassName,
      triggerElement: TriggerElement
    } = this.props

    let triggerKlasses = ['drop__toggle']
    let triggerProps = {
      onClick: this._toggleDropdown,
      'data-hook': 'dropdown:btn',
      ref: el => { this.triggerRef = el }
    }

    if (triggerClassName) {
      triggerKlasses.push(triggerClassName)
    }

    if (this.state.open && triggerActiveClassName) {
      triggerKlasses.push(triggerActiveClassName)
    }

    triggerProps.className = triggerKlasses.join(' ')

    // Additional trigger props.
    if (TriggerElement === 'button') {
      triggerProps.type = 'button'
    } else {
      triggerProps.href = '#'
      if (id) {
        triggerProps.href += id
      }
    }
    if (triggerTitle) {
      triggerProps.title = triggerTitle
    }

    return (
      <TriggerElement {...triggerProps} >
        <span>{ triggerText }</span>
      </TriggerElement>
    )
  }

  renderContent () {
    const { id, direction, className } = this.props

    // Base and additional classes for the trigger and the content.
    let klasses = ['drop__content', 'drop__content--react', `drop-trans--${direction}`]
    let dropdownContentProps = {
      ref: el => { this.dropdownRef = el },
      'data-hook': 'dropdown:content'
    }

    if (className) {
      klasses.push(className)
    }

    dropdownContentProps.className = klasses.join(' ')

    if (id) {
      dropdownContentProps.id = id
    }

    return (
      <CSSTransition
        in={this.state.open}
        appear={true}
        unmountOnExit={true}
        classNames='drop-trans'
        timeout={{ enter: 300, exit: 300 }}>

        <TransitionItem
          props={dropdownContentProps}
          onChange={this.props.onChange} >
          { this.props.children }
        </TransitionItem>

      </CSSTransition>
    )
  }

  render () {
    let { alignment, direction } = this.props

    let allowed
    if (direction === 'up' || direction === 'down') {
      allowed = ['left', 'center', 'right']
    } else if (direction === 'left' || direction === 'right') {
      allowed = ['top', 'middle', 'bottom']
    } else {
      throw new Error(`Dropdown: direction "${direction}" is not supported. Use one of: up, down, left, right`)
    }

    if (allowed.indexOf(alignment) === -1) {
      throw new Error(`Dropdown: alignment "${alignment}" is not supported when direction is ${direction}. Use one of: ${allowed.join(', ')}`)
    }

    let tetherAttachment
    let tetherTargetAttachment
    switch (direction) {
      case 'up':
        tetherAttachment = `bottom ${alignment}`
        tetherTargetAttachment = `top ${alignment}`
        break
      case 'down':
        tetherAttachment = `top ${alignment}`
        tetherTargetAttachment = `bottom ${alignment}`
        break
      case 'right':
        tetherAttachment = `${alignment} left`
        tetherTargetAttachment = `${alignment} right`
        break
      case 'left':
        tetherAttachment = `${alignment} right`
        tetherTargetAttachment = `${alignment} left`
        break
    }

    // attachment={tetherAttachment}
    // targetAttachment={tetherTargetAttachment}
    return (
      <TetherComponent
        // attachment is the content.
        attachment={tetherAttachment}
        // targetAttachment is the trigger
        targetAttachment={tetherTargetAttachment}
        constraints={[{
          to: 'scrollParent',
          attachment: 'together'
        }]}>
        {this.renderTriggerElement()}
        {this.renderContent()}
      </TetherComponent>
    )
  }
}

Dropdown.defaultProps = {
  triggerElement: 'button',
  direction: 'down',
  alignment: 'center'
}

if (process.env.NODE_ENV !== 'production') {
  Dropdown.propTypes = {
    id: T.string,
    onChange: T.func,

    triggerElement: T.oneOf(['a', 'button']),
    triggerClassName: T.string,
    triggerActiveClassName: T.string,
    triggerTitle: T.string,
    triggerText: T.string.isRequired,

    direction: T.oneOf(['up', 'down', 'left', 'right']),
    alignment: T.oneOf(['left', 'center', 'right', 'top', 'middle', 'bottom']),

    className: T.string,
    children: T.node
  }
}

class TransitionItem extends React.Component {
  componentDidMount () {
    this.props.onChange && this.props.onChange(true)
  }

  componentWillUnmount () {
    this.props.onChange && this.props.onChange(false)
  }

  render () {
    return <div {...this.props.props}>{ this.props.children }</div>
  }
}

if (process.env.NODE_ENV !== 'production') {
  TransitionItem.propTypes = {
    onChange: T.func,
    props: T.object,
    children: T.node
  }
}
