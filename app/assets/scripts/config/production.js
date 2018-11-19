/* global CS */
'use strict'

export default {
  ...CS.config,
  environment: 'production',
  appTitle: 'Climatescope',
  appEdition: 2018,
  appDescription: 'The Climatescope a unique country-by-country assessment, interactive report and index that evaluates the investment climate for climate-related investment worldwide.',
  policyDbUrl: 'https://services.bnef.com/public-api',
  mediumLatestUrl: 'https://cs-medium-latest.herokuapp.com',
  mailchimpUrl: '',
  mbtoken: null
}
