/**
 * app.js
 *
 * Root modulethat imports all modules of the app.
 */
import angular from 'angular';
import animate from 'angular-animate';
import aria from 'angular-aria';
import icons from 'angular-material-icons';
import material from 'angular-material';
import sanitize from 'angular-sanitize';
import uiRouter from 'angular-ui-router';
import authToken from 'satellizer';

import Constant from './common/contant';

import { AppComponent } from './app.component';
import Common from './common/common';
import Components from './components/components';

const root = angular
  .module('SISP', [
    animate,
    aria,
    icons,
    material,
    sanitize,
    uiRouter,
    authToken,
    Constant,
    Common,
    Components,
  ])
  .component('sispApp', AppComponent)
  .config(($mdThemingProvider, $locationProvider, $stateProvider, $urlRouterProvider) => {
    $mdThemingProvider.theme('default')
    .primaryPalette('red')
    .accentPalette('green');
    
    $locationProvider.html5Mode(true);

  })
  .name;

document.addEventListener('DOMContentLoaded', () => angular.bootstrap(document, ['SISP']));

export default root;