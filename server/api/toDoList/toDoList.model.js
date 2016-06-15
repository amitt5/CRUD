'use strict';

import mongoose from 'mongoose';

var ToDoListSchema = new mongoose.Schema({
  name: String,
  //info: String,
  //active: Boolean
});

export default mongoose.model('ToDoList', ToDoListSchema);
