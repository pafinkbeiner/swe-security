import * as express from "express";
import {DatabaseHandler } from "../Helper/Database";
import { LogHandler } from "../Helper/Log";
import * as AuthHandler from "../Helper/AuthHandler";
import jwt from "jsonwebtoken"

const router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  res.json("SWE SHOP API");
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

router.get("/decodeJWT", async(req, res, next) => {

  let bearer: any = req.headers["authorization"];

  if(bearer != undefined){

      const token = bearer.split(" ")[1];

      jwt.verify(token, "secret", (err:any, authData: any) => {;
          if(err){
              res.status(400).json({error: "Verification was not successfull"});
          }else{
            res.json(authData)    
          }

      });

  }else{
      res.status(400).json({error: "Bearer token was not provided"});
  }

});

export default router;