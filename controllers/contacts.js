//Replace mongodb import and ObejectID with mongoose model
const Contact = require('../models/contact');

const getAll = async (req, res) => {
  //replace with try catch block and mongoose model
  try {
    const contacts = await Contact.find();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  //try and cath block with mongoose model and handle case where the ID is valid but not found in the database
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createContact = async (req, res) => {
  //new document based on mongoose schema with try and catch block
  try {
    const contact = new Contact({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    });
    const result = await contact.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const updateContact = async (req, res) => {
  //try block
  //runValidators: true to ensure that the updated document is validated against the schema
  //catch block to handle errors and send appropriate response
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    const result = await Contact.findByIdAndUpdate(
      req.params.id, contact, 
      { new: true, runValidators: true }
    );
  // be aware of updateOne if you only want to update specific fields
  if (!result) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteContact = async (req, res) => {
  //try and catch block
  try {
    const result = await Contact.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
