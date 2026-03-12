import 'reflect-metadata'
import {createExpressServer, useContainer} from "routing-controllers";
import {container} from "tsyringe";
import {TsyringenAdapter} from "@infrastructure/di/TsyringenAdapter.js";
import {registerDependencies} from "@infrastructure/di/container.js";
import {ErrorHandlerMiddleware} from "@shared/middlewares/errorHandleMiddleware.js";
import {TaskController} from "@presentation/controllers/TaskController.js";

registerDependencies()
useContainer(new TsyringenAdapter(container))

const app = createExpressServer({
    routePrefix: '/api',
    controllers: [TaskController],
    middlewares: [ErrorHandlerMiddleware],
    defaultErrorHandler: false,
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
