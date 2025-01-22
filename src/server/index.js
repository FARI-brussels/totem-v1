import Fastify from 'fastify'
import { exec } from 'child_process'
import cors from '@fastify/cors'

const fastify = Fastify({ logger: true })

await fastify.register(cors, {
  origin: 'http://localhost:5173', // Allow requests only from this origin
  methods: ['POST'], // Specify allowed HTTP methods
})

// Route to handle survey submission
fastify.post('/submit-survey', async (request, reply) => {
  console.log('Current Working Directory:', process.cwd())
  const { survey_name, rating, feedback } = request.body
  const feedbackString = feedback.join('; ')

  // Command to execute the bash script
  const command = `bash ./src/scripts/update_csv.sh "${survey_name}" "${rating}" "${feedbackString}"`
  const push = `git add . && git commit -m 'update survey' && git push`

  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        fastify.log.error(`Error: ${error.message}`)
        reply.code(500).send({ error: error.message })
        return reject(error)
      }
      if (stderr) {
        fastify.log.error(`Stderr: ${stderr}`)
        reply.code(500).send({ error: stderr })
        return reject(stderr)
      }
      fastify.log.info(`Script output: ${stdout}`)
      reply.code(200).send({ message: 'Survey data submitted successfully' })
      exec(push)
      resolve()
    })
  })
})

export const startServer = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' })
    console.log('Server started at http://localhost:3000')
    return fastify
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

startServer()
