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
    
    // Password strength check
    function checkPasswordStrength(password) {
        const strengthBar = document.getElementById('strength-bar');
        const strengthText = document.getElementById('strength-text');
        
        if (!password) {
            strengthBar.className = '';
            strengthBar.style.width = '0';
            strengthText.textContent = 'Password strength';
            return;
        }
        
        // Check password strength
        let strength = 0;
        
        // Length check
        if (password.length >= 8) strength += 1;
        
        // Uppercase check
        if (/[A-Z]/.test(password)) strength += 1;
        
        // Lowercase check
        if (/[a-z]/.test(password)) strength += 1;
        
        // Number check
        if (/\d/.test(password)) strength += 1;
        
        // Special character check
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        
        // Update strength bar
        strengthBar.className = '';
        strengthText.textContent = '';
        
        if (strength <= 2) {
            strengthBar.classList.add('weak');
            strengthText.textContent = 'Weak';
        } else if (strength <= 4) {
            strengthBar.classList.add('medium');
            strengthText.textContent = 'Medium';
        } else {
            strengthBar.classList.add('strong');
            strengthText.textContent = 'Strong';
        }
    }
    
    // Password validation
    function validatePassword(password) {
        // Password must be at least 8 characters with at least one uppercase, one lowercase, and one number
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return re.test(password);
    }
    
    // Password strength meter
    const newPassword = document.getElementById('new-password');
    if (newPassword) {
        newPassword.addEventListener('input', function() {
            checkPasswordStrength(this.value);
        });
    }
    
    // Reset password form submission
    const resetPasswordForm = document.getElementById('reset-password-form');
    const updatePasswordBtn = document.getElementById('update-password-btn');
    
    if (resetPasswordForm) {
        resetPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const newPassword = document.getElementById('new-password').value;
            const confirmNewPassword = document.getElementById('confirm-new-password').value;
            const passwordMatchError = document.getElementById('password-match-error');
            
            // Reset error message
            passwordMatchError.textContent = '';
            
            // Validate password
            if (!validatePassword(newPassword)) {
                passwordMatchError.textContent = 'Password must be at least 8 characters with uppercase, lowercase, and numbers';
                return;
            }
            
            // Validate password match
            if (newPassword !== confirmNewPassword) {
                passwordMatchError.textContent = 'Passwords do not match';
                return;
            }
            
            // Show loading state
            updatePasswordBtn.classList.add('loading');
            updatePasswordBtn.textContent = 'Updating...';
            
            // Simulate password update
            setTimeout(() => {
                // Reset button state
                updatePasswordBtn.classList.remove('loading');
                updatePasswordBtn.textContent = 'Update Password';
                
                // Show success message
                showToast('Password has been updated successfully', 'success');
                
                // Redirect to login page after 2 seconds
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            }, 1500);
        });
    }
});