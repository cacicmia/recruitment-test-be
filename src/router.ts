import * as express from 'express'
import { v4 as uuidv4 } from 'uuid'
import JSONAPISerializer from 'jsonapi-serializer'

const surveySerializer = new JSONAPISerializer.Serializer('surveys', {
  attributes: ['title', 'description', 'questions'],
})
const answersSerializer = new JSONAPISerializer.Serializer('surveyAnswers', {
  attributes: ['questionId', 'answer'],
})

const data = {
  id: uuidv4(),
  title: 'Film feedback form',
  description: `<p>Thank you for participating in the film
festival!</p><p>Please fill out this short survey so we can record your
feedback.</p>`,
  questions: [
    {
      questionId: 'film',
      questionType: 'text',
      label: 'What film did you watch?',
      required: true,
      attributes: null,
    },
    {
      questionId: 'review',
      questionType: 'rating',
      label: `How would you rate the film? (1 - Very bad, 5 - Very
good)`,
      required: true,
      attributes: {
        min: 1,
        max: 5,
      },
    },
  ],
}
const survey = surveySerializer.serialize(data)
const surveyAnswers: any[] = []
const router = express.Router()
router.get('/', (req, res) => {
  const response: any = {
    data: survey,
  }
  res.json(response)
})
router.post('/:id/answers', (req, res) => {
  const { id } = req.params
  console.log(req.params, req.body)
  try {
    const {
      data: {
        attributes: { answers },
      },
    } = req.body

    const data = {
      type: 'surveyAnswers',
      id: uuidv4(),
      attributes: {
        answers,
      },
      relationships: {
        survey: {
          data: {
            type: 'surveys',
            id,
          },
        },
      },
    }
    const serialized = answersSerializer.serialize(answers)
    console.log(serialized)
    // console.log(data)
    surveyAnswers.push(data)
    return res.status(201).json(data)
  } catch (e) {
    return res.status(500).send('An error occured')
  }
})
export { router }
