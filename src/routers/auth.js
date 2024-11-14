import { Router } from 'express';
import * as authControllers from '../controllers/auth.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';

import { authLoginShema, authRegisterShema } from '../validation/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(authRegisterShema),
  ctrlWrapper(authControllers.registerController),
);

authRouter.post(
  '/login',
  validateBody(authLoginShema),
  ctrlWrapper(authControllers.loginController),
);

export default authRouter;
