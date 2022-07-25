import * as express from 'express'
const router = express.Router()
router.get('/', (req, res) => {
  const response: any = {
    data: {
      type: 'surveys',
      id: '2660dd24-e2db-42c1-8093-284b1df2664c',
      attributes: {
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
      },
    },
  }
  console.log('get survey')
  res.json(response)
})
router.post('/:id/answers', (req, res) => {
  const { id } = req.params
  console.log(req.params, req.body)
  const {
    data: {
      attributes: { answers },
    },
  } = req.body
  try {
    const data = {
      type: 'surveyAnswers',
      id: '9c7160a4-e9ad-499e-92f6-07d7cdb0382c',
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
    // console.log(data)

    return res.status(201).json(data)
  } catch (e) {
    return res.status(500).send('An error occured')
  }
})
export { router }
