import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

    constructor() { }

    use(req: Request, res: Response, next: NextFunction) {
        //Definir que vamos a hacer con los logs
        console.log("------------")
        console.log(req.body);
        next();
    }
}
