import angular from 'angular';
import HomeService from './home.service';
import { HomeComponent } from './home.component';

const home = angular
  .module('home', [])
  .service('HomeService', HomeService)
  .component('home', HomeComponent)
  .config(($stateProvider, AclServiceProvider) => {
    AclServiceProvider.resume();
    $stateProvider
      .state('home', {
        url: '/',
        component: 'home',
        /*resolve: {
          can: (AclService) => {return AclService.can}
        }*/
      })
  })
  .name;

export default home;