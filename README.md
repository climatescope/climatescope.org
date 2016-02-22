# Climatescope
The [Climatescope](http://global-climatescope.org) is a unique country-by-country assessment, interactive report and index that evaluates the investment climate for climate-related investment worldwide. It is a project by [UK AID](https://www.gov.uk/government/organisations/department-for-international-development), [Power Africa](http://www.usaid.gov/powerafrica), [BNEF](http://www.newenergyfinance.com/) and the [Multilateral Investment Fund](http://www.fomin.org/)

![Homepage of the climatescope 2015](https://cloud.githubusercontent.com/assets/1016701/13225969/2b679a26-d987-11e5-96c4-282484d5d645.png)

## Credits
The current Climatescope website was built by [Flipside](http://flipside.org) in collaboration with [Development Seed](http://developmentseed.org).

## License content and data
The content and data of the Climatescope available under a Creative Commons license [CC-BY 4.0](http://creativecommons.org/licenses/by/4.0/).

## License code
Copyright (c) 2014. Multilateral Investment Fund, Inter-American Development Bank.

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the [GNU General Public License](http://www.gnu.org/licenses/gpl-3.0.txt) for more details.

===

# Development

### Environment
To set up the development environment for this website, you'll need to install the following on your system:

- [Node and npm](http://nodejs.org/)
- Ruby and [Bundler](http://bundler.io/), preferably through something like [rvm](https://rvm.io/)
- Gulp ( $ npm install -g gulp )

After these basic requirements are met, run the following commands in the website's folder:
```
$ npm install
```
Will also run `bundle install`

### Getting started

```
$ gulp serve
```
Compiles the compass files, javascripts, and launches the server making the site available at `http://localhost:3000/`
The system will watch files and execute tasks whenever one of them changes.
The site will automatically refresh since it is bundled with livereload.

The `_config-dev.yml` file will be loaded alongside `_config.yml`.

### Other commands
Clean the compiled site. I.e. the `_site` folder
```
$ gulp clean
```

Compile the compass files, javascripts, and builds the jekyll site using `_config-dev.yml`.
Use this instead of ```gulp serve``` if you don't want to watch.
```
$ gulp
```

Compiles the site loading the `_config-stage.yml` alongside `_config.yml`. The javascript files will be minified.
```
$ gulp stage
```

Compiles the site loading the `_config-prod.yml` alongside `_config.yml`. The javascript files will be minified.
```
$ gulp prod
```