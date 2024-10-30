import express  from "express";
import cors from "cors";
import { MongooseUtils } from "./mongoose.utils";
import { ModelRegistry } from "../models/registry.model";
export class App {

    static async  launchAPI() {
        const db = await MongooseUtils.open();
        const modelRegistry = new ModelRegistry(db);
        const app = express();


        app.use(express.json()); 
        app.use(cors());
        app.listen(process.env.PORT,function (){
            console.log(`Listening on port ${process.env.PORT}`);
        });
    }
}
