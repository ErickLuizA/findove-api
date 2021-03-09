const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
  const { authorization } = req.headers

  if(!authorization) return res.status(401)

  const [scheme, token] = authorization.split(" ")

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
    if(err) {
      return res.status(403)
    } else {
      req.userId = decodedToken
      return next()
    }
  })
}