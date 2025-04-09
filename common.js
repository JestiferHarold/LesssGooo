/**
 * Common JavaScript functionality for Lesss Gooo application
 * This file contains shared functions used across all pages
 */

// User data management
const UserManager = {
    // Get user data from sessionStorage
    getUserData: function() {
        const userData = sessionStorage.getItem('userData');
        return userData ? JSON.parse(userData) : this.getDefaultUserData();
    },
    
    // Save user data to sessionStorage
    saveUserData: function(userData) {
        sessionStorage.setItem('userData', JSON.stringify(userData));
    },
    
    // Get default user data
    getDefaultUserData: function() {
        return {
            name: 'User Name',
            email: 'user@example.com',
            phone: '',
            location: '',
            profileImage: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
            preferences: {
                travelStyle: 'comfort',
                currency: 'inr',
                language: 'en',
                notifications: {
                    email: true,
                    sms: false,
                    push: true
                }
            },
            trips: [],
            bookings: [],
            isLoggedIn: false
        };
    },
    
    // Update user profile
    updateProfile: function(profileData) {
        const userData = this.getUserData();
        userData.name = profileData.name || userData.name;
        userData.email = profileData.email || userData.email;
        userData.phone = profileData.phone || userData.phone;
        userData.location = profileData.location || userData.location;
        this.saveUserData(userData);
        return userData;
    },
    
    // Update user preferences
    updatePreferences: function(preferences) {
        const userData = this.getUserData();
        userData.preferences = { ...userData.preferences, ...preferences };
        this.saveUserData(userData);
        return userData;
    },
    
    // Update profile image
    updateProfileImage: function(imageUrl) {
        const userData = this.getUserData();
        userData.profileImage = imageUrl;
        this.saveUserData(userData);
        return userData;
    }
};

// Authentication management
const AuthManager = {
    // Check if user is logged in
    isLoggedIn: function() {
        const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
        return userData.isLoggedIn === true;
    },
    
    // Login user
    login: function(email, password) {
        // In a real app, this would validate against a server
        // For demo purposes, we'll just set a flag
        const userData = {
            isLoggedIn: true,
            email: email,
            name: email.split('@')[0],
            itineraries: []
        };
        sessionStorage.setItem('userData', JSON.stringify(userData));
        return true;
    },
    
    // Logout user
    logout: function() {
        const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
        userData.isLoggedIn = false;
        sessionStorage.setItem('userData', JSON.stringify(userData));
        window.location.href = 'index.html';
    },
    
    // Check authentication and redirect if not logged in
    checkAuth: function() {
        if (!this.isLoggedIn() && !window.location.href.includes('index.html') && 
            !window.location.href.includes('login.html') && 
            !window.location.href.includes('forgot-password.html') && 
            !window.location.href.includes('reset-password.html')) {
            window.location.href = 'login.html';
        }
    }
};

// UI Utilities
const UIUtils = {
    // Show toast notification
    showToast: function(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    },
    
    // Show modal
    showModal: function(title, content, actions = []) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>${title}</h2>
                <div class="modal-body">
                    ${content}
                </div>
                <div class="modal-actions">
                    ${actions.map(action => `
                        <button class="btn ${action.class || 'btn-primary'}" id="${action.id || ''}">
                            ${action.text}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.style.display = 'flex';

        // Close modal functionality
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Add action button handlers
        actions.forEach(action => {
            if (action.id && action.handler) {
                const button = modal.querySelector(`#${action.id}`);
                if (button) {
                    button.addEventListener('click', action.handler);
                }
            }
        });

        return modal;
    },
    
    // Format date
    formatDate: function(dateString) {
        if (!dateString) return 'Not specified';
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    },
    
    // Format currency
    formatCurrency: function(amount, currency = 'INR') {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: currency.toUpperCase()
        }).format(amount);
    }
};

// Trip management
const TripManager = {
    // Get all trips
    getTrips: function() {
        const userData = UserManager.getUserData();
        return userData.trips || [];
    },
    
    // Add a new trip
    addTrip: function(tripData) {
        const userData = UserManager.getUserData();
        if (!userData.trips) userData.trips = [];
        
        const newTrip = {
            id: 'TR' + Date.now(),
            createdAt: new Date().toISOString(),
            ...tripData
        };
        
        userData.trips.push(newTrip);
        UserManager.saveUserData(userData);
        return newTrip;
    },
    
    // Update a trip
    updateTrip: function(tripId, tripData) {
        const userData = UserManager.getUserData();
        if (!userData.trips) return null;
        
        const tripIndex = userData.trips.findIndex(trip => trip.id === tripId);
        if (tripIndex === -1) return null;
        
        userData.trips[tripIndex] = { ...userData.trips[tripIndex], ...tripData };
        UserManager.saveUserData(userData);
        return userData.trips[tripIndex];
    },
    
    // Delete a trip
    deleteTrip: function(tripId) {
        const userData = UserManager.getUserData();
        if (!userData.trips) return false;
        
        const tripIndex = userData.trips.findIndex(trip => trip.id === tripId);
        if (tripIndex === -1) return false;
        
        userData.trips.splice(tripIndex, 1);
        UserManager.saveUserData(userData);
        return true;
    }
};

// Booking management
const BookingManager = {
    // Get all bookings
    getBookings: function() {
        const userData = UserManager.getUserData();
        return userData.bookings || [];
    },
    
    // Add a new booking
    addBooking: function(bookingData) {
        const userData = UserManager.getUserData();
        if (!userData.bookings) userData.bookings = [];
        
        const newBooking = {
            id: 'BK' + Date.now(),
            createdAt: new Date().toISOString(),
            status: 'confirmed',
            ...bookingData
        };
        
        userData.bookings.push(newBooking);
        UserManager.saveUserData(userData);
        return newBooking;
    },
    
    // Update a booking
    updateBooking: function(bookingId, bookingData) {
        const userData = UserManager.getUserData();
        if (!userData.bookings) return null;
        
        const bookingIndex = userData.bookings.findIndex(booking => booking.id === bookingId);
        if (bookingIndex === -1) return null;
        
        userData.bookings[bookingIndex] = { ...userData.bookings[bookingIndex], ...bookingData };
        UserManager.saveUserData(userData);
        return userData.bookings[bookingIndex];
    },
    
    // Cancel a booking
    cancelBooking: function(bookingId) {
        return this.updateBooking(bookingId, { status: 'cancelled' });
    }
};

// Initialize common functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    AuthManager.checkAuth();
    
    // Load user data into header
    const userData = UserManager.getUserData();
    const userNameElements = document.querySelectorAll('#user-name');
    const userAvatarElements = document.querySelectorAll('#user-avatar');
    
    userNameElements.forEach(element => {
        element.textContent = userData.name;
    });
    
    userAvatarElements.forEach(element => {
        element.src = userData.profileImage;
    });
    
    // Setup logout buttons
    const logoutButtons = document.querySelectorAll('#logout-btn, #mobile-logout-btn');
    logoutButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            AuthManager.logout();
        });
    });
    
    // Setup mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
    }
    
    // Setup notification icon
    const notificationIcon = document.querySelector('.notification-icon');
    if (notificationIcon) {
        notificationIcon.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
    
    // Setup mark all as read button
    const markAllReadBtn = document.querySelector('.mark-all-read');
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', function() {
            UIUtils.showToast('All notifications marked as read');
        });
    }
}); 