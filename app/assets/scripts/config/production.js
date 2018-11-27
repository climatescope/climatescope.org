/* global CS */
'use strict'

export default {
  ...CS.config,
  environment: 'production',
  policyDbUrl: 'https://services.bnef.com/public-api',
  mediumLatestUrl: 'https://cs-medium-latest.herokuapp.com',
  mailchimpUrl: '',
  gaTrackingID: 'UA-56170738-1',
  mbtoken: null
}
