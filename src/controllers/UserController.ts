import { Request, Response } from 'express'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { User } from '../entities/user'

import pool from '../config/config'

export default class UserController {
  async create(
    request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>>> {
    const { name, email, password }: Omit<User, 'id'> = request.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const sql = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)'
    const values = [name, email, hashedPassword]

    try {
      await pool.query(sql, values)

      return response.status(200).send('User registered')
    } catch (error) {
      console.log(error)

      return response.status(400).send()
    }
  }

  async login(
    request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>>> {
    const { email, password }: Omit<User, 'id' | 'name'> = request.body

    const sql = 'SELECT * FROM users WHERE email = $1'
    const values = [email]

    try {
      const result = await pool.query(sql, values)

      const user: User = result.rows[0]

      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          user.id.toString(),
          process.env.ACCESS_TOKEN_SECRET ?? ''
        )

        return response.json({ user: user.name, token })
      } else {
        throw new Error('Invalid password')
      }
    } catch (error) {
      return response.status(400).send()
    }
  }
}
