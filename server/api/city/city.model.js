'use strict';

import mongoose from 'mongoose';

var CitySchema = new mongoose.Schema({
  name: String
  // info: String,
  // active: Boolean
});

export default mongoose.model('City', CitySchema);
