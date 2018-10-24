'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { Link } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import orderBy from 'lodash.orderby'
import c from 'classnames'

import { environment } from '../config'
import { initializeArrayWithRange, padNumber, round } from '../utils/utils'
import { LoadingSkeleton } from './loading-skeleton'

const ParameterGraph = ({ countryIso, data }) => (
  <div className='table-graph'>
    <ul className='table-bar' data-tip={countryIso} data-for='param-graph-tooltip'>
      {data.map(({ id, value, weight }, idx) => (
        <li key={id} className={`param-${idx + 1}`} style={{ width: `${value * (weight / 100) * (100 / 5)}%` }}><span className='visually-hidden'>{value}</span>&nbsp;</li>
      ))}
    </ul>
  </div>
)

if (environment !== 'production') {
  ParameterGraph.propTypes = {
    countryIso: T.string,
    data: T.array
  }
}

export default class ResultsTable extends React.PureComponent {
  componentDidUpdate () {
    ReactTooltip.rebuild()
  }

  onSort (field, e) {
    e.preventDefault()
    const { sortField, sortDirection, onSort } = this.props
    if (sortField === field) {
      // Same field, change direction.
      onSort(sortField, sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      // Different fields, reset direction.
      onSort(field, 'asc')
    }
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
        id: 'name',
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
    const { data, sortField, sortDirection } = this.props
    const rows = orderBy(data, sortField, sortDirection)

    return rows.map(({ iso, score, rank, name, topics, grid }) => {
      return (
        <tr key={iso}>
          <td className='cell-rank'>{padNumber(rank, 3)}</td>
          <td className='cell-country'>
            <Link to={`/results/${iso}`} title={`Go to ${name} page`}>{name}</Link>
          </td>
          <td>{round(score)}</td>
          <td>
            <ParameterGraph
              countryIso={iso}
              data={topics}
            />
          </td>
          <td>
            <em data-title={grid ? 'on-grid' : 'off-grid'} className={c('label-grid', { 'label-grid-on': grid, 'label-grid-off': !grid })}>
              <span>{grid ? 'on' : 'off'}</span>
            </em>
          </td>
        </tr>
      )
    })
  }

  renderParamGraphTooltip () {
    const popoverContent = (countryIso) => {
      if (!countryIso) return null
      const country = this.props.data.find(c => c.iso === countryIso)

      return (
        <article className='tooltip-inner'>
          <dl className='params-legend'>
            {country.topics.map(({ id, name, value, weight }, idx) => (
              <React.Fragment key={idx}>
                <dt className={`param-${idx + 1}`}>{name}</dt>
                <dd>{round(value)}<small>{weight}%</small></dd>
              </React.Fragment>
            ))}
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
    onSort: T.func,
    sortField: T.string,
    sortDirection: T.string,
    data: T.array,
    loading: T.bool
  }
}
