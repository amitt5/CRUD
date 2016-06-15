/**
 * Testpage model events
 */

'use strict';

import {EventEmitter} from 'events';
import Testpage from './testpage.model';
var TestpageEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TestpageEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Testpage.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    TestpageEvents.emit(event + ':' + doc._id, doc);
    TestpageEvents.emit(event, doc);
  }
}

export default TestpageEvents;
