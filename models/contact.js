//Import mongoose
const mongoose = require('mongoose');
//defines required fields for the contact model
const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "FirstName is required"],
    },
    lastName: {
        type: String,
        required: [true, "LastName is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    favoriteColor: {
        type: String,
        required: [true, "Favorite color is required"]
    },
    birthday: {
        type: Date,
        required: [true, "Birthday is required"]
    }
});
//exports the contact model
module.exports = mongoose.model('Contact', contactSchema);