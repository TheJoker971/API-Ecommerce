import {IUser} from "./user.model";
import {Schema} from "mongoose";



export interface ISession {
    user: IUser;
    token:string;
    expiration:Date;
}

export const schemaSession = new Schema<ISession>(
    {
        user:{
            type: Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        token:{
            type: Schema.Types.String,
            required:true,
            unique:true
        },
        expiration:{
            type: Schema.Types.Date,
            required:true
        }
    },{
        versionKey:false
    }
)