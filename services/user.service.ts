import {IUser, ModelRegistry} from '../models';
import {Model} from 'mongoose';
import {ServiceResult} from "./result.service";


export class UserService{
    private userModel: Model<IUser>
    constructor(private registry:ModelRegistry){
        this.userModel = registry.userModel;
    }


    async deleteUser(id:string){
        try{
            await this.userModel.findByIdAndDelete(id).exec();
            return ServiceResult.success(undefined);
        }catch(err){
            return ServiceResult.failed();
        }
    }
    async editUser(id:string,info:Partial<IUser>){
        try{
            const update = await this.userModel.updateOne({
                _id:id
            },{$set:info});
            return ServiceResult.success(update);
        }catch(err){
            return ServiceResult.failed();
        }


    }
    async getAll():Promise<ServiceResult<IUser[]>>{
        try{
            const users = await this.userModel.find().exec();
            return ServiceResult.success(users);
        }catch(err){
            return ServiceResult.failed();
        }
    }

    async deactivateUser(id: string): Promise<ServiceResult<void>> {
        try {
            const result = await this.userModel.updateOne({ _id: id }, { $set: { active: false } }).exec();
            if (result.modifiedCount > 0) { // Utiliser modifiedCount au lieu de nModified
                return ServiceResult.success(undefined);
            }
            return ServiceResult.failed();
        } catch (err) {
            return ServiceResult.failed();
        }
    }
}