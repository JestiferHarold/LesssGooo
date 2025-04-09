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
            
            // You could also update the avatar if you have it in userData
            // const userAvatarElement = document.getElementById('user-avatar');
            // if (userAvatarElement && userData.avatar) {
            //     userAvatarElement.src = userData.avatar;
            // }
        }
    }
    
    // Call checkAuth on page load
    checkAuth();
    
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
    
    // Tab switching functionality
    const tabs = document.querySelectorAll('.tab');
    
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
    
    // Range slider functionality
    const budgetSlider = document.getElementById('budget');
    const budgetValue = document.getElementById('budget-value');
    const daysSlider = document.getElementById('days');
    const daysValue = document.getElementById('days-value');
    
    if (budgetSlider && budgetValue) {
        budgetSlider.addEventListener('input', function() {
            budgetValue.textContent = `$${this.value}`;
        });
    }
    
    if (daysSlider && daysValue) {
        daysSlider.addEventListener('input', function() {
            daysValue.textContent = `${this.value} days`;
        });
    }
    
    // Set today's date as the minimum date for all date inputs
    const today = new Date().toISOString().split('T')[0];
    const dateInputs = document.querySelectorAll('input[type="date"]');
    
    dateInputs.forEach(input => {
        input.min = today;
    });
    
    // Itinerary form submission
    const itineraryForm = document.getElementById('itinerary-form');
    const generateBtn = document.getElementById('generate-btn');
    
    if (itineraryForm) {
        itineraryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate required fields
            const destination = document.getElementById('destination').value;
            if (!destination) {
                showToast('Please enter a destination', 'error');
                return;
            }
            
            // Get all form data
            const startingPoint = document.getElementById('starting-point').value;
            const startDate = document.getElementById('start-date').value;
            const endDate = document.getElementById('end-date').value;
            const travelers = document.getElementById('travelers').value;
            const budget = document.getElementById('budget').value;
            const days = document.getElementById('days').value;
            const preferences = document.getElementById('preferences').value;
            
            // Get selected interests
            const interestCheckboxes = document.querySelectorAll('input[name="interests"]:checked');
            const interests = Array.from(interestCheckboxes).map(checkbox => checkbox.value);
            
            // Validate dates
            if (startDate && endDate) {
                const start = new Date(startDate);
                const end = new Date(endDate);
                
                if (end < start) {
                    showToast('End date cannot be before start date', 'error');
                    return;
                }
            }
            
            // Store form data in session storage for use in itinerary page
            const itineraryData = {
                startingPoint,
                destination,
                startDate,
                endDate,
                travelers,
                budget,
                days,
                preferences,
                interests
            };
            
            sessionStorage.setItem('itineraryData', JSON.stringify(itineraryData));
            
            // Show loading state
            generateBtn.classList.add('loading');
            generateBtn.innerHTML = 'Generating your itinerary...';
            
            // Simulate AI processing
            setTimeout(() => {
                // Reset button state
                generateBtn.classList.remove('loading');
                generateBtn.innerHTML = 'Generate Itinerary <i class="fas fa-arrow-right"></i>';
                
                // Show success message
                showToast('Itinerary generated successfully!', 'success');
                
                // Redirect to itinerary page
                setTimeout(() => {
                    window.location.href = 'itinerary.html';
                }, 1000);
            }, 2000);
        });
    }
    
    // Flight form submission
    const flightForm = document.getElementById('flight-form');
    if (flightForm) {
        flightForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate required fields
            const from = document.getElementById('flight-from').value;
            const to = document.getElementById('flight-to').value;
            const departureDate = document.getElementById('departure-date').value;
            
            if (!from || !to || !departureDate) {
                showToast('Please fill in all required fields', 'error');
                return;
            }
            
            showToast('Searching for flights...', 'info');
            
            // In a real app, this would make an API call to search for flights
            setTimeout(() => {
                showToast('Flight search functionality would be implemented here', 'success');
            }, 1500);
        });
    }
    
    // Train & Bus form submission
    const trainBusForm = document.getElementById('train-bus-form');
    if (trainBusForm) {
        trainBusForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate required fields
            const from = document.getElementById('transport-from').value;
            const to = document.getElementById('transport-to').value;
            const date = document.getElementById('transport-date').value;
            
            if (!from || !to || !date) {
                showToast('Please fill in all required fields', 'error');
                return;
            }
            
            showToast('Searching for tickets...', 'info');
            
            // In a real app, this would make an API call to search for train/bus tickets
            setTimeout(() => {
                showToast('Train and bus search functionality would be implemented here', 'success');
            }, 1500);
        });
    }
    
    // Local transport form submission
    const localTransportForm = document.getElementById('local-transport-form');
    if (localTransportForm) {
        localTransportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate required fields
            const pickup = document.getElementById('pickup-location').value;
            const dropoff = document.getElementById('dropoff-location').value;
            const date = document.getElementById('pickup-date').value;
            const time = document.getElementById('pickup-time').value;
            
            if (!pickup || !dropoff || !date || !time) {
                showToast('Please fill in all required fields', 'error');
                return;
            }
            
            showToast('Searching for local transportation...', 'info');
            
            // In a real app, this would make an API call to search for local transportation
            setTimeout(() => {
                showToast('Local transport booking functionality would be implemented here', 'success');
            }, 1500);
        });
    }
    
    // Recent search card buttons
    const viewDetailsButtons = document.querySelectorAll('.search-card-footer .btn-outline');
    const generateAgainButtons = document.querySelectorAll('.search-card-footer .btn-primary');
    
    if (viewDetailsButtons) {
        viewDetailsButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Get the destination from the card
                const card = this.closest('.search-card');
                const destination = card.querySelector('h3').textContent;
                
                showToast(`Viewing details for ${destination}`, 'info');
                
                // In a real app, this would navigate to the itinerary details page
                setTimeout(() => {
                    window.location.href = 'itinerary.html';
                }, 1000);
            });
        });
    }
    
    if (generateAgainButtons) {
        generateAgainButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Get the destination from the card
                const card = this.closest('.search-card');
                const destination = card.querySelector('h3').textContent;
                
                showToast(`Regenerating itinerary for ${destination}`, 'info');
                
                // In a real app, this would regenerate the itinerary
                setTimeout(() => {
                    window.location.href = 'itinerary.html';
                }, 1000);
            });
        });
    }
    
    // Quick action buttons
    const viewSavedBtn = document.getElementById('view-saved-btn');
    const newTripBtn = document.getElementById('new-trip-btn');
    
    if (viewSavedBtn) {
        viewSavedBtn.addEventListener('click', function() {
            showToast('Viewing saved trips', 'info');
            
            // In a real app, this would navigate to the saved trips page
            setTimeout(() => {
                window.location.href = 'itinerary.html';
            }, 1000);
        });
    }
    
    if (newTripBtn) {
        newTripBtn.addEventListener('click', function() {
            // Scroll to the itinerary form
            const itineraryForm = document.getElementById('itinerary-form');
            if (itineraryForm) {
                itineraryForm.scrollIntoView({ behavior: 'smooth' });
            }
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

// Trip Data Management
class TripManager {
    constructor() {
        this.trips = JSON.parse(sessionStorage.getItem('trips')) || [];
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Form submission
        document.getElementById('itinerary-form').addEventListener('submit', (e) => this.handleTripSubmission(e));
        
        // Quick action buttons
        document.getElementById('new-trip-btn').addEventListener('click', () => this.resetForm());
        document.getElementById('view-saved-btn').addEventListener('click', () => this.showSavedTrips());
        
        // Tab switching
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
        });
    }

    handleTripSubmission(e) {
        e.preventDefault();
        
        // Get form data
        const tripData = {
            id: Date.now().toString(),
            startingPoint: document.getElementById('starting-point').value,
            destination: document.getElementById('destination').value,
            startDate: document.getElementById('start-date').value,
            endDate: document.getElementById('end-date').value,
            travelers: document.getElementById('travelers').value,
            budget: document.getElementById('budget').value,
            duration: document.getElementById('days').value,
            style: document.getElementById('preferences').value,
            interests: this.getSelectedInterests(),
            createdAt: new Date().toISOString(),
            status: 'planned'
        };

        // Save trip to sessionStorage
        this.saveTrip(tripData);
        
        // Save trip to user's account in sessionStorage
        this.saveTripToUserAccount(tripData);
        
        // Show success message
        this.showToast('Trip saved successfully!');
        
        // Redirect to My Itineraries page
        setTimeout(() => {
            window.location.href = 'my-itineraries.html';
        }, 1500);
    }

    saveTrip(tripData) {
        this.trips.push(tripData);
        sessionStorage.setItem('trips', JSON.stringify(this.trips));
    }
    
    saveTripToUserAccount(tripData) {
        // Get user data from sessionStorage
        const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
        
        // Initialize itineraries array if it doesn't exist
        if (!userData.itineraries) {
            userData.itineraries = [];
        }
        
        // Add the new itinerary to the user's account
        userData.itineraries.push(tripData);
        
        // Save updated user data back to sessionStorage
        sessionStorage.setItem('userData', JSON.stringify(userData));
    }

    getSelectedInterests() {
        const interests = [];
        document.querySelectorAll('input[name="interests"]:checked').forEach(checkbox => {
            interests.push(checkbox.value);
        });
        return interests;
    }

    resetForm() {
        document.getElementById('itinerary-form').reset();
        document.getElementById('budget-value').textContent = '$1000';
        document.getElementById('days-value').textContent = '5 days';
    }

    showSavedTrips() {
        // Create and show modal with saved trips
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>Saved Trips</h2>
                <div class="saved-trips-list">
                    ${this.trips.map(trip => this.createTripCard(trip)).join('')}
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
    }

    createTripCard(trip) {
        return `
            <div class="trip-card">
                <div class="trip-header">
                    <h3>${trip.destination}</h3>
                    <span class="trip-date">${new Date(trip.startDate).toLocaleDateString()}</span>
                </div>
                <div class="trip-details">
                    <div class="trip-detail">
                        <i class="fas fa-users"></i>
                        <span>${trip.travelers} Travelers</span>
                    </div>
                    <div class="trip-detail">
                        <i class="fas fa-wallet"></i>
                        <span>$${trip.budget} Budget</span>
                    </div>
                    <div class="trip-detail">
                        <i class="fas fa-calendar"></i>
                        <span>${trip.duration} Days</span>
                    </div>
                </div>
                <div class="trip-actions">
                    <button class="btn btn-sm btn-outline" onclick="tripManager.viewTrip('${trip.id}')">View Details</button>
                    <button class="btn btn-sm btn-primary" onclick="tripManager.editTrip('${trip.id}')">Edit</button>
                </div>
            </div>
        `;
    }

    viewTrip(tripId) {
        const trip = this.trips.find(t => t.id === tripId);
        if (trip) {
            // Show trip details in a modal
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h2>Trip Details</h2>
                    <div class="trip-details-view">
                        <div class="detail-group">
                            <label>Destination</label>
                            <p>${trip.destination}</p>
                        </div>
                        <div class="detail-group">
                            <label>Dates</label>
                            <p>${new Date(trip.startDate).toLocaleDateString()} - ${new Date(trip.endDate).toLocaleDateString()}</p>
                        </div>
                        <div class="detail-group">
                            <label>Travelers</label>
                            <p>${trip.travelers}</p>
                        </div>
                        <div class="detail-group">
                            <label>Budget</label>
                            <p>$${trip.budget}</p>
                        </div>
                        <div class="detail-group">
                            <label>Duration</label>
                            <p>${trip.duration} Days</p>
                        </div>
                        <div class="detail-group">
                            <label>Style</label>
                            <p>${trip.style}</p>
                        </div>
                        <div class="detail-group">
                            <label>Interests</label>
                            <div class="interests-tags">
                                ${trip.interests.map(interest => `
                                    <span class="interest-tag">${interest}</span>
                                `).join('')}
                            </div>
                        </div>
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
        }
    }

    editTrip(tripId) {
        const trip = this.trips.find(t => t.id === tripId);
        if (trip) {
            // Populate form with trip data
            document.getElementById('starting-point').value = trip.startingPoint;
            document.getElementById('destination').value = trip.destination;
            document.getElementById('start-date').value = trip.startDate;
            document.getElementById('end-date').value = trip.endDate;
            document.getElementById('travelers').value = trip.travelers;
            document.getElementById('budget').value = trip.budget;
            document.getElementById('days').value = trip.duration;
            document.getElementById('preferences').value = trip.style;
            
            // Check interests
            trip.interests.forEach(interest => {
                const checkbox = document.querySelector(`input[name="interests"][value="${interest}"]`);
                if (checkbox) checkbox.checked = true;
            });

            // Update form submission to handle edit
            const form = document.getElementById('itinerary-form');
            form.dataset.editId = tripId;
        }
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
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
    }

    switchTab(tabId) {
        // Remove active class from all tabs and panes
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
        
        // Add active class to selected tab and pane
        document.querySelector(`.tab[data-tab="${tabId}"]`).classList.add('active');
        document.getElementById(tabId).classList.add('active');
    }
}

// Initialize Trip Manager
const tripManager = new TripManager();