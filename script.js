// Initialize AOS with adjusted settings
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 600,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
        disable: function() {
            return window.innerWidth < 768;
        }
    });

    // Add skip link for accessibility
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Pular para o conteúdo principal';
    document.body.insertBefore(skipLink, document.body.firstChild);
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scroll');
    } else {
        navbar.classList.remove('navbar-scroll');
    }
});

// Mobile menu toggle with accessibility
const mobileMenuBtn = document.getElementById('mobile-menu');
const mobileNav = document.getElementById('mobile-nav');

mobileMenuBtn.addEventListener('click', function() {
    const isExpanded = mobileNav.classList.contains('hidden');
    
    mobileNav.classList.toggle('hidden');
    
    // Update ARIA attributes
    mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
    
    const icon = mobileMenuBtn.querySelector('i');
    if (isExpanded) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        mobileMenuBtn.setAttribute('aria-label', 'Fechar menu mobile');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        mobileMenuBtn.setAttribute('aria-label', 'Abrir menu mobile');
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (!mobileMenuBtn.contains(e.target) && !mobileNav.contains(e.target)) {
        if (!mobileNav.classList.contains('hidden')) {
            mobileNav.classList.add('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            mobileMenuBtn.setAttribute('aria-label', 'Abrir menu mobile');
        }
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (!mobileNav.classList.contains('hidden')) {
                mobileNav.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                mobileMenuBtn.setAttribute('aria-label', 'Abrir menu mobile');
            }
            
            // Focus management for accessibility
            target.focus();
        }
    });
});

// Enhanced button interactions
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.style.transform = 'translateY(-1px) scale(1.02)';
        }
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    btn.addEventListener('mousedown', function() {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.style.transform = 'translateY(0) scale(0.98)';
        }
    });
    
    btn.addEventListener('mouseup', function() {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.style.transform = 'translateY(-1px) scale(1.02)';
        }
    });
});

// Form submission with validation
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form elements
    const name = this.querySelector('#name');
    const email = this.querySelector('#email');
    const phone = this.querySelector('#phone');
    const message = this.querySelector('#message');
    const submitBtn = this.querySelector('button[type="submit"]');
    
    // Simple form validation
    let isValid = true;
    const errors = [];
    
    // Validate name
    if (!name.value.trim()) {
        isValid = false;
        errors.push('Nome é obrigatório');
        name.style.borderColor = '#ff4444';
        name.setAttribute('aria-invalid', 'true');
    } else {
        name.style.borderColor = '#d4af37';
        name.setAttribute('aria-invalid', 'false');
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
        isValid = false;
        errors.push('E-mail válido é obrigatório');
        email.style.borderColor = '#ff4444';
        email.setAttribute('aria-invalid', 'true');
    } else {
        email.style.borderColor = '#d4af37';
        email.setAttribute('aria-invalid', 'false');
    }
    
    // Validate phone
    if (!phone.value.trim()) {
        isValid = false;
        errors.push('Telefone é obrigatório');
        phone.style.borderColor = '#ff4444';
        phone.setAttribute('aria-invalid', 'true');
    } else {
        phone.style.borderColor = '#d4af37';
        phone.setAttribute('aria-invalid', 'false');
    }
    
    if (isValid) {
        // Show success message
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-check mr-2" aria-hidden="true"></i>Enviado!';
        submitBtn.style.background = '#28a745';
        submitBtn.disabled = true;
        
        // Announce success to screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = 'Mensagem enviada com sucesso!';
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            this.reset();
            document.body.removeChild(announcement);
            
            // Reset validation styles
            [name, email, phone].forEach(field => {
                field.style.borderColor = '#d4af37';
                field.setAttribute('aria-invalid', 'false');
            });
        }, 3000);
    } else {
        // Announce errors to screen readers
        const errorAnnouncement = document.createElement('div');
        errorAnnouncement.setAttribute('aria-live', 'assertive');
        errorAnnouncement.setAttribute('aria-atomic', 'true');
        errorAnnouncement.className = 'sr-only';
        errorAnnouncement.textContent = `Erro no formulário: ${errors.join(', ')}`;
        document.body.appendChild(errorAnnouncement);
        
        setTimeout(() => {
            document.body.removeChild(errorAnnouncement);
        }, 3000);
    }
});

// Gallery lightbox effect with accessibility
document.querySelectorAll('.gallery-item').forEach((item, index) => {
    // Add keyboard support
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `Abrir imagem ${index + 1} em tela cheia`);
    
    const openLightbox = function() {
        const img = this.querySelector('img');
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-label', 'Visualização de imagem em tela cheia');
        
        modal.innerHTML = `
            <div class="relative max-w-4xl max-h-full p-4">
                <img src="${img.src}" alt="${img.alt}" class="max-w-full max-h-full object-contain rounded-lg">
                <button class="absolute top-4 right-4 text-white text-2xl hover:text-yellow-400 transition-colors" aria-label="Fechar visualização">
                    <i class="fas fa-times" aria-hidden="true"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Focus management
        const closeBtn = modal.querySelector('button');
        closeBtn.focus();
        
        // Close modal function
        const closeModal = () => {
            document.body.removeChild(modal);
            item.focus(); // Return focus to original item
        };
        
        // Close modal events
        modal.addEventListener('click', function(e) {
            if (e.target === modal || e.target.closest('button')) {
                closeModal();
            }
        });
        
        // Close with ESC key
        const handleKeydown = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleKeydown);
            }
        };
        document.addEventListener('keydown', handleKeydown);
    };
    
    item.addEventListener('click', openLightbox);
    item.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openLightbox.call(this);
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Trigger counter animations when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stats-card div:first-child');
            counters.forEach(counter => {
                const text = counter.textContent;
                const target = parseInt(text);
                if (!isNaN(target)) {
                    animateCounter(counter, target);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('#menu .grid.md\\:grid-cols-4');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add loading state to external links
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function() {
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2" aria-hidden="true"></i>Abrindo...';
        
        setTimeout(() => {
            this.innerHTML = originalText;
        }, 1000);
    });
});

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Keyboard navigation improvements
document.addEventListener('keydown', function(e) {
    // Escape key closes any open modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('[role="dialog"]');
        modals.forEach(modal => {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
        });
    }
});

// Add focus indicators for better accessibility
document.addEventListener('DOMContentLoaded', function() {
    // Add focus-visible polyfill behavior
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            if (!this.matches(':focus-visible')) {
                this.style.outline = 'none';
            }
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
        });
    });
});

// Announce page changes for screen readers
function announcePageChange(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        if (document.body.contains(announcement)) {
            document.body.removeChild(announcement);
        }
    }, 1000);
}

// Handle reduced motion preferences
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable AOS animations
    AOS.init({
        disable: true
    });
    
    // Remove floating animations
    document.querySelectorAll('.floating').forEach(element => {
        element.style.animation = 'none';
    });
    
    // Remove pulse glow animations
    document.querySelectorAll('.pulse-glow').forEach(element => {
        element.style.animation = 'none';
    });
}

// Error handling for failed image loads
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.alt = 'Imagem não pôde ser carregada';
        this.style.backgroundColor = '#2a2828';
        this.style.color = '#f5f5f5';
        this.style.display = 'flex';
        this.style.alignItems = 'center';
        this.style.justifyContent = 'center';
        this.style.fontSize = '14px';
        this.textContent = 'Imagem indisponível';
    });
});