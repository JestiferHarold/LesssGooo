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
    
    // Check if user is logged in
    function checkAuth() {
        const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
        if (!userData.isLoggedIn) {
            window.location.href = 'login.html';
        } else {
            // Update user name and avatar
            const userNameElement = document.getElementById('user-name');
            if (userNameElement) {
                userNameElement.textContent = userData.name || 'User';
            }
        }
    }
    
    // Call checkAuth on page load
    checkAuth();
    
    // Get itinerary data from session storage
    const itineraryData = JSON.parse(sessionStorage.getItem('itineraryData') || '{}');
    
    // Update itinerary details
    function updateItineraryDetails() {
        // Update destination
        const destinationElement = document.getElementById('itinerary-destination');
        if (destinationElement && itineraryData.destination) {
            destinationElement.textContent = `Your ${itineraryData.destination} Itinerary`;
        }
        
        // Update dates
        const datesElement = document.getElementById('itinerary-dates');
        if (datesElement) {
            if (itineraryData.startDate && itineraryData.endDate) {
                const startDate = new Date(itineraryData.startDate);
                const endDate = new Date(itineraryData.endDate);
                
                const options = { month: 'long', day: 'numeric', year: 'numeric' };
                const formattedStartDate = startDate.toLocaleDateString('en-US', options);
                const formattedEndDate = endDate.toLocaleDateString('en-US', options);
                
                datesElement.textContent = `${formattedStartDate} - ${formattedEndDate} • ${itineraryData.travelers} Travelers`;
            } else {
                datesElement.textContent = `May 15 - May 20, 2025 • ${itineraryData.travelers || '2'} Travelers`;
            }
        }
        
        // Update weather location
        const weatherLocationElement = document.getElementById('weather-location');
        if (weatherLocationElement && itineraryData.destination) {
            weatherLocationElement.textContent = itineraryData.destination;
        }
        
        // Update hotel guests
        const hotelGuestsElement = document.getElementById('hotel-guests');
        if (hotelGuestsElement && itineraryData.travelers) {
            hotelGuestsElement.textContent = `Deluxe Room • ${itineraryData.travelers} Guests`;
        }
        
        // Update check-in and check-out dates
        const checkInElement = document.getElementById('check-in-date');
        const checkOutElement = document.getElementById('check-out-date');
        
        if (checkInElement && checkOutElement) {
            if (itineraryData.startDate && itineraryData.endDate) {
                const startDate = new Date(itineraryData.startDate);
                const endDate = new Date(itineraryData.endDate);
                
                const options = { month: 'long', day: 'numeric', year: 'numeric' };
                const formattedStartDate = startDate.toLocaleDateString('en-US', options);
                const formattedEndDate = endDate.toLocaleDateString('en-US', options);
                
                checkInElement.textContent = `Check-in: ${formattedStartDate} (3:00 PM)`;
                checkOutElement.textContent = `Check-out: ${formattedEndDate} (12:00 PM)`;
            } else {
                checkInElement.textContent = 'Check-in: May 15, 2025 (3:00 PM)';
                checkOutElement.textContent = 'Check-out: May 20, 2025 (12:00 PM)';
            }
        }
        
        // Update day dates
        if (itineraryData.startDate) {
            const startDate = new Date(itineraryData.startDate);
            
            for (let i = 1; i <= 5; i++) {
                const dayDateElement = document.getElementById(`day${i}-date`);
                if (dayDateElement) {
                    const dayDate = new Date(startDate);
                    dayDate.setDate(startDate.getDate() + i - 1);
                    
                    const options = { month: 'long', day: 'numeric', year: 'numeric' };
                    const formattedDate = dayDate.toLocaleDateString('en-US', options);
                    
                    dayDateElement.textContent = formattedDate;
                }
            }
        }
        
        // Generate day tabs based on number of days
        if (itineraryData.days) {
            const dayTabs = document.getElementById('day-tabs');
            if (dayTabs) {
                // Clear existing tabs
                dayTabs.innerHTML = '';
                
                // Create new tabs based on number of days
                for (let i = 1; i <= itineraryData.days; i++) {
                    const tab = document.createElement('div');
                    tab.className = i === 1 ? 'tab active' : 'tab';
                    tab.setAttribute('data-tab', `day${i}`);
                    tab.textContent = `Day ${i}`;
                    
                    tab.addEventListener('click', function() {
                        const tabId = this.getAttribute('data-tab');
                        switchDayTab(tabId);
                    });
                    
                    dayTabs.appendChild(tab);
                }
            }
        }
    }
    
    // Call updateItineraryDetails on page load
    updateItineraryDetails();
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = this.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }
    
    // Tab switching functionality for day tabs
    const dayTabs = document.querySelectorAll('.tab');
    
    function switchDayTab(tabId) {
        // Hide all tab panes
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        
        // Deactivate all tabs
        dayTabs.forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Activate the selected tab and pane
        document.getElementById(tabId).classList.add('active');
        document.querySelector(`.tab[data-tab="${tabId}"]`).classList.add('active');
    }
    
    dayTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchDayTab(tabId);
        });
    });
    
    // Set alarm functionality
    const setAlarmBtn = document.getElementById('set-alarm-btn');
    
    if (setAlarmBtn) {
        setAlarmBtn.addEventListener('click', function() {
            // In a real app, this would set an actual alarm or notification
            this.innerHTML = '<i class="fas fa-check"></i> Alarm Set';
            this.classList.add('btn-success');
            this.classList.remove('btn-outline');
            this.disabled = true;
            showToast('Morning alarm has been set for 7:00 AM', 'success');
        });
    }
    
    // Book transport functionality
    const bookTransportBtn = document.getElementById('book-transport-btn');
    const transportBookBtns = document.querySelectorAll('.transport-option button, .timeline-actions button');
    
    if (bookTransportBtn) {
        bookTransportBtn.addEventListener('click', function() {
            // In a real app, this would navigate to the booking page or open a modal
            showToast('Opening transport booking options...', 'info');
            
            // Scroll to transport options
            const transportCard = document.querySelector('.transport-options').closest('.card');
            if (transportCard) {
                transportCard.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    transportBookBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const transportType = this.closest('.transport-option') ? 
                this.closest('.transport-option').querySelector('h3').textContent :
                this.textContent;
                
            showToast(`Booking ${transportType}...`, 'info');
            
            // Simulate booking process
            this.classList.add('loading');
            this.disabled = true;
            
            setTimeout(() => {
                this.classList.remove('loading');
                this.classList.add('btn-success');
                this.textContent = 'Booked';
                this.disabled = true;
                
                showToast(`${transportType} booked successfully!`, 'success');
            }, 1500);
        });
    });
    
    // Modify itinerary functionality
    const modifyItineraryBtn = document.getElementById('modify-itinerary-btn');
    
    if (modifyItineraryBtn) {
        modifyItineraryBtn.addEventListener('click', function() {
            showToast('Opening itinerary modification options...', 'info');
            
            // In a real app, this would navigate to the edit page or open a modal
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        });
    }
    
    // Notification functionality
    const markAllReadBtn = document.querySelector('.mark-all-read');
    const notificationItems = document.querySelectorAll('.notification-item');
    
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', function() {
            notificationItems.forEach(item => {
                item.classList.remove('unread');
            });
            
            // Remove the notification badge
            const badge = document.querySelector('.notification-badge');
            if (badge) {
                badge.style.display = 'none';
            }
            
            showToast('All notifications marked as read', 'success');
        });
    }
    
    // Logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    const mobileLogoutBtn = document.getElementById('mobile-logout-btn');
    
    function logout() {
        // Clear user data from session storage
        sessionStorage.removeItem('userData');
        
        // Show toast
        showToast('Logging out...', 'info');
        
        // Redirect to login page
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
    
    if (mobileLogoutBtn) {
        mobileLogoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
});