import Redis from "ioredis";
import { NextFunction, Request, Response } from "express"
import { MAX_ATTEMPTS, WAIT_TIME_IN_MINUTES } from "../config/default";

const redis = new Redis()

export const trackWrongPasswordAttempts = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const key = `failed_attempts:${req.ip}`;

        const attempts = await redis.get(key);
        const attemptsCount = parseInt(attempts || '0');

        if (attemptsCount >= MAX_ATTEMPTS) return res.status(429).json({status: false, message: `Too many failed attempts. Please wait for ${WAIT_TIME_IN_MINUTES} minutes before trying again.`});

        await redis.multi()
        .incr(key)
        .expire(key, WAIT_TIME_IN_MINUTES * 60)
        .exec();
  
      next();        
    } catch (error) {
        console.error('Error tracking password attempts:', error);
        next();
    }
}