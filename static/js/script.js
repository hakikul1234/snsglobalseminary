// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('nav ul');

  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
      });
    });
  }

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    const header = document.querySelector('header');
    if (!header.contains(event.target)) {
      navMenu.classList.remove('active');
    }
  });
});

// Form Validation
function validateForm(formElement) {
  const form = formElement || document.querySelector('form');
  if (!form) return true;

  let isValid = true;
  const requiredFields = form.querySelectorAll('[required]');

  requiredFields.forEach(field => {
    const errorElement = field.nextElementSibling;
    
    if (!field.value.trim()) {
      field.classList.add('error');
      if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = `${field.labels ? field.labels[0].textContent : 'Field'} is required`;
        errorElement.classList.add('show');
      }
      isValid = false;
    } else {
      field.classList.remove('error');
      if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.classList.remove('show');
      }
    }
  });

  // Email validation
  const emailInput = form.querySelector('input[type="email"]');
  if (emailInput && emailInput.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      emailInput.classList.add('error');
      const errorElement = emailInput.nextElementSibling;
      if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = 'Please enter a valid email address';
        errorElement.classList.add('show');
      }
      isValid = false;
    }
  }

  // Phone validation
  const phoneInputs = form.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach(phone => {
    if (phone.value) {
      const phoneRegex = /^[0-9\-\+\(\)\s]{10,}$/;
      if (!phoneRegex.test(phone.value)) {
        phone.classList.add('error');
        const errorElement = phone.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
          errorElement.textContent = 'Please enter a valid phone number';
          errorElement.classList.add('show');
        }
        isValid = false;
      }
    }
  });

  return isValid;
}

// Handle Admission Form Submission
function handleAdmissionSubmit(event) {
  event.preventDefault();

  if (!validateForm(event.target)) {
    console.log("[v0] Form validation failed");
    return;
  }

  const formData = {
    name: document.querySelector('input[name="name"]').value,
    dateOfBirth: document.querySelector('input[name="dateOfBirth"]').value,
    classApplying: document.querySelector('select[name="classApplying"]').value,
    phone: document.querySelector('input[name="phone"]').value,
    email: document.querySelector('input[name="email"]').value,
    address: document.querySelector('textarea[name="address"]').value,
    parentName: document.querySelector('input[name="parentName"]').value,
    parentPhone: document.querySelector('input[name="parentPhone"]').value
  };

  const submitButton = event.target.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = 'Submitting...';

  fetch('/api/submit-admission', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(data => {
        throw new Error(data.error || 'Failed to submit form');
      });
    }
    return response.json();
  })
  .then(data => {
    console.log("[v0] Form submitted successfully:", data);
    const successMessage = document.querySelector('.success-message');
    if (successMessage) {
      successMessage.textContent = 'Your admission form has been submitted successfully! We will contact you soon.';
      successMessage.classList.add('show');
    }
    event.target.reset();
    setTimeout(() => {
      if (successMessage) {
        successMessage.classList.remove('show');
      }
    }, 5000);
  })
  .catch(error => {
    console.log("[v0] Error submitting form:", error);
    alert('Error submitting form: ' + error.message);
  })
  .finally(() => {
    submitButton.disabled = false;
    submitButton.textContent = 'Submit Application';
  });
}

// Add real-time validation on input
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', handleAdmissionSubmit);

    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        if (this.value.trim()) {
          this.classList.remove('error');
          const errorElement = this.nextElementSibling;
          if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.classList.remove('show');
          }
        }
      });
    });
  }
});
