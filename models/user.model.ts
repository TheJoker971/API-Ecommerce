import { Schema } from "mongoose";
import { Mail } from "../utils";

export interface IUser {
    mail:Mail;
    password:string;
    active : boolean;
    admin:boolean;
}

export const schemaUser = new Schema<IUser>({
    mail : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    active : {
        type : Boolean,
        required : true
    },
    admin : {
        type : Boolean,
        required : true
    }
},
{
    versionKey : false
});