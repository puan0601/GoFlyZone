import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';

export class MainController {

  awesomeThings = [];
  newThing = '';
  /*@ngInject*/
  constructor($http, NgMap) {
    this.$http = $http;
    this.NgMap = NgMap;
  }

  $onInit() {
    this.$http.get('/api/things')
      .then(response => {
        this.awesomeThings = response.data;
      });
    this.NgMap.getMap().then(function(map) {
      map.setCenter({lat: 37.7909, lng: -122.4013});
      map.data.loadGeoJson('https://raw.githubusercontent.com/mapbox/drone-feedback/master/sources/geojson/5_mile_airport.geojson');
      map.data.loadGeoJson('https://raw.githubusercontent.com/mapbox/drone-feedback/master/sources/geojson/us_military.geojson');
      map.data.loadGeoJson('https://raw.githubusercontent.com/mapbox/drone-feedback/master/sources/geojson/us_national_park.geojson');

      console.log(map.getCenter);
      console.log(map.getCenter());
      console.log('markers', map.markers);
      console.log('shapes', map.shapes);
    });
  }

  // NgMap() {
  //   NgMap.getMap().then(function(map) {
  //     console.log(map.getCenter());
  //     console.log('markers', map.markers);
  //     console.log('shapes', map.shapes);
  //   });
  // }

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
