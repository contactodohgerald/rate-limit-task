import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import jwt from 'jsonwebtoken';

import { UserService } from "../services/users"
import { jwt_expires, jwt_secret } from "../../config/default";


class LoginController {

    private userInstance

    constructor () {
        this.userInstance = new UserService()
    }

    loginUser = asyncHandler(async (req: Request, res: Response): Promise<any> => {
        const body : Record<string, any> = req.body

        const {username, password} = body

        const wrongPwd = await this.userInstance.getUser({password})
        if(!wrongPwd) return res.status(400).json({status: false, message: "Wrong Password"})

        const usernameExist = await this.userInstance.getUser({username})
        if(!usernameExist) return res.status(400).json({status: false, message: "User not found"})

        const payload = {uuid: usernameExist._id, username: usernameExist.username, email: usernameExist.email}
        const token = jwt.sign(
            payload, jwt_secret, {expiresIn: jwt_expires}
        );

        return res.status(200).json({status: true, message: "login successfull", data: {
            ...payload, token, 
        }})
    })


}

export default new LoginController()