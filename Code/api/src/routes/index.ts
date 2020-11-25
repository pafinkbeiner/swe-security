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

  if(req.body.username == undefined) res.status(400).json({error: "Username was not provided"});
  if(req.body.password == undefined) res.status(400).json({error: "Password was not provided"});

  if(req.body.username != undefined && req.body.password != undefined){

    const result = await AuthHandler.login(req.body.username, req.body.password)

    if(result != undefined){
      res.json(result);
      LogHandler.getLogInstance().log(`info that login of ${req.body.username} was performed successfully!`);
    }else{
      res.status(400).json({error: "Login was not successfull"});
    }

  }

});

router.post("/register", async (req, res, next) => {

  if(req.body.username == undefined) res.status(400).json({error: "Username was not provided"});
  if(req.body.password == undefined) res.status(400).json({error: "Password was not provided"});
  if(req.body.mail == undefined) res.status(400).json({error: "Mail was not provided"});

  if(req.body.username != undefined && req.body.password != undefined && req.body.mail != undefined){

    const result = await AuthHandler.register(req.body.username, req.body.password, req.body.mail);

    if(result != undefined){
      res.json(result)
    }else{
      res.status(400).json({error: "Register was not successfull"});
    }

  }

});

export default router;