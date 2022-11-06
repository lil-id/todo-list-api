const prisma = require('../helpers/database')
const validate = require('../helpers/validation')
const bcrypt = require('bcrypt')
const Joi = require('joi')

class User {

    listUser = async () => {
        try {
            const getAllUsers = await prisma.user.findMany()
            return {
                status: true,
                statusCode: 201,
                message: "Successfully retrieve all user data",
                data: getAllUsers
            }

        } catch (error) {
            console.error("listUser module error: ", error)

            return {
                status: false,
                error
            }
        }
    }

    listAllUserTodo = async (id) => {
        try {
            const getAllUserTodo = await prisma.user.findMany({
                where: {
                    id: Number(id)
                },
                include: {
                    Todo: true
                }
            })
            return {
                status: true,
                statusCode: 201,
                message: "Successfully retrieve all todo user",
                data: getAllUserTodo
            }
        } catch (error) {
            console.error("listAllUserTodo module error: ", error)

            return {
                status: false,
                error
            }
        }
    }

    createUser = async (body) => {
        try {
            const schema = Joi.object({
                email: Joi.string().email({minDomainSegments: 1, tlds: {allow: ['com']}}).required(),
                name: Joi.string().max(30).required(),
                password: Joi.string().min(8).alphanum().required()
            })

            const validateResult = validate.validation(schema, body)

            if (!validateResult.status) {
                return validateResult
            }

            const createUser = await prisma.user.create({
                data: {
                    name: body.name,
                    email: body.email,
                    password: bcrypt.hashSync(body.password, 10),
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            })

            return {
                status: true,
                statusCode: 201,
                message: "Successfully create a new user",
                data: createUser
            }

        } catch (error) {
            console.error("createUser module error: ", error)

            return {
                status: false,
                error
            }
        }
    }

    updateUser = async (body, id) => {
        try {
            const schema = Joi.object({
                email: Joi.string().email({minDomainSegments: 1, tlds: {allow: ['com']}}).required(),
                name: Joi.string().max(30).required(),
                password: Joi.string().min(8).alphanum().required()
            })

            const validateResult = validate.validation(schema, body)

            if (!validateResult.status) {
                return validateResult
            }

            const updateUser = await prisma.user.update({
                where: {
                    id: Number(id)
                },
                data: {
                    name: body.name,
                    email: body.email,
                    password: bcrypt.hashSync(body.password, 10),
                    updatedAt: new Date()
                }
            })
            return {
                status: true,
                statusCode: 201,
                message: "User updated successfully",
                data: updateUser
            }
            
        } catch (error) {
            console.error("updateUser module error: ", error)

            return {
                status: false,
                error
            }
        }
    }

    deleteUser = async (id) => {
        try {
            const deleteUser = await prisma.user.delete({
                where: {
                    id: Number(id)
                }
            })
            return {
                status: true,
                statusCode: 201,
                message: "User deleted successfully",
                data: deleteUser
            }
        } catch (error) {
            console.error("deleteUser module error: ", error)

            return {
                status: false,
                error
            }
        }
    }

}

module.exports = new User