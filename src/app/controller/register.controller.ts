import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import { UserService } from "../services/users"


class RegisterController {

    private userInstance

    constructor () {
        this.userInstance = new UserService()
    }

    storeNewUser = asyncHandler(async (req: Request, res: Response): Promise<any> => {
        const body : Record<string, any> = req.body

        const {username, email, password, c_password} = body

        if(password != c_password) return res.status(400).json({status: false, message: "Passwrd does not match"})

        const emailExist = await this.userInstance.getUser({email: email})
        if(emailExist) return res.status(400).json({status: false, message: "Email already exist"})

        const usernameExist = await this.userInstance.getUser({username: username})
        if(usernameExist) return res.status(400).json({status: false, message: "Username already exist"})

        const users = await this.userInstance.saveUser({
            username, email, password
        })

        return res.status(201).json({status: true, message: "created successfully", data: users})
    })


}

export default new RegisterController()