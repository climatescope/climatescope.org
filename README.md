# Climatescope
The [Climatescope](http://global-climatescope.org) is a unique country-by-country assessment, interactive report and index that evaluates the investment climate for climate-related investment worldwide. It is a project by [BNEF](http://www.newenergyfinance.com/), [UK AID](https://www.gov.uk/government/organisations/department-for-international-development), and developed by [Development Seed](http://developmentseed.org). Previous editions were also supported by [Power Africa](http://www.usaid.gov/powerafrica), and the [Multilateral Investment Fund](http://www.fomin.org/).

![Homepage of the climatescope 2015](https://cloud.githubusercontent.com/assets/1016701/13225969/2b679a26-d987-11e5-96c4-282484d5d645.png)

## Credits
The current Climatescope website was built by [Flipside](http://flipside.org) in collaboration with [Development Seed](http://developmentseed.org).

## License content and data
The content and data of the Climatescope available under a Creative Commons license [CC-BY 4.0](http://creativecommons.org/licenses/by/4.0/).

## License code
Copyright (c) 2014. Multilateral Investment Fund, Inter-American Development Bank.

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the [GNU General Public License](http://www.gnu.org/licenses/gpl-3.0.txt) for more details.

# Development

## Install Project Dependencies
To set up the development environment for this website, you'll need to install the following on your system:

- [Node](http://nodejs.org/) v8.11 (To manage multiple node versions we recommend [nvm](https://github.com/creationix/nvm))
- [Yarn](https://yarnpkg.com/) Package manager
- Ruby and [Bundler](http://bundler.io/). Highly suggest using [rvm](https://rvm.io/)

### Install Application Dependencies

If you use [`nvm`](https://github.com/creationix/nvm), activate the desired Node version:
```
nvm install
```

Install Node modules:
```
yarn install
```

This will then automatically run `bundle install` to install the ruby gems.


### Jekyll configurations and environment variables

There are 3 files to configure jekyll that get loaded according to the environment the app is being built for:
- _config.yml - production settings
- _config-stage.yml - overrides the production settings for staging server
- _config-dev.yml - local (development) overrides. This file is gitignored, so you can safely change it without polluting the repo.


### Javascript configurations and environment variables

At times, it may be necessary to include options/variables specific to `production`, `staging` or `local` in the code. To handle this, there is a master config.js file. This file should not be modified.  Instead, modify one of:

- config/production.js - production settings
- config/staging.js - overrides the production settings for staging server
- config/local.js - local (development) overrides. This file is gitignored, so you can safely change it without polluting the repo.

By default `production.js` is always loaded and values are overridden by `staging.js` or `local.js` according to the environment.

Values overridable by environment variables are expressed between []:

- appTitle - Title of the site
- appEdition - Edition of the site
- appDescription - Description of the site for meta purposed
- policyDbUrl - Url for the Policy database
- mediumLatestUrl - Url for the medium script
- gaTrackingID - Google analytics tracking ID [GA_TRACKING_ID]
- mailchimpUrl - Url for the mailchimp list subscription [MAILCHIMP_URL]
- mbtoken - Mapbox token [MB_TOKEN]
