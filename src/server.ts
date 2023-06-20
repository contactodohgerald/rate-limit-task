import express from 'express'
import { connection } from './database/connection'

//controllers
import controller from './app/controller/controller';
import registerController from './app/controller/register.controller';
import loginController from './app/controller/login.controller';
import { port } from './config/default';
import profileController from './app/controller/profile.controller';
import {verifyLoginToken} from './middleware/verify.token';
import { trackWrongPasswordAttempts } from './middleware/ip.rate.limit';
import { trackUserProfileVisits } from './middleware/endpoint.rate.limit';

const app = express()

if(connection()){

    app.use(express.json());

    //routes
    app.get('/api/v1/test', controller.healthCheck)
    //register section
    app.post('/api/v1/create-user', registerController.storeNewUser)
    //login section
    app.post('/api/v1/login', trackWrongPasswordAttempts, loginController.loginUser)
    //profile section
    app.get('/api/v1/user-profile', verifyLoginToken, trackUserProfileVisits, profileController.getProfile)

    app.listen(port, () => console.log(`app listening on port ${port}`))
}else{
    console.error('app did not connect to database')
}