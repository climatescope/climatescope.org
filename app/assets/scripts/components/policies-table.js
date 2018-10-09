'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { Link } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import c from 'classnames'

import { environment } from '../config'
import { initializeArrayWithRange } from '../utils/utils'

export default class PoliciesTable extends React.PureComponent {
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
        id: 'name',
        sortable: true,
        title: 'Sort by policy name',
        value: 'Policy name'
      },
      {
        id: 'country',
        sortable: true,
        title: 'Sort by country',
        value: 'Country'
      },
      {
        id: 'mechanism',
        sortable: false,
        value: 'Policy Mechanism'
      },
      {
        id: 'status',
        sortable: true,
        title: 'Sort by status',
        value: 'Status'
      }
    ]

    return (
      <thead>
        <tr>
          {headings.map(o => {
            if (!o.sortable) return <th key={o.id}>{o.value}</th>

            const { sortField, sortDirection } = this.props
            const klass = c('sort', {
              'sort-none': sortField !== o.id,
              'sort-asc': sortField === o.id && sortDirection === 'asc',
              'sort-desc': sortField === o.id && sortDirection === 'desc'
            })
            return <th key={o.id}><a href='#' title={o.title} className={klass} onClick={this.onSort.bind(this, o.id)}>{o.value}</a></th>
          })}
        </tr>
      </thead>
    )
  }

  renderLoadingRows () {
    return initializeArrayWithRange(10).map(v => (
      <tr key={v}>
        <td className='cell--loading'><span></span></td>
        <td className='cell--loading'><span></span></td>
        <td className='cell--loading'><span></span></td>
        <td className='cell--loading'><span></span></td>
      </tr>
    ))
  }

  renderRows () {
    const renderArrayField = (data) => {
      if (!data.length) return 'N/A'
      if (data.length === 1) return data[0].name

      return (
        <div data-for='array-field' data-tip={data.map(o => o.name).join(', ')}>
          {data[0].name}
          {data.length > 1 ? <small>+ {data.length - 1}</small> : null}
        </div>
      )
    }

    return this.props.policies.map(policy => {
      return (
        <tr key={policy.id}>
          <td className='cell-policy-name'>
            <Link to={`/policies/${policy.id}`} title='Go to policy page'>{policy.name}</Link>
          </td>
          <td>{renderArrayField(policy.country)}</td>
          <td>{renderArrayField(policy.type.mechanism)}</td>
          <td>{policy.status.name}</td>
        </tr>
      )
    })
  }

  render () {
    if (!this.props.loading && !this.props.policies.length) return null

    return (
      <>
        <table className='table policies-table'>
          {this.renderTableHeader()}
          <tbody>
            {
              this.props.loading
                ? this.renderLoadingRows()
                : this.renderRows()
            }
          </tbody>
        </table>
        <ReactTooltip
          id='array-field'
          className='tootltip-table'
          effect='solid'
          type='custom'
        />
      </>
    )
  }
}

if (environment !== 'production') {
  PoliciesTable.propTypes = {
    sortField: T.string,
    sortDirection: T.string,
    policies: T.array,
    loading: T.bool,
    onSort: T.func
  }
}
