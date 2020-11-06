import { DatabaseHandler } from "../Helper/Database";
import { LogHandler } from "../Helper/Log";

export interface Status{
    success: boolean;
    msg: string;
    code?: number;
    addInfo?: string[];
}

