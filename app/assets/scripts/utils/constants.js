'use strict'

export const regions = [
  {
    id: 'all',
    name: 'All regions',
    bounds: [
      [ -340.202242002562, -42.50272621540306 ],
      [ 406.49655977498696, 63.19843012790582 ]
    ]
  },
  {
    id: 'asia',
    name: 'Asia',
    bounds: [
      [ -147.09936650354584, -14.15191021774936 ],
      [ 345.53812145152574, 57.674958540828726 ]
    ]
  },
  {
    id: 'africa',
    name: 'Africa',
    bounds: [
      [ -199.8100381343629, -35.81433484642947 ],
      [ 259.83699099554127, 38.00623857719981 ]
    ]
  },
  {
    id: 'eu',
    name: 'Europe',
    bounds: [
      [ -96.68677408937766, 34.162360529975686 ],
      [ 228.33275716064105, 67.54241707817937 ]
    ]
  },
  {
    id: 'lac',
    name: 'Latin America and The Caribbean',
    bounds: [
      [ -344.1508065387974, -54.042346370755524 ],
      [ 221.74106548508882, 31.70087717612357 ]
    ]
  }
]

export const downloadData = {
  current: {
    report: {
      url: '/assets/data/reports/climatescope-2019-report-en.pdf',
      title: 'Download full report in PDF',
      label: '2019',
      size: '2Mb'
    },
    model: {
      url: '/assets/data/model/climatescope-2019.xlsm',
      title: 'Download Climatescope model in Excel format',
      label: '2019 (Excel)',
      size: '17Mb'
    }
  },
  previous: [
    {
      report: {
        url: '/assets/data/reports/climatescope-2018-report-en.pdf',
        title: 'Download full report in PDF',
        label: '2018',
        size: '3Mb'
      },
      model: {
        url: '/assets/data/model/climatescope-2018.xlsm',
        title: 'Download Climatescope model in Excel format',
        label: '2018 (Excel)',
        size: '14Mb'
      }
    },
    {
      report: {
        url: '/assets/data/reports/climatescope-2017-report-en.pdf',
        title: 'Download full report in PDF',
        label: '2017',
        size: '5Mb'
      },
      model: {
        url: '/assets/data/model/climatescope-2017.xlsm',
        title: 'Download Climatescope model in Excel format',
        label: '2015 (Excel)',
        size: '8Mb'
      }
    },
    {
      report: {
        url: '/assets/data/reports/climatescope-2016-report-en.pdf',
        title: 'Download full report in PDF',
        label: '2016',
        size: '9Mb'
      },
      model: {
        url: '/assets/data/model/climatescope-2016.xlsm',
        title: 'Download Climatescope model in Excel format',
        label: '2016 (Excel)',
        size: '6Mb'
      }
    },
    {
      report: {
        url: '/assets/data/reports/climatescope-2015-report-en.pdf',
        title: 'Download full report in PDF',
        label: '2015',
        size: '6Mb'
      },
      model: {
        url: '/assets/data/model/climatescope-2015.xlsm',
        title: 'Download Climatescope model in Excel format',
        label: '2015 (Excel)',
        size: '6Mb'
      }
    },
    {
      report: {
        url: '/assets/data/reports/climatescope-2014-report-en.pdf',
        title: 'Download full report in PDF',
        label: '2014',
        size: '6Mb'
      },
      model: {
        url: '/assets/data/model/climatescope-2014.xlsm',
        title: 'Download Climatescope model in Excel format',
        label: '2014 (Excel)',
        size: '5Mb'
      }
    },
    {
      report: {
        url: '/assets/data/reports/climatescope-2013-report-en.pdf',
        title: 'Download full report in PDF',
        label: '2013',
        size: '10Mb'
      },
      model: {
        url: '/assets/data/model/climatescope-2013.xlsm',
        title: 'Download Climatescope model in Excel format',
        label: '2013 (Excel)',
        size: '1Mb'
      }
    },
    {
      report: {
        url: '/assets/data/reports/climatescope-2012-report-en.pdf',
        title: 'Download full report in PDF',
        label: '2012',
        size: '9Mb'
      },
      model: null
    }
  ]
}

export const libraryCType = {
  pages: [
    {
      id: 'off-grid',
      url: '/library/off-grid-quarterly',
      title: 'View Off Grid Quarterly section',
      label: 'Off Grid Quarterly',
      description: 'BloombergNEF\'s quarterly review of business and policy activity in the off-grid and weak-grid sectors across the globe.'
    },
    {
      id: 'insight',
      url: '/library/insights',
      title: 'View insights section',
      label: 'Insights',
      description: 'Series of research notes on what drives the energy transition globally with a focus on emerging markets. Read about how developers can mitigate risk, what tools governments have to accelerate renewables deployment, what role clean energy can play in increasing access to power, and more.'
    },
    {
      id: 'update',
      url: '/library/updates',
      title: 'View updates section',
      label: 'Updates',
      description: 'Archive of updates and posts from BloombergNEF and partner organisations.'
    }
  ]
}

export const tools = [
  {
    url: '/compare',
    title: 'View results side by side',
    label: 'Geography Comparison',
    description: 'Pick any two nations, see how they compare',
    image: 'feat-tool-thumb--compare.jpg'
  },
  {
    url: '/clean-energy-investments',
    title: 'Use the Clean Energy Investment',
    label: 'Clean Energy Investment',
    description: 'Tracking cross-border finance flows',
    image: 'feat-tool-thumb--clean-energy-investments.jpg'
  },
  {
    url: '/capacity-generation',
    title: 'Use the Capacity Generation',
    label: 'Capacity & Generation',
    description: 'Who has the most (and least) clean energy today?',
    image: 'feat-tool-thumb--capacity-generation.jpg'
  }
]

export const editions = [
  {
    url: 'http://2014.global-climatescope.org/en/',
    title: 'View 2014 edition of Climatescope',
    label: '2014'
  },
  {
    url: 'http://2015.global-climatescope.org/en/',
    title: 'View 2015 edition of Climatescope',
    label: '2015'
  },
  {
    url: 'http://2016.global-climatescope.org/en/',
    title: 'View 2016 edition of Climatescope',
    label: '2016'
  },
  {
    url: 'http://2017.global-climatescope.org/en/',
    title: 'View 2017 edition of Climatescope',
    label: '2017'
  },
  {
    url: 'http://2018.global-climatescope.org/',
    title: 'View 2018 edition of Climatescope',
    label: '2018'
  }
]

export const languages = [
  {
    id: 'en',
    label: 'English'
  },
  {
    id: 'pt',
    label: 'Portuguese'
  },
  {
    id: 'es',
    label: 'Spanish'
  },
  {
    id: 'fr',
    label: 'French'
  },
  {
    id: 'cn',
    label: 'Chinese'
  },
  {
    id: 'ru',
    label: 'Russian'
  }
]
