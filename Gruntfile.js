
module.exports = function (grunt) {

    var vendors = [ 'backbone', 'backbone.marionette', 'underscore','jquery'];

    grunt.initConfig({
        browserify: {
            app: {
                src: 'resources/assets/js/app.js',
                dest: 'public/js/app.js',
                options: {
                    debug: true,
                    extensions: ['.hbs'],
                    external: vendors
                }
            },
            vendors: {
                files: {
                    'public/js/vendors.js': []
                },
                options: {
                    'require': vendors
                }
            },
            bundle: {
                src: 'resources/assets/js/app.js',
                dest: 'public/js/app.js'
            }
        },
        
        uglify: {
            bundle: {
                files: {
                    'public/js/app.js': ['public/js/app.js'],
                    'public/js/vendors.js': ['public/js/vendors.js'],
                    'public/js/templates.js': ['public/js/templates.js']
                }
            }
        },
        jst: {
            options: {
                namespace: 'Templates',
                processName: function(filePath) {
                    return filePath.replace(/^resources\/assets\/js\/templates\//, '').replace(/\.hbs$/, '');
                }
            },
            compile: {
                files: {
                    'public/js/templates.js': ['resources/assets/js/templates/**/*.hbs']
                }
            }
        },
        concat: {
            css: {
                src: ['resources/assets/**/*.css'],
                dest: 'public/css/style.css'
            },
            bower: {
                src: ['bower_components/bootstrap/dist/css/bootstrap.min.css'],
                dest: 'public/css/vendor.css'
            }
        },
        watch: {
            js: {
                files: 'resources/assets/js/**/*.js',
                tasks: ['browserify:app']
            },
            styles: {
                files: 'resources/assets/css/**/*.css',
                tasks: ['concat:css']
            },
            templates: {
                files: 'resources/assets/js/templates/**/*.hbs',
                tasks: ['jst']
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jst');
    
    grunt.registerTask('default', ['browserify']);
    grunt.registerTask('stage', ['browserify:app', 'browserify:vendors', 'concat', 'jst']);
    grunt.registerTask('dev', ['stage', 'watch']);
    grunt.registerTask('prod', ['stage', 'uglify']);
};