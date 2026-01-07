// Gallery images data
const galleryImages = [
    {
        src: "assets/gallery_images/image1.jpg",
        alt: "Main view of Shoreline Towers 1021 living room with Gulf views"
    },
    {
        src: "assets/gallery_images/image2.jpg",
        alt: "Master bedroom with comfortable bedding and decor"
    },
    {
        src: "assets/gallery_images/image3.jpg",
        alt: "Balcony with stunning Gulf view and outdoor seating"
    },
    {
        src: "assets/gallery_images/image4.jpg",
        alt: "Modern kitchen with stainless steel appliances and island"
    },
    {
        src: "assets/gallery_images/image5.jpg",
        alt: "Second bedroom with two twin beds and nautical decor"
    },
    {
        src: "assets/gallery_images/image6.jpg",
        alt: "Third bedroom with king-size bed and ocean view"
    },
    {
        src: "assets/gallery_images/image7.jpg",
        alt: "Spacious dining area with seating for eight"
    },
    {
        src: "assets/gallery_images/image8.jpg",
        alt: "Luxurious master bathroom with dual vanity"
    },
    {
        src: "assets/gallery_images/image9.jpg",
        alt: "Resort swimming pool with lounge chairs"
    },
    {
        src: "assets/gallery_images/image10.jpg",
        alt: "Beachfront view from the condo balcony at sunset"
    },
    {
        src: "assets/gallery_images/image11.jpg",
        alt: "Fully equipped laundry room with washer and dryer"
    },
    {
        src: "assets/gallery_images/image12.jpg",
        alt: "Resort fitness center with modern equipment"
    }
];

// DOM Elements
const galleryModal = document.getElementById('galleryModal');
const viewAllImagesBtn = document.getElementById('viewAllImagesBtn');
const closeGalleryModalBtn = document.getElementById('closeGalleryModal');
const modalImage = document.getElementById('modalImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const thumbnailsContainer = document.querySelector('.gallery-modal__thumbnails');
const currentImageIndexElement = document.getElementById('currentImageIndex');
const totalImagesElement = document.getElementById('totalImages');

// Mobile Gallery Elements
const mobileGallerySlider = document.getElementById('mobileGallerySlider');
const closeMobileGalleryBtn = document.getElementById('closeMobileGallery');
const mobilePrevBtn = document.getElementById('mobilePrevBtn');
const mobileNextBtn = document.getElementById('mobileNextBtn');
const mobileGalleryImagesContainer = document.querySelector('.mobile-gallery-slider__images');
const mobileGalleryDotsContainer = document.querySelector('.mobile-gallery-slider__dots');
const currentMobileImageElement = document.getElementById('currentMobileImage');
const totalMobileImagesElement = document.getElementById('totalMobileImages');

// Inline Mobile Slider Elements
const mobileSlidesContainer = document.querySelector('.mobile-image-gallery__slides');
const mobileSlides = document.querySelectorAll('.mobile-image-gallery__slide');
const mobileDots = document.querySelectorAll('.mobile-image-gallery__dot');

// Variables
let currentImageIndex = 0; // For desktop gallery
let currentMobileImageIndex = 0; // For mobile full gallery
let currentInlineSlideIndex = 0; // For inline mobile slider
const DOTS_PER_SET = 6; // Show 6 dots at a time

// Initialize all galleries
function initGalleries() {
    // Desktop Gallery
    totalImagesElement.textContent = galleryImages.length;
    generateDesktopThumbnails();
    setupDesktopGalleryEventListeners();
    updateDesktopGallery();
    
    // Mobile Full Gallery
    totalMobileImagesElement.textContent = galleryImages.length;
    generateMobileGalleryImages();
    generateMobileGalleryDots();
    setupMobileGalleryEventListeners();
    updateMobileGallery();
    
    // Inline Mobile Slider
    setupInlineMobileSlider();
}

// ========== DESKTOP GALLERY FUNCTIONS ==========

function generateDesktopThumbnails() {
    thumbnailsContainer.innerHTML = '';
    
    galleryImages.forEach((image, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = image.src;
        thumbnail.alt = image.alt;
        thumbnail.classList.add('gallery-modal__thumbnail');
        
        if (index === currentImageIndex) {
            thumbnail.classList.add('gallery-modal__thumbnail--active');
        }
        
        thumbnail.addEventListener('click', () => {
            setCurrentDesktopImage(index);
        });
        
        thumbnailsContainer.appendChild(thumbnail);
    });
}

function setCurrentDesktopImage(index) {
    currentImageIndex = index;
    updateDesktopGallery();
}

function updateDesktopGallery() {
    modalImage.src = galleryImages[currentImageIndex].src;
    modalImage.alt = galleryImages[currentImageIndex].alt;
    currentImageIndexElement.textContent = currentImageIndex + 1;
    
    // Update thumbnails
    const thumbnails = document.querySelectorAll('.gallery-modal__thumbnail');
    thumbnails.forEach((thumbnail, index) => {
        if (index === currentImageIndex) {
            thumbnail.classList.add('gallery-modal__thumbnail--active');
        } else {
            thumbnail.classList.remove('gallery-modal__thumbnail--active');
        }
    });
    
    // Update navigation buttons
    prevBtn.disabled = currentImageIndex === 0;
    nextBtn.disabled = currentImageIndex === galleryImages.length - 1;
}

function openDesktopGalleryModal(startIndex = 0) {
    setCurrentDesktopImage(startIndex);
    galleryModal.classList.add('gallery-modal--open');
    document.body.style.overflow = 'hidden';
}

function closeDesktopGalleryModal() {
    galleryModal.classList.remove('gallery-modal--open');
    document.body.style.overflow = 'auto';
}

function goToPreviousDesktopImage() {
    if (currentImageIndex > 0) {
        setCurrentDesktopImage(currentImageIndex - 1);
    }
}

function goToNextDesktopImage() {
    if (currentImageIndex < galleryImages.length - 1) {
        setCurrentDesktopImage(currentImageIndex + 1);
    }
}

function setupDesktopGalleryEventListeners() {
    // Desktop gallery button
    if (viewAllImagesBtn) {
        viewAllImagesBtn.addEventListener('click', () => openDesktopGalleryModal(0));
    }
    
    // Close modal
    closeGalleryModalBtn.addEventListener('click', closeDesktopGalleryModal);
    
    // Close modal when clicking outside
    galleryModal.addEventListener('click', (event) => {
        if (event.target === galleryModal) {
            closeDesktopGalleryModal();
        }
    });
    
    // Navigation buttons
    prevBtn.addEventListener('click', goToPreviousDesktopImage);
    nextBtn.addEventListener('click', goToNextDesktopImage);
    
    // Keyboard navigation for desktop gallery
    document.addEventListener('keydown', handleDesktopKeyboardNavigation);
}

function handleDesktopKeyboardNavigation(event) {
    if (galleryModal.classList.contains('gallery-modal--open')) {
        if (event.key === 'Escape') {
            closeDesktopGalleryModal();
        } else if (event.key === 'ArrowLeft') {
            goToPreviousDesktopImage();
        } else if (event.key === 'ArrowRight') {
            goToNextDesktopImage();
        }
    }
}

// ========== MOBILE FULL GALLERY FUNCTIONS ==========

function generateMobileGalleryImages() {
    mobileGalleryImagesContainer.innerHTML = '';
    
    galleryImages.forEach((image, index) => {
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('mobile-gallery-slider__image-container');
        
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        img.classList.add('mobile-gallery-slider__image');
        
        imageContainer.appendChild(img);
        mobileGalleryImagesContainer.appendChild(imageContainer);
    });
}

function generateMobileGalleryDots() {
    mobileGalleryDotsContainer.innerHTML = '';
    
    // Create dots for all images
    galleryImages.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('mobile-gallery-slider__dot');
        
        dot.addEventListener('click', () => {
            setCurrentMobileImage(index);
        });
        
        mobileGalleryDotsContainer.appendChild(dot);
    });
    
    updateMobileGalleryDots();
}

function updateMobileGalleryDots() {
    const allDots = document.querySelectorAll('.mobile-gallery-slider__dot');
    
    // Calculate which set of 6 dots to show
    const currentSet = Math.floor(currentMobileImageIndex / DOTS_PER_SET);
    const startIndex = currentSet * DOTS_PER_SET;
    const endIndex = Math.min(startIndex + DOTS_PER_SET, galleryImages.length);
    
    // Hide all dots
    allDots.forEach(dot => {
        dot.style.display = 'none';
    });
    
    // Show current set of dots
    for (let i = startIndex; i < endIndex; i++) {
        if (allDots[i]) {
            allDots[i].style.display = 'block';
        }
    }
    
    // Update active dot
    allDots.forEach((dot, index) => {
        if (index === currentMobileImageIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
    
    // Adjust dots container position to show current set
    const dotWidth = 6 + 6; // width + gap
    const offset = -(startIndex * dotWidth);
    mobileGalleryDotsContainer.style.marginLeft = offset + 'px';
}

function setCurrentMobileImage(index) {
    currentMobileImageIndex = index;
    updateMobileGallery();
}

function updateMobileGallery() {
    // Update image position
    const imageContainers = document.querySelectorAll('.mobile-gallery-slider__image-container');
    const containerWidth = 100; // 100% per image
    
    // Move the images container
    mobileGalleryImagesContainer.style.marginLeft = `-${currentMobileImageIndex * containerWidth}%`;
    
    // Update counter
    currentMobileImageElement.textContent = currentMobileImageIndex + 1;
    
    // Update dots
    updateMobileGalleryDots();
    
    // Update navigation buttons
    mobilePrevBtn.disabled = currentMobileImageIndex === 0;
    mobileNextBtn.disabled = currentMobileImageIndex === galleryImages.length - 1;
}

function openMobileGallery() {
    mobileGallerySlider.classList.add('mobile-gallery-slider--open');
    document.body.style.overflow = 'hidden';
}

function closeMobileGallery() {
    mobileGallerySlider.classList.remove('mobile-gallery-slider--open');
    document.body.style.overflow = 'auto';
}

function goToPreviousMobileImage() {
    if (currentMobileImageIndex > 0) {
        setCurrentMobileImage(currentMobileImageIndex - 1);
    }
}

function goToNextMobileImage() {
    if (currentMobileImageIndex < galleryImages.length - 1) {
        setCurrentMobileImage(currentMobileImageIndex + 1);
    }
}

function setupMobileGalleryEventListeners() {
    // Open mobile gallery when clicking on inline mobile slider images
    mobileSlides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
            setCurrentMobileImage(index);
            openMobileGallery();
        });
    });
    
    // Also open when clicking on dots in inline slider
    mobileDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            setCurrentMobileImage(index);
            openMobileGallery();
        });
    });
    
    // Close mobile gallery
    closeMobileGalleryBtn.addEventListener('click', closeMobileGallery);
    
    // Close mobile gallery when clicking outside
    mobileGallerySlider.addEventListener('click', (event) => {
        if (event.target === mobileGallerySlider) {
            closeMobileGallery();
        }
    });
    
    // Mobile gallery navigation
    mobilePrevBtn.addEventListener('click', goToPreviousMobileImage);
    mobileNextBtn.addEventListener('click', goToNextMobileImage);
    
    // Keyboard navigation for mobile gallery
    document.addEventListener('keydown', handleMobileKeyboardNavigation);
}

function handleMobileKeyboardNavigation(event) {
    if (mobileGallerySlider.classList.contains('mobile-gallery-slider--open')) {
        if (event.key === 'Escape') {
            closeMobileGallery();
        } else if (event.key === 'ArrowLeft') {
            goToPreviousMobileImage();
        } else if (event.key === 'ArrowRight') {
            goToNextMobileImage();
        }
    }
}

// ========== INLINE MOBILE SLIDER FUNCTIONS ==========

function setupInlineMobileSlider() {
    // Add click events to dots
    mobileDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.getAttribute('data-slide'));
            setCurrentInlineSlide(slideIndex);
        });
    });
    
    // Auto-advance slides every 5 seconds
    setInterval(() => {
        const nextSlideIndex = (currentInlineSlideIndex + 1) % mobileSlides.length;
        setCurrentInlineSlide(nextSlideIndex);
    }, 5000);
    
    // Add touch events for swiping
    let touchStartX = 0;
    let touchEndX = 0;
    
    mobileSlidesContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    mobileSlidesContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function setCurrentInlineSlide(index) {
    currentInlineSlideIndex = index;
    
    // Update slides position
    mobileSlidesContainer.style.marginLeft = `-${index * 100}%`;
    
    // Update dots
    mobileDots.forEach((dot, dotIndex) => {
        if (dotIndex === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            const nextSlideIndex = (currentInlineSlideIndex + 1) % mobileSlides.length;
            setCurrentInlineSlide(nextSlideIndex);
        } else {
            // Swipe right - previous slide
            const prevSlideIndex = currentInlineSlideIndex === 0 ? mobileSlides.length - 1 : currentInlineSlideIndex - 1;
            setCurrentInlineSlide(prevSlideIndex);
        }
    }
}

// Initialize all galleries when DOM is loaded
document.addEventListener('DOMContentLoaded', initGalleries);