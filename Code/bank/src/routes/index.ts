import * as express from "express";
import { JsonDB } from "node-json-db";
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

router.get("/getAccount/:IBAN", (req, res, next) => {
  if(req.params.IBAN == undefined) res.json(errorStatus.msg = "IBAN was not provided");
  let account: Account = DatabaseHandler.getDbInstance().get(req.params.IBAN)
  if(account == undefined) res.json(errorStatus.msg = "Account with specified IBAN was not found!");
  res.json(account);
});

router.post("/new", (req, res, next) => {
  if(req.body.IBAN == undefined) res.json(errorStatus.msg = "IBAN was not provided");
  if(req.body.firstname == undefined) res.json(errorStatus.msg = "firstname was not provided");
  if(req.body.lastname == undefined) res.json(errorStatus.msg = "lastname was not provided");
  if(req.body.balance == undefined) res.json(errorStatus.msg = "balance was not provided");

  const account: Account = {
    IBAN: req.body.IBAN,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    balance: Number.parseInt(req.body.balance)
  }

  DatabaseHandler.getDbInstance().set(account.IBAN, account);

  res.json(successStatus);

});

router.get("/transaction/:IBANFROM/:IBANTO/:amount", (req, res, next) => {

  if(req.params.IBANFROM == undefined) res.json(errorStatus.msg = "IBANFROM was not provided");
  if(req.params.IBANTO == undefined) res.json(errorStatus.msg = "IBANTO was not provided");
  if(req.params.amount == undefined) res.json(errorStatus.msg = "amount was not provided");

  let accountFROM: Account = DatabaseHandler.getDbInstance().get(req.params.IBANFROM);
  let accountTO: Account = DatabaseHandler.getDbInstance().get(req.params.IBANTO);

  if(accountFROM == undefined) res.json(errorStatus.msg = `No Account was found with IBAN: ${req.params.IBANFROM} was not provided`);
  if(accountTO == undefined) res.json(errorStatus.msg = `No Account was found with IBAN: ${req.params.IBANTO} was not provided`);

  const amountString: string = req.params.amount;

  const amount: number = Number.parseInt(amountString);

  accountFROM.balance = accountFROM.balance - amount;
  accountTO.balance = accountTO.balance + amount;

  DatabaseHandler.getDbInstance().update(req.params.IBANTO, accountTO);
  DatabaseHandler.getDbInstance().update(req.params.IBANFROM, accountFROM);

  res.json(successStatus.msg="Transaction was completed successfully");
});

router.get("/all", (req, res, next) => {

  res.json(DatabaseHandler.getDbInstance().getAll());

});

export default router;