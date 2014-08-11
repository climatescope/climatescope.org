module.exports = function(grunt) {
  grunt.initConfig({
    // https://github.com/gruntjs/grunt-contrib-clean
    clean : ['source/assets/styles/*', '!source/assets/**/.gitkeep', 'source/assets/scripts/*', '_site/*'],
    
    // https://github.com/gruntjs/grunt-contrib-compass
    compass : {
      // Default options.
      options : {
          sassDir : 'source_assets/styles',
          cssDir : 'source/assets/styles',
          //raw : 'require "sassy-strings";'
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
      prod: {
        files: {
          'source/assets/scripts/main.min.js': ['source_assets/scripts/*.js']
        }
      }
    },
    
    // https://npmjs.org/package/grunt-contrib-watch
    watch : {
      src: {
        files: ['source_assets/scripts/**.js', 'source_assets/styles/**.scss'],
        tasks: ['build']
      },
      jekyll : {
        files: ['**/*.html', '**/*.json', '**/*.geojson', '**/*.yml', '**/**/*.md', '!_site/**/*', '!_site/*', '!src/*', '!node_modules/*'],
        tasks: ['jekyll:generate']
      }
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
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jekyll');
  
  // Register tasks.
  grunt.registerTask('build', ['compass:dev', 'jshint:dev', 'uglify', 'jekyll:generate']);

  grunt.registerTask('default', ['build', 'watch']);
  
  grunt.registerTask('prod', ['clean', 'compass:prod', 'jshint:prod', 'uglify']);
  
  grunt.registerTask('jk', ['jekyll:server']);

};
