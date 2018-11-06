'use strict'
import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { PropTypes as T } from 'prop-types'

import { environment } from './config'

import UhOh from './views/uhoh'

const redirectPaths = {
  // Static:
  '/en': '/',
  '/en/results': '/results',
  '/en/contact': '/contact',
  '/en/about': '/about',
  '/en/methodology': '/methodology',
  '/en/license': '/license',
  '/en/compare': '/compare',
  '/en/off-grid-data-hub': '/off-grid-data-hub',
  '/en/clean-energy-investments': '/clean-energy-investments',
  '/en/capacity-generation': '/capacity-generation',
  '/en/policies': '/policies',
  '/en/download': '/library',
  '/en/summary': '/key-findings',

  // Countries:
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
  '/en/country/zimbabwe': '/results/zw',

  // Blog:
  '/en/blog': 'https://medium.com/climatescope',

  // Insights:
  '/en/insights/risk-management': 'https://medium.com/climatescope/how-to-mitigate-renewables-risks-in-emerging-markets-514b6afade97',
  '/en/insights/frontier-power': 'https://medium.com/climatescope/distributed-energy-in-emerging-markets-a6319604e947',
  '/en/insights/energy-policy': 'https://medium.com/climatescope/policies-for-the-energy-transition-lessons-learned-in-emerging-markets-ff9aa3d78b78',
  '/en/insights/emerging-markets-investment': 'https://medium.com/climatescope/emerging-markets-clean-energy-investment-4b7b37f8e3de',
  '/en/insights/climate-policy': 'https://medium.com/climatescope/clean-energy-and-the-paris-promises-e5116c1c7000',

  // Off grid quarterly:
  '/en/off-grid-quarterly/q3-2018': 'https://medium.com/climatescope/3q-2018-off-grid-and-mini-grid-market-outlook-e4ae33657c9c',
  '/en/off-grid-quarterly/q2-2018': 'https://medium.com/climatescope/2q-2018-off-grid-and-mini-grid-market-outlook-2504a1d4abb0',
  '/en/off-grid-quarterly/1q-2018': 'https://medium.com/climatescope/1q-2018-off-grid-and-mini-grid-market-outlook-d097168dc92e',
  '/en/off-grid-quarterly/q4-2017': 'https://medium.com/climatescope/4q-2017-off-grid-and-mini-grid-market-outlook-e3f5552740c2',
  '/en/off-grid-quarterly/q3-2017': 'https://medium.com/climatescope/3q-2017-off-grid-and-mini-grid-market-outlook-5ba98bb5bc6b',
  '/en/off-grid-quarterly/q2-2017': 'https://medium.com/climatescope/2q-2017-off-grid-and-mini-grid-market-outlook-612fc3b7779c',
  '/en/off-grid-quarterly/q1-2017': 'https://medium.com/climatescope/1q-2017-off-grid-and-mini-grid-market-outlook-bab39128a197'
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

    return <Redirect to={match} />
  }} />
}

if (environment !== 'production') {
  RedirectRoute.propTypes = {
    location: T.object
  }
}
