import { Request, Response, NextFunction} from 'express';
import { success } from 'zod';

export const validate = (schema: any) =>{
   return (req: Request, res: Response, next: NextFunction) =>{
        try{
            schema.parse(req.body)
            next()
        }
        catch(err){
            res.status(400).json({success: false, message: 'Validation failed'})
        }
    }
}
