/**
 * app.js
 *
 * Root modulethat imports all modules of the app.
 */

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import { AppComponent } from './app.component';

const root = angular
  .module('SISP', [
    uiRouter,
  ])
  .component('sispApp', AppComponent)

document.addEventListener('DOMContentLoaded', () => angular.bootstrap(document, ['SISP']))

export default root