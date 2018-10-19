'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { Link } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import c from 'classnames'

import { environment } from '../config'
import { initializeArrayWithRange, padNumber } from '../utils/utils'
import { LoadingSkeleton } from './loading-skeleton'

const ParameterGraph = ({ parameters }) => (
  <div className='table-graph'>
    <ul className='table-bar' data-tip='countryid' data-for='param-graph-tooltip'>
      {parameters.map(param => (
        <li key={param.id} className={`param-${param.id}`} style={{ width: '20%' }}><span className='visually-hidden'>10</span>&nbsp;</li>
      ))}
    </ul>
  </div>
)

if (environment !== 'production') {
  ParameterGraph.propTypes = {
    parameters: T.array
  }
}

export default class ResultsTable extends React.PureComponent {
  componentDidUpdate () {
    ReactTooltip.rebuild()
  }

  onSort (field, e) {
    e.preventDefault()
    const { sortDirection, onSort } = this.props
    onSort(field, sortDirection === 'asc' ? 'desc' : 'asc')
  }

  renderTableHeader () {
    const headings = [
      {
        id: 'rank',
        sortable: true,
        title: 'Sort by rank',
        value: 'Global rank'
      },
      {
        id: 'geography',
        sortable: true,
        title: 'Sort by geography',
        value: 'Geography'
      },
      {
        id: 'score',
        sortable: true,
        title: 'Sort by score',
        value: 'Score'
      },
      {
        id: 'trend',
        sortable: false,
        value: 'Trend'
      },
      {
        id: 'graph',
        sortable: false,
        value: <><span className='visually-hidden'>Topics:</span> 0.0 - 5.0</>
      },
      {
        id: 'grid',
        sortable: true,
        title: 'Sort by grid',
        value: 'Grid'
      }
    ]

    return (
      <thead>
        <tr>
          {headings.map(o => {
            if (!o.sortable) return <th className={`th-${o.id}`} key={o.id}>{o.value}</th>

            const { sortField, sortDirection } = this.props
            const klass = c('sort', {
              'sort-none': sortField !== o.id,
              'sort-asc': sortField === o.id && sortDirection === 'asc',
              'sort-desc': sortField === o.id && sortDirection === 'desc'
            })
            return <th className={`th-${o.id}`} key={o.id}><a href='#' title={o.title} className={klass} onClick={this.onSort.bind(this, o.id)}>{o.value}</a></th>
          })}
        </tr>
      </thead>
    )
  }

  renderLoadingRows () {
    return initializeArrayWithRange(10).map(v => (
      <tr key={v}>
        <td><LoadingSkeleton /></td>
        <td><LoadingSkeleton /></td>
        <td><LoadingSkeleton /></td>
        <td><LoadingSkeleton /></td>
      </tr>
    ))
  }

  renderRows () {
    const rows = initializeArrayWithRange(105)
    return rows.map(r => {
      return (
        <tr key={r}>
          <td className='cell-rank'>{padNumber(r + 1, 3)}</td>
          <td className='cell-country'>
            <Link to='' title='Go to geography page'>Geography Name</Link>
          </td>
          <td>3.25</td>
          <td className='cell-trendline'>¿trendline?</td>
          <td>
            <ParameterGraph
              parameters={[{ id: 1 }, { id: 2 }, { id: 3 }]}
            />
          </td>
          <td><em data-title='on-grid' className='label-grid label-grid-on'><span>on</span></em></td>
        </tr>
      )
    })
  }

  renderParamGraphTooltip () {
    const popoverContent = (countryId) => {
      return (
        <article className='tooltip-inner'>
          <dl className='params-legend'>
            <dt className='param-1'>Fundamentals</dt>
            <dd>3.00<small>20%</small></dd>
            <dt className='param-2'>Opportunities</dt>
            <dd>3.20<small>20%</small></dd>
            <dt className='param-3'>Experience</dt>
            <dd>3.40<small>20%</small></dd>
          </dl>
        </article>
      )
    }

    return (
      <ReactTooltip
        id='param-graph-tooltip'
        effect='solid'
        type='custom'
        className='tooltip'
        getContent={popoverContent}
      />
    )
  }

  render () {
    return (
      <>
        <table className='table country-table'>
          {this.renderTableHeader()}
          <tbody>
            {
              this.props.loading
                ? this.renderLoadingRows()
                : this.renderRows()
            }
          </tbody>
        </table>
        {this.renderParamGraphTooltip()}
      </>
    )
  }
}

if (environment !== 'production') {
  ResultsTable.propTypes = {
    sortField: T.string,
    sortDirection: T.string,
    loading: T.bool,
    onSort: T.func
  }
}
