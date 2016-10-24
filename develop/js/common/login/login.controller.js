class LoginController {  
  constructor($rootScope, $auth, $state, AclService, LoginService) {
    this.$rootScope = $rootScope;
    this.$auth = $auth;
    this.$state = $state;
    this.AclService = AclService;
    this.loginService = LoginService;
    this.usuario = {};
  }

  onSubmit() {
    let credentials = {
      cedula: this.usuario.cedula,
      password: this.usuario.password
    };
    
    // Use Satellizer's $auth service to login
    this.$auth.login(credentials)
      .then(() => {
        console.log('Login Exitoso');
        this.loginService.getUsurio()
          .then((responseUser) => {
            // console.log(responseUser)
            this.loginService.getPermisos()
            .then((response) => {
              // Stringify the returned data to prepare it
              // to go into local storage
              let user = JSON.stringify(responseUser.user);
              // Set the stringified user data into local storage
              sessionStorage.setItem('user', user);
              // The user's authenticated state gets flipped to
              // true so we can now show parts of the UI that rely
              // on the user being logged in
              this.$rootScope.authenticated = true;
              // Putting the user's data on $rootScope allows
              // us to access it anywhere across the app
              this.$rootScope.currentUser = responseUser.user;
              this.$rootScope.currentAcl = response.acl;

              let aclData = this.$rootScope.currentAcl[0];
              let role = Object.keys(this.$rootScope.currentAcl[0])[0];
              console.log(role);
              this.AclService.setAbilities(aclData);
              this.AclService.attachRole(role);
              // Everything worked out so we can now redirect to
              // the users state to view the data
              this.$state.go('home');
          })
          .catch((fails) => {
            console.log(fails);
            // Alertify.error(fails.data.error);
            return false;
          })
        });
      })
      .catch((fails) => {
        // Alertify.error(fails.data.error);
        console.log('Fallo el login');
        return false;
      })
  }

  onLogout() {
    this.$auth.logout();
  }

}



LoginController.$inject = ['$rootScope', '$auth', '$state', 'AclService', 'LoginService'];

export default LoginController;