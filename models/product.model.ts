import { Schema } from "mongoose";

export interface IProduct {
    name:string;
    description:string;
    price:number;
    stock:number;
}

export const schemaProduct = new Schema<IProduct>({
    name :{
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    stock : {
        type : Number,
        required : true
    }
},
{
    versionKey : false
});