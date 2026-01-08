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
