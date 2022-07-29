import express, { Application } from 'express'
import { router } from './router'
import bodyParser from 'body-parser'

import cors from 'cors'
require('dotenv').config()
const port = process.env.PORT
const app: Application = express()

app.use(cors())
app.use(
  bodyParser.json({
    limit: '50mb',
    strict: false,
    type: 'application/vnd.api+json',
  }),
)
app.use('/api/v1/survey', router)

const server = app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`)
})
