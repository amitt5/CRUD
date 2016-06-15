/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/toDoLists              ->  index
 * POST    /api/toDoLists              ->  create
 * GET     /api/toDoLists/:id          ->  show
 * PUT     /api/toDoLists/:id          ->  update
 * DELETE  /api/toDoLists/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import ToDoList from './toDoList.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of ToDoLists
export function index(req, res) {
  return ToDoList.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Gets a list of Testpages for a query
export function search(req, res) {
  //var query = Testpage.find();
 console.log(req.query);
  Testpage.find({name:  new RegExp( req.query.name , "i")})
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));

  }

// Gets a single ToDoList from the DB
export function show(req, res) {
  return ToDoList.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new ToDoList in the DB
export function create(req, res) {
  return ToDoList.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing ToDoList in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return ToDoList.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a ToDoList from the DB
export function destroy(req, res) {
  return ToDoList.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
