'use strict'
export default [
  {
    id: 'power-market',
    title: 'Power Market',
    type: 'linear',
    areaAlpha: [
      {
        id: 'sectionHeader'
      }
    ],
    areaBeta: [
      {
        id: 'installedCapacity',
        size: 'large'
      },
      {
        id: 'utilityPrivatisation',
        size: 'small'
      },
      {
        id: 'concentrationGeneration',
        size: 'small'
      },
      {
        id: 'powerPlantFleet',
        size: 'small'
      },
      {
        id: 'powerGeneration',
        size: 'medium'
      }
    ]
  },
  {
    id: 'clean-energy-policy',
    title: 'Clean Energy Policy',
    type: 'linear',
    areaAlpha: [
      {
        id: 'sectionHeader'
      }
    ],
    areaBeta: [
      {
        id: 'availability of policies',
        size: 'medium'
      },
      {
        id: 'gapToTarget',
        size: 'small'
      },
      {
        id: 'upcomingAuctions',
        size: 'small'
      }
    ]
  },
  {
    id: 'clean-energy-investment',
    title: 'Clean Energy Investment',
    type: 'linear',
    areaAlpha: [
      {
        id: 'sectionHeader'
      }
    ],
    areaBeta: [
      {
        id: 'cleanEnergyInvestments',
        size: 'medium'
      },
      {
        id: 'foreignInvestment',
        size: 'small'
      },
      {
        id: 'availability of finance',
        size: 'small'
      }
    ]
  },
  {
    id: 'price-environment',
    title: 'Price environment',
    type: 'linear',
    areaAlpha: [
      {
        id: 'sectionHeader'
      }
    ],
    areaBeta: [
      {
        id: 'wholesale power exchange',
        size: 'small'
      },
      {
        id: 'wholesaleDistortions',
        size: 'small'
      },
      {
        id: 'electricityPrice',
        size: 'small'
      }
    ]
  },
  {
    id: 'doing-business',
    title: 'Doing Business',
    type: 'split',
    areaAlpha: [
      {
        id: 'sectionHeader'
      }
    ],
    areaBeta: [
      {
        id: 'averageVAT',
        size: 'small'
      },
      {
        id: 'importDuties',
        size: 'small'
      }
    ]
  },
  {
    id: 'barriers',
    title: 'Barriers',
    type: 'split',
    areaAlpha: [
      {
        id: 'sectionHeader'
      }
    ],
    areaBeta: [
      {
        id: 'currencyVariation',
        size: 'small'
      },
      {
        id: 'offtakerRisk',
        size: 'small'
      }
    ]
  }
]
