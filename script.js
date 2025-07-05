// Inicialização do AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Detectar se é dispositivo móvel
    const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Configurações do AOS otimizadas para mobile
    AOS.init({
        duration: isMobile ? 600 : 800, // Animações mais rápidas no mobile
        easing: 'ease-out-cubic',
        once: true, // Anima apenas uma vez
        offset: isMobile ? 50 : 120, // Offset menor para mobile
        delay: 0,
        disable: false, // Não desabilitar no mobile
        startEvent: 'DOMContentLoaded',
        initClassName: 'aos-init',
        animatedClassName: 'aos-animate',
        useClassNames: false,
        disableMutationObserver: false,
        debounceDelay: 50,
        throttleDelay: 99,
        // Configurações específicas para mobile
        mobile: {
            disable: false, // Manter animações no mobile
            duration: 600,
            offset: 50
        }
    });

    // Recarregar AOS quando a orientação mudar (mobile)
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            AOS.refresh();
        }, 500);
    });

    // Recarregar AOS no resize da janela
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            AOS.refresh();
        }, 250);
    });
});

// Menu Mobile
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const mobileNav = document.getElementById('mobile-nav');
    const navbar = document.getElementById('navbar');
    
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            
            mobileNav.classList.toggle('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
            
            // Trocar ícone
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Fechar menu ao clicar em um link
        const mobileLinks = mobileNav.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }

    // Navbar scroll effect
    if (navbar) {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                navbar.classList.add('navbar-scroll');
            } else {
                navbar.classList.remove('navbar-scroll');
            }
            
            lastScrollTop = scrollTop;
        }, { passive: true });
    }
});

// Smooth scroll para links internos
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const offsetTop = target.offsetTop - 80; // Compensar altura do navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Lazy loading para imagens (otimização mobile)
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        // Observar todas as imagens com data-src
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Performance: Debounce para eventos de scroll
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        
        if (callNow) func.apply(context, args);
    };
}

// Otimização para touch events em mobile
document.addEventListener('DOMContentLoaded', function() {
    // Melhorar performance de touch em botões
    const buttons = document.querySelectorAll('button, .btn-primary, a[role="button"]');
    
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        }, { passive: true });
        
        button.addEventListener('touchend', function() {
            this.style.transform = '';
        }, { passive: true });
    });
});

// Preload de imagens críticas para melhor performance
document.addEventListener('DOMContentLoaded', function() {
    const criticalImages = [
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Detectar quando o usuário está offline (PWA-ready)
window.addEventListener('online', function() {
    console.log('Conexão restaurada');
});

window.addEventListener('offline', function() {
    console.log('Sem conexão com a internet');
});

// Otimização: Remover animações se o usuário preferir movimento reduzido
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Desabilitar todas as animações CSS
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
    
    // Reconfigurar AOS para movimento reduzido
    AOS.init({
        duration: 0,
        once: true,
        disable: true
    });
}