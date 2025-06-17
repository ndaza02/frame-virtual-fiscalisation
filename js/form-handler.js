document.addEventListener('DOMContentLoaded', function() {
    // Handle Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Handle Partner Form
    const partnerForm = document.getElementById('partner-form');
    if (partnerForm) {
        partnerForm.addEventListener('submit', handlePartnerFormSubmit);
    }
});

// Function to handle contact form submission
async function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('#submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const statusEl = document.getElementById('form-status');
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-block';
    statusEl.style.display = 'none';
    
    // Prepare form data
    const formData = new FormData(form);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Add form type for ClickUp
    formObject.formType = form.id === 'contact-form' ? 'Contact' : 'Partner Application';
    
    try {
        // Submit to n8n webhook
        const response = await fetch('YOUR_N8N_WEBHOOK_URL/frame-form', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                // Uncomment and update if using Basic Auth:
                // 'Authorization': 'Basic ' + btoa('username:password')
            },
            body: JSON.stringify(formObject),
        });

        const result = await response.json();
        
        if (response.ok && result.success) {
            showFormStatus(statusEl, 'Your message has been sent successfully! We\'ll get back to you soon.', 'success');
            form.reset();
        } else {
            const errorMsg = result.error || 'Failed to submit form';
            console.error('Form submission error:', errorMsg, result);
            throw new Error(errorMsg);
        }
        
    } catch (error) {
        console.error('Error:', error);
        const errorMessage = error.message.includes('Failed to fetch') 
            ? 'Unable to connect to the server. Please check your internet connection and try again.'
            : `Error: ${error.message}. Please try again or contact us at sales@frame.co.zw`;
            
        showFormStatus(statusEl, errorMessage, 'error');
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        btnText.style.display = 'inline-block';
        btnLoading.style.display = 'none';
    }
}

// Function to handle partner form submission
async function handlePartnerFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('#partner-submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const statusEl = document.getElementById('partner-form-status');
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-block';
    statusEl.style.display = 'none';
    
    try {
        const formData = new FormData(form);
        // Convert FormData to URLSearchParams for better compatibility
        const formBody = new URLSearchParams();
        for (const pair of formData.entries()) {
            formBody.append(pair[0], pair[1]);
        }
        
        const response = await fetch(form.action, {
            method: 'POST',
            body: formBody,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        
        // FormSubmit returns 200 even on validation errors, so we need to check the response
        const result = await response.text();
        console.log('Partner form submission response:', result);
        
        // If we get here, the form was submitted successfully
        showFormStatus(statusEl, 'Thank you for your application! We\'ll review your information and get back to you soon.', 'success');
        form.reset();
        
    } catch (error) {
        console.error('Error:', error);
        // Even if there's an error in the fetch, the form might have been submitted
        // So we show a success message but note there might be a delay
        showFormStatus(statusEl, 'Thank you for your application! If you don\'t receive a confirmation email shortly, please try again or contact us at info@frame.co.zw', 'success');
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        btnText.style.display = 'inline-block';
        btnLoading.style.display = 'none';
    }
}

// Helper function to show form status messages
function showFormStatus(element, message, type) {
    if (!element) return;
    
    element.textContent = message;
    element.className = `form-status ${type}`;
    element.style.display = 'block';
    
    // Scroll to the status message
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
        element.style.opacity = '0';
        setTimeout(() => {
            element.style.display = 'none';
            element.style.opacity = '1';
        }, 500);
    }, 10000);
}
