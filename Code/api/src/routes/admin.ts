import * as express from "express";
import { allowAdministrator } from "../Helper/AuthHandler";
import { DatabaseHandler } from "../Helper/Database";


const router = express.Router();

/* GET home page. */
router.get("/", allowAdministrator , async (req, res, next) => {
  
    const result: any = await (await DatabaseHandler.getDbInstance().getAll()).data;
    res.json(result)

});



export default router;