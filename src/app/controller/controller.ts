import { Request, Response } from "express"
import asyncHandler from "express-async-handler"


class Controller {

    healthCheck = asyncHandler((req: Request, res: Response) => {
        res.status(200).json({status: true, message: "this is a health check !!!"})
    })

}

export default new Controller()