import { Model, Mongoose } from "mongoose";
import { IUser, schemaUser } from "./user.model";
import { IProduct, schemaProduct } from "./product.model";
import { ISession, schemaSession } from "./session.model";

export class ModelRegistry{
    readonly db : Mongoose;
    readonly userModel : Model<IUser>;
    readonly productModel : Model<IProduct>;
    readonly sessionModel : Model<ISession>;

    constructor(db:Mongoose){
        this.db = db;
        this.userModel = db.model("Users",schemaUser);
        this.productModel = db.model("Products",schemaProduct);
        this.sessionModel = db.model("Sessions",schemaSession);
    }
}