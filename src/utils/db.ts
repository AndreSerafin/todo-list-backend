import { connect, set } from 'mongoose'

const dataBaseUrl = 'mongodb://root:root@db:27017'

export async function dbConnection() {
  try {
    set('strictQuery', true)
    await connect(dataBaseUrl)
    console.log('Connected to database!')
  } catch (e) {
    console.log('Error: ', e)
  }
}
