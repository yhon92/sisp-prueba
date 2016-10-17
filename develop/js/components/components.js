/**
 * components/components.js
 *
 * Module that contains the specific components for the application.
 */

import angular from 'angular';

import Home from './home/home';

const components = angular
  .module('SISP.components', [
    Home
  ])
  .name;

export default components;