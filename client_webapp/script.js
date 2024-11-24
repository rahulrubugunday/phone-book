// Function to add a contact through API
async function addContact(name, phone) {
    try {
        const response = await fetch('http://localhost:3000/api/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, phone })
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Contact saved successfully:', data.contact);
            alert('Contact saved successfully!');
        } else {
            console.error('Error:', data.error);
            alert('Failed to save contact');
        }
    } catch (error) {
        console.error('Error making API request:', error);
        alert('Error occurred while adding contact');
    }
}

// Event listener for form submission
document.getElementById("phoneBookForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent the default form submission

    // Get the input values
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;

    // Call the addContact function to send the data to the API
    addContact(name, phone);

    // Clear the form inputs after submission
    document.getElementById("name").value = '';
    document.getElementById("phone").value = '';
});
