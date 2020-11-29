"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = exports.authMiddleware = exports.allowAdministrator = exports.allowCustomer = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var Database_1 = require("./Database");
var Role_1 = require("../models/Role");
var Log_1 = require("./Log");
function allowCustomer(req, res, next) {
    var bearer = req.headers["authorization"];
    if (bearer != undefined) {
        var token = bearer.split(" ")[1];
        jsonwebtoken_1.default.verify(token, "secret", function (err, authData) {
            if (err) {
                res.status(400).json({ error: "Verification was not successfull" });
            }
            else {
                if (authData.role == 1 || authData.role == 2) {
                    next();
                }
                else {
                    res.status(400).json({ error: "Wrong Role!" });
                }
            }
        });
    }
    else {
        res.status(400).json({ error: "Bearer token was not provided" });
    }
}
exports.allowCustomer = allowCustomer;
function allowAdministrator(req, res, next) {
    var bearer = req.headers["authorization"];
    if (bearer != undefined) {
        var token = bearer.split(" ")[1];
        jsonwebtoken_1.default.verify(token, "secret", function (err, authData) {
            if (err) {
                res.status(400).json({ error: "Verification was not successfull" });
            }
            else {
                if (authData.role == 1) {
                    next();
                }
                else {
                    res.status(400).json({ error: "Wrong Role!" });
                }
            }
        });
    }
    else {
        res.status(400).json({ error: "Bearer token was not provided" });
    }
}
exports.allowAdministrator = allowAdministrator;
function authMiddleware(req, res, next) {
    var bearer = req.headers["authorization"];
    if (bearer != undefined) {
        var token = bearer.split(" ")[1];
        jsonwebtoken_1.default.verify(token, "secret", function (err, authData) {
            ;
            if (err) {
                res.status(400).json({ error: "Verification was not successfull" });
            }
            else {
                if (authData.role == Role_1.Role.Guest || authData.role == Role_1.Role.Customer || authData.role == Role_1.Role.Administrator) {
                    next();
                }
                else {
                    res.status(400).json({ error: "Wrong Role!" });
                }
            }
        });
    }
    else {
        res.status(400).json({ error: "Bearer token was not provided" });
    }
}
exports.authMiddleware = authMiddleware;
function login(username, password) {
    return __awaiter(this, void 0, void 0, function () {
        var user, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    Log_1.LogHandler.getLogInstance().log("info that user with username: " + username + " tried to login");
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, Database_1.DatabaseHandler.getDbInstance().get(username)];
                case 2: return [4 /*yield*/, (_b.sent()).data];
                case 3:
                    user = _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    _a = _b.sent();
                    user = undefined;
                    return [3 /*break*/, 5];
                case 5:
                    if (user != undefined) {
                        if (bcrypt_1.default.compareSync(password, user.password)) {
                            return [2 /*return*/, { key: jsonwebtoken_1.default.sign(user, "secret") }];
                        }
                    }
                    else {
                        return [2 /*return*/, undefined];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.login = login;
function register(username, password, mail) {
    return __awaiter(this, void 0, void 0, function () {
        var found, _a, user;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    Log_1.LogHandler.getLogInstance().log("info that user with username: " + username + " tried to register");
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, Database_1.DatabaseHandler.getDbInstance().get(username)];
                case 2: return [4 /*yield*/, (_b.sent()).data];
                case 3:
                    _b.sent();
                    found = true;
                    return [3 /*break*/, 5];
                case 4:
                    _a = _b.sent();
                    found = false;
                    return [3 /*break*/, 5];
                case 5:
                    if (found)
                        return [2 /*return*/, undefined];
                    user = {
                        username: username,
                        password: bcrypt_1.default.hashSync(password, 5),
                        mail: mail,
                        role: Role_1.Role.Customer,
                        boughtItems: undefined
                    };
                    Database_1.DatabaseHandler.getDbInstance().set(username, user);
                    return [2 /*return*/, login(username, password)];
            }
        });
    });
}
exports.register = register;
