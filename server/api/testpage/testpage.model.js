'use strict';

import mongoose from 'mongoose';

var TestpageSchema = new mongoose.Schema({
  name: String,
  age: Number,
 // info: String,
  //active: Boolean
});

export default mongoose.model('Testpage', TestpageSchema);
