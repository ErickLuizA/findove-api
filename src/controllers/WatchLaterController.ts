import { Request, Response } from 'express'
import pool from '../config/config'
import { Movie } from '../entities/movie'

export default class MovieController {
  async addMovie (request: any, response: Response): Promise<Response<any, Record<string, any>>> {
    const { title, year, poster }: Omit<Movie, 'id' | 'userId'> = request.body
    const userId = request.userId

    const sql = 'INSERT INTO movies (title, year, poster, userId) VALUES ($1, $2, $3, $4)'
    const values = [title, year, poster, userId]

    try {
      await pool.query(sql, values)

      return response.status(200).send('Movie added to the list')
    } catch (error) {
      return response.status(400).send()
    }
  }

  async getMovies (request: any, response: Response): Promise<Response<any, Record<string, any>>> {
    const userId = request.userId

    const sql = 'SELECT * FROM movies WHERE movies.userId = $1'
    const values = [userId]

    try {
      const results: Movie[] = (await pool.query(sql, values)).rows

      return response.status(200).json(results)
    } catch (error) {
      return response.status(400).send()
    }
  }

  async deleteMovie (request: Request, response: Response): Promise<Response<any, Record<string, any>>> {
    const { id } = request.params

    const sql = 'DELETE FROM movies WHERE id = $1'
    const values = [id]

    try {
      await pool.query(sql, values)

      return response.status(200).send('movie deleted')
    } catch (error) {
      return response.status(400).send()
    }
  }
}
