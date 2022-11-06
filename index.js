const express = require('express')
const cors = require('cors')
const routes = require('./routes')

const app = express()
const port = 8080

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

routes(app)

app.get('/', async (req, res) => {
    res.status(200).send({
        status: true,
        message: "Welcome to the API"
    })
})

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`)
})