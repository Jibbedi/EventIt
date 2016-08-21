// Angular-CLI build configuration
// This file lists all the node_modules files that will be used in a build
// Also see https://github.com/angular/angular-cli/wiki/3rd-party-libs
/* global require, module */

var compileSass = require('broccoli-sass');
var compileCSS = require('broccoli-postcss');
var cssnext = require('postcss-cssnext');
var cssnano = require('cssnano');
var mergeTrees = require('broccoli-merge-trees');
var _ = require('lodash');
var glob = require('glob');
var Angular2App = require('angular-cli/lib/broccoli/angular2-app');


var postCssOptions = {
    plugins: [
        {
            module: cssnext,
            options: {
                browsers: ['last 10 versions'],
                warnForDuplicates: false
            }
        },
        {
            module: cssnano,
            options: {
                safe: true,
                sourcemap: true
            }
        }
    ]
};


module.exports = function (defaults) {

    var sass = mergeTrees(_.map(glob.sync('src/**/*.scss'), function (sassFile) {
        sassFile = sassFile.replace('src/', '');
        return compileSass(['src'], sassFile, sassFile.replace(/.scss$/, '.css'));
    }));

    var postCss = compileCSS(sass, postCssOptions);


    var appTree = new Angular2App(defaults, {
        sassCompiler: {
            includePaths: [
                'src/app'
            ]
        },
        vendorNpmFiles: [
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'zone.js/dist/**/*.+(js|js.map)',
            'es6-shim/es6-shim.js',
            'reflect-metadata/**/*.+(ts|js|js.map)',
            'rxjs/**/*.+(js|js.map)',
            '@angular/**/*.+(js|js.map)'
        ]
    });

    return mergeTrees([appTree, sass,postCss], {overwrite: true});
};
