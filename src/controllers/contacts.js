import * as contactServices from '../services/contacts.js';
import createHttpError from 'http-errors';
import * as path from 'node:path';
// import { contactAddSchema } from '../validation/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { sortByList } from '../db/models/contact.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';

export const getContactsController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);
  // console.log(page, perPage);
  const filter = parseFilterParams(req.query);

  const { _id: userId } = req.user;
  filter.userId = userId;

  const data = await contactServices.getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactController = async (req, res, next) => {
  console.log(req.user);
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const data = await contactServices.getContactById(contactId, userId);

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: data,
  });
};

export const addContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const photo = req.file;
  let photoUrl;

  if (photo) {
    photoUrl = await saveFileToUploadDir(photo);
  }

  const data = await contactServices.addContact({
    ...req.body,
    userId,
    photo: photoUrl,
  });
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

// export const upsertContactController = async (req, res) => {
//   const { contactId: _id } = req.params;
//   const result = await contactServices.updateContact({
//     _id,
//     payload: req.body,
//     options: {
//       upsert: true,
//     },
//   });

//   const status = result.isNew ? 201 : 200;

//   res.status(status).json({
//     status,
//     message: 'Contact upserted successfully',
//     data: result.data,
//   });
// };

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const photo = req.file;

  let photoUrl = null;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo, 'photo');
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }
  const payload = {
    ...req.body,
    photo: photoUrl,
  };

  const result = await contactServices.updateContact(
    contactId,
    userId,
    payload,
  );

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: 'Contact patched successfully',
    data: result.data,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const data = await contactServices.deleteContact(contactId, userId);
  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};
