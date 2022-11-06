const { Router } = require('express')
const authObject = require('../modules/authClass')

const authRoute = Router()

authRoute.post('/', async (req, res) => {
    const loginUser = await authObject.Login(req.body)
    res.json(loginUser)
})

module.exports = authRoute