class HomeService {  
  constructor ($http, ResourcesUrl) {
    this.$http = $http;
    this.ResourcesUrl = ResourcesUrl;
  }

  test () {
    // return this.$http.get(`${this.ResourcesUrl.api}auth/test`).then(response => response.data);
    // return this.$http({method: 'GET', url: `${this.ResourcesUrl.api}auth/test`}).then(response => response.data);
    this.$http({method: 'GET', url: `${this.ResourcesUrl.api}auth/test`}).then(response => console.log(response));
  }

  getPermisos (id) {
    return this.$http.get(`${this.ResourcesUrl.api}auth/test`).then(response => response.data);
  }
}

HomeService.$inject = ['$http', 'ResourcesUrl'];
console.log('cargo home service')
export default HomeService;