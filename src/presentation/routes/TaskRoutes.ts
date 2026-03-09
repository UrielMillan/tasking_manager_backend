import { Router } from "express";
import { TaskController } from "@presentation/controllers/TaskController.js";
import { PrismaTaskRepositoryImpl } from "@infrastructure/persistence/PrismaTaskRepositoryImpl.js";
import { prisma } from "@infrastructure/datasources/PrismaDatasource.js";
import { FindManyTaskUseCase } from "@application/FindManyTaskUseCase.js";
import { FindTaskUseCase } from "@application/FindTaskUseCase.js";
import { CreateTaskUseCase } from "@application/CreateTaskUseCase.js";
import { UpdateTaskUseCase } from "@application/UpdateTaskUseCase.js";

const router = Router();
const repository = new PrismaTaskRepositoryImpl(prisma);

const controller = new TaskController(
    new FindTaskUseCase(repository),
    new FindManyTaskUseCase(repository),
    new CreateTaskUseCase(repository),
    new UpdateTaskUseCase(repository)
);

router.get("/", controller.findMany.bind(controller));
router.post("/", controller.create.bind(controller));
router.get("/:id", controller.find.bind(controller));
router.put("/:id", controller.update.bind(controller));

export {router}