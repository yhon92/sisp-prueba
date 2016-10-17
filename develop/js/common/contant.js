import angular from 'angular';

const constant = angular.module('SISP.constant', [])
.constant('ResourcesUrl', {
  api:    'http://sisp.app/api/',
})
.name;

export default constant;
