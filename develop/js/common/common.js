import angular from 'angular';
import Header from './header/header';
import Login from './login/login';
// import Footer from './footer/footer';

const common = angular
  .module('common', [
    Login,
    Header,
    // Footer
  ])
  .name;

export default common;