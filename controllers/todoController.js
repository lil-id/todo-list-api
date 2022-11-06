const { Router } = require('express')
const todoObject = require('../modules/todoClass')
const response = require('../helpers/response')

const todoRoute = Router()

todoRoute.get('/', async (req, res) => {
    const listAllTodo = await todoObject.listTodo()
    response.sendResponse(res, listAllTodo)
})

todoRoute.post('/', async (req, res) => {
    const createTodo = await todoObject.createTodo(req.body)
    response.sendResponse(res, createTodo)
})

todoRoute.put('/:id', async (req, res) => {
    const { id } = req.params
    const updateTodo = await todoObject.updateTodo(req.body, id)
    response.sendResponse(res, updateTodo)
})

todoRoute.delete('/:id', async (req, res) => {
    const { id } = req.params
    const deleteTodo = await todoObject.deleteTodo(id)
    response.sendResponse(res, deleteTodo)
})

module.exports = todoRoute