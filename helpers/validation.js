class Validation {
        
    validation = (schema, data) => {

        const checkValidation = schema.validate(data)
    
        if (checkValidation.error) {
            const errorDetails = checkValidation.error.details.map(detail => detail.message)
            return {
                status: false,
                statusCode: 422,
                message: errorDetails.join(', ')
            }
        }

        return {
            status: true
        }
    }
}

module.exports = new Validation