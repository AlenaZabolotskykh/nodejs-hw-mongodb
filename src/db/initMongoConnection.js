// mongodb+srv://Alona_Zabolotskykh:<db_password>@cluster0.q0s36.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

import { env } from '../utils/env.js';
import mongoose from 'mongoose';

export const initMongoConnection = async () => {
  try {
    const user = env('MONGODB_USER');
    const password = env('MONGODB_PASSWORD');
    const url = env('MONGODB_URL');
    const db = env('MONGODB_DB');

    await mongoose.connect(
      `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`,
    );
    console.log('MongoDB connection succsessfully');
  } catch (error) {
    console.log(`Error connect database with message ${error.message}`);
    throw error;
  }
};
