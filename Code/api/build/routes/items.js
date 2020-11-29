"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var router = express.Router();
var items = [
    {
        name: "Kali Linux ISO",
        description: "Kali Linux ISO Version 2020.4",
        price: 5,
        image: ["https://linuxtalk.de/wp-content/uploads/2020/01/Kali-Linux-Logo-1400x601.png", "https://upload.wikimedia.org/wikipedia/commons/2/2d/%D9%83%D8%A7%D9%84%D9%8A_%D9%84%D9%8A%D9%86%D9%83%D8%B3.png"],
        downloadLink: "https://cdimage.kali.org/kali-2020.4/kali-linux-2020.4-installer-amd64.iso",
        sha265Sum: "50492d761e400c2b5e22c8f253dd6f75c27e4bc84e33c2eff272476a0588fb02"
    },
    {
        name: "Linux Ubuntu ISO",
        description: "Linux Ubuntu ISO 20.04.1 LTS",
        price: 3,
        image: ["https://assets.ubuntu.com/v1/8dd99b80-ubuntu-logo14.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Desktop_Ubuntu_20.04.png/1200px-Desktop_Ubuntu_20.04.png"],
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
        image: ["https://www.swi-prolog.org/icons/swipl.png", "https://www.swi-prolog.org/guitracer.gif", "https://www.swi-prolog.org/howto/http/PceEmacsHello.png"],
        downloadLink: "https://www.swi-prolog.org/download/stable/bin/swipl-8.2.3-1.x64.exe.envelope"
    },
    {
        name: "Microsoft Visual Studio Code",
        description: "Visual Studio Code is a lightweight but powerful source code editor which runs on your desktop and is available for Windows, macOS and Linux. It comes with built-in support for JavaScript, TypeScript and Node.js and has a rich ecosystem of extensions for other languages (such as C++, C#, Java, Python, PHP, Go) and runtimes (such as .NET and Unity). ",
        price: 3,
        image: ["https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/1200px-Visual_Studio_Code_1.35_icon.svg.png", "https://code.visualstudio.com/opengraphimg/opengraph-home.png", "https://code.visualstudio.com/assets/updates/1_37/icons.gif"],
        downloadLink: "https://aka.ms/win32-x64-user-stable"
    }
];
/* GET home page. */
router.get("/", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.json(items);
        return [2 /*return*/];
    });
}); });
router.get("/:name", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (items.find(function (item) { return item.name == req.params.name; }) != undefined) {
            res.json(items.find(function (item) { return item.name == req.params.name; }));
        }
        else {
            res.status(400).json({ error: "Item with specified name could not be found!" });
        }
        return [2 /*return*/];
    });
}); });
exports.default = router;
