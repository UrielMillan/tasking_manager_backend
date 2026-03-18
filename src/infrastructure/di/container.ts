import  {container} from "tsyringe";
import {TOKENS} from "@infrastructure/di/tokens.js";
import {PrismaTaskRepositoryImpl} from "@infrastructure/persistence/PrismaTaskRepositoryImpl.js";
import {prisma} from "@infrastructure/datasources/PrismaDatasource.js";
import {PrismaClient} from "@prisma/client";
import {WinstonLogger} from "@infrastructure/logging/WinstonLogger.js";

export const registerDependencies = () => {
    container.registerInstance(PrismaClient, prisma);
    container.register(TOKENS.TASK_REPOSITORY, {useClass: PrismaTaskRepositoryImpl})
    container.registerSingleton(TOKENS.LOGGER, WinstonLogger)
}
