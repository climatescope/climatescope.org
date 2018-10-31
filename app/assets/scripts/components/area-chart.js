'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { CSSTransition } from 'react-transition-group'
import isEqual from 'lodash.isequal'
import { area, line } from 'd3-shape'
import { select, mouse } from 'd3-selection'
import { axisBottom, axisLeft } from 'd3-axis'
import { scaleTime, scaleLinear } from 'd3-scale'

import { environment } from '../config'
import { splitArray } from '../utils/array'
import { dateFromYear } from '../utils/utils'

import SizeAwareElement from './size-aware-element'

class AreaChart extends React.Component {
  constructor (props) {
    super(props)
    this.componentEl = null
    this.margin = { top: 32, right: 32, bottom: 36, left: 80, innerLeft: 32, innerRight: 32 }
    // Control whether the chart was rendered.
    // The size aware element fires a onChange event once it is rendered
    // But at that time the chart is not ready yet so we can't update the size.
    this.initialized = false

    this.container = null
    this.svg = null
    this.dataCanvas = null

    this.resizeListener = this.resizeListener.bind(this)
  }

  resizeListener () {
    if (!this.initialized) return
    this.updateChart(this.props)
  }

  getSize () {
    const { top, bottom, right, left } = this.margin
    const { width, height } = this.container.getSize()
    return {
      width: parseInt(width, 10) - left - right,
      height: parseInt(height, 10) - top - bottom
    }
  }

  onMouseOver () {
    this.props.onBisectorEvent('over')
  }

  onMouseOut () {
    this.props.onBisectorEvent('out')
  }

  onBisect (cmp, eventType) {
    // Return a function because we need access to the react component and to
    // d3's 'this'
    return function (data) {
      // Scale
      const xScale = cmp.xScale

      // Since we just need access to the year, we can just invert the scale.
      // In this case there's no need for a bisector.
      const mouseX = mouse(this)[0]
      const mouseYear = xScale.invert(mouseX).getFullYear()
      const [minDate, maxDate] = xScale.domain()

      // Ensure that we're within domain bounds.
      const year = Math.max(minDate.getFullYear(), Math.min(mouseYear, maxDate.getFullYear()))

      cmp.props.onBisectorEvent(eventType, new Date(`${year}-01-01`))
    }
  }

  setupTriggerMouse (selection) {
    selection
      .on('mouseover', this.onMouseOver.bind(this))
      .on('mouseout', this.onMouseOut.bind(this))
      .on('mousemove', this.onBisect(this, 'move'))
      // .on('click', this.onBisect(this, 'click'))
  }

  initChart () {
    const { top, left, innerLeft } = this.margin
    this.svg = select(this.container.el).append('svg').attr('class', 'chart')

    this.dataCanvas = this.svg.append('g')
      .attr('class', 'data-canvas')
      .attr('transform', `translate(${left},${top})`)

    // Debug
    this.svg.append('rect')
      .attr('class', 'data-canvas-debug')
      .attr('transform', `translate(${left},${top})`)

    // Data areas group
    this.dataCanvas.append('g')
      .attr('class', 'data-areas data-layer')
      .attr('transform', `translate(${innerLeft},0)`)

    // Axis.
    this.svg.append('g')
      .attr('class', 'x axis')

    this.svg.append('g')
      .attr('class', 'y axis')

    this.svg.append('text')
      .attr('class', 'chart-label chart-label-y')
      .attr('text-anchor', 'end')
      .attr('transform', `translate(${left},0)`)
      .attr('dy', '0.71em')

    this.svg.append('text')
      .attr('class', 'chart-label chart-label-x')
      .attr('dy', '0.71em')

    this.dataCanvas.append('line')
      .attr('class', 'bisector-interact')
      .attr('transform', `translate(${innerLeft},0)`)

    this.dataCanvas.append('g')
      .attr('class', 'bisector-circles')

    // Trigger area.
    this.svg.append('rect')
      .attr('class', 'trigger-rect')
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .attr('transform', `translate(${left},${top})`)
      .call(this.setupTriggerMouse.bind(this))
  }

  drawXAxis (scale) {
    const { top, left, innerLeft } = this.margin
    const { height } = this.getSize()
    const { svg } = this

    const xAxis = axisBottom(scale)

    const xAxisEl = svg.select('.x.axis')
      .attr('transform', `translate(${left + innerLeft},${height + top})`)
      .call(xAxis)
      .attr('font-size', '')

    xAxisEl.select('.domain').remove()
    xAxisEl.selectAll('.tick line').remove()
  }

  drawYAxis (scale) {
    const { top, left } = this.margin
    const { width, height } = this.getSize()
    const { svg } = this

    const yAxis = axisLeft(scale)
      .ticks(Math.ceil(height / 48))
      .tickSize(-width)

    const yAxisEl = svg.select('.y.axis')
      .attr('transform', `translate(${left},${top})`)
      .call(yAxis)

    yAxisEl.select('.domain').remove()
  }

  drawAreas (props) {
    const { dataCanvas, yScale, xScale } = this
    const { data, interactionData: { hover, hoverDateValue } } = props

    let areasG = dataCanvas.select('.data-areas').selectAll('.area')
      .data(data)

    // Remove old.
    areasG.exit().remove()
    // Handle new.
    areasG.enter()
      .append('g')
      .merge(areasG)
      .attr('class', 'area')
      .each(function (d) {
        select(this)
          .datum(d)
          .call(chartArea()
            .xScale(xScale)
            .yScale(yScale)
            .activeDate(hover && hoverDateValue ? hoverDateValue : null)
          )
      })
  }

  updateChart (props) {
    const { top, bottom, right, left, innerLeft, innerRight } = this.margin
    const { width, height } = this.getSize()
    const { svg, dataCanvas } = this
    const { yDomain, xDomain, xLabel, yLabel, interactionData: { hover, hoverDateValue } } = props

    // ---------------------------------------------------
    // Functions

    const x = scaleTime()
      .domain(xDomain)
      .range([0, width - innerLeft - innerRight])
    // Scale is needed for the mouseMove function.
    this.xScale = x

    const y = scaleLinear()
      .domain(yDomain)
      .range([height, 0])
    // Scale is needed for the mouseMove function.
    this.yScale = y

    // ---------------------------------------------------
    // Size updates
    svg
      .attr('width', width + left + right)
      .attr('height', height + top + bottom)

    dataCanvas
      .attr('width', width)
      .attr('height', height)

    // Set the data to use to get the correct index.
    svg.select('.trigger-rect')
      .attr('width', width)
      .attr('height', height + top)

    svg.select('.data-canvas-debug')
      .attr('width', width)
      .attr('height', height)

    // ---------------------------------------------------
    // Append Axis.
    this.drawXAxis(x)
    this.drawYAxis(y)

    // Chart label
    svg.select('.chart-label-y')
      .text(yLabel)
    svg.select('.chart-label-x')
      // +9 to ensure it aligns with the axis.
      .attr('transform', `translate(${left + width},${top + height + 9})`)
      .text(xLabel)

    // ---------------------------------------------------
    // Areas
    this.drawAreas(props)

    // ---------------------------------------------------
    // Bisectors
    const bisectorInteract = dataCanvas.select('.bisector-interact')
    bisectorInteract.style('display', hover ? '' : 'none')
    if (hover && hoverDateValue) {
      const xPos = this.xScale(hoverDateValue)
      bisectorInteract
        .attr('y2', 0)
        .attr('y1', height)
        .attr('x1', xPos)
        .attr('x2', xPos)
    }

    // // Bisector select
    // if (selectedDateValue) {
    //   const xPos = this.xScale(new Date(selectedDateValue))
    //   dataCanvas.select('.bisector-select')
    //     .attr('y2', 0)
    //     .attr('y1', height)
    //     .attr('x1', xPos)
    //     .attr('x2', xPos)
    // }
  }

  componentWillReceiveProps (nextProps) {
    const nIact = nextProps.interactionData
    const pIact = this.props.interactionData

    if (!isEqual(this.props.data, nextProps.data)) {
      this.updateChart(nextProps)

      // Micro updates for performance reasons
    } else if (nIact.hover && nIact.hoverDateValue) {
      const xPos = this.xScale(nIact.hoverDateValue)
      const { height } = this.getSize()
      this.dataCanvas.select('.bisector-interact')
        .style('display', '')
        .attr('y2', 0)
        .attr('y1', height)
        .attr('x1', xPos)
        .attr('x2', xPos)

      this.drawAreas(nextProps)
    } else if (!nIact.hover && pIact.hover) {
      this.dataCanvas.select('.bisector-interact').style('display', 'none')
      this.drawAreas(nextProps)
    }
  }

  componentDidMount () {
    this.initChart()
    this.updateChart(this.props)
    this.initialized = true
  }

  renderPopover () {
    const { dataCanvas, xScale } = this
    const { data, interactionData: { hoverDateValue, hover } } = this.props

    if (!hoverDateValue || !this.componentEl) return

    const year = hoverDateValue.getFullYear()

    const { x, y, width } = this.componentEl.getBoundingClientRect()
    const matrix = dataCanvas.node().getScreenCTM()
      .translate(xScale(hoverDateValue), 0)

    const popoverWidth = 176
    let posY = matrix.f - y + 48 // 3rem
    let posX = matrix.e - x

    let dirClassName

    if (posX + popoverWidth + 8 > width) {
      // Flip.
      posX -= popoverWidth + 8
      dirClassName = 'schart__popover--left'
    } else {
      posX += 8
      dirClassName = 'schart__popover--right'
    }

    const style = {
      position: 'absolute',
      zIndex: 100,
      pointerEvents: 'none',
      left: posX + 'px',
      top: posY + 'px'
    }

    return (
      <CSSTransition
        in={hover}
        appear={true}
        unmountOnExit={true}
        classNames='popover-trans'
        timeout={{ enter: 300, exit: 300 }}>
        <article className={`popover ${dirClassName} `} style={style}>
          <div className='popover__contents'>
            <div className='popover__body'>
              <dl className='legend par-legend'>
                {data.map(d => (
                  <React.Fragment key={d.name}>
                    <dt>{d.name}</dt>
                    <dd>{d.values.find(v => v.year === year).value}</dd>
                  </React.Fragment>
                ))}
              </dl>
            </div>
          </div>
        </article>
      </CSSTransition>
    )
  }

  render () {
    return (
      <figure className='schart' ref={el => { this.componentEl = el }}>

        {this.renderPopover()}

        <SizeAwareElement
          ref={el => { this.container = el }}
          onChange={this.resizeListener}
          className='schart__graph' />
      </figure>
    )
  }
}

if (environment !== 'production') {
  AreaChart.propTypes = {
    onBisectorEvent: T.func,
    interactionData: T.object,
    xLabel: T.string,
    yLabel: T.string,
    yDomain: T.array,
    xDomain: T.array,
    data: T.array
  }
}

export default AreaChart

function chartArea () {
  let _xScale = null
  let _yScale = null
  let activeYear = null

  const areaFn = area()
    .x(d => _xScale(d.date))
    .y0(d => _yScale(d.d0))
    .y1(d => _yScale(d.d1))

  const lineFn = line()
    .x(d => _xScale(d.date))
    .y(d => _yScale(d.d1))

  function chartArea (selection) {
    const data = selection.data()
    const values = data[0].values

    // ---------------------------------------------------
    // Area
    const areaEl = selection.selectAll('.area__path')
      .data([values])

    // Remove old.
    areaEl.exit().remove()
    // Handle new.
    areaEl.enter()
      .append('path')
      .attr('class', 'area__path')
      .merge(areaEl)
      // Update current.
      .attr('d', areaFn)

    // ---------------------------------------------------
    // Line
    const lineEl = selection.selectAll('.area__line')
      .data([values])

    // Remove old.
    lineEl.exit().remove()
    // Handle new.
    lineEl.enter()
      .append('path')
      .attr('class', 'area__line')
      .merge(lineEl)
      // Update current.
      .attr('d', lineFn)

    // ---------------------------------------------------
    // Line
    const circle = selection.selectAll('.area__circle')
      .data(values)

    // Remove old.
    circle.exit().remove()
    // Handle new.
    circle.enter()
      .append('circle')
      .attr('class', 'area__circle')
      .merge(circle)
      // Update current.
      .attr('r', d => d.date.getFullYear() === activeYear ? '4px' : '3px')
      .classed('active', d => d.date.getFullYear() === activeYear)
      .attr('cx', d => _xScale(d.date))
      .attr('cy', d => _yScale(d.d1))
  }

  chartArea.xScale = (_) => {
    _xScale = _
    return chartArea
  }

  chartArea.yScale = (_) => {
    _yScale = _
    return chartArea
  }

  chartArea.activeDate = (_) => {
    activeYear = _ ? _.getFullYear() : null
    return chartArea
  }

  return chartArea
}

/**
 * Prepares the data for the creation of the area chart
 * @param {array} data Data as coming from the api
 * @param {array} passThrough Types to keep. The other will be merged into others.
 */
export const computeAreaChartData = (data, passThrough) => {
  if (!data) return { yDomain: [], xDomain: [], data: [], xLabel: '', yLabel: '' }

  const { left: toKeep, right: toGroup } = splitArray(data.data, item => passThrough.indexOf(item.name) !== -1)

  const others = {
    name: 'Other',
    values: toGroup.reduce((acc, items) => {
      // Only on the first run.
      if (!acc.length) return items.values

      return acc.map((datum, idx) => {
        if (datum.value === null) {
          return {
            ...datum,
            value: items.values[idx].value
          }
        }
        if (items.values[idx].value === null) {
          return datum
        }

        return {
          ...datum,
          value: datum.value + items.values[idx].value
        }
      })
    }, [])
  }

  // Sort the toKeep.
  toKeep.sort((a, b) => {
    const sum = (v) => v.reduce((acc, o) => acc + o.value, 0)
    return sum(a.values) > sum(b.values) ? 1 : -1
  })

  const chartData = [
    others,
    ...toKeep
  ]

  // I'll stack my own data.
  // D3's method for stacking data returns an array and it's not easy to use
  // with our data structure.
  // Using a reduce instead of a map so we have access to the modified object.
  const staked = chartData.reduce((acc, type, tIdx) => {
    return acc.concat({
      ...type,
      values: type.values.map((val, yIdx) => {
        // Fetch the previous value to use as d0.
        const d0 = tIdx > 0 ? acc[tIdx - 1].values[yIdx].d1 : 0
        return {
          ...val,
          date: dateFromYear(val.year),
          d0,
          d1: d0 + val.value
        }
      })
    })
  }, [])

  // Since this is staked, the last one will have the larger values.
  const yDomain = [
    0,
    staked[staked.length - 1].values.reduce((acc, { d1 }) => Math.max(acc, d1), 0)
  ]

  // Since they're all the same, use the first one.
  const yearStart = staked[0].values[0].year
  const yearEnd = staked[0].values[staked[0].values.length - 1].year
  const xDomain = [
    dateFromYear(yearStart),
    dateFromYear(yearEnd)
  ]

  // Reverse to correct rendering order.
  staked.reverse()
  return {
    yDomain,
    xDomain,
    data: staked,
    xLabel: data.meta['label-x'],
    yLabel: data.meta['label-y']
  }
}