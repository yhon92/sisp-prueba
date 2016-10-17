import angular from 'angular';
import HomeService from './home.service';
import { HomeComponent } from './home.component';

const home = angular
  .module('home', [])
  .service('HomeService', HomeService)
  .component('home', HomeComponent)
  .config(($stateProvider) => {
    $stateProvider
      .state('home', {
        url: '/',
        component: 'home'
      })
  })
  .name;

export default home;