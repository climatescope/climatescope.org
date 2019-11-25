'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { Helmet } from 'react-helmet'

import { environment } from '../config'

const MetaTags = ({ title, description, imgUrl, children }) => {
  return (
    <Helmet>
      <title>{title}</title>
      {description ? <meta name='description' content={description} /> : null}

      {/* Twitter */}
      <meta name='twitter:title' content={title} />
      {imgUrl ? <meta name='twitter:image' content={imgUrl} /> : null}
      {description ? <meta name='twitter:description' content={description} /> : null}

      {/* OG */}
      <meta property='og:title' content={title} />
      {imgUrl ? <meta property='og:image' content={imgUrl} /> : null}
      {description ? <meta property='og:description' content={description} /> : null}

      {/* Additional children */}
      {children}
    </Helmet>
  )
}

if (environment !== 'production') {
  MetaTags.propTypes = {
    title: T.string,
    description: T.string,
    imgUrl: T.string,
    children: T.node
  }
}

export default MetaTags
