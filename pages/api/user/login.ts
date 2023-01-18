// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import NextConnect from 'next-connect'
import AuthController from '../../../server/controllers/user.controller'
import { hasAdmin, hasUser, userValidator, verifyUserPassword } from '../../../server/middleware/user.middleware'
import { logger, onError, onNoMatch } from '../../../server/middleware/nextConnect.middleware'
import { NextApiRequest, NextApiResponse } from 'next'

export default NextConnect<NextApiRequest, NextApiResponse>({ onError: onError, onNoMatch: onNoMatch })
    .use(logger)
    .use(userValidator)
    .use(hasUser)
    .use(verifyUserPassword)
    .use(hasAdmin)
    .post(AuthController.login)
