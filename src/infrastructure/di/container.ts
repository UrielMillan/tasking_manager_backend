import  {container} from "tsyringe";
import {TOKENS} from "@infrastructure/di/tokens.js";
import {PrismaTaskRepositoryImpl} from "@infrastructure/persistence/PrismaTaskRepositoryImpl.js";
import {prisma} from "@infrastructure/datasources/PrismaDatasource.js";
import {PrismaClient} from "@prisma/client";

export const registerDependencies = () => {
    container.registerInstance(PrismaClient, prisma);
    container.register(TOKENS.TASK_REPOSITORY, {useClass: PrismaTaskRepositoryImpl})
}
