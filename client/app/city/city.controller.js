'use strict';
(function(){

class CityComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('poppinApp')
  .component('city', {
    templateUrl: 'app/city/city.html',
    controller: CityComponent
  });

})();
