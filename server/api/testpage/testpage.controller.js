/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/testpages              ->  index
 * POST    /api/testpages              ->  create
 * GET     /api/testpages/:id          ->  show
 * PUT     /api/testpages/:id          ->  update
 * DELETE  /api/testpages/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Testpage from './testpage.model';

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

// Gets a list of Testpages
export function index(req, res) {
  console.log("inside index");
  return Testpage.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Testpages for a query

export function search(req, res) {
  //var query = Testpage.find();
 console.log(req.query.userId);
 console.log(req.query.name);
 //console.log(req.query.userId);
  //Testpage.find({userId:  new RegExp( req.query.userId , "i")})
  if (req.query.userId){
      console.log("inside if");
  Testpage.find({name:  new RegExp( req.query.name , "i"), userId:req.query.userId })
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
    // console.log("inside if");
    // console.log(res);
    
  }
  else{
    console.log("inside else");
    Testpage.find({name:  new RegExp( req.query.name , "i")})
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
     
  }
  }

// Gets a single Testpage from the DB
export function show(req, res) {
    console.log("inside show");
return Testpage.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Testpage in the DB
export function create(req, res) {
  console.log(req.body);
  console.log("inside create");

  return Testpage.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Testpage in the DB
export function update(req, res) {
   console.log(req.body);

  if (req.body._id) {
    delete req.body._id;
  }
  return Testpage.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Testpage from the DB
export function destroy(req, res) {
  return Testpage.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
