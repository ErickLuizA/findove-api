import axios from 'axios'
import { Request, Response } from 'express'

export default class MovieController {
  async search (request: Request, response: Response): Promise<Response<any, Record<string, any>>> {
    const { search } = request.query

    try {
      const res = await axios.get('http://www.omdbapi.com', {
        params: {
          s: search,
          apikey: process.env.API_KEY
        }
      })

      return response.status(200).json(res.data)
    } catch (error) {
      return response.status(400).send()
    }
  }
}
