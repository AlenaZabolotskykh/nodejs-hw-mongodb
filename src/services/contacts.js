import ContactCollection from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
  filter = {},
}) => {
  const skip = (page - 1) * perPage;
  const limit = perPage;

  const contactQuery = ContactCollection.find();
  if (filter.isFavourite) {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }
  if (filter.userId) {
    contactQuery.where('userId').equals(filter.userId);
  }

  const totalItems = await ContactCollection.find()
    .merge(contactQuery)
    .countDocuments();

  const data = await contactQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData({
    totalItems,
    page,
    perPage,
  });

  return { data, ...paginationData };
};

export const getContactById = async (contactId, userId) => {
  const contacts = await ContactCollection.findOne({
    _id: contactId,
    userId,
  });

  // console.log('contactId:', contactId);
  // console.log('userId:', userId);

  return contacts;
};

export const addContact = (payload) => ContactCollection.create(payload);

export const updateContact = async (
  contactId,
  userId,
  payload,
  options = {},
) => {
  const rawResult = await ContactCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      ...options,
      new: true,
      includeResultMetadata: true,
    },
  );
  if (!rawResult || !rawResult.value) return null;
  return {
    data: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject.upserted),
  };
};

export const deleteContact = async (contactId, userId) => {
  const contact = await ContactCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });

  return { message: 'Contact deleted successfully' };
};
