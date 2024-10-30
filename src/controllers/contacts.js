import * as contactServices from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  const data = await contactServices.getContacts();

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactController = async (req, res) => {
  const { contactId } = req.params;
  const data = await contactServices.getContactById(contactId);

  if (!data) {
    return res.status(404).json({
      status: 404,
      message: 'Contact not found',
    });
  }
  res.status(200).json({
    message: `Successfully found contact with id ${contactId}!`,
    data,
  });
};
