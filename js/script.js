/* Création d'une image placeholder en SVG */
function createPlaceholderSVG(width, height, text, bgColor, textColor) {
    const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${bgColor}"/>
        <text x="50%" y="50%" font-family="Arial" font-size="24" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${text}</text>
    </svg>`;
    
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

// Créer des placeholders pour chaque section
const placeholders = [
    { id: 'hero-bg', text: 'IA en Médecine', width: 1200, height: 600, bgColor: '#6a0dad', textColor: '#ffffff' },
    { id: 'ia-evolution', text: 'Évolution de l\'IA en médecine', width: 600, height: 400, bgColor: '#0077b6', textColor: '#ffffff' },
    { id: 'diagnostic-ia', text: 'Diagnostic assisté par IA', width: 600, height: 400, bgColor: '#0077b6', textColor: '#ffffff' },
    { id: 'suivi-patient', text: 'Suivi patient intelligent', width: 600, height: 400, bgColor: '#0077b6', textColor: '#ffffff' },
    { id: 'automatisation-cr', text: 'Automatisation des comptes rendus', width: 600, height: 400, bgColor: '#0077b6', textColor: '#ffffff' },
    { id: 'ethique-ia', text: 'Enjeux éthiques de l\'IA', width: 600, height: 400, bgColor: '#0077b6', textColor: '#ffffff' }
];

// Remplacer les images manquantes par des placeholders
window.addEventListener('DOMContentLoaded', () => {
    // Remplacer l'image d'arrière-plan du hero
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroSection.style.backgroundImage = `linear-gradient(rgba(106, 13, 173, 0.8), rgba(0, 119, 182, 0.8)), url('${createPlaceholderSVG(1200, 600, 'IA en Médecine', '#6a0dad', '#ffffff')}')`;
    }
    
    // Remplacer les images de section
    document.querySelectorAll('.section-image').forEach(img => {
        const section = img.getAttribute('alt').toLowerCase();
        const placeholder = placeholders.find(p => section.includes(p.text.toLowerCase()));
        
        if (placeholder) {
            img.src = createPlaceholderSVG(placeholder.width, placeholder.height, placeholder.text, placeholder.bgColor, placeholder.textColor);
        }
    });
});

// Fonctionnalité de navigation fluide
document.addEventListener('DOMContentLoaded', function() {
    // Animation de défilement fluide pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation d'apparition au défilement
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Navigation responsive
    const createMobileMenu = () => {
        const nav = document.querySelector('nav');
        const menuButton = document.createElement('button');
        menuButton.classList.add('mobile-menu-button');
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        
        const header = document.querySelector('header');
        header.insertBefore(menuButton, nav);
        
        menuButton.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuButton.classList.toggle('active');
        });
    };

    // Appliquer uniquement sur mobile
    if (window.innerWidth < 768) {
        createMobileMenu();
    }

    // Ajout de styles dynamiques
    const addDynamicStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            .fade-in {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .fade-in.visible {
                opacity: 1;
                transform: translateY(0);
            }
            
            .mobile-menu-button {
                display: none;
            }
            
            @media (max-width: 768px) {
                .mobile-menu-button {
                    display: block;
                    background: var(--secondary-color);
                    color: white;
                    border: none;
                    font-size: 1.5rem;
                    padding: 10px 15px;
                    cursor: pointer;
                    position: absolute;
                    right: 15px;
                    top: 15px;
                    z-index: 1001;
                    border-radius: 4px;
                }
                
                .mobile-menu-button.active {
                    background: var(--accent-color);
                }
                
                nav {
                    display: none;
                }
                
                nav.active {
                    display: block;
                }
            }
        `;
        document.head.appendChild(style);
    };
    
    addDynamicStyles();
});
