import * as express from "express";

const router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  //Print out all items
  next();
});

export default router;