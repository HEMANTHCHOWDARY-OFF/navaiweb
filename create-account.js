// Create Account Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const createAccountForm = document.getElementById('createAccountForm');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const termsCheckbox = document.getElementById('terms');

    // Form submission handler
    createAccountForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            fullName: fullNameInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value,
            confirmPassword: confirmPasswordInput.value,
            terms: termsCheckbox.checked
        };

        // Enhanced validation
        const validation = validateCreateAccountForm(formData);
        if (!validation.valid) {
            showNotification(validation.message, 'error');
            if (validation.field) {
                document.getElementById(validation.field).focus();
            }
            return;
        }

        // Simulate account creation process
        handleAccountCreation(formData);
    });

    // Enhanced validation function
    function validateCreateAccountForm(data) {
        if (!data.fullName || !data.email || !data.password || !data.confirmPassword) {
            return {
                valid: false,
                message: 'Please fill in all fields',
                field: !data.fullName ? 'fullName' : !data.email ? 'email' : !data.password ? 'password' : 'confirmPassword'
            };
        }

        if (data.fullName.length < 2) {
            return {
                valid: false,
                message: 'Full name must be at least 2 characters long',
                field: 'fullName'
            };
        }

        if (!isValidEmail(data.email)) {
            return {
                valid: false,
                message: 'Please enter a valid email address',
                field: 'email'
            };
        }

        if (data.password.length < 8) {
            return {
                valid: false,
                message: 'Password must be at least 8 characters long',
                field: 'password'
            };
        }

        if (!isStrongPassword(data.password)) {
            return {
                valid: false,
                message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
                field: 'password'
            };
        }

        if (data.password !== data.confirmPassword) {
            return {
                valid: false,
                message: 'Passwords do not match',
                field: 'confirmPassword'
            };
        }

        if (!data.terms) {
            return {
                valid: false,
                message: 'Please accept the Terms of Service and Privacy Policy',
                field: 'terms'
            };
        }

        return { valid: true };
    }

    // Password strength validation
    function isStrongPassword(password) {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        return hasUpperCase && hasLowerCase && hasNumbers;
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Account creation handler
    async function handleAccountCreation(data) {
        // Show loading state
        const submitBtn = createAccountForm.querySelector('.login-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Creating Account...';
        submitBtn.disabled = true;

        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.fullName,
                    email: data.email,
                    password: data.password,
                    role: 'Job Seeker' // Default role
                }),
            });

            const result = await response.json();

            if (response.ok) {
                // Show success message
                showNotification('Account created successfully! Welcome to NavAI!', 'success');

                // Store user data and token in localStorage
                localStorage.setItem('navai_user', JSON.stringify(result.user));
                localStorage.setItem('navai_token', result.token);

                // Redirect to React application
                window.location.href = 'http://localhost:3000/'; // Assuming React app runs on 3000
            } else {
                showNotification(result.error || 'Registration failed', 'error');
            }
        } catch (error) {
            console.error('Registration error:', error);
            showNotification('An error occurred during registration', 'error');
        } finally {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    // Social registration handlers (commented out as elements don't exist in HTML)
    /*
    document.querySelector('.google-btn').addEventListener('click', function() {
        showNotification('Google registration functionality would be implemented here', 'info');
        // In a real app, integrate with Google OAuth
    });

    document.querySelector('.phone-btn').addEventListener('click', function() {
        showNotification('Phone number registration functionality would be implemented here', 'info');
        // In a real app, implement phone number authentication
    });
    */

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        // Add notification styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 24px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '1000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            backgroundColor: type === 'success' ? '#10b981' :
                           type === 'error' ? '#ef4444' : '#3b82f6'
        });

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }

    // Add some interactive enhancements
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        // Add focus animations
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            Object.assign(ripple.style, {
                position: 'absolute',
                width: size + 'px',
                height: size + 'px',
                left: x + 'px',
                top: y + 'px',
                background: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '50%',
                transform: 'scale(0)',
                animation: 'ripple 0.6s linear',
                pointerEvents: 'none'
            });

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation to CSS if not already added
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Password confirmation validation
    confirmPasswordInput.addEventListener('input', function() {
        if (this.value !== passwordInput.value) {
            this.style.borderColor = '#ef4444';
        } else {
            this.style.borderColor = '#e2e8f0';
        }
    });

    passwordInput.addEventListener('input', function() {
        if (confirmPasswordInput.value && confirmPasswordInput.value !== this.value) {
            confirmPasswordInput.style.borderColor = '#ef4444';
        } else if (confirmPasswordInput.value) {
            confirmPasswordInput.style.borderColor = '#10b981';
        }
    });
});
