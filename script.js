// Gallery images array
const galleryImages = [
    'assets/image1.jpg',
    'assets/image2.jpg',
    'assets/image3.jpg',
    'assets/image4.jpg',
    'assets/image5.jpg',
    'assets/image6.jpg',
    'assets/image7.jpg',
    'assets/image8.jpg',
    'assets/image9.jpg',
    'assets/image10.jpg'
];

let currentImageIndex = 0;

// Mobile Slider Functionality
const sliderTrack = document.getElementById('sliderTrack');
const sliderDots = document.getElementById('sliderDots');
const mobileSlider = document.getElementById('mobileSlider');

// Create dots for mobile slider
function createSliderDots() {
    sliderDots.innerHTML = '';
    galleryImages.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'mobile-gallery-slider__dot';
        if (index === 0) {
            dot.classList.add('mobile-gallery-slider__dot--active');
        }
        dot.addEventListener('click', () => goToSlide(index));
        sliderDots.appendChild(dot);
    });
}

function goToSlide(index) {
    currentImageIndex = index;
    sliderTrack.style.transform = `translateX(-${index * 100}%)`;
    updateSliderDots();
}

function updateSliderDots() {
    const dots = document.querySelectorAll('.mobile-gallery-slider__dot');
    dots.forEach((dot, index) => {
        if (index === currentImageIndex) {
            dot.classList.add('mobile-gallery-slider__dot--active');
        } else {
            dot.classList.remove('mobile-gallery-slider__dot--active');
        }
    });
}

// Touch swipe functionality for mobile slider
let touchStartX = 0;
let touchEndX = 0;

mobileSlider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

mobileSlider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe left
        if (currentImageIndex < galleryImages.length - 1) {
            goToSlide(currentImageIndex + 1);
        }
    }
    if (touchEndX > touchStartX + 50) {
        // Swipe right
        if (currentImageIndex > 0) {
            goToSlide(currentImageIndex - 1);
        }
    }
}

// Initialize mobile slider
createSliderDots();

// Modal Gallery Functionality (Desktop/Tablet)
const modal = document.getElementById('galleryModal');
const viewAllBtn = document.getElementById('viewAllBtn');
const closeModal = document.getElementById('closeModal');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const modalMainImage = document.getElementById('modalMainImage');
const thumbnailsContainer = document.getElementById('thumbnailsContainer');

let modalCurrentIndex = 0;

// Create thumbnails
function createThumbnails() {
    thumbnailsContainer.innerHTML = '';
    galleryImages.forEach((image, index) => {
        const img = document.createElement('img');
        img.src = image;
        img.alt = `Gallery thumbnail ${index + 1}`;
        img.className = 'gallery-modal__thumbnail';
        if (index === 0) {
            img.classList.add('active');
        }
        img.addEventListener('click', () => showImage(index));
        thumbnailsContainer.appendChild(img);
    });
}

function showImage(index) {
    modalCurrentIndex = index;
    modalMainImage.src = galleryImages[index];
    
    // Update active thumbnail
    const thumbnails = document.querySelectorAll('.gallery-modal__thumbnail');
    thumbnails.forEach((thumb, i) => {
        if (i === index) {
            thumb.classList.add('active');
            thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
            thumb.classList.remove('active');
        }
    });
}

function showNextImage() {
    modalCurrentIndex = (modalCurrentIndex + 1) % galleryImages.length;
    showImage(modalCurrentIndex);
}

function showPrevImage() {
    modalCurrentIndex = (modalCurrentIndex - 1 + galleryImages.length) % galleryImages.length;
    showImage(modalCurrentIndex);
}

// Event listeners for modal
viewAllBtn.addEventListener('click', () => {
    modal.classList.add('active');
    createThumbnails();
    showImage(0);
    document.body.style.overflow = 'hidden';
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
});

nextBtn.addEventListener('click', showNextImage);
prevBtn.addEventListener('click', showPrevImage);

// Close modal on background click
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('active')) {
        if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        } else if (e.key === 'Escape') {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Property Description Show More/Less Functionality
const toggleBtn = document.querySelector('.property-description__toggle-btn');
const toggleText = document.querySelector('.property-description__toggle-text');
const toggleIcon = document.querySelector('.property-description__toggle-icon');
const descriptionText = document.querySelector('.property-description__text');

// Initially collapsed state
let isExpanded = false;

// Toggle function
function toggleDescription() {
    isExpanded = !isExpanded;
    
    if (isExpanded) {
        descriptionText.classList.remove('property-description__text--collapsed');
        descriptionText.classList.add('property-description__text--expanded');
        toggleText.textContent = 'SHOW LESS';
        toggleBtn.classList.add('expanded');
    } else {
        descriptionText.classList.remove('property-description__text--expanded');
        descriptionText.classList.add('property-description__text--collapsed');
        toggleText.textContent = 'SHOW MORE';
        toggleBtn.classList.remove('expanded');
    }
}

// Add event listener to the toggle button
if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleDescription);
}

// ============================================
// BOOKING FUNCTIONALITY
// ============================================

// Constants
const PRICE_PER_NIGHT = 2026;
const TODAY = new Date();
TODAY.setHours(0, 0, 0, 0);

// DOM Elements
const checkInInput = document.getElementById('checkInDate');
const checkOutInput = document.getElementById('checkOutDate');
const guestSelector = document.getElementById('guestSelector');
const guestDisplay = document.getElementById('guestDisplay');
const totalPriceElement = document.getElementById('totalPrice');
const pricePerNightElement = document.getElementById('pricePerNight');
const calculatedTotalElement = document.getElementById('calculatedTotal');
const availabilityText = document.getElementById('availabilityText');
const checkAvailabilityBtn = document.getElementById('checkAvailabilityBtn');

// Guest Modal Elements
const guestModal = document.getElementById('guestModal');
const closeGuestModal = document.getElementById('closeGuestModal');
const applyGuestChangesBtn = document.getElementById('applyGuestChanges');

// Guest counter elements
const decreaseGuestsBtn = document.getElementById('decreaseGuests');
const increaseGuestsBtn = document.getElementById('increaseGuests');
const guestsCountElement = document.getElementById('guestsCount');

const decreaseInfantsBtn = document.getElementById('decreaseInfants');
const increaseInfantsBtn = document.getElementById('increaseInfants');
const infantsCountElement = document.getElementById('infantsCount');

const decreasePetsBtn = document.getElementById('decreasePets');
const increasePetsBtn = document.getElementById('increasePets');
const petsCountElement = document.getElementById('petsCount');

// State
let guestState = {
    guests: 1,
    infants: 0,
    pets: 0
};

let selectedDates = {
    checkIn: null,
    checkOut: null
};

// Format date to "DD MMM YYYY" format
function formatDate(date) {
    if (!date) return '';
    
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options).toUpperCase();
}

// Format currency
function formatCurrency(amount) {
    return `USD $${amount.toLocaleString()}`;
}

// Calculate number of nights between two dates
function calculateNights(checkIn, checkOut) {
    if (!checkIn || !checkOut) return 0;
    
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

// Format guest display text grammatically
function formatGuestText(guests, infants, pets) {
    let parts = [];
    
    // Format guests
    if (guests === 1) {
        parts.push('1 Guest');
    } else if (guests > 1) {
        parts.push(`${guests} Guests`);
    }
    
    // Format infants
    if (infants === 1) {
        parts.push('1 Infant');
    } else if (infants > 1) {
        parts.push(`${infants} Infants`);
    }
    
    // Format pets
    if (pets === 1) {
        parts.push('1 Pet');
    } else if (pets > 1) {
        parts.push(`${pets} Pets`);
    }
    
    return parts.join(', ');
}

// Update guest display
function updateGuestDisplay() {
    if (guestDisplay) {
        guestDisplay.textContent = formatGuestText(
            guestState.guests, 
            guestState.infants, 
            guestState.pets
        );
    }
    
    // Update counter buttons state
    updateCounterButtons();
}

// Update counter buttons state
function updateCounterButtons() {
    // Guests: minimum 1, no maximum
    if (decreaseGuestsBtn) decreaseGuestsBtn.disabled = guestState.guests <= 1;
    if (increaseGuestsBtn) increaseGuestsBtn.disabled = false;
    
    // Infants: minimum 0, no maximum
    if (decreaseInfantsBtn) decreaseInfantsBtn.disabled = guestState.infants <= 0;
    if (increaseInfantsBtn) increaseInfantsBtn.disabled = false;
    
    // Pets: minimum 0, no maximum
    if (decreasePetsBtn) decreasePetsBtn.disabled = guestState.pets <= 0;
    if (increasePetsBtn) increasePetsBtn.disabled = false;
}

// Update pricing based ONLY on selected dates (NOT guest counts)
function updatePricing() {
    const nights = calculateNights(selectedDates.checkIn, selectedDates.checkOut);
    const total = nights * PRICE_PER_NIGHT;
    
    // Update display elements
    if (pricePerNightElement) pricePerNightElement.textContent = formatCurrency(PRICE_PER_NIGHT);
    
    if (nights > 0) {
        if (calculatedTotalElement) calculatedTotalElement.textContent = formatCurrency(total);
        if (totalPriceElement) totalPriceElement.textContent = `$${total.toLocaleString()}`;
        if (availabilityText) {
            availabilityText.textContent = 'Dates selected are available';
            availabilityText.style.color = 'green';
        }
    } else {
        if (calculatedTotalElement) calculatedTotalElement.textContent = formatCurrency(PRICE_PER_NIGHT);
        if (totalPriceElement) totalPriceElement.textContent = `$${PRICE_PER_NIGHT.toLocaleString()}`;
        if (availabilityText) {
            availabilityText.textContent = 'Select dates to check availability';
            availabilityText.style.color = '#666';
        }
    }
}

// Initialize Flatpickr date pickers
function initializeDatePickers() {
    if (!checkInInput || !checkOutInput) return;
    
    const checkInPicker = flatpickr(checkInInput, {
        dateFormat: "d M Y",
        minDate: "today",
        onChange: function(selectedDatesArray, dateStr, instance) {
            if (selectedDatesArray.length > 0) {
                selectedDates.checkIn = selectedDatesArray[0];
                checkInInput.value = formatDate(selectedDates.checkIn);
                
                // Set min date for check-out
                const nextDay = new Date(selectedDates.checkIn);
                nextDay.setDate(nextDay.getDate() + 1);
                checkOutPicker.set('minDate', nextDay);
                
                // If check-out is before check-in, reset it
                if (selectedDates.checkOut && selectedDates.checkOut <= selectedDates.checkIn) {
                    selectedDates.checkOut = null;
                    checkOutPicker.clear();
                    checkOutInput.value = '';
                }
                
                updatePricing();
            }
        },
        onClose: function(selectedDatesArray, dateStr, instance) {
            // If check-in is selected but check-out is not, open check-out picker
            if (selectedDatesArray.length > 0 && !selectedDates.checkOut) {
                setTimeout(() => checkOutPicker.open(), 100);
            }
        }
    });
    
    const checkOutPicker = flatpickr(checkOutInput, {
        dateFormat: "d M Y",
        minDate: "today",
        onChange: function(selectedDatesArray, dateStr, instance) {
            if (selectedDatesArray.length > 0) {
                selectedDates.checkOut = selectedDatesArray[0];
                checkOutInput.value = formatDate(selectedDates.checkOut);
                updatePricing();
            }
        }
    });
    
    // Make state accessible
    window.selectedDates = selectedDates;
    window.checkInPicker = checkInPicker;
    window.checkOutPicker = checkOutPicker;
}

// Initialize guest counter functionality
function initializeGuestCounter() {
    if (!guestsCountElement || !infantsCountElement || !petsCountElement) return;
    
    // Set initial values
    guestsCountElement.textContent = guestState.guests;
    infantsCountElement.textContent = guestState.infants;
    petsCountElement.textContent = guestState.pets;
    
    // Guests counter
    if (decreaseGuestsBtn) {
        decreaseGuestsBtn.addEventListener('click', () => {
            if (guestState.guests > 1) {
                guestState.guests--;
                guestsCountElement.textContent = guestState.guests;
                updateCounterButtons();
            }
        });
    }
    
    if (increaseGuestsBtn) {
        increaseGuestsBtn.addEventListener('click', () => {
            guestState.guests++;
            guestsCountElement.textContent = guestState.guests;
            updateCounterButtons();
        });
    }
    
    // Infants counter
    if (decreaseInfantsBtn) {
        decreaseInfantsBtn.addEventListener('click', () => {
            if (guestState.infants > 0) {
                guestState.infants--;
                infantsCountElement.textContent = guestState.infants;
                updateCounterButtons();
            }
        });
    }
    
    if (increaseInfantsBtn) {
        increaseInfantsBtn.addEventListener('click', () => {
            guestState.infants++;
            infantsCountElement.textContent = guestState.infants;
            updateCounterButtons();
        });
    }
    
    // Pets counter
    if (decreasePetsBtn) {
        decreasePetsBtn.addEventListener('click', () => {
            if (guestState.pets > 0) {
                guestState.pets--;
                petsCountElement.textContent = guestState.pets;
                updateCounterButtons();
            }
        });
    }
    
    if (increasePetsBtn) {
        increasePetsBtn.addEventListener('click', () => {
            guestState.pets++;
            petsCountElement.textContent = guestState.pets;
            updateCounterButtons();
        });
    }
}

// Guest modal functionality
function initializeGuestModal() {
    if (!guestSelector || !guestModal) return;
    
    // Open modal when guest selector is clicked
    guestSelector.addEventListener('click', (e) => {
        // Only open on desktop (992px and above)
        if (window.innerWidth >= 992) {
            // Set modal values to current state
            if (guestsCountElement) guestsCountElement.textContent = guestState.guests;
            if (infantsCountElement) infantsCountElement.textContent = guestState.infants;
            if (petsCountElement) petsCountElement.textContent = guestState.pets;
            updateCounterButtons();
            
            guestModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
    
    // Close modal
    if (closeGuestModal) {
        closeGuestModal.addEventListener('click', () => {
            guestModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Apply changes
    if (applyGuestChangesBtn) {
        applyGuestChangesBtn.addEventListener('click', () => {
            // Update guest state from modal
            guestState.guests = parseInt(guestsCountElement.textContent);
            guestState.infants = parseInt(infantsCountElement.textContent);
            guestState.pets = parseInt(petsCountElement.textContent);
            
            // Update display (but NOT pricing - pricing is based only on nights)
            updateGuestDisplay();
            
            // Close modal
            guestModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close modal when clicking outside
    guestModal.addEventListener('click', (e) => {
        if (e.target === guestModal) {
            guestModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (guestModal.classList.contains('active') && e.key === 'Escape') {
            guestModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Check availability button
function initializeCheckAvailability() {
    if (!checkAvailabilityBtn) return;
    
    checkAvailabilityBtn.addEventListener('click', () => {
        if (!selectedDates.checkIn || !selectedDates.checkOut) {
            alert('Please select check-in and check-out dates');
            return;
        }
        
        if (calculateNights(selectedDates.checkIn, selectedDates.checkOut) === 0) {
            alert('Check-out date must be at least one day after check-in date');
            return;
        }
        
        // Simulate checking availability
        if (availabilityText) {
            availabilityText.textContent = 'Checking availability...';
            availabilityText.style.color = 'orange';
        }
        
        setTimeout(() => {
            if (availabilityText) {
                availabilityText.textContent = 'Dates selected are available';
                availabilityText.style.color = 'green';
            }
            alert('The selected dates are available! You will now be redirected to Booking.com.');
            
            // In a real app, this would redirect to Booking.com
            // window.location.href = 'https://www.booking.com';
        }, 1000);
    });
}

// ============================================
// FAVORITES SECTION WITH LOCAL STORAGE
// ============================================

// Property data - 10 properties with unique IDs and images
const properties = [
    {
        id: 'property1',
        name: 'Beachfront Villa Paradise',
        location: 'Miami, Florida',
        guests: 6,
        bedrooms: 3,
        price: 345,
        image: 'assets/image11.jpg',
        rating: 4.8
    },
    {
        id: 'property2',
        name: 'Mountain View Chalet',
        location: 'Aspen, Colorado',
        guests: 4,
        bedrooms: 2,
        price: 285,
        image: 'assets/image12.jpg',
        rating: 4.9
    },
    {
        id: 'property3',
        name: 'City Center Penthouse',
        location: 'New York City',
        guests: 2,
        bedrooms: 1,
        price: 420,
        image: 'assets/image13.jpg',
        rating: 4.7
    },
    {
        id: 'property4',
        name: 'Lakeside Cottage',
        location: 'Lake Tahoe, California',
        guests: 5,
        bedrooms: 2,
        price: 320,
        image: 'assets/image14.jpg',
        rating: 4.6
    },
    {
        id: 'property5',
        name: 'Desert Oasis Retreat',
        location: 'Scottsdale, Arizona',
        guests: 8,
        bedrooms: 4,
        price: 510,
        image: 'assets/image15.jpg',
        rating: 4.5
    },
    {
        id: 'property6',
        name: 'Historic Townhouse',
        location: 'Charleston, South Carolina',
        guests: 7,
        bedrooms: 3,
        price: 380,
        image: 'assets/image16.jpg',
        rating: 4.8
    },
    {
        id: 'property7',
        name: 'Modern Loft Apartment',
        location: 'Austin, Texas',
        guests: 3,
        bedrooms: 1,
        price: 275,
        image: 'assets/image17.jpg',
        rating: 4.7
    },
    {
        id: 'property8',
        name: 'Ski-in Ski-out Condo',
        location: 'Park City, Utah',
        guests: 6,
        bedrooms: 3,
        price: 460,
        image: 'assets/image18.jpg',
        rating: 4.9
    },
    {
        id: 'property9',
        name: 'Tropical Garden Bungalow',
        location: 'Kauai, Hawaii',
        guests: 4,
        bedrooms: 2,
        price: 395,
        image: 'assets/image19.jpg',
        rating: 4.8
    },
    {
        id: 'property10',
        name: 'Vineyard Estate',
        location: 'Napa Valley, California',
        guests: 10,
        bedrooms: 5,
        price: 890,
        image: 'assets/image20.jpg',
        rating: 4.9
    }
];

// Local Storage Key
const FAVORITES_KEY = 'favoriteProperties';

// Get favorites from local storage
function getFavorites() {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
}

// Save favorites to local storage
function saveFavorites(favorites) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

// Check if a property is favorited
function isPropertyFavorited(propertyId) {
    const favorites = getFavorites();
    return favorites.includes(propertyId);
}

// Toggle favorite status
function toggleFavorite(propertyId) {
    let favorites = getFavorites();
    
    if (favorites.includes(propertyId)) {
        // Remove from favorites
        favorites = favorites.filter(id => id !== propertyId);
    } else {
        // Add to favorites
        favorites.push(propertyId);
    }
    
    saveFavorites(favorites);
    updateFavoriteButton(propertyId);
    return favorites.includes(propertyId);
}

// Update favorite button appearance
function updateFavoriteButton(propertyId) {
    const button = document.querySelector(`[data-property-id="${propertyId}"]`);
    if (button) {
        const icon = button.querySelector('.favorite-card__favorite-icon');
        const isFavorited = isPropertyFavorited(propertyId);
        
        if (isFavorited) {
            button.classList.add('active');
            icon.style.color = '#ff4757';
        } else {
            button.classList.remove('active');
            icon.style.color = '#ccc';
        }
    }
}

// Create property card HTML
function createPropertyCard(property) {
    const isFavorited = isPropertyFavorited(property.id);
    
    return `
        <div class="favorite-card" data-property="${property.id}">
            <div class="favorite-card__image-container">
                <img src="${property.image}" alt="${property.name}" class="favorite-card__image">
                <button class="favorite-card__favorite-btn ${isFavorited ? 'active' : ''}" 
                        data-property-id="${property.id}"
                        aria-label="${isFavorited ? 'Remove from favorites' : 'Add to favorites'}">
                    <i class="fas fa-heart favorite-card__favorite-icon"></i>
                </button>
                <div class="favorite-card__rating">
                    <i class="fas fa-star"></i> ${property.rating}
                </div>
            </div>
            
            <div class="favorite-card__content">
                <h3 class="favorite-card__title">${property.name}</h3>
                <div class="favorite-card__location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${property.location}
                </div>
                
                <div class="favorite-card__details">
                    <div class="favorite-card__guests">
                        <i class="fas fa-user-friends"></i>
                        ${property.guests} Guests
                    </div>
                    <div class="favorite-card__bedrooms">
                        <i class="fas fa-bed"></i>
                        ${property.bedrooms} Bedrooms
                    </div>
                </div>
                
                <div class="favorite-card__price">
                    $${property.price} <span>/ night</span>
                </div>
            </div>
        </div>
    `;
}

// Render properties grid
function renderPropertiesGrid() {
    const grid = document.getElementById('favoritesGrid');
    if (!grid) return;
    
    grid.innerHTML = properties.map(property => createPropertyCard(property)).join('');
    
    // Add event listeners to all favorite buttons
    document.querySelectorAll('.favorite-card__favorite-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const propertyId = this.getAttribute('data-property-id');
            const isNowFavorited = toggleFavorite(propertyId);
            
            // Update button text for accessibility
            this.setAttribute('aria-label', isNowFavorited ? 'Remove from favorites' : 'Add to favorites');
            
            // Add visual feedback
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
            
            // Log for debugging
            console.log(`Property ${propertyId} ${isNowFavorited ? 'added to' : 'removed from'} favorites`);
            console.log('Current favorites:', getFavorites());
        });
    });
    
    // Add click event to property cards (for future navigation)
    document.querySelectorAll('.favorite-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking the favorite button
            if (!e.target.closest('.favorite-card__favorite-btn')) {
                const propertyId = this.getAttribute('data-property');
                console.log(`Navigating to ${propertyId} details page`);
                // In a real application, this would navigate to the property detail page
                // window.location.href = `/property/${propertyId}`;
            }
        });
    });
}

// Initialize favorites section
function initializeFavoritesSection() {
    renderPropertiesGrid();
    
    // Clear favorites button for testing (optional - remove in production)
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear Favorites (Dev)';
    clearButton.style.cssText = `
        display: block;
        margin: 20px auto;
        padding: 10px 20px;
        background-color: #ff4757;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
    `;
    clearButton.addEventListener('click', () => {
        localStorage.removeItem(FAVORITES_KEY);
        renderPropertiesGrid();
        console.log('Favorites cleared');
    });
    
    // Only add in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        document.querySelector('.favorites-section .container').appendChild(clearButton);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize property description toggle
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleDescription);
    }
    
    // Initialize booking functionality only on desktop
    if (window.innerWidth >= 992) {
        initializeDatePickers();
        initializeGuestCounter();
        initializeGuestModal();
        initializeCheckAvailability();
        
        // Set initial price display
        updateGuestDisplay();
        updatePricing();
    }
    
    // Initialize favorites section
    initializeFavoritesSection();
    
    // Update on window resize
    window.addEventListener('resize', () => {
        // If resizing to desktop, initialize booking functionality
        if (window.innerWidth >= 992) {
            if (!window.checkInPicker) {
                initializeDatePickers();
                initializeGuestCounter();
                initializeGuestModal();
                initializeCheckAvailability();
                updateGuestDisplay();
                updatePricing();
            }
        }
    });
});

