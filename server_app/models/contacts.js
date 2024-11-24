const mongoose = require('mongoose');

// Define the contact schema
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});

// Create and export the contact model
module.exports = mongoose.model('Contact', contactSchema);
