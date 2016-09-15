"use strict";

// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  firebase : "vendor/firebase/firebase.js",
  angularfire2 : "vendor/angularfire2"
};

/** User packages configuration. */
const packages: any = {
  "@angular/core": {
    main: "bundles/core.umd.js" //use the ESM entry point for bundling tools
  },
  "@angular/common": {
    main: "bundles/common.umd.js" //use the ESM entry point for bundling tools
  },
  "@angular/compiler": {
    main: "bundles/compiler.umd.js" //use the ESM entry point for bundling tools
  },
  "@angular/forms": {
    main: "bundles/forms.umd.js"
  },
  "@angular/http": {
    main: "bundles/http.umd.js"
  },
  "@angular/platform-browser": {
    main: "bundles/platform-browser.umd.js" //use the ESM entry point for bundling tools
  },
  "@angular/platform-browser-dynamic": {
    main: "bundles/platform-browser-dynamic.umd.js" //use the ESM entry point for bundling tools
  },
  "@angular/router": {
    main: "bundles/router.umd.js" //use the ESM entry point for bundling tools
  },
  "angularfire2": {
    main: "angularfire2.js",
    defaultExtension: 'js'
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/forms',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  'app/login',
  'app/landing-component',
  'app/signup',
  'app/entry',
  'app/create',
  'app/share',
  'app/discover',
  'app/event',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
