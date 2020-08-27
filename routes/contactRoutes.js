const express = require("express");
const router = express.Router();
const contactControllers = require("../controllers/contactControllers");

router.get('/', contactControllers.getAllContacts);
router.get('/:contactId', contactControllers.getContact);
router.post('/', contactControllers.createContact);
router.delete('/:contactId', contactControllers.deleteContact);
router.patch('/:contactId', contactControllers.patchContact);

module.exports = router;