class Response {
    
    sendResponse = async(res, data) => {
        try {
            if (data.statusCode) {
                res.status(data.statusCode)

                delete data.statusCode

                res.send(data)
                return true
            }
            res.status(data && data.status ? 200 : 400)
            res.send(data)

        } catch (error) {
            console.error("helper response Error: ", error)

            res.status(400).send({
                status: false,
                error
            })

            return false
        }
    }
}

module.exports = new Response