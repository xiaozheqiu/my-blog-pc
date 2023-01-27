// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import NextConnect from 'next-connect'

import { logger, onError, onNoMatch } from '../../../server/middleware/nextConnect.middleware'
import { NextApiRequest, NextApiResponse } from 'next'
import BlogController from '../../../server/controllers/blog.controller'
import { hasCookie, verifyIdQuery } from '../../../server/middleware/blog.middleware'

export default NextConnect<NextApiRequest, NextApiResponse>({ onError: onError, onNoMatch: onNoMatch })
    .use(logger)
    .use(hasCookie)
    .use(verifyIdQuery)
    .post(BlogController.deleteBlog)
