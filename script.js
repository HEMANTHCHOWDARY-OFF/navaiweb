// Login Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Form submission handler
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            email: emailInput.value.trim(),
            password: passwordInput.value
        };

        // Enhanced validation
        const validation = validateLoginForm(formData);
        if (!validation.valid) {
            showNotification(validation.message, 'error');
            if (validation.field) {
                document.getElementById(validation.field).focus();
            }
            return;
        }

        // Simulate login process
        handleLogin(formData);
    });

    // Enhanced validation function
    function validateLoginForm(data) {
        if (!data.email || !data.password) {
            return {
                valid: false,
                message: 'Please fill in all fields',
                field: !data.email ? 'email' : 'password'
            };
        }

        if (!isValidEmail(data.email)) {
            return {
                valid: false,
                message: 'Please enter a valid email address',
                field: 'email'
            };
        }

        if (data.password.length < 6) {
            return {
                valid: false,
                message: 'Password must be at least 6 characters long',
                field: 'password'
            };
        }

        return { valid: true };
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Login handler
    function handleLogin(data) {
        // Show loading state
        const submitBtn = loginForm.querySelector('.login-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Logging in...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // Show success message
            showNotification('Login successful! Redirecting...', 'success');

            // Redirect to main documentation page
            window.location.href = 'main.html';
        }, 2000);
    }

    // Social login handlers
    document.querySelector('.google-btn').addEventListener('click', function() {
        showNotification('Google login functionality would be implemented here', 'info');
        // In a real app, integrate with Google OAuth
    });

    document.querySelector('.phone-btn').addEventListener('click', function() {
        showNotification('Phone number login functionality would be implemented here', 'info');
        // In a real app, implement phone number authentication
    });

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
});
