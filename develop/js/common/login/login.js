import angular from 'angular';
import LoginService from './login.service';
// import './login.factory.redirectWhenLoggedOut';
import RedirectWhenLoggedOut from './login.factory.redirectWhenLoggedOut';
import { LoginComponent } from './login.component';

const login = angular
  .module('login', [
    'SISP.constant',
    ])
  .factory('redirectWhenLoggedOut', RedirectWhenLoggedOut)
  .service('LoginService', LoginService)
  .component('login', LoginComponent)
  .config(($httpProvider, $authProvider, $urlRouterProvider, $stateProvider, ResourcesUrl) => {
    $authProvider.loginUrl = `${ResourcesUrl.api}auth/login`;
    $authProvider.signupUrl = `${ResourcesUrl.api}auth/signup`;
    $authProvider.tokenName = "token";
    $authProvider.tokenPrefix = "SISP";
    $authProvider.storageType = 'sessionStorage';

    $httpProvider.interceptors.push('redirectWhenLoggedOut');

    $stateProvider
      .state('login', {
        url: '/auth/login',
        component: 'login'
      })
  })
  .run(($rootScope, $state, $auth) => {

    console.log('Run Login');
    if ($auth.isAuthenticated()) {
      $state.go('home');
    } else {
      $state.go('login');
    }

    $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
      if (error.unauthorized) {
        $state.go('404');
      }
    });
  })
  .name;

export default login;