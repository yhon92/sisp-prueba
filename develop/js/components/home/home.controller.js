class HomeController {
  constructor($state, HomeService) {
    this.$state = $state;
    this.HomeService = HomeService
  }

  boton1() {
    console.log('Aja1');
    this.HomeService.test();
  }

  boton2() {
    console.log('Aja2');
  }

}

HomeController.$inject = ['$state', 'HomeService'];
console.log('cargo home controller')

export default HomeController;