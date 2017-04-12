import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';

export class MainController {
  // for places display
  isCollapsed = true;
  // stubbed for now because seed file wasnt working on heroku
  places = [{
    name: 'Treasure Island',
    info: 'Great flying, views overlook the city and bay, kind of windy.',
    position: '1305 Gateview Ave, San Francisco, CA 94130'
  }, {
    name: 'Berkeley Marina',
    info: 'Right on the water, ample open space.',
    position: '201 University Ave, Berkeley, CA 94710'
  }, {
    name: 'Dog Patch',
    info: 'Large open space, on the water, not many obstacles.',
    position: '24th St, San Francisco, CA 94107'
  }];
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

      //doesnt work right now
      //TODO:: can't figure out how to call this from main.html tried $ctrl, vm, $ctrl prefixes.
      vm.showCustomMarker = function(evt) {
        console.log()
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
