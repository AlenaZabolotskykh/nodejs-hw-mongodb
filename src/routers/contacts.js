import { Router } from 'express';
import * as contactControllers from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(contactControllers.getContactsController));

contactsRouter.get(
  '/:contactId',
  ctrlWrapper(contactControllers.getContactController),
);

contactsRouter.post('/', ctrlWrapper(contactControllers.addCpntactController));

export default contactsRouter;
