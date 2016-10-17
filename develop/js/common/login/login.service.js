class LoginService {  
  constructor($http, ResourcesUrl) {
    this.$http = $http;
    this.ResourcesUrl = ResourcesUrl;
    this.getUsurio;
    this.getPermisos;
  }

  getUsurio() {
    return this.$http.post(`${this.ResourcesUrl.api}auth/user`).then(response => response.data);
  }

  getPermisos() {
    return this.$http.post(`${this.ResourcesUrl.api}auth/permissions`).then(response => response.data);
  }
}

LoginService.$inject = ['$http', 'ResourcesUrl'];

export default LoginService;
