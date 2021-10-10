import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
  } from '@nestjs/common';
  
  import { ContactsService } from './contacts.service';
  
  @Controller('contacts')
  export class ContactsController {
    constructor(private readonly contactsService: ContactsService) {}
  
    @Post()
    async addContact(
      @Body('name') contactName: string,
      @Body('email') contactEmail: string,
      @Body('mobile') contactMobile: string,
      @Body('created') createdDate: string,
    ) {
      const generatedId = await this.contactsService.insertContact(
        contactName,
        contactEmail,
        contactMobile,
        createdDate,
      );
      return { id: generatedId };
    }
  
    @Get()
    async getAllContacts() {
      const contacts = await this.contactsService.getContacts();
      return contacts;
    }
  
    @Get(':id')
    getContact(@Param('id') contactId: string) {
      return this.contactsService.getSingleContact(contactId);
    }

    // @Get(':name')
    // getContactByName(@Param('name') contactName: string) {
    //   return this.contactsService.getSingleContactByName(contactName);
    // }

    // @Get(':email')
    // getContactByEmail(@Param('email') contactEmail: string) {
    //   return this.contactsService.getSingleContactByEmail(contactEmail);
    // }

    // @Get(':mobile')
    // getContactByMobile(@Param('mobile') contactMobile: string) {
    //   return this.contactsService.getSingleContactByMobile(contactMobile);
    // }
  
    @Patch(':id')
    async updateContact(
      @Param('id') contactId: string,
      @Body('name') contactName: string,
      @Body('email') contactEmail: string,
      @Body('mobile') contactMobile: string,
      @Body('created') createdDate: string,
    ) {
      await this.contactsService.updateContact(contactId, contactName, contactEmail, contactMobile, createdDate);
      return {message:"Contact Successfully Updated"};
    }
  
    @Delete(':id')
    async removeContact(@Param('id') contactId: string) {
        await this.contactsService.deleteContact(contactId);
        return {message:"Contact Successfully Deleted"};
    }
  }
  