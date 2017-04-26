'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './thing.events';

var ThingSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean,
  position: String,
  user_id: String
});

registerEvents(ThingSchema);
export default mongoose.model('Thing', ThingSchema);
