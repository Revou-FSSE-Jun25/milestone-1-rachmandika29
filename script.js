// Dynamic CSS Injection for Hamburger Animation
function injectHamburgerStyles() {
    // Check if styles are already injected to avoid duplicates
    if (document.getElementById('hamburger-animation-styles')) {
        return;
    }

    // Create style element
    const styleElement = document.createElement('style');
    styleElement.id = 'hamburger-animation-styles';
    styleElement.type = 'text/css';
    
    // Define CSS rules for hamburger animation
    const cssRules = `
        /* Hamburger X transformation */
        .hamburger.active .hamburger-line:nth-child(1) {
            transform: rotate(45deg) translate(3px, 3px);
        }
        
        .hamburger.active .hamburger-line:nth-child(2) {
            opacity: 0;
            transform: scale(0);
        }
        
        .hamburger.active .hamburger-line:nth-child(3) {
            transform: rotate(-45deg) translate(3px, -3px);
        }
        
        /* Ensure proper gap removal and containment when active */
        .hamburger.active {
            gap: 0;
        }
        
        /* Ensure X stays within hamburger container bounds */
        .hamburger.active .hamburger-line {
            transform-origin: center;
        }
        
        /* Smooth transition for all transformations */
        .hamburger .hamburger-line {
            transition: all 0.3s ease;
        }
        
        /* Additional styling for better visual containment */
        .hamburger {
            border-radius: 6px;
            background-color: rgba(0, 0, 0, 0.1);
        }
        
        .hamburger:hover {
            background-color: rgba(0, 0, 0, 0.2);
        }
    `;
    
    // Add CSS rules to style element
    styleElement.textContent = cssRules;
    
    // Inject into document head
    document.head.appendChild(styleElement);
}

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

// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Inject hamburger animation styles
    injectHamburgerStyles();
    
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    let isMenuOpen = false;

    // Function to check if we're on mobile
    function isMobile() {
        return window.innerWidth < 768; // md breakpoint is 768px
    }

    // Function to reset menu state for desktop
    function resetMenuForDesktop() {
        if (!isMobile()) {
            // Remove inline styles that might interfere with Tailwind classes
            navLinks.style.right = '';
            hamburger.classList.remove('active');
            isMenuOpen = false;
        }
    }

    // Function to toggle mobile menu
    function toggleMobileMenu() {
        if (isMobile()) {
            isMenuOpen = !isMenuOpen;
            hamburger.classList.toggle('active');
            
            if (isMenuOpen) {
                navLinks.style.right = '0px';
            } else {
                navLinks.style.right = '-100%';
            }
        }
    }

    // Function to close mobile menu
    function closeMobileMenu() {
        if (isMobile() && isMenuOpen) {
            isMenuOpen = false;
            hamburger.classList.remove('active');
            navLinks.style.right = '-100%';
        }
    }

    // Hamburger click event
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', toggleMobileMenu);

        // Close menu when clicking nav links (only on mobile)
        navLinksItems.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            resetMenuForDesktop();
        });

        // Initial setup
        resetMenuForDesktop();
    }
});