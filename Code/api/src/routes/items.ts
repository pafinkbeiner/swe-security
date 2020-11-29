import * as express from "express";
import { allowCustomer, authMiddleware } from "../Helper/AuthHandler";
import { Item } from "../models/Item";
import cors from "cors";

const router = express.Router();

const items: Item[] = [
  {
    name: "Kali Linux ISO",
    description: "Kali Linux ISO Version 2020.4",
    price: 5,
    image: ["https://linuxtalk.de/wp-content/uploads/2020/01/Kali-Linux-Logo-1400x601.png","https://upload.wikimedia.org/wikipedia/commons/2/2d/%D9%83%D8%A7%D9%84%D9%8A_%D9%84%D9%8A%D9%86%D9%83%D8%B3.png"],
    downloadLink: "https://cdimage.kali.org/kali-2020.4/kali-linux-2020.4-installer-amd64.iso",
    sha265Sum: "50492d761e400c2b5e22c8f253dd6f75c27e4bc84e33c2eff272476a0588fb02"
  }, 
  {
    name: "Linux Ubuntu ISO",
    description: "Linux Ubuntu ISO 20.04.1 LTS",
    price: 3,
    image: ["https://assets.ubuntu.com/v1/8dd99b80-ubuntu-logo14.png","https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Desktop_Ubuntu_20.04.png/1200px-Desktop_Ubuntu_20.04.png"],
    downloadLink: "https://releases.ubuntu.com/20.04.1/ubuntu-20.04.1-desktop-amd64.iso"
  }, 
  {
    name: "Windows 7 ISO",
    description: "Windows 7 ISO Download + SP1",
    price: 29,
    image: ["https://1e9.community/uploads/db1440/original/2X/f/f8b416bda3b3ca512b67f45b7c9a1bb140f4eb5a.jpeg", "https://tipps.computerbild.de/imgs/19/8/5/8/8/1/65-microsoft-275553-1cdac072ef5245ae.jpg"],
    downloadLink: "https://dl2.winfuture.de/lAwHh4YJgJ2JmH94w6QpFA/1606523819/3291/ssd/Betriebssysteme/windows7/de_windows_7_professional_with_sp1_x64_dvd_u_676919.iso"
  },
  {
    name: "SWI Prolog",
    description: "SWI-Prolog offers a comprehensive free Prolog environment. Since its start in 1987, SWI-Prolog development has been driven by the needs of real world applications. SWI-Prolog is widely used in research and education as well as commercial applications. Join over a million users who have downloaded SWI-Prolog.",
    price: 0,
    image: ["https://www.swi-prolog.org/icons/swipl.png","https://www.swi-prolog.org/guitracer.gif","https://www.swi-prolog.org/howto/http/PceEmacsHello.png"],
    downloadLink: "https://www.swi-prolog.org/download/stable/bin/swipl-8.2.3-1.x64.exe.envelope"
  },
  {
    name: "Microsoft Visual Studio Code",
    description: "Visual Studio Code is a lightweight but powerful source code editor which runs on your desktop and is available for Windows, macOS and Linux. It comes with built-in support for JavaScript, TypeScript and Node.js and has a rich ecosystem of extensions for other languages (such as C++, C#, Java, Python, PHP, Go) and runtimes (such as .NET and Unity). ",
    price: 3,
    image: ["https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/1200px-Visual_Studio_Code_1.35_icon.svg.png","https://code.visualstudio.com/opengraphimg/opengraph-home.png","https://code.visualstudio.com/assets/updates/1_37/icons.gif"],
    downloadLink: "https://aka.ms/win32-x64-user-stable"
  }
  
]

/* GET home page. */

router.get("/", async(req:any, res:any, next:any) => {
  
  res.json(items);

});

router.get("/:name", async(req: any, res:any, next:any) => {

  if(items.find(item => item.name == req.params.name) != undefined){
    res.json(items.find(item => item.name == req.params.name));
  }else{
    res.status(400).json({error: "Item with specified name could not be found!"});
  }

})

export default router;