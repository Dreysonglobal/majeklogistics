// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Image Slider Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

// Function to show a specific slide
function showSlide(n) {
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Ensure the slide index is within bounds
    if (n >= slides.length) {
        currentSlide = 0;
    } else if (n < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = n;
    }
    
    // Show the current slide and activate corresponding dot
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Next slide function
function nextSlide() {
    showSlide(currentSlide + 1);
}

// Previous slide function
function prevSlide() {
    showSlide(currentSlide - 1);
}

// Event listeners for next/prev buttons
if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
}

if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
}

// Event listeners for dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Auto slide change (every 5 seconds)
let slideInterval = setInterval(nextSlide, 3000);

// Pause auto slide on hover
const sliderContainer = document.querySelector('.slider-container');
if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 3000);
    });
}

// Populate country dropdowns
function populateCountries() {
    const countries = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", 
        "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", 
        "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", 
        "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", 
        "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", 
        "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", 
        "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", 
        "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", 
        "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", 
        "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", 
        "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", 
        "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", 
        "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", 
        "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", 
        "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", 
        "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", 
        "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", 
        "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", 
        "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", 
        "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", 
        "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", 
        "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
    ];
    
    const originSelect = document.getElementById('origin');
    const destinationSelect = document.getElementById('destination');
    
    if (originSelect && destinationSelect) {
        // Sort countries alphabetically
        countries.sort();
        
        // Add countries to both dropdowns
        countries.forEach(country => {
            const option1 = document.createElement('option');
            option1.value = country;
            option1.textContent = country;
            originSelect.appendChild(option1);
            
            const option2 = document.createElement('option');
            option2.value = country;
            option2.textContent = country;
            destinationSelect.appendChild(option2);
        });
        
        // Set Nigeria as default for destination
        destinationSelect.value = "Nigeria";
    }
}

// Form submission handler
function handleQuoteFormSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    // Format the message for WhatsApp
    let message = `New Quote Request from Majek Facilities & Logistics Website:\n\n`;
    message += `Name: ${data.name}\n`;
    message += `Email: ${data.email}\n`;
    message += `WhatsApp: ${data.whatsapp}\n`;
    message += `Other Phone: ${data.phone || 'N/A'}\n`;
    message += `Cargo Description: ${data.cargoDescription}\n`;
    message += `Shipping From: ${data.origin}\n`;
    message += `Shipping To: ${data.destination}\n`;
    
    // Handle service rate checkboxes
    const serviceRates = formData.getAll('serviceRate');
    message += `Service Rate Request: ${serviceRates.join(', ') || 'Not specified'}\n`;
    
    message += `Cargo Weight: ${data.cargoWeight}\n`;
    message += `Cargo Dimension: ${data.cargoDimension || 'N/A'}\n`;
    message += `Pick Up Address: ${data.pickupAddress || 'N/A'}\n`;
    message += `Delivery Address: ${data.deliveryAddress || 'N/A'}\n`;
    message += `Additional Information: ${data.additionalInfo || 'N/A'}\n`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/2348144463559?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    alert('Your quote request has been submitted! You will be redirected to WhatsApp to send the details.');
    
    // Reset the form
    event.target.reset();
    
    // Set Nigeria as default for destination again
    document.getElementById('destination').value = "Nigeria";
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Populate country dropdowns
    populateCountries();
    
    // Add event listener to quote form
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', handleQuoteFormSubmit);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});