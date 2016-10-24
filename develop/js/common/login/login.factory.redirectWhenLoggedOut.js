export default ($q, $injector, $rootScope) => {
  return {
    responseError: (rejection) => {
      // Need to use $injector.get to bring in $state or else we get
      // a circular dependency error
      let $state = $injector.get('$state');
      let $auth = $injector.get('$auth');
      // Instead of checking for a status code of 400 which might be used
      // for other reasons in Laravel, we check for the specific rejection
      // reasons to tell us if we need to redirect to the login state
      let rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid', 'user_not_found'];
      // Loop through each rejection reason and redirect to the login
      // state if one is encountered

      for (let key in rejectionReasons) {
        if(rejection.data.error === rejectionReasons[key]) {
          // If we get a rejection corresponding to one of the reasons
          // in our array, we know we need to authenticate the user so 
          // we can remove the current user from local storage
          $auth.logout();
          sessionStorage.removeItem('AclService');
          sessionStorage.removeItem('user');
          $rootScope.authenticated = false;
          $rootScope.currentUser = null;
          $rootScope.currentAcl = null;
          // Send the user to the auth state so they can login
          $state.go('login');
        }
      }
      return $q.reject(rejection);
    },
  };
}