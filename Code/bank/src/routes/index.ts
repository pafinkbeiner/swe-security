import * as express from "express";
import { nextTick } from "process";
import { errorMonitor } from "stream";
import { authMiddleware } from "../Helper/Auth";
import {DatabaseHandler } from "../Helper/Database";
import { Account } from "../models/Account";
import { errorStatus, successStatus } from "../models/Status";
const router = express.Router();

//////////////////////// MAIN ROUTES ////////////////////////

/* 
 * GET
 * Returns data to a specific key
 */
router.get("/",function(req, res, next) {
  res.json("SWE-SECURITY BANK");
});

router.get("/getBalance/:IBAN", (req, res, next) => {
  if(req.params.IBAN == undefined) res.json(errorStatus.msg = "IBAN was not provided");
  let account: Account = DatabaseHandler.getDbInstance().get(req.params.IBAN)
  if(account == undefined) res.json(errorStatus.msg = "Account with specified IBAN was not found!");
  res.json(account.balance);
})

router.post("/new", (req, res, next) => {

  if(req.body.IBAN == undefined || req.body.firstname == undefined || req.body.lastname == undefined || req.body.balance == undefined){
    next();
  }

  const account: Account = {
    IBAN: req.body.IBAN,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    balance: req.body.balance
  }

  DatabaseHandler.getDbInstance().set(account.IBAN, account);

  res.json(successStatus);

});

export default router;