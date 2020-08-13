const fs = require('fs').promises;
const path = require('path');
const { v4 }= require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(contacts);
  } catch (error) {
      console.log(error);
  }
  
};

async function getContactById(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    parsedContacts = JSON.parse(contacts);
    return parsedContacts.find((contact) => contact.id === contactId);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    const contactsWithoutDeleted = parsedContacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(contactsWithoutDeleted));
    return contactsWithoutDeleted;
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(contacts);
    const contactToAdd = {
      id: v4(),
      name,
      email,
      phone,
    };
    parsedContacts.push(contactToAdd);
    await fs.writeFile(contactsPath, JSON.stringify(parsedContacts));
    return parsedContacts;
  } catch (error) {
    console.log(error);
  }
}

async function updateContact(contactId, updatedContact) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const dataParse = JSON.parse(data);
    const indexContact = await dataParse.findIndex(
      (contact) => contact.id === +contactId
    );
    if (indexContact === -1) {
      return;
    }

    dataParse[indexContact] = {
      ...dataParse[indexContact],
      ...updatedContact,
    };
    await fs.writeFile(contactsPath, JSON.stringify(dataParse));
    return dataParse[indexContact];
  } catch (error) {
    console.log(error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact, updateContact};
