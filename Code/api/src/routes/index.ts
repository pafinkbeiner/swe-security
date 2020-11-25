import * as express from "express";
import {DatabaseHandler } from "../Helper/Database";
import { LogHandler } from "../Helper/Log";
import * as AuthHandler from "../Helper/AuthHandler";
const router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  const result: any = await (await DatabaseHandler.getDbInstance().getAll()).data;
  res.json(result)
});

router.post("/login", async (req, res, next) => {

  if(req.body.username == undefined) res.status(400);
  if(req.body.password == undefined) res.status(400);

  if(req.body.username != undefined && req.body.password != undefined){

    const result = await AuthHandler.login(req.body.username, req.body.password)
    
    if(result != undefined){
      res.json(result)
    }else{
      res.status(400);
    }

  }

});

router.post("/register", async (req, res, next) => {

  if(req.body.username == undefined) res.status(400);
  if(req.body.password == undefined) res.status(400);
  if(req.body.mail == undefined) res.status(400);

  if(req.body.username != undefined && req.body.password != undefined && req.body.mail != undefined){

    const result = await AuthHandler.register(req.body.username, req.body.password, req.body.mail);

    if(result != undefined){
      res.json(result)
    }else{
      res.status(400);
    }

  }

});

export default router;