const responseMessage = {
    errorMessage(res, statusCode, error) {
        return res.status(statusCode).json({
            statusCode,
            error
        })
    },
    successWithData(res, statusCode, message, token, userData) {
        return res.status(statusCode).json({
            statusCode,
            message,
            token,
            userData
        })
    },
    successWithNoData(res, statusCode, message) {
        return res.status(statusCode).json({
            statusCode,
            message,
        })
    },
    successUser(res, statusCode, message, data) {
        return res.status(statusCode).json({
            statusCode,
            message,
            data,
            
        })
    }
}

export default responseMessage;