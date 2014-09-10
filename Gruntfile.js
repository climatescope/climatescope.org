module.exports = function(grunt) {
  grunt.initConfig({
    // https://github.com/gruntjs/grunt-contrib-clean
    clean : ['assets/styles/*', '!assets/**/.gitkeep', 'assets/scripts/*', '_site/*'],
    
    // https://github.com/gruntjs/grunt-contrib-compass
    compass : {
      // Default options.
      options : {
          sassDir : 'source_assets/styles',
          cssDir : 'assets/styles',
          raw : 'require "sass-css-importer";'
      },
      
      dev : {
        options : {
          environment: 'development',
          outputStyle: 'expanded',
          debugInfo : true
        }
      },
      prod : {
        options : {
          environment: 'production',
          outputStyle: 'compressed',
        }
      }
    },
          
    // https://github.com/gruntjs/grunt-contrib-jshint
    jshint: {
      // Default options.
      options : {
        unused : true
      },
      
      dev : {
        options : {
          force : true
        },
        src : ['source_assets/scripts/**.js']
      },
      
      prod: ['source_assets/scripts/**.js']
    },
    
    // https://github.com/gruntjs/grunt-contrib-uglify
    uglify: {
      options: {
        // Angular doesn't like mangling.
        mangle: false
      },
      prod: {
        files: {
          './assets/scripts/main.min.js': [
            'source_assets/scripts/*.js',
            'source_assets/scripts/angular/**/*.js',
            'source_assets/vendor/noUiSlider/jquery.nouislider.min.js',
           ],
          
          './assets/scripts/vendor/modernizr-2.6.2-respond-1.1.0.min.js': ['source_assets/scripts/vendor/modernizr-2.6.2-respond-1.1.0.min.js'],
          './assets/scripts/vendor/jquery-1.11.0.min.js': ['source_assets/scripts/vendor/jquery-1.11.0.min.js'],
          './assets/scripts/vendor/jquery-2.1.0.min.js': ['source_assets/scripts/vendor/jquery-2.1.0.min.js'],
          './assets/scripts/vendor/selectivizr-1.0.2.min.js': ['source_assets/scripts/vendor/selectivizr-1.0.2.min.js'],
        }
      }
    },
    
    // https://github.com/gruntjs/grunt-contrib-copy
    copy: {
      main: {
        files: [
          {src: ['source_assets/scripts/vendor/boxsizing.htc'], dest: './assets/scripts/vendor/boxsizing.htc'}
        ]
      },
      jekyll_css: {
        src: './assets/styles/*',
        dest: '_site/assets/styles/'
      }
    },
    
    // https://github.com/joeytrapp/grunt-focus
    // Focus let us run multiple watch tasks simultaneously.
    // This was done to ease styling. In this way, only the css is
    // generated and copied to the jekyll folder directly.
    // See copy:jekyll_css
    focus: {
      main: {
        exclude: ['css']
      },
      css: {
        include: ['css']
      },
    },
    
    // https://npmjs.org/package/grunt-contrib-watch
    watch : {
      src: {
        files: ['source_assets/scripts/**/*.js', 'source_assets/styles/*.scss'],
        tasks: ['build']
      },
      jekyll : {
        files: ['**/*.html', '**/*.json', '**/*.geojson', '**/*.yml', '**/*.md', '!_site/**/*', '!_site/*', '!node_modules/*', '!source_assets/*'],
        tasks: ['jekyll:generate']
      },
      css: {
        files: ['source_assets/styles/**.scss'],
        tasks: ['build-css']
      },
    },
    
    // https://github.com/dannygarcia/grunt-jekyll
    jekyll : {
      generate : {
        options : {
          config: '_config.yml',
          src: '',
          dest: './_site',
        }
      },
      server : {
        options : {
          config: '_config.yml',
          src: '',
          dest: './_site',
          serve: true
        }
      }
    }
    
  });

  // Load tasks.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-focus');
  grunt.loadNpmTasks('grunt-jekyll');
  
  // Register tasks.
  grunt.registerTask('build', ['compass:dev', 'jshint:dev', 'uglify', 'copy:main', 'jekyll:generate']);

  grunt.registerTask('default', ['build', 'focus:main']);
  
  grunt.registerTask('prod', ['clean', 'compass:prod', 'jshint:prod', 'uglify', 'copy:main']);
  
  grunt.registerTask('jk', ['jekyll:server']);
  
  // This was done to ease styling. In this way, only the css is
  // generated and copied to the jekyll folder directly.
  // See copy:jekyll_css
  grunt.registerTask('watch-css', ['focus:css']);
  grunt.registerTask('build-css', ['compass:dev', 'copy:jekyll_css']);

};
