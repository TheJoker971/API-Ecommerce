import {NextFunction, RequestHandler, Request, Response} from "express";


export class UserMiddleware {

    static isAdmin() : RequestHandler {
        return function(req: Request,res: Response,next: NextFunction) {
            const user = req.user;
            if (!user) {
                res.status(401).end();
                return;
            }
            if (typeof user === "string") {
                res.status(403).end();
                return;
            }
            const admin = user.admin;
            if (!admin) {
                res.status(403).end();
                return;
            }
            next();
        }
    }

}