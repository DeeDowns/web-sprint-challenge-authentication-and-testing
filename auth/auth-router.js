const router = require('express').Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Users = require('../users/usersModel')

router.post('/register', (req, res) => {
  const credentials = req.body 
  
  const rounds = process.env.BCRYPT_ROUNDS || 8
  const hash = bcrypt.hashSync(credentials.password, rounds)
  credentials.password = hash

  if(isValid(credentials)) {
    Users.add(credentials)
    .then(user => {
      console.log(user)
      const token = makeJwt(user)
      res.status(201).json({ user, token })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: err.message })
    })
  }
});



router.post('/login', (req, res) => {
  const { username, password } = req.body
  if(isValid(req.body)) {
    Users.findBy({ username: username })
    .then(([user]) => {
      console.log(user)
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = makeJwt(user)
        res.status(200).json({
          message: `Welcome ${user.username}`,
          token
        })
      } else {
        res.status(500).json({ message: 'invalid credentials'})
      }
    })
    .catch(err => {
      console.log(err)
     res.status(500).json({ message: err.message })
    })
  }
});

function isValid(user) {
  return (req, res, next) => {
    if(user.username && user.password && typeof user.password === 'string') {
      next()
    } else {
      res.status(400).json({ message: 'please provide username and password; password should be alphanumeric' })
    }
  }
}

function makeJwt({ id, username }) {
  const payload = {
    username,
    subject: id
  }

  const secret = {
    jwtSecret: process.env.JWT_SECRET || 'got a secret, can you keep it?'
  }

  const options = {
    expiresIn: '8 hours'
  }

  return jwt.sign(payload, secret.jwtSecret, options)
  
}

module.exports = router;
