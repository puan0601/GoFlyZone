import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';

export class MainController {
  isCollapsed = true;
  places = [];
  newThing = '';
  myMap = '';
  /*@ngInject*/
  constructor($http, NgMap) {
    var vm = this;
    this.$http = $http;
    this.myMap = NgMap.getMap().then(function(map) {
      map.setCenter({lat: 37.7909, lng: -122.4013});
      map.setZoom(12);
      map.data.loadGeoJson('https://raw.githubusercontent.com/mapbox/drone-feedback/master/sources/geojson/5_mile_airport.geojson');
      map.data.loadGeoJson('https://raw.githubusercontent.com/mapbox/drone-feedback/master/sources/geojson/us_military.geojson');
      map.data.loadGeoJson('https://raw.githubusercontent.com/mapbox/drone-feedback/master/sources/geojson/us_national_park.geojson');
      vm.showCustomMarker = function(evt) {
        map.customMarkers.foo.setVisible(true);
        map.customMarkers.foo.setPosition(this.getPosition());
      };
      vm.closeCustomMarker = function(evt) {
        this.style.display = 'none';
      };
    });
  }

  $onInit() {
    this.$http.get('/api/things')
      .then(response => {
        this.places = response.data;
      });
  }

  addThing() {
    if(this.newThing) {
      this.$http.post('/api/things', {
        name: this.newThing
      });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete(`/api/things/${thing._id}`);
  }
}

export default angular.module('goflyzoneApp.main', [ngRoute])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
