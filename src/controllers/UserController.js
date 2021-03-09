const bcrypt = require('bcrypt')
const pool = require('../config/config')
const jwt = require('jsonwebtoken')

module.exports = {
  create: async (req, res) => {
    const { name, email, password } = req.body

    let hashedPassword

    try {
      hashedPassword = await bcrypt.hash(password, 10)
    } catch (error) {
      throw error
    }

    const sql = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)'
    const values = [name, email, hashedPassword]
    pool.query(sql, values, (err, result) => {
      if(err) {
        return false
      }
      return res.status(200).send('User registered')
    })
  },

  login: async (req, res) => {
    const { email, password } = req.body

    pool.query('SELECT * FROM users WHERE email = $1', [email], async (err, result) => {
      if(err) return res.status(400)
      const user = result.rows[0]
      
      try {
        if(await bcrypt.compare(password, user.password)) {
          const token = jwt.sign(user.id, process.env.ACCESS_TOKEN_SECRET)
          
          return res.json({user: user.name, token})
        }
      } catch (error) {
        return res.status(400)
      }
    })
  },

  addList: (req, res) => {
    const { Title, Year, Poster } = req.body 
    const userId = req.userId
    
    const sql = 'INSERT INTO movies (title, year, poster, userId) VALUES ($1, $2, $3, $4)'
    const values = [Title, Year, Poster, userId]
    
    pool.query(sql, values, (err, result) => {
      if (err) {
        return res.status(400)
      } else {
        return res.status(200).send('Movie added to the list')
      }
    })
  },

  getList: (req, res) => {
    const userId = req.userId

    const sql = 'SELECT DISTINCT Title, Year, Poster FROM movies INNER JOIN users ON movies.userid = $1'
    const values = [userId]                                                                                                                                                                                                                                                                   

    pool.query(sql, values, (err, result) => {
      if (err) return res.status(400)

      return res.status(200).json(result.rows)
    })
  },  

  deleteItem: (req, res) => {
    const { title, year, poster } = req.body
    const userId = req.userId

    const sql = 'DELETE FROM movies WHERE title = $1 AND year = $2 AND poster = $3 AND userId = $4'                                                                 
    const values = [title, year, poster, userId]

    pool.query(sql, values, (err, result) => {
      if(err) return res.status(400)

      return res.status(200).send('movie deleted')
    })
  }
}