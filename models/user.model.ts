import { Schema } from "mongoose";
import { Mail } from "../utils/mail.utils";

export interface IUser {
    mail:Mail;
    password:string;
    admin:boolean;
}

export const schemaUser = new Schema<IUser>({
    mail : {
        type : String,
        required : true
    },
    password : {
        type : String,
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