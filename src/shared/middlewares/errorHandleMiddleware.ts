import {ExpressErrorMiddlewareInterface, Middleware} from "routing-controllers";
import { BaseError } from "@shared/errors/BaseError.js";
import { ZodError } from "zod";
import type { NextFunction, Request, Response } from "express";
import {inject, injectable} from "tsyringe";
import {TOKENS} from "@infrastructure/di/tokens.js";
import {Logger} from "@shared/application/Logger.js"

@injectable()
@Middleware({ type: 'after' })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
    constructor(@inject(TOKENS.LOGGER) private readonly _logger: Logger) {}

    error(error: unknown, request: Request, response: Response, next: NextFunction) {
        this._logger.error(`Error ${request.method}`, error)

        if(error instanceof ZodError) {
            return response.status(400).json({
                code: "VALIDATION_ERROR",
                message: "Invalid request data",
                details: error.issues.map((issue) => ({
                    field: issue.path.join('.'),
                    error: issue.message
                }))
            })
        }

        if (error instanceof BaseError) {
            return response.status(error.statusCode).json({
                code: error.code,
                message: error.message
            })
        }

        return response.status(500).json({
            code: "INTERNAL_ERROR",
            message: "Unexpected error"
        })
    }
}
