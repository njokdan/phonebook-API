import * as mongoose from 'mongoose';

export const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    created: { type: String, required: true },
});

export interface Contact extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  mobile: string;
  created: string;
}
