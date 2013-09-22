/*!
 * Template primarily for wp-theme designing and developing
 * project-name Gruntfile
 * http://example.com
 * @author Janne Saarela
 */

'use strict';

module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    /**
     * Set project info
     * theme_name is related to wp-theme name
     * template is related to wp-template (if you are developing a child theme to wp)
     */
    project: {
      src: 'src',
      app: '',
      css: [
        '<%= project.src %>/master.styl'
      ],
      js: [
        'src/*.js'
      ],
      wp:{
        description: "Project description",
        theme_name: "Theme name",
        template: "Template name"
      }
    },

    /**
     * Project banner
     * Dynamically appended banner to JS files and css to CSS files
     * Inherits text from package.json and project-info
     */
    tag: {
      banner: '/*!\n' +
              ' * <%= pkg.name %>\n' +
              ' * <%= pkg.url %>\n' +
              ' * @author <%= pkg.author %>\n' +
              ' * @version <%= pkg.version %>\n' +
              ' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' +
              ' */\n',
      css:    '/*\n' +
              ' * Theme Name: <%= project.wp.theme_name %>\n' +
              ' * Description: <%= project.wp.description %>\n' +
              ' * Theme URI: <%= pkg.url %>\n' +
              ' * Author: <%= pkg.author %>\n' +
              ' * Template: <%= project.wp.template %>\n' +
              ' * Version <%= pkg.version %>\n' +
              ' * Copyright <%= pkg.copyright %>. <%= pkg.license %>licensed.' +
              ' */\n\n'
    },
    /**
     * Concatenate JavaScript files
     * https://github.com/gruntjs/grunt-contrib-concat
     * Imports all .js files and appends project banner
     */
    concat: {
      dev: {
        files: {
          'js/main.min.js': '<%= project.js %>'
        }
      },
      options: {
        stripBanners: true,
        nonull: true,
        banner: '<%= tag.banner %>'
      }
    },
    /**
     * Uglify (minify) JavaScript files
     * https://github.com/gruntjs/grunt-contrib-uglify
     * Compresses and minifies all JavaScript files into one
     */
    uglify: {
      options: {
        banner: '<%= tag.banner %>'
      },
      build: {
        src: '<%= project.src %>/main.js',
        dest: 'js/main.min.js'
      }
    },
    stylus: {
      compile_dev: {
        options: {
          paths: ['.'],
          compress: false,
          import: ['nib'],
          urlfunc: 'embedurl', // use embedurl('test.png') in our code to trigger Data URI embedding
          banner: '<%= tag.css %>'
        },
        files: {
          'style.css': '<%= project.src %>/master.styl'
        }
      },
      compile: {
        options: {
          paths: ['.'],
          import: ['nib'],
          urlfunc: 'embedurl', // use embedurl('test.png') in our code to trigger Data URI embedding
          banner: '<%= tag.css %>'
        },
        files: {
          'style.css': '<%= project.src %>/master.styl'
        }
      }
    },
    /**
     * Runs tasks against changed watched files
     * https://github.com/gruntjs/grunt-contrib-watch
     * Watching development files and run concat/compile tasks
     */
    watch: {
      concat: {
        files: '<%= project.src %>/{,*/}*.js',
        tasks: ['concat:dev']
      }
      ,
      stylus: {
        files: '<%= project.src %>/master.styl',
        tasks: ['stylus:compile_dev']
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Load the plugin that provides the "stylus" task.
  grunt.loadNpmTasks('grunt-contrib-stylus');

  /**
   * Default task
   * Run `grunt` on the command line
   */
  grunt.registerTask('default', [
    'stylus:compile_dev',
    'concat:dev',
    'watch'
  ]);

  /**
   * Build task
   * Run `grunt build` on the command line
   * Then compress all JS/CSS files
   */
  grunt.registerTask('build', [
    'stylus:compile',
    'uglify'
  ]);

};