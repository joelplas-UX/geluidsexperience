// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Gallery Setup
const mediaFiles = [
    'IMG_2419.jpeg',
    'IMG_0501.jpeg',
    '0221EBBA-13E4-48D7-B686-879C5A579C95.jpg',
    'IMG_0809.jpeg',
    'IMG_0746.jpeg',
    '284BCA2D-B503-4412-A886-A4A6A87DA308.mp4',
    'D646CEE8-17C5-497B-B8B9-F5EB22EA00FD.jpg',
    'IMG_4461.jpeg',
    'IMG_7446.jpeg',
    '85C3DCCC-2ACF-425A-A56A-9DEBB21C1D9D.jpg',
    'IMG_3901.jpeg',
    '5B851922-3080-4E4A-9D78-BFB768629837.jpg',
    '1993BE42-4E68-4334-BECB-FC6D475923E3.mp4',
    'IMG_3902.jpeg',
    'IMG_0841.jpeg',
    'IMG_0549.jpeg',
    'IMG_3430.jpeg',
    'IMG_3431.jpeg',
    '085F8613-D653-4D81-B08E-507C9F8BF0E8.jpg',
    'IMG_6111.MOV',
    'IMG_0440.jpeg',
    'IMG_2924.jpeg',
    'IMG_5701.jpeg'
];

const videoExtensions = ['.mp4', '.webm', '.mov', '.MOV'];

// Carousel Setup
const carouselTrack = document.getElementById('carouselTrack');
const indicators = document.getElementById('indicators');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

// Populate Carousel
mediaFiles.forEach((file, index) => {
    const isVideo = videoExtensions.some(ext => file.toLowerCase().endsWith(ext));
    const itemClass = isVideo ? 'carousel-item video-item' : 'carousel-item';

    const carouselItem = document.createElement('div');
    carouselItem.className = itemClass;

    if (isVideo) {
        carouselItem.innerHTML = `<video src="${file}" muted></video>`;
    } else {
        carouselItem.innerHTML = `<img src="${file}" alt="Portfolio image">`;
    }

    carouselItem.addEventListener('click', () => openModal(file, isVideo));
    carouselTrack.appendChild(carouselItem);

    // Create indicator
    const indicator = document.createElement('div');
    indicator.className = 'indicator' + (index === 0 ? ' active' : '');
    indicator.addEventListener('click', () => goToSlide(index));
    indicators.appendChild(indicator);
});

function updateCarousel() {
    const offset = -currentIndex * 100;
    carouselTrack.style.transform = `translateX(${offset}%)`;

    document.querySelectorAll('.indicator').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % mediaFiles.length;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + mediaFiles.length) % mediaFiles.length;
    updateCarousel();
}

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
});

// Auto-advance carousel every 8 seconds
setInterval(nextSlide, 8000);

// Fallback gallery grid
const gallery = document.getElementById('gallery');
mediaFiles.forEach(file => {
    const isVideo = videoExtensions.some(ext => file.toLowerCase().endsWith(ext));
    const itemClass = isVideo ? 'gallery-item video-item' : 'gallery-item';

    const galleryItem = document.createElement('div');
    galleryItem.className = itemClass;

    if (isVideo) {
        galleryItem.innerHTML = `<video src="${file}" muted></video>`;
    } else {
        galleryItem.innerHTML = `<img src="${file}" alt="Portfolio image" loading="lazy">`;
    }

    galleryItem.addEventListener('click', () => openModal(file, isVideo));
    gallery.appendChild(galleryItem);
});

// Modal
let modal = document.querySelector('.modal');

if (!modal) {
    modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" id="modalContent">
            <span class="modal-close">&times;</span>
        </div>
    `;
    document.body.appendChild(modal);
}

function openModal(file, isVideo) {
    const modalContent = document.getElementById('modalContent');
    const closeBtn = document.querySelector('.modal-close');

    if (isVideo) {
        modalContent.innerHTML = `
            <video src="${file}" controls style="width: 100%; max-height: 90vh; border-radius: 10px;"></video>
            <span class="modal-close">&times;</span>
        `;
    } else {
        modalContent.innerHTML = `
            <img src="${file}" alt="Full size image" style="width: 100%; max-height: 90vh; border-radius: 10px;">
            <span class="modal-close">&times;</span>
        `;
    }

    modal.classList.add('active');

    // Add close functionality
    document.querySelector('.modal-close').addEventListener('click', closeModal);
}

function closeModal() {
    modal.classList.remove('active');
}

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Keyboard close
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Contact Form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);

    try {
        const response = await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        });

        if (response.ok) {
            alert('Bedankt! Je bericht is verzonden. We nemen snel contact op.');
            contactForm.reset();
        } else {
            alert('Er is een fout opgetreden. Probeer het later opnieuw.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Er is een fout opgetreden. Probeer het later opnieuw.');
    }
});

// Scroll animations (optional enhancement)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .gallery-item').forEach(el => {
    observer.observe(el);
});
