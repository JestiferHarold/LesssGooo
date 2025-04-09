document.addEventListener('DOMContentLoaded', function() {
    // Toast notification function
    function showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type}`;
        toast.classList.add('show');
        
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
    
    // Form validation functions
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function validatePassword(password) {
        // Password must be at least 8 characters with at least one uppercase, one lowercase, and one number
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return re.test(password);
    }
    
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
    
    // Tab switching functionality
    const tabs = document.querySelectorAll('.tab');
    const switchTabLinks = document.querySelectorAll('.switch-tab');
    
    function switchTab(tabId) {
        // Hide all tab panes
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        
        // Deactivate all tabs
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Activate the selected tab and pane
        document.getElementById(tabId).classList.add('active');
        document.querySelector(`.tab[data-tab="${tabId}"]`).classList.add('active');
    }
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
    
    switchTabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
    
    // Password strength meter
    const signupPassword = document.getElementById('signup-password');
    if (signupPassword) {
        signupPassword.addEventListener('input', function() {
            checkPasswordStrength(this.value);
        });
    }
    
    // Login form submission
    const loginForm = document.getElementById('login-form');
    const loginBtn = document.getElementById('login-btn');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('remember-me').checked;
            
            // Reset error messages
            document.getElementById('email-error').textContent = '';
            document.getElementById('password-error').textContent = '';
            
            // Validate email
            if (!validateEmail(email)) {
                document.getElementById('email-error').textContent = 'Please enter a valid email address';
                return;
            }
            
            // Validate password (simple check for demo)
            if (password.length < 6) {
                document.getElementById('password-error').textContent = 'Password must be at least 6 characters';
                return;
            }
            
            // Show loading state
            loginBtn.classList.add('loading');
            loginBtn.textContent = 'Logging in...';
            
            // If remember me is checked, store email in localStorage
            if (rememberMe) {
                localStorage.setItem('rememberedEmail', email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }
            
            // Simulate login process
            setTimeout(() => {
                // Store user data in session storage
                const userData = {
                    email: email,
                    name: 'John Doe', // This would come from the server in a real app
                    isLoggedIn: true
                };
                
                sessionStorage.setItem('userData', JSON.stringify(userData));
                
                // Reset button state
                loginBtn.classList.remove('loading');
                loginBtn.textContent = 'Login';
                
                // Show success message
                showToast('Login successful! Redirecting...', 'success');
                
                // Redirect to dashboard
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            }, 1500);
        });
        
        // Check if there's a remembered email
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        if (rememberedEmail) {
            document.getElementById('email').value = rememberedEmail;
            document.getElementById('remember-me').checked = true;
        }
    }
    
    // Signup form submission
    const signupForm = document.getElementById('signup-form');
    const signupBtn = document.getElementById('signup-btn');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const termsAccepted = document.getElementById('terms').checked;
            
            // Reset error messages
            document.getElementById('first-name-error').textContent = '';
            document.getElementById('last-name-error').textContent = '';
            document.getElementById('signup-email-error').textContent = '';
            document.getElementById('signup-password-error').textContent = '';
            document.getElementById('confirm-password-error').textContent = '';
            document.getElementById('terms-error').textContent = '';
            
            // Validate first name
            if (!firstName) {
                document.getElementById('first-name-error').textContent = 'First name is required';
                return;
            }
            
            // Validate last name
            if (!lastName) {
                document.getElementById('last-name-error').textContent = 'Last name is required';
                return;
            }
            
            // Validate email
            if (!validateEmail(email)) {
                document.getElementById('signup-email-error').textContent = 'Please enter a valid email address';
                return;
            }
            
            // Validate password
            if (!validatePassword(password)) {
                document.getElementById('signup-password-error').textContent = 'Password must be at least 8 characters with uppercase, lowercase, and numbers';
                return;
            }
            
            // Validate password match
            if (password !== confirmPassword) {
                document.getElementById('confirm-password-error').textContent = 'Passwords do not match';
                return;
            }
            
            // Validate terms acceptance
            if (!termsAccepted) {
                document.getElementById('terms-error').textContent = 'You must accept the terms and conditions';
                return;
            }
            
            // Show loading state
            signupBtn.classList.add('loading');
            signupBtn.textContent = 'Creating account...';
            
            // Simulate signup process
            setTimeout(() => {
                // Store user data in session storage
                const userData = {
                    email: email,
                    name: `${firstName} ${lastName}`,
                    isLoggedIn: true
                };
                
                sessionStorage.setItem('userData', JSON.stringify(userData));
                
                // Reset button state
                signupBtn.classList.remove('loading');
                signupBtn.textContent = 'Create account';
                
                // Show success message
                showToast('Account created successfully! Redirecting...', 'success');
                
                // Redirect to dashboard
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            }, 1500);
        });
    }
    
    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    
    if (socialButtons) {
        socialButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get provider name from class
                const provider = this.classList[1];
                
                // Show toast
                showToast(`${provider} login is not implemented in this demo`, 'info');
            });
        });
    }
});