// Example API endpoint - replace with your actual API endpoint
const apiEndpoint = 'http://localhost:3000/api/contact-list'; // Replace with your API URL

// Fetch contacts from the API
function fetchContacts() {
    fetch(apiEndpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();  // Parse the JSON response
        })
        .then(data => {
            renderContactList(data); // Call render function to display the data
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Function to render the contact list dynamically
function renderContactList(contacts) {
    const contactListTable = document.getElementById("contactList").getElementsByTagName("tbody")[0];
    contactListTable.innerHTML = ""; // Clear existing list

    // Check if contacts data is available
    if (contacts.length === 0) {
        const row = contactListTable.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = 3;
        cell.textContent = "No contacts available.";
    }

    contacts.forEach(contact => {
        let row = contactListTable.insertRow();

        let cell1 = row.insertCell(0);
        cell1.textContent = contact.name;

        let cell2 = row.insertCell(1);
        cell2.textContent = contact.phone;

        let cell3 = row.insertCell(2);
        cell3.innerHTML = `
            <button class="edit" onclick="editContact(${contact.id})">Edit</button>
            <button class="delete" onclick="deleteContact(${contact.id})">Delete</button>
        `;
    });
}


function deleteContact(id) {
    // Make a DELETE request to the backend API
    fetch(`http://localhost:3000/api/contacts/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            // If the request was successful, remove the contact from the table
            alert('Contact deleted successfully');
            // Optionally, you can reload the list after deletion
            fetchContacts(); // Re-fetch contacts after deletion
        } else {
            // If there was an issue with the deletion, display an error
            alert('Failed to delete contact');
        }
    })
    .catch(error => {
        console.error('Error deleting contact:', error);
        alert('There was an error deleting the contact');
    });
}


// Function to edit a contact
function editContact(id) {
    // You would implement edit logic here
    console.log(`Editing contact with ID: ${id}`);
}

// Call fetchContacts when the page loads
document.addEventListener("DOMContentLoaded", function() {
    fetchContacts();
});
