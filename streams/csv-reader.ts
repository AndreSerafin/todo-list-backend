import { parse } from 'csv-parse'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import axios from 'axios'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const csvPath = join(__dirname, 'tasks.csv')

const stream = fs.createReadStream(csvPath)

const csvParse = parse({ from_line: 2, delimiter: ',' })

async function read() {
  const lines = stream.pipe(csvParse)

  for await (const line of lines) {
    const [title, description, isCompleted] = line

    await axios.post('http://localhost:3001/tasks', {
      title,
      description,
      isCompleted,
    })
  }
}
read()
