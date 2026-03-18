export interface Logger {
    info(message: string, context?: any): void;
    error(message: string, error: unknown): void;
    warn(message: string): void;
}
