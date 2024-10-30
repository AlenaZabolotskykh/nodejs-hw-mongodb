import { Router } from 'express';
import * as contactControllers from '../controllers/contacts.js';

const contactsRouter = Router();

contactsRouter.get('/', contactControllers.getContactsController);

contactsRouter.get('/:contactId', contactControllers.getContactController);

export default contactsRouter;
