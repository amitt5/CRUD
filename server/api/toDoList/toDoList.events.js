/**
 * ToDoList model events
 */

'use strict';

import {EventEmitter} from 'events';
import ToDoList from './toDoList.model';
var ToDoListEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ToDoListEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  ToDoList.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ToDoListEvents.emit(event + ':' + doc._id, doc);
    ToDoListEvents.emit(event, doc);
  }
}

export default ToDoListEvents;
