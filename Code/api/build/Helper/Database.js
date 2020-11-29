"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseHandler = exports.Database = void 0;
var axios_1 = __importDefault(require("axios"));
var Database = /** @class */ (function () {
    function Database() {
        this.config = {
            headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o" }
        };
    }
    Database.prototype.set = function (key, data) {
        try {
            return axios_1.default.post(process.env.DB_IP + "/set/" + key, data, this.config);
        }
        catch (err) {
            console.log(err);
        }
    };
    Database.prototype.update = function (key, data) {
        return axios_1.default.post(process.env.DB_IP + "/set/" + key, data, this.config);
    };
    Database.prototype.get = function (key) {
        return axios_1.default.get(process.env.DB_IP + "/get/" + key, this.config);
    };
    Database.prototype.getAll = function () {
        return axios_1.default.get(process.env.DB_IP + "/all", this.config);
    };
    Database.prototype.remove = function (key) {
        return axios_1.default.get(process.env.DB_IP + "/remove/" + key, this.config);
    };
    return Database;
}());
exports.Database = Database;
var DatabaseHandler = /** @class */ (function () {
    function DatabaseHandler() {
    }
    DatabaseHandler.getDbInstance = function () {
        if (!DatabaseHandler.database) {
            DatabaseHandler.database = new Database();
        }
        return DatabaseHandler.database;
    };
    return DatabaseHandler;
}());
exports.DatabaseHandler = DatabaseHandler;
