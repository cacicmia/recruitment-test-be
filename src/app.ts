import express, { Application } from 'express'
import { router } from './router'
require('dotenv').config()
const port = process.env.PORT
const app: Application = express()
app.use('/api/v1/survey', router)

const server = app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`)
})
