import ContactCollection from '../db/models/contact.js';

export const getContacts = () => ContactCollection.find();

export const getContactById = (contactId) =>
  ContactCollection.findById(contactId);

export const addContact = (payload) => ContactCollection.create(payload);
