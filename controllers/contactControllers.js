const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
} = require("../services/contacts");

module.exports.getAllContacts = async (req, res, next) => {
    try {
      const contactsList = await listContacts();
      res.status(200).json({ status: 'ok', contactsList });
    } catch (error) {
      next(error);
    }
  };
  
  module.exports.getContact = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const contact = await getContactById(contactId);
      if (!contact) {
        return res.status(404).json({ message: "Not found" });
      }
      return res.status(200).json({ status: 'ok', contact });
    } catch (error) {
      next(error);
    }
  };
  
  module.exports.createContact = async (req, res, next) => {
    try {
      const { name, email, phone } = req.body;
      const createContact = await addContact(name, email, phone);
      if (!name || !email || !phone) {
        return res.status(400).json({ message: "missing required name field" });
      }
      return res.status(201).json({ status: "ok", createContact });
    } catch (error) {
      next(error);
    }
  };
  
  module.exports.deleteContact = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const contactById = await getContactById(contactId);
      if (!contactById) {
        return res.status(404).json({ message: "Not found" });
      }
      await removeContact(contactId);
      return res.status(200).json({ status: "ok", message: "contact deleted" });
    } catch (error) {
      next(error);
    }
  };
  
  module.exports.patchContact = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      if (!Object.keys(req.body).length) {
        return res.status(400).json({ message: "missing fields" });
      }
      const updatedContact = await updateContact(contactId, req.body);
      if (!updatedContact) {
        return res.status(404).json({ message: "Not found" });
      }
      return res.status(200).json({ status: "ok", updatedContact });
    } catch (error) {
      next(error);
    }
  };