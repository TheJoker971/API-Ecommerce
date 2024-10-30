import express, {Router,Request,Response} from 'express';
import {UserMiddleware,SessionMiddleware} from "../middlewares";
import {AuthService, ServiceErrorCode, UserService} from "../services";



export class UserController{

    constructor(private authService: AuthService,private userService:UserService,private router: Router){

    }


    async editUser(req:Request,res:Response){
        const sr = await this.userService.editUser(req.params.id,req.body);
        switch(sr.errorCode){
            case ServiceErrorCode.success:
                res.status(200).json(sr.result);
                break;
            default:
                res.status(500).end();
                break;
        }
    }

    async deleteUser(req:Request,res:Response){
        const sr = await this.userService.deleteUser(req.params.id);
        switch(sr.errorCode){
            case ServiceErrorCode.success:
                res.status(200).json(sr.result);
                break;
            default:
                res.status(500).end();
                break;
        }
    }
    async getUsers(req:Request,res:Response){
        const sr = await this.userService.getAll();
        switch(sr.errorCode){
            case ServiceErrorCode.success:
                res.status(200).json(sr.result);
                break;
            default:
                res.status(500).end();
        }
    }
    
    async deactivateUser(req: Request, res: Response) {
        const sr = await this.userService.deactivateUser(req.params.id);
        switch (sr.errorCode) {
            case ServiceErrorCode.success:
                res.status(200).end();
                break;
            default:
                res.status(500).end();
                break;
        }
    }

    buildRoutes(){
        this.router.put('/edit/:id',express.json(),SessionMiddleware.isLogged(this.authService),UserMiddleware.isAdmin(),this.editUser.bind(this));
        this.router.delete('/delete/:id',SessionMiddleware.isLogged(this.authService),UserMiddleware.isAdmin(),this.deleteUser.bind(this));
        this.router.put('/deactivate/:id', express.json(), this.deactivateUser.bind(this));
        this.router.get('/',SessionMiddleware.isLogged(this.authService),UserMiddleware.isAdmin(),this.getUsers.bind(this));
        return this.router;
    }
}