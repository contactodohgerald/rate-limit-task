import { Request } from "express"
import { IDecode } from "./interface/user.decode";

export interface IGetUserAuthInfoRequest extends Request {
  user?: IDecode // or any other type
}