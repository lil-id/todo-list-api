const { Router } = require('express')
const userObject = require('../modules/userClass')
const response = require('../helpers/response')

const userRoute = Router()

userRoute.get('/', async (req, res) => {
    const listAllUser = await userObject.listUser()
    response.sendResponse(res, listAllUser)
})

userRoute.get('/:id', async (req, res) => {
    const { id } = req.params
    const listAllTodoUser = await userObject.listAllUserTodo(id)
    response.sendResponse(res, listAllTodoUser)
})

userRoute.post('/', async (req, res) => {
    const createUser = await userObject.createUser(req.body)
    response.sendResponse(res, createUser)
})

userRoute.put('/:id', async (req, res) => {
    const { id } = req.params
    const updateUser = await userObject.updateUser(req.body, id)
    response.sendResponse(res, updateUser)
})

userRoute.delete('/:id', async (req, res) => {
    const { id } = req.params
    const deleteUser = await userObject.deleteUser(id)
    response.sendResponse(res, deleteUser)
})

module.exports = userRoute