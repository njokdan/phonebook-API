import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Contact } from './contact.model';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel('Contact') private readonly contactModel: Model<Contact>,
  ) {}

  async insertContact(name: string, email: string, mobile: string, created: string) {
    const newContact = new this.contactModel({
      name,
      email: email,
      mobile,
      created,
    });
    const result = await newContact.save();
    return result.id as string;
  }

  async getContacts() {
    const contacts = await this.contactModel.find().exec();
    return contacts.map(contact => ({
        id: contact.id,
        name: contact.name,
        email: contact.email,
        mobile: contact.mobile,
        created: contact.created,
    }));
  }

  async getSingleContact(contactId: string) {
    const contact = await this.findContact(contactId);
    return {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        mobile: contact.mobile,
        created: contact.created,
    };
  }

  async getSingleContactByName(contactName: string) {
    const contact = await this.findContactByName(contactName);
    return {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        mobile: contact.mobile,
        created: contact.created,
    };
  }


  async getSingleContactByEmail(contactEmail: string) {
    const contact = await this.findContactByEmail(contactEmail);
    return {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        mobile: contact.mobile,
        created: contact.created,
    };
  }

  async getSingleContactByMobile(contactMobile: string) {
    const contact = await this.findContactByMobile(contactMobile);
    return {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        mobile: contact.mobile,
        created: contact.created,
    };
  }


  async updateContact(
    contactId: string,
    name: string,
    email: string,
    mobile: string,
    created: string,
  ) {
    const updatedContact = await this.findContact(contactId);
    if (name) {
      updatedContact.name = name;
    }
    if (email) {
      updatedContact.email = email;
    }
    if (mobile) {
      updatedContact.mobile = mobile;
    }
    if (created) {
        updatedContact.created = created;
      }
    updatedContact.save();
  }

  async deleteContact(contactId: string) {
    const result = await this.contactModel.deleteOne({_id: contactId}).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find contact.');
    }
  }

  private async findContact(id: string): Promise<Contact> {
    let contact;
    try {
      contact = await this.contactModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find contact.');
    }
    if (!contact) {
      throw new NotFoundException('Could not find contact.');
    }
    return contact;
  }

  private async findContactByName(name: String): Promise<Contact> {
    let contact;
    try {
      contact = await this.contactModel.findOne(name).exec();
    } catch (error) {
      throw new NotFoundException('Could not find contact.');
    }
    if (!contact) {
      throw new NotFoundException('Could not find contact.');
    }
    return contact;
  }

  private async findContactByEmail(email: String): Promise<Contact> {
    let contact;
    try {
      contact = await this.contactModel.findOne(email).exec();
    } catch (error) {
      throw new NotFoundException('Could not find contact.');
    }
    if (!contact) {
      throw new NotFoundException('Could not find contact.');
    }
    return contact;
  }

  private async findContactByMobile(mobile: String): Promise<Contact> {
    let contact;
    try {
      contact = await this.contactModel.findOne(mobile).exec();
    } catch (error) {
      throw new NotFoundException('Could not find contact.');
    }
    if (!contact) {
      throw new NotFoundException('Could not find contact.');
    }
    return contact;
  }
}
