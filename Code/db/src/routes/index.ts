import * as express from "express";
import {DatabaseHandler } from "../Helper/Database";
import { LogHandler } from "../Helper/Log";
const router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.json(DatabaseHandler.getDbInstance().getAll())
});


export default router;