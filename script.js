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
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
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
        // Expand the description
        descriptionText.classList.remove('property-description__text--collapsed');
        descriptionText.classList.add('property-description__text--expanded');
        toggleText.textContent = 'SHOW LESS';
        toggleBtn.classList.add('expanded');
    } else {
        // Collapse the description
        descriptionText.classList.remove('property-description__text--expanded');
        descriptionText.classList.add('property-description__text--collapsed');
        toggleText.textContent = 'SHOW MORE';
        toggleBtn.classList.remove('expanded');
    }
}

// Add event listener to the toggle button
toggleBtn.addEventListener('click', toggleDescription);

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
const nightsCountElement = document.getElementById('nightsCount');
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
    guestDisplay.textContent = formatGuestText(
        guestState.guests, 
        guestState.infants, 
        guestState.pets
    );
    
    // Update counter buttons state
    updateCounterButtons();
}

// Update counter buttons state
function updateCounterButtons() {
    // Guests: minimum 1, maximum 8
    decreaseGuestsBtn.disabled = guestState.guests <= 1;
    increaseGuestsBtn.disabled = guestState.guests >= 8;
    
    // Infants: minimum 0, maximum 2
    decreaseInfantsBtn.disabled = guestState.infants <= 0;
    increaseInfantsBtn.disabled = guestState.infants >= 2;
    
    // Pets: minimum 0, maximum 2
    decreasePetsBtn.disabled = guestState.pets <= 0;
    increasePetsBtn.disabled = guestState.pets >= 2;
}

// Update pricing based on selected dates
function updatePricing() {
    const nights = calculateNights(selectedDates.checkIn, selectedDates.checkOut);
    const total = nights * PRICE_PER_NIGHT;
    
    // Update display elements
    pricePerNightElement.textContent = formatCurrency(PRICE_PER_NIGHT);
    nightsCountElement.textContent = `${nights} night${nights !== 1 ? 's' : ''}`;
    
    if (nights > 0) {
        calculatedTotalElement.textContent = formatCurrency(total);
        totalPriceElement.textContent = `$${total}`;
        availabilityText.textContent = 'Dates selected are available';
        availabilityText.style.color = 'green';
    } else {
        calculatedTotalElement.textContent = formatCurrency(PRICE_PER_NIGHT);
        totalPriceElement.textContent = `$${PRICE_PER_NIGHT}`;
        availabilityText.textContent = 'Select dates to check availability';
        availabilityText.style.color = '#666';
    }
}

// Initialize Flatpickr date pickers
function initializeDatePickers() {
    const checkInPicker = flatpickr(checkInInput, {
        dateFormat: "d M Y",
        minDate: "today",
        onChange: function(selectedDates, dateStr, instance) {
            if (selectedDates.length > 0) {
                selectedDates.checkIn = selectedDates[0];
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
        onClose: function(selectedDates, dateStr, instance) {
            // If check-in is selected but check-out is not, open check-out picker
            if (selectedDates.length > 0 && !selectedDates.checkOut) {
                setTimeout(() => checkOutPicker.open(), 100);
            }
        }
    });
    
    const checkOutPicker = flatpickr(checkOutInput, {
        dateFormat: "d M Y",
        minDate: "today",
        onChange: function(selectedDates, dateStr, instance) {
            if (selectedDates.length > 0) {
                selectedDates.checkOut = selectedDates[0];
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
    // Set initial values
    guestsCountElement.textContent = guestState.guests;
    infantsCountElement.textContent = guestState.infants;
    petsCountElement.textContent = guestState.pets;
    
    // Guests counter
    decreaseGuestsBtn.addEventListener('click', () => {
        if (guestState.guests > 1) {
            guestState.guests--;
            guestsCountElement.textContent = guestState.guests;
            updateCounterButtons();
        }
    });
    
    increaseGuestsBtn.addEventListener('click', () => {
        if (guestState.guests < 8) {
            guestState.guests++;
            guestsCountElement.textContent = guestState.guests;
            updateCounterButtons();
        }
    });
    
    // Infants counter
    decreaseInfantsBtn.addEventListener('click', () => {
        if (guestState.infants > 0) {
            guestState.infants--;
            infantsCountElement.textContent = guestState.infants;
            updateCounterButtons();
        }
    });
    
    increaseInfantsBtn.addEventListener('click', () => {
        if (guestState.infants < 2) {
            guestState.infants++;
            infantsCountElement.textContent = guestState.infants;
            updateCounterButtons();
        }
    });
    
    // Pets counter
    decreasePetsBtn.addEventListener('click', () => {
        if (guestState.pets > 0) {
            guestState.pets--;
            petsCountElement.textContent = guestState.pets;
            updateCounterButtons();
        }
    });
    
    increasePetsBtn.addEventListener('click', () => {
        if (guestState.pets < 2) {
            guestState.pets++;
            petsCountElement.textContent = guestState.pets;
            updateCounterButtons();
        }
    });
}

// Guest modal functionality
function initializeGuestModal() {
    // Open modal when guest selector is clicked
    guestSelector.addEventListener('click', (e) => {
        // Only open on desktop (992px and above)
        if (window.innerWidth >= 992) {
            // Set modal values to current state
            guestsCountElement.textContent = guestState.guests;
            infantsCountElement.textContent = guestState.infants;
            petsCountElement.textContent = guestState.pets;
            updateCounterButtons();
            
            guestModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
    
    // Close modal
    closeGuestModal.addEventListener('click', () => {
        guestModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Apply changes
    applyGuestChangesBtn.addEventListener('click', () => {
        // Update guest state from modal
        guestState.guests = parseInt(guestsCountElement.textContent);
        guestState.infants = parseInt(infantsCountElement.textContent);
        guestState.pets = parseInt(petsCountElement.textContent);
        
        // Update display
        updateGuestDisplay();
        
        // Close modal
        guestModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
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
        availabilityText.textContent = 'Checking availability...';
        availabilityText.style.color = 'orange';
        
        setTimeout(() => {
            availabilityText.textContent = 'Dates selected are available';
            availabilityText.style.color = 'green';
            alert('The selected dates are available! You will now be redirected to Booking.com.');
            
            // In a real app, this would redirect to Booking.com
            // window.location.href = 'https://www.booking.com';
        }, 1000);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize property description toggle
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleDescription);
    }
    
    // Initialize booking functionality
    initializeDatePickers();
    initializeGuestCounter();
    initializeGuestModal();
    initializeCheckAvailability();
    
    // Set initial price display
    updatePricing();
    updateGuestDisplay();
    
    // Disable guest selector on mobile/tablet
    if (window.innerWidth < 992) {
        guestSelector.style.pointerEvents = 'none';
        guestSelector.style.opacity = '0.7';
    }
    
    // Update on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth < 992) {
            guestSelector.style.pointerEvents = 'none';
            guestSelector.style.opacity = '0.7';
        } else {
            guestSelector.style.pointerEvents = 'auto';
            guestSelector.style.opacity = '1';
        }
    });
});

// For debugging
console.log('Booking system initialized');
console.log('Price per night: $' + PRICE_PER_NIGHT);
console.log('Today: ' + TODAY.toDateString());
