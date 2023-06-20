import Users from "../../database/model/users.model";

export class UserService {

    async saveUser (data: any) {
        return await Users.create(data)
    }

    async getUser (data: any) {
        return await Users.findOne(data)
    }
} 