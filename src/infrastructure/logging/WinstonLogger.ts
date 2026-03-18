import {injectable} from "tsyringe";
import {Logger} from "@shared/application/Logger.js";
import {createLogger, transports, format} from "winston";
import {BaseError} from "@shared/errors/BaseError.js";

@injectable()
export class WinstonLogger implements Logger {
    private logger = createLogger({
        format: format.combine(format.timestamp(), format.json()),
        transports: [new transports.Console()],
    })

    error(message: string, error: BaseError): void {
        this.logger.error(message, {stack: error?.stack});
    }

    info(message: string, context?: any): void {
        this.logger.info(message, context);
    }

    warn(message: string) {
        this.logger.warn(message);
    }
}
