import { Request } from "express";
import multer from "multer";


const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) {
        callback(null, 'uploads/');
    },
    filename: function (req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) {
        callback(null, Date.now() + '_' + file.originalname);
    }
})

export const upload = multer({  storage })