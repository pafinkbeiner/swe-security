import * as express from "express";
import { networkInterfaces } from "os";
import {DatabaseHandler } from "../Helper/Database";
const router = express.Router();

//////////////////////// MAIN ROUTES ////////////////////////

/* 
 * GET
 * Returns data to a specific key
 */
router.get("/:key", function(req, res, next) {

  if(req.params.key == undefined) next();

  res.json(DatabaseHandler.getDbInstance().get(req.params.key));

});

/**
 * POST
 * Saves data to a specified key
 * key -> req.params.key
 * data -> req.body.
 */
router.post("/:key", function(req, res, next) {
  
  if(req.params.key == undefined) next();
  if(req.body.data == undefined) next();

  DatabaseHandler.getDbInstance().set(req.params.key, req.body.data);

});

///////////////////////////////// OTHER ROUTES //////////////////////////////////////

/**
 * GET 
 * Returns everything that is saved in the Database
 */
router.get("/all", function(req, res, next) {

  if(req.params.key == undefined) next();

  res.json(DatabaseHandler.getDbInstance().getAll());

});

/**
 * GET
 * Deletes Element with a specific key
 * key -> req.params.key
 */
router.get("/delete/:key", function(req, res, next) {

  if(req.params.key == undefined) next();

  DatabaseHandler.getDbInstance().remove(req.params.key);  

});

export default router;