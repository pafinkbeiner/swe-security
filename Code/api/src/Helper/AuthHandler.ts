import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { DatabaseHandler } from "./Database";
import {User} from "../models/User"
import { Role } from "../models/Role";
import { resolve } from "path";


export function login(username: string, password:string){

    const user = DatabaseHandler.getDbInstance().get(username);

    if(user != undefined){
        if(bcrypt.compareSync(password, user.password)){
            jwt.sign(user,"secret");
        }
    }else{
        return undefined;
    }



}

export function register(username: string, password:string, mail:string){

    if(DatabaseHandler.getDbInstance().get(username) != undefined) return false;

    let user: User = {
        username: username,
        password: bcrypt.hashSync(password, 5),
        mail: mail,
        role: Role.Customer
    }

    DatabaseHandler.getDbInstance().set(username, user);

    return true;

}