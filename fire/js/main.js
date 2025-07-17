// js/main.js
// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');

if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        mobileMenuBtn.innerHTML = mainNav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('#mainNav a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            if (mobileMenuBtn) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
}

// Product Carousel (only on pages that have it)
const carouselSlide = document.getElementById('carouselSlide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (carouselSlide && prevBtn && nextBtn) {
    let currentIndex = 0;
    const productItems = document.querySelectorAll('.product-item');
    const itemWidth = productItems[0].offsetWidth;
    const visibleItems = window.innerWidth >= 992 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    
    // Set initial position
    updateCarousel();
    
    // Next button click
    nextBtn.addEventListener('click', () => {
        if (currentIndex < productItems.length - visibleItems) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    // Previous button click
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    // Update carousel position
    function updateCarousel() {
        const offset = -currentIndex * itemWidth;
        carouselSlide.style.transform = `translateX(${offset}px)`;
        
        // Hide/show buttons based on position
        prevBtn.style.display = currentIndex === 0 ? 'none' : 'flex';
        nextBtn.style.display = currentIndex >= productItems.length - visibleItems ? 'none' : 'flex';
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const newVisibleItems = window.innerWidth >= 992 ? 3 : window.innerWidth >= 768 ? 2 : 1;
        if (currentIndex > productItems.length - newVisibleItems) {
            currentIndex = Math.max(0, productItems.length - newVisibleItems);
        }
        updateCarousel();
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would typically send the form data to a server
        alert('Thank you for your message! We will contact you soon.');
        this.reset();
    });
}