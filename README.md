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

Once the dependencies are installed, you can run:

```
yarn export
```

or 

```
npm run export
```

This will build the navigation, build the optimized images, build the next app, and export this app as a static website into the `/out` folder, which can then be deployed. Once you have exported the app, you can test it locally by running:

```
yarn serve
```

or

```
npm run serve
```

### Javascript configurations and environment variables

In order to run the app, you will need to provide a site url and a mapbox token. You can do this via a `.env.local` file.

```
SITE_URL=https://global-climatescope.org/
MAPBOX_TOKEN=
```
