
import {Model} from "mongoose";
import { SecurityUtils } from "../utils";
import { IUser,ISession,ModelRegistry } from "../models";
import { ServiceResult } from "./result.service";



export class AuthService{
    private userModel: Model<IUser>;
    private sessionModel: Model<ISession>;

    constructor(registry:ModelRegistry){
        this.userModel = registry.userModel;
        this.sessionModel = registry.sessionModel;
    }

    async reg(login:string, password:string){
        try {
            const user = this.userModel.create({
                login: login,
                password: SecurityUtils.toSHA256(password),
                active:true,
                admin: false
            });
            return ServiceResult.success(user);
        }catch(err){
            return ServiceResult.failed();
        }
    }


    async log(login:string, password:string){
        try{
            const user = await this.userModel.findOne({
                login:login,
                password:SecurityUtils.toSHA256(password)
            }).exec();
            if(user !== null ){
                if(!user.active){
                    return ServiceResult.failed();
                }
                let expiration = new Date().getTime() + 180000000;
                let session = await this.sessionModel.findOne({
                    user:user
                }).exec();
                if(session !== null){
                    if(session.expiration.getTime() < new Date().getTime()){
                        const update = await this.sessionModel.updateOne({
                            _id:session
                        },{
                            $set:{
                                token:SecurityUtils.randomToken(),
                                expiration:expiration
                            }
                        }).exec();
                        return ServiceResult.success(session);
                    }else{
                        return ServiceResult.success(user);
                    }
                }else {

                    session = await this.sessionModel.create({
                        user:user,
                        token:SecurityUtils.randomToken(),
                        expiration: expiration
                    });
                    return ServiceResult.success(session);
                }
            }
            return ServiceResult.notFound();
        }catch(err){
            return ServiceResult.failed();
        }
    }

    async getSession(token: string): Promise<ServiceResult<ISession>> {
        try {
            const session = await this.sessionModel.findOne({
                token: token,
                expiration: {
                    $gt: new Date()
                }
            }).exec();
            if(session !== null) {
                const user = await  this.userModel.findById(session.user).exec();
                if(user !== null && user.active){
                    return ServiceResult.success(session);
                }
                return ServiceResult.failed();
            }
            return ServiceResult.notFound();
        } catch(err) {
            return ServiceResult.failed();
        }
    }
    
    async getById(userId: string): Promise<IUser | null> {
        try {
            const user = await this.userModel.findById(userId).exec();
            return user;
        } catch (err) {
            return null;
        }
    }
}