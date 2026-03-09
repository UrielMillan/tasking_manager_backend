import expres from 'express';
import { router } from '@presentation/routes/TaskRoutes.js';
import errorHandleMiddleware from '@shared/middlewares/errorHandleMiddleware.js';

const app = expres();

app.use(expres.json());
app.use('/tasks', router);
app.use(errorHandleMiddleware)

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});