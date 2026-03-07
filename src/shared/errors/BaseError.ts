export abstract class BaseError extends Error {
    constructor(
        message: string,
        code: string,
        statusCode: number,
        isOperational = true
    ){
        super(message)
        this.name = this.constructor.name
        Error.captureStackTrace(this)
    }
}