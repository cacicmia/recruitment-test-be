import * as express from 'express'
const router = express.Router()
router.get('/', (req, res) => {
  console.log('get survey')
  res.send('get survey')
})
export { router }
