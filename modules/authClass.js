const prisma = require('../helpers/database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class Auth {

    Login = async (body) => {
        try {
            const findUser = await prisma.user.findMany({
                where: {
                    email: body.email
                }
            })

            if(!findUser) {

                return {
                    status: false,
                    statusCode: 404,
                    message: "Email tidak ditemukan"
                }
            }
    
            else if (!bcrypt.compareSync(body.password, findUser[0].password)) {
                
                return {
                    status: false,
                    statusCode: 404,
                    message: "password tidak ditemukan"
                }
            }

            else {
                const payload = {
                    id: findUser.id,
                    email: findUser.email
                }

                const createSession = jwt.sign(payload, body.password, {expiresIn: "5h"})

                return {
                    status: true,
                    statusCode: 200,
                    message: "Success login",
                    data: { createSession }
                }
            }

        } catch (e) {
            console.error(e)
        }
    }
}

module.exports = new Auth