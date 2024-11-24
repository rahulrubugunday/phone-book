const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const app = express();
const PORT = 3000;


app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/phonebook', {  // Replace with your MongoDB URI (e.g., MongoDB Atlas URI)
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.error("MongoDB connection error: ", err);
});


const cors = require('cors');
app.use(cors());


const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
  });
  
  
const Contact = mongoose.model('Contact', contactSchema);


app.get('/api/contact-list', async (req, res) => {
try {
    
    const contacts = await Contact.find();
    
    
    res.json(contacts);
} catch (err) {
    
    res.status(500).json({ message: 'Error fetching contacts', error: err });
}
});



app.post('/api/contacts', async (req, res) => {
    const { name, phone } = req.body;  // Assuming you send the data as JSON in the body
    try {
      console.log("HELLOW----")
      const newContact = new Contact({ name, phone });
      await newContact.save();
      res.status(201).json(newContact);
    } catch (err) {
      res.status(400).json({ message: 'Error creating contact', error: err });
    }
  });
  

app.delete('/api/contacts/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const deletedContact = await Contact.findByIdAndDelete(id);
      if (!deletedContact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      res.json({ message: 'Contact deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting contact', error: err });
    }
  });

  

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
