const userRoute = require('./controllers/userController')
const todoRoute = require('./controllers/todoController')
const authRoute = require('./controllers/authController')

const path = [
    ['user', userRoute],
    ['todo', todoRoute],
    ['login', authRoute]
]

const routes = (app) => {
    path.forEach(route => {
        const [url, controller] = route
        app.use(`/api/${url}`, controller)
    })
}

module.exports = routes