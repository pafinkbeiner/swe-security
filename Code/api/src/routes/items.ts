import * as express from "express";
import { allowCustomer, authMiddleware } from "../Helper/AuthHandler";
import { Item } from "../models/Item";
import cors from "cors";

const router = express.Router();

const items: Item[] = [
  {
    name: "Item1",
    description: "Description",
    price: 52,
    image: ["https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg", "https://avatars0.githubusercontent.com/u/59596944?s=460&u=c8299afd7d313d337d0e07b3c978f354541eb343&v=4"]
  }, 
  {
    name: "Item2",
    description: "Description2",
    price: 102,
    image: ["https://cdn.pixabay.com/photo/2016/08/09/21/54/yellowstone-national-park-1581879_960_720.jpg"]
  }
]

/* GET home page. */
router.get("/",allowCustomer,async(req:any, res:any, next:any) => {
  
  res.json(items);

});

router.get("/:name", allowCustomer, async(req: any, res:any, next:any) => {

  if(items.find(item => item.name == req.params.name) != undefined){
    res.json(items.find(item => item.name == req.params.name));
  }else{
    res.status(400).json({error: "Item with specified name could not be found!"});
  }

})

export default router;