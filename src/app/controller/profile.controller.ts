import { Response } from "express"
import asyncHandler from "express-async-handler"

import { UserService } from "../services/users"
import { IGetUserAuthInfoRequest } from './../../types/request';


class ProfileController {

    private userInstance

    constructor () {
        this.userInstance = new UserService()
    }

    getProfile = asyncHandler( async(req: IGetUserAuthInfoRequest, res: Response): Promise<any> => {

        const user = await this.userInstance.getUser({username: req.user?.username})

        if(!user) return res.status(503).json({status: false, mesaage: 'User not found'})

        return res.status(200).json({status: true, message: 'User returned successfully', data: user})
    })


}

export default new ProfileController()