# Climatescope
The [Climatescope](http://global-climatescope.org) is a unique market-by-market assessment, interactive report and index that evaluates the investment climate for climate-related investment worldwide.

![Homepage of the climatescope 2019](https://user-images.githubusercontent.com/1090606/69560317-75e13200-0fa3-11ea-988d-86bbedfdd333.png)

## Credits
The current Climatescope website was built by [Development Seed](http://developmentseed.org).

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
- [Yarn](https://yarnpkg.com/) or [Npm](https://www.npmjs.com/) Package manager

### Install Application Dependencies

If you use [`nvm`](https://github.com/creationix/nvm), activate the desired Node version:
```
nvm install
```

Install Node modules:
```
yarn install
```

or
```
npm install
```

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
