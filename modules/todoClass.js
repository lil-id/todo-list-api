const prisma = require('../helpers/database')
const validate = require('../helpers/validation')
const Joi = require('joi')

class Todo {

    listTodo = async () => {
        try {
            const getAllTodo = await prisma.todo.findMany()
            return {
                status: true,
                statusCode: 201,
                message: "Successfully retrieve all todo data",
                data: getAllTodo
            }
        } catch (error) {
            console.error("listTodo module error: ", error)

            return {
                status: false,
                error
            }
        }
    }

    createTodo = async (body) => {
        try {
            const schema = Joi.object({
                user_id: Joi.number().required(),
                title: Joi.string().required(),
                description: Joi.string().required(),
            })

            const validateResult = validate.validation(schema, body)

            if (!validateResult.status) {
                return validateResult
            }

            const createTodo = await prisma.todo.create({
                data: {
                    userId: Number(body.user_id),
                    title: body.title,
                    description: body.description,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            })
            return {
                status: true,
                statusCode: 201,
                message: "Successfully create a new todo",
                data: createTodo
            }

        } catch (error) {
            console.error("createTodo module error: ", error)

            return {
                status: false,
                error
            }
        }
    }

    updateTodo = async (body, id) => {
        try {
            const schema = Joi.object({
                title: Joi.string().required(),
                description: Joi.string().required(),
            })

            const validateResult = validate.validation(schema, body)

            if (!validateResult.status) {
                return validateResult
            }

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    statusCode: 422,
                    message: errorDetails.join(', ')
                }
            }
        } catch (error) {
            console.error("updateTodo module error: ", error)

            return {
                status: false,
                error
            }
        }
        const updateTodo = await prisma.todo.update({
            where: {
                id: Number(id)
            },
            data: {
                title: body.title,
                description: body.description,
                updatedAt: new Date()
            }
        })
        return {
            status: true,
            statusCode: 201,
            message: "Todo updated successfully",
            data: updateTodo
        }
    }

    deleteTodo = async (id) => {
        const deleteTodo = await prisma.todo.delete({
            where: {
                id: Number(id)
            }
        })
        return {
            status: true,
            statusCode: 201,
            message: "Todo deleted successfully",
            data: deleteTodo
        }
    }

}

module.exports = new Todo