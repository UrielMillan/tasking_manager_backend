import { BaseError } from "@shared/errors/BaseError.js";
import { ZodError } from "zod";
import type { NextFunction, Request, Response } from "express";

export default function errorHandleMiddleware(
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
){
    if(error instanceof ZodError) {
        return res.status(400).json({
            code: "VALIDATION_ERROR",
            message: "Invalid request data",
            details: error.issues.map((issue) => ({
                field: issue.path.join('.'),
                error: issue.message
            }))
        })
    }

   if (error instanceof BaseError) {
        return res.status(error.statusCode).json({
            code: error.code,
            message: error.message
        })
    }

    return res.status(500).json({
        code: "INTERNAL_ERROR",
        message: "Unexpected error"
    })
}