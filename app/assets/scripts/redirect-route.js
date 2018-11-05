'use strict'
import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { PropTypes as T } from 'prop-types'

import { environment } from './config'

import UhOh from './views/uhoh'

const redirectPaths = {
  '/en/country/argentina': '/results/ar',
  '/en/country/armenia': '/results/am',
  '/en/country/azerbaijan': '/results/az',
  '/en/country/bahamas': '/results/bs',
  '/en/country/bangladesh': '/results/bd',
  '/en/country/barbados': '/results/bb',
  '/en/country/belarus': '/results/by',
  '/en/country/belize': '/results/bz',
  '/en/country/bolivia': '/results/bo',
  '/en/country/botswana': '/results/bw',
  '/en/country/brazil': '/results/br',
  '/en/country/cameroon': '/results/cm',
  '/en/country/chile': '/results/cl',
  '/en/country/china': '/results/cn',
  '/en/country/colombia': '/results/co',
  '/en/country/costa-rica': '/results/cr',
  '/en/country/cote-ivoire': '/results/ci',
  '/en/country/dominican-republic': '/results/do',
  '/en/country/dr-congo': '/results/cd',
  '/en/country/ecuador': '/results/ec',
  '/en/country/egypt': '/results/eg',
  '/en/country/el-salvador': '/results/sv',
  '/en/country/ethiopia': '/results/et',
  '/en/country/georgia': '/results/ge',
  '/en/country/ghana': '/results/gh',
  '/en/country/guatemala': '/results/gt',
  '/en/country/guyana': '/results/gy',
  '/en/country/haiti': '/results/ht',
  '/en/country/honduras': '/results/hn',
  '/en/country/india': '/results/in',
  '/en/country/indonesia': '/results/id',
  '/en/country/jamaica': '/results/jm',
  '/en/country/jordan': '/results/jo',
  '/en/country/kazakhstan': '/results/kz',
  '/en/country/kenya': '/results/ke',
  '/en/country/kyrgyzstan': '/results/kg',
  '/en/country/lebanon': '/results/lb',
  '/en/country/liberia': '/results/lr',
  '/en/country/malawi': '/results/mw',
  '/en/country/mexico': '/results/mx',
  '/en/country/moldova': '/results/md',
  '/en/country/mongolia': '/results/mn',
  '/en/country/mozambique': '/results/mz',
  '/en/country/myanmar': '/results/mm',
  '/en/country/nepal': '/results/np',
  '/en/country/nicaragua': '/results/ni',
  '/en/country/nigeria': '/results/ng',
  '/en/country/pakistan': '/results/pk',
  '/en/country/panama': '/results/pa',
  '/en/country/paraguay': '/results/py',
  '/en/country/peru': '/results/pe',
  '/en/country/russa': '/results/ru',
  '/en/country/rwanda': '/results/rw',
  '/en/country/senegal': '/results/sn',
  '/en/country/sierra-leone': '/results/sl',
  '/en/country/south-africa': '/results/za',
  '/en/country/sri-lanka': '/results/lk',
  '/en/country/suriname': '/results/sr',
  '/en/country/tajikistan': '/results/tj',
  '/en/country/tanzania': '/results/tz',
  '/en/country/trinidad-and-tobago': '/results/tt',
  '/en/country/turkey': '/results/tr',
  '/en/country/turkmenistan': '/results/tm',
  '/en/country/uganda': '/results/ug',
  '/en/country/ukraine': '/results/ua',
  '/en/country/uruguay': '/results/uy',
  '/en/country/uzbekistan': '/results/uz',
  '/en/country/venezuela': '/results/ve',
  '/en/country/vietnam': '/results/vn',
  '/en/country/zambia': '/results/zm',
  '/en/country/zimbabwe': '/results/zw'
}

// Redirect handling.
export default function RedirectRoute () {
  return <Route render={(props) => {
    const path = props.location.pathname.replace(/\/$/, '')
    const match = redirectPaths[path]
    if (!match) return <UhOh />

    // Is external.
    if (match.match(/^https?:/)) {
      window.location = match
      return null
    }

    return <Redirect push to={match} />
  }} />
}

if (environment !== 'production') {
  RedirectRoute.propTypes = {
    location: T.object
  }
}
