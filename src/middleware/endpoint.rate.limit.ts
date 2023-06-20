import { Response, NextFunction } from "express";
import Redis from "ioredis";
import { IGetUserAuthInfoRequest } from "../types/request";
import { MAX_ATTEMPTS, WAIT_TIME_IN_MINUTES } from "../config/default";
import { UserService } from "../app/services/users";

const redis = new Redis();

export async function trackUserProfileVisits(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
    const userInstance = new UserService()
    const user = await userInstance.getUser({
        username: req.user?.username,
    });

    try {
        const key = `profile_visits:${user?._id}`;

        const visits = await redis.incr(key);

        if (visits >= MAX_ATTEMPTS) {
            await redis.expire(key, WAIT_TIME_IN_MINUTES * 60);

            return res.status(429).json({status: false, message: `Too many profile visits. Please wait for ${WAIT_TIME_IN_MINUTES} minutes before visiting again.`});
        }

        next();
    } catch (error) {
        console.error("Error tracking profile visits:", error);
        next();
    }
}
