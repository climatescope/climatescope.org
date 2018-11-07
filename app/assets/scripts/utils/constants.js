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
  },
  {
    id: 'me',
    name: 'Middle East',
    bounds: [
      [ -37.8641930063429, 13.86496262709737 ],
      [ 124.64557261866406, 38.775672115626094 ]
    ]
  }
]

export const downloadData = {
  full: [
    {
      url: '/assets/data/reports/climatescope-2017-report-en.pdf',
      title: 'Download full report in PDF',
      label: 'PDF',
      size: '5Mb'
    }
  ],
  model: [
    {
      url: '/assets/data/model/climatescope-2017.xlsm',
      title: 'Download Climatescope model in Excel format',
      label: 'Excel',
      size: '8Mb'
    },
    {
      url: '/assets/data/climatescope-full-2017.csv',
      title: 'Download raw data in CSV format',
      label: 'CSV',
      size: '0.3Mb'
    }
  ],
  fullPrevious: [
    {
      url: '/assets/data/reports/climatescope-2016-report-en.pdf',
      title: 'Download full report in PDF',
      label: '2016 (PDF)',
      size: '9Mb'
    },
    {
      url: '/assets/data/reports/climatescope-2015-report-en.pdf',
      title: 'Download full report in PDF',
      label: '2015 (PDF)',
      size: '6Mb'
    },
    {
      url: '/assets/data/reports/climatescope-2014-report-en.pdf',
      title: 'Download full report in PDF',
      label: '2014 (PDF)',
      size: '6Mb'
    },
    {
      url: '/assets/data/reports/climatescope-2013-report-en.pdf',
      title: 'Download full report in PDF',
      label: '2013 (PDF)',
      size: '10Mb'
    },
    {
      url: '/assets/data/reports/climatescope-2012-report-en.pdf',
      title: 'Download full report in PDF',
      label: '2012 (PDF)',
      size: '9Mb'
    }
  ],
  sourcePrevious: [
    {
      url: '/assets/data/model/climatescope-2016.xlsm',
      title: 'Download Climatescope model in Excel format',
      label: '2016 (Excel)',
      size: '6Mb'
    },
    {
      url: '/assets/data/model/climatescope-2015.xlsm',
      title: 'Download Climatescope model in Excel format',
      label: '2015 (Excel)',
      size: '6Mb'
    },
    {
      url: '/assets/data/model/climatescope-2014.xlsm',
      title: 'Download Climatescope model in Excel format',
      label: '2014 (Excel)',
      size: '5Mb'
    },
    {
      url: '/assets/data/model/climatescope-2013.xlsm',
      title: 'Download Climatescope model in Excel format',
      label: '2013 (Excel)',
      size: '1Mb'
    }
  ]
}
