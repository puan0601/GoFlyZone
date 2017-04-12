/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import config from './environment/';

export default function seedDatabaseIfNeeded() {
  if(config.seedDB) {
    Thing.find({}).remove()
      .then(() => {
        Thing.create({
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
        });
      })
    .then(() => console.log('finished populating things'))
    .catch(err => console.log('error populating things', err));

    User.find({}).remove()
      .then(() => {
        User.create({
          provider: 'local',
          name: 'Test User',
          email: 'test@example.com',
          password: 'test'
        }, {
          provider: 'local',
          role: 'admin',
          name: 'Admin',
          email: 'admin@example.com',
          password: 'admin'
        })
        .then(() => console.log('finished populating users'))
        .catch(err => console.log('error populating users', err));
      });
  }
}
