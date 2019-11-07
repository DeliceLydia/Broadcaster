const responseMessage = {
    errorMessage(res, statusCode, error) {
        return res.status(statusCode).json({
            statusCode,
            error
        })
    },
    successWithData(res, statusCode, message, data) {
        return res.status(statusCode).json({
            statusCode,
            message,
            data
        })
    },
    successWithNoData(res, statusCode, message) {
        return res.status(statusCode).json({
            statusCode,
            message,
        })
    },
    successUser(res, message, statusCode, data) {
        return res.status(statusCode).json({
            statusCode,
            message,
            data,
            
        })
    }
}

module.exports = responseMessage;