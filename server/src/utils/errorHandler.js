// Custom ErrorHandler class to create custom error responses
class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}

const handleError = (err, req, res, next) => {
    const { statusCode, message } = err;
    console.log(err);
    // Standard error response format
    res.status(statusCode || 500).json({message:{
        success: false,
        msg:message,
    }});
};

export { ErrorHandler, handleError };
