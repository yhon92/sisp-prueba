import angular from 'angular';
import LoginService from './login.service';
import RedirectWhenLoggedOut from './login.factory.redirectWhenLoggedOut';
import { LoginComponent } from './login.component';

const login = angular
  .module('login', [
    'SISP.constant',
    ])
  .factory('redirectWhenLoggedOut', RedirectWhenLoggedOut) // Refactor para angular.service()
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
  .run(($rootScope, $state, $auth, AclService, LoginService) => {

    console.log('Run Login');
    if ($auth.isAuthenticated()) {
      $state.go('home');
    } else {
      $state.go('login');
    }

    $rootScope.$on('$stateChangeStart', (event, toState) => {
      console.log('$stateChangeStart Login');
      debugger
      // If there is any user data in local storage then the user is quite
      // likely authenticated. If their token is expired, or if they are
      // otherwise not actually authenticated, they will be redirected to
      // the auth state because of the rejected request anyway
      if($auth.isAuthenticated()) {
        $rootScope.authenticated = true;
        // Grab the user from local storage and parse it to an object
        let user = JSON.parse(sessionStorage.getItem('user'));
        $rootScope.currentUser = user;
        let role = JSON.parse(sessionStorage.getItem('AclService'));
        
        if (!$rootScope.currentAcl && !role) {
          event.preventDefault();
          LoginService.getPermisos()
          .then((response) => {
            $rootScope.currentAcl = response.acl;

            let aclData = $rootScope.currentAcl;
            let role = Object.keys($rootScope.currentAcl[0])[0];

            AclService.setAbilities(aclData);
            AclService.attachRole(role);
            $urlRouter.sync();
          })
          .catch((fails) => {
            $auth.logout();
            sessionStorage.removeItem('user');
            $rootScope.authenticated = false;
            $rootScope.currentUser = null;
            $rootScope.currentAcl = null;
            $state.go('login');
          })
        } else {
          AclService.resume();
        }
        
        if(toState.name === "login") {
          event.preventDefault();
          $state.go('home');
        }
      }
    });

    $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
      if (error.unauthorized) {
        $state.go('404');
      }
    });
  })
  .name;

export default login;