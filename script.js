document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Initialize Date Picker
    if (document.querySelector('.datepicker')) {
        flatpickr('.datepicker', {
            dateFormat: 'Y-m-d',
            minDate: 'today',
            disableMobile: false,
            theme: 'dark',
        });
    }
    
    // Initialize Time Picker
    if (document.querySelector('.timepicker')) {
        flatpickr('.timepicker', {
            enableTime: true,
            noCalendar: true,
            dateFormat: 'H:i',
            minTime: '17:00',
            maxTime: '22:00',
            disableMobile: false,
            theme: 'dark',
        });
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // Booking Form Validation and WhatsApp Integration
    const bookingForm = document.getElementById('booking-form');
    const successModal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const partySize = document.getElementById('party-size').value;
            const requests = document.getElementById('special-requests').value.trim();
            
            // Simple validation
            if (!name || !phone || !email || !date || !time || !partySize) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Check for large party size (10+ people)
            if (partySize === '9+') {
                const callDirectly = confirm('For parties of 10 or more people, we recommend calling us directly at +1 (212) 555-1234 for better coordination.\n\n૧૦ થી વધારે વ્યક્તિઓ માટે, અમે સીધા +1 (212) 555-1234 પર કૉલ કરવાની સલાહ આપીએ છીએ.\n\nWould you still like to proceed with the WhatsApp booking?');
                if (!callDirectly) {
                    return;
                }
            }
            
            // Format date for WhatsApp message
            const formattedDate = new Date(date);
            const dateOptions = { day: 'numeric', month: 'short', year: 'numeric' };
            const formattedDateStr = formattedDate.toLocaleDateString('en-US', dateOptions);
            
            // Create WhatsApp message with English and Gujarati
            const message = encodeURIComponent(
                `🍽️ New Booking Request:\n` +
                `Name: ${name}\n` +
                `Phone: ${phone}\n` +
                `Email: ${email}\n` +
                `Date: ${formattedDateStr}\n` +
                `Time: ${time}\n` +
                `Party Size: ${partySize}\n` +
                `Requests: ${requests || 'None'}\n\n` +
                `🍽️ નવી બુકિંગ વિનંતી:\n` +
                `નામ: ${name}\n` +
                `ફોન: ${phone}\n` +
                `ઈમેલ: ${email}\n` +
                `તારીખ: ${formattedDateStr}\n` +
                `સમય: ${time}\n` +
                `વ્યક્તિઓની સંખ્યા: ${partySize}\n` +
                `વિશેષ વિનંતીઓ: ${requests || 'કોઈ નહીં'}`
            );
            
            // WhatsApp number (replace with your restaurant's number)
            const whatsappNumber = '917623977045';
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
            
            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank');
            
            // Show success modal
            if (successModal) {
                successModal.classList.remove('hidden');
            }
            
            // Reset form
            bookingForm.reset();
        });
    }
    
    // Close success modal
    if (closeModalBtn && successModal) {
        closeModalBtn.addEventListener('click', function() {
            successModal.classList.add('hidden');
        });
    }
    
    // Floating WhatsApp Button
    const whatsappBtn = document.getElementById('whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            const whatsappNumber = '917623977045';
            window.open(`https://wa.me/${whatsappNumber}`, '_blank');
        });
    }
    
    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const revealTop = element.getBoundingClientRect().top;
            
            if (revealTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', checkReveal);
    window.addEventListener('load', checkReveal);
});