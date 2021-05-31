
class HttpError extends Error {
    constructor(code, message) {
        super();
        this.code = code || 500;
        this.message = message || 'Error';
    }
}

const handleHttpError = (err, res) => {
    const { message, code } = err;

    res.status(code || 500).json({
        message
    });
}

module.exports = { HttpError, handleHttpError }