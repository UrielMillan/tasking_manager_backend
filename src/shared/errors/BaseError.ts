export abstract class BaseError extends Error {
    public readonly code: string
    public readonly statusCode: number
    public readonly isOperational: boolean

    constructor(
        message: string,
        code: string,
        statusCode: number,
        isOperational = true
    ) {
        super(message)
        this.code = code
        this.statusCode = statusCode
        this.isOperational = isOperational

        this.name = this.constructor.name
        Error.captureStackTrace(this)
    }
}