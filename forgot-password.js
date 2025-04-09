document.addEventListener('DOMContentLoaded', function() {
    // Toast notification function
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            
            // Remove from DOM after animation
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
    
    // Form validation functions
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Forgot password form submission
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    const resetBtn = document.getElementById('reset-btn');
    
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = document.getElementById('email').value;
            
            // Validate email
            if (!validateEmail(email)) {
                showToast('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            resetBtn.classList.add('loading');
            resetBtn.textContent = 'Sending...';
            
            // Simulate sending reset link
            setTimeout(() => {
                // Reset button state
                resetBtn.classList.remove('loading');
                resetBtn.textContent = 'Send Reset Link';
                
                // Show success message
                showToast('Password reset link has been sent to your email', 'success');
                
                // Clear form
                forgotPasswordForm.reset();
                
                // Redirect to login page after 3 seconds
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 3000);
            }, 1500);
        });
    }
});