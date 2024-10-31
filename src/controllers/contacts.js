import * as contactServices from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getContactsController = async (req, res, next) => {
  const data = await contactServices.getContacts();

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await contactServices.getContactById(contactId);

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(200).json({
    message: `Successfully found contact with id ${contactId}!`,
    data,
  });
};

export const addCpntactController = async (req, res) => {
  const data = await contactServices.addContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};
