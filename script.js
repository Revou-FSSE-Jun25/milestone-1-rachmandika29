// Contact Form SMTP Integration

// Function to show notification
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = 'notification ' + type;
    
    // Show the notification
    notification.style.display = 'block';
    
    // Hide the notification after 3 seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Initialize EmailJS with your public key
document.addEventListener('DOMContentLoaded', function() {
    emailjs.init('OI8UDNNBnIYXpLeXV');

    // Handle form submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Prevent the default form submission

            try {
                // Show loading notification
                showNotification('Sending message...', 'info');

                // Get form data
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const message = document.getElementById('message').value;

                // Validate inputs
                if (!name || !email || !message) {
                    throw new Error('Please fill in all fields');
                }

                // Create template parameters
                const templateParams = {
                    from_name: name,
                    from_email: email,
                    message: message,
                    to_name: 'Rachmandika'
                };

                // Email connection to SMTP server and EmailJS
                const response = await emailjs.send('service_r9lbe1b', 'template_rkda3f5', templateParams);
                
                if (response.status === 200) {
                    showNotification('Message sent successfully!', 'success');
                    contactForm.reset();
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                console.error('Error:', error);
                showNotification(error.message || 'Failed to send message. Please try again.', 'error');
            }
        });
    }
});

    // Function to show notification
    function showNotification(message, type) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = 'notification ' + type;
        
        // Show the notification
        notification.style.display = 'block';
        
        // Hide the notification after 3 seconds
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }
