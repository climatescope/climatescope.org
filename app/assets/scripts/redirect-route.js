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
  '/en/country/mainland-china': '/results/cn',
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
  '/en/blog/2017/11/28/PR': 'https://medium.com/climatescope/solar-capacity-jumps-by-more-than-half-in-developing-nations-press-release-1eb8235a6c4',
  '/en/blog/2017/11/06/PR': 'https://medium.com/climatescope/efforts-to-address-climate-through-clean-energy-lag-in-emerging-markets-press-release-d5f0e6ca5bf0',
  '/en/blog/2017/06/26/GSMA': 'https://medium.com/climatescope/the-symbiotic-relationship-between-payg-solar-and-mobile-money-ecosystems-b98286df0e56',
  '/en/blog/2017/05/31/powerforall': 'https://medium.com/climatescope/tapping-into-data-to-tackle-electricity-poverty-46f213ec0793',
  '/en/blog/2017/02/16/SEforAll-Africa-Hub': 'https://medium.com/climatescope/a-growing-number-of-african-nations-take-concrete-steps-in-favour-of-renewables-with-the-support-70512624f57e',
  '/en/blog/2017/02/01/Jordan%20MAAN/': 'https://medium.com/climatescope/how-renewable-energy-can-bolster-the-economy-in-jordan-2e2421db5f90',
  '/en/blog/2017/01/20/climatescope%20blog%20post-%20can-pay-go-solar-financed': 'https://medium.com/climatescope/how-can-pay-as-go-solar-be-financed-f18791648a15',
  '/en/blog/2017/01/16/Climatescope-in-the-media-Europe-and-US': 'https://medium.com/climatescope/climatescope-in-the-media-europe-and-us-highlights-bbfd7d59197',
  '/en/blog/2017/01/16/Climatescope-in-the-media-Asia': 'https://medium.com/climatescope/climatescope-in-the-media-asia-highlights-a41eb6118f57',
  '/en/blog/2017/01/16/Climatescope-in-the-media-Africa': 'https://medium.com/climatescope/climatescope-in-the-media-africa-highlights-bc88aaa324df',
  '/en/blog/2017/01/12/climatescope-blog-Senegal': 'https://medium.com/climatescope/senegal-villages-light-up-fast-with-household-solar-products-41b58dca5037',
  '/en/blog/2016/12/21/Climatescope-in-the-media-LAC': 'https://medium.com/climatescope/climatescope-in-the-media-latin-america-highlights-f467197c1e4a',
  '/en/blog/2016/12/21/Climatescope-2016-webinar': 'https://medium.com/climatescope/climatescope-2016-webinar-clean-energy-in-emerging-markets-970ccd9a55e5',
  '/en/blog/2016/12/20/compare-the-scores': 'https://medium.com/climatescope/climatescope-2014-to-2016-compare-the-scores-46a00499166c',
  '/en/blog/2016/12/15/Climatescope2016-launch': 'https://medium.com/climatescope/press-release-with-new-pledges-and-new-projects-developing-countries-take-clean-energy-lead-dff167536eb2',
  '/en/blog/2016/12/14/Climatescope2016-launch-pt': 'https://medium.com/climatescope/press-release-com-novos-compromissos-e-projetos-pa%C3%ADses-em-desenvolvimento-assumem-a-lideran%C3%A7a-9d34b3c58c63',
  '/en/blog/2016/12/14/Climatescope2016-launch-es': 'https://medium.com/climatescope/press-release-con-nuevos-compromisos-y-proyectos-los-pa%C3%ADses-en-v%C3%ADas-de-desarrollo-adquieren-una-578c35c65c79',
  '/en/blog/2016/12/13/Climatescope2015-data-visual': 'https://medium.com/climatescope/discover-the-highlights-of-last-years-climatescope-80a3e33038c2',
  '/en/blog/2016/06/02/climatescope-update-westafrica': 'https://medium.com/climatescope/mixed-results-for-west-africa-in-climatescope-2015-7605ac6564b7',
  '/en/blog/2016/03/15/climatescope-update-Uganda-GetFit': 'https://medium.com/climatescope/how-ugandas-get-fit-policy-attracted-clean-energy-investors-160047604ed0',
  '/en/blog/2016/02/24/climatescope-blog-South-Africa': 'https://medium.com/climatescope/another-year-in-the-top-5-for-south-africa-df5b1b870236',
  '/en/blog/2015/11/23/climatescope-2015-launches': 'https://medium.com/climatescope/climatescope-2015-goes-live-928e544093ad',

  // Insights:
  '/en/insights/risk-management': 'https://medium.com/climatescope/how-to-mitigate-renewables-risks-in-emerging-markets-514b6afade97',
  '/en/insights/frontier-power': 'https://medium.com/climatescope/distributed-energy-in-emerging-markets-a6319604e947',
  '/en/insights/energy-policy': 'https://medium.com/climatescope/policies-for-the-energy-transition-lessons-learned-in-emerging-markets-ff9aa3d78b78',
  '/en/insights/emerging-markets-investment': 'https://medium.com/climatescope/emerging-markets-clean-energy-investment-4b7b37f8e3de',
  '/en/insights/climate-policy': 'https://medium.com/climatescope/clean-energy-and-the-paris-promises-e5116c1c7000',

  // Off grid quarterly:
  '/en/off-grid-quarterly/q4-2018': 'https://medium.com/climatescope/4q-2018-off-grid-and-mini-grid-market-outlook-1dace7fc9087',
  '/en/off-grid-quarterly/q3-2018': 'https://medium.com/climatescope/3q-2018-off-grid-and-mini-grid-market-outlook-70ed47656c31',
  '/en/off-grid-quarterly/q2-2018': 'https://medium.com/climatescope/2q-2018-off-grid-and-mini-grid-market-outlook-4dcce9c0215e',
  '/en/off-grid-quarterly/1q-2018': 'https://medium.com/climatescope/1q-2018-off-grid-and-mini-grid-market-outlook-329335ed367f',
  '/en/off-grid-quarterly/q4-2017': 'https://medium.com/climatescope/4q-2017-off-grid-and-mini-grid-market-outlook-52da3e6826f1',
  '/en/off-grid-quarterly/q3-2017': 'https://medium.com/climatescope/3q-2017-off-grid-and-mini-grid-market-outlook-21c2542563d',
  '/en/off-grid-quarterly/q2-2017': 'https://medium.com/climatescope/2q-2017-off-grid-and-mini-grid-market-outlook-d35f54b66020',
  '/en/off-grid-quarterly/q1-2017': 'https://medium.com/climatescope/1q-2017-off-grid-and-mini-grid-market-outlook-4b6fd80d18eb'
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
