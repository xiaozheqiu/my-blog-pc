// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import NextConnect from 'next-connect'
import AuthController from '../../../server/controllers/user.controller'
import { userValidator, verifyUserSameName } from '../../../server/middleware/user.middleware'
import { logger, onError, onNoMatch } from '../../../server/middleware/nextConnect.middleware'

export default NextConnect({ onError: onError, onNoMatch: onNoMatch })
    .use(logger)
    .use(userValidator)
    .use(verifyUserSameName)
    .post(AuthController.register)
