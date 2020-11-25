import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { DatabaseHandler } from "./Database";
import {User} from "../models/User"
import { Role } from "../models/Role";
import { resolve } from "path";
import { LogHandler } from "./Log";


export async function login(username: string, password:string){

    LogHandler.getLogInstance().log(`info that user with username: ${username} tried to login`);

    let user;
    try{
        user = await (await DatabaseHandler.getDbInstance().get(username)).data;
    }catch{
        user = undefined;
    }

    if(user != undefined){
       
        console.log("Compare: "+password+" with: "+ user.password);
        const result = bcrypt.compareSync(password, user.password);

        console.log(result)

        if(result){
            return {key: jwt.sign(user,"secret")};
        }

    }else{
        return undefined;
    }



}

export async function register(username: string, password:string, mail:string){

    LogHandler.getLogInstance().log(`info that user with username: ${username} tried to register`);

    let found: boolean;

    try{
        await (await DatabaseHandler.getDbInstance().get(username)).data;
        found = true;
    }catch{
        found = false;
    }

    if(found) return undefined

    let user: User = {
        username: username,
        password: bcrypt.hashSync(password, 5),
        mail: mail,
        role: Role.Customer
    }

    DatabaseHandler.getDbInstance().set(username, user);

    return login(username, password);

}