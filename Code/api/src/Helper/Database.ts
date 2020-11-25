import axios, { AxiosRequestConfig } from "axios";

export class Database{

    config = {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o` }
    };

    set(key:string, data: any){
        try{
            return axios.post(`${process.env.DB_IP}/set/${key}`,data, this.config);
        }catch(err){
            console.log(err)
        }
    }

    update(key:string, data: any){
        return axios.post(`${process.env.DB_IP}/set/${key}`,data, this.config);
    }

    get(key: string){
        return axios.get(`${process.env.DB_IP}/get/${key}`, this.config);
    }

    getAll(){
        return axios.get(`${process.env.DB_IP}/all`, this.config);
    }

    remove(key: string){
        return axios.get(`${process.env.DB_IP}/remove/${key}`, this.config);
    }

}

export class DatabaseHandler{

    private static database: Database;

    private constructor(){}

    public static getDbInstance(): Database{
        if(!DatabaseHandler.database){
            DatabaseHandler.database = new Database();
        }
        return DatabaseHandler.database;
    }
}