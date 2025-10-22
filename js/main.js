// Funcionalidad del menú contextual
document.addEventListener('DOMContentLoaded', () => {
    const contextMenuTrigger = document.getElementById('context-menu-trigger');
    const contextMenuDropdown = document.getElementById('context-menu-dropdown');

    if (contextMenuTrigger && contextMenuDropdown) {
        // Función para abrir el menú
        function openContextMenu() {
            contextMenuTrigger.classList.add('active');
            contextMenuDropdown.classList.add('active');
        }

        // Función para cerrar el menú
        function closeContextMenu() {
            contextMenuTrigger.classList.remove('active');
            contextMenuDropdown.classList.remove('active');
        }

        // Toggle del menú contextual
        contextMenuTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            if (contextMenuDropdown.classList.contains('active')) {
                closeContextMenu();
            } else {
                openContextMenu();
            }
        });

        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.menu-link').forEach(link => {
            link.addEventListener('click', () => {
                closeContextMenu();
            });
        });

        // Cerrar menú al hacer clic fuera de él
        document.addEventListener('click', (e) => {
            if (!contextMenuTrigger.contains(e.target) && !contextMenuDropdown.contains(e.target)) {
                closeContextMenu();
            }
        });

        // Cerrar menú al redimensionar la ventana
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeContextMenu();
            }
        });

        // Cerrar menú con la tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && contextMenuDropdown.classList.contains('active')) {
                closeContextMenu();
            }
        });

        // Prevenir que el menú se cierre al hacer clic dentro del dropdown
        contextMenuDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
});

// Mantener la funcionalidad existente del cambio de idioma
document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        es: {
            nav_home: "Inicio",
            nav_about: "Sobre Mí",
            nav_projects: "Proyectos",
            nav_skills: "Habilidades",
            nav_education: "Educación",
            nav_contact: "Contacto",
            hero_greeting: "¡Hola! Soy",
            hero_subtitle: "Desarrollador Full Stack",
            hero_cta_projects: "Ver Proyectos",
            hero_cta_cv: "Descargar CV",
            about_title: "Sobre Mí",
            projects_title: "Proyectos Principales",
            skills_title: "Habilidades Técnicas",
            education_title: "Formación Académica",
            contact_title: "Contacto",
            footer_rights: "Todos los derechos reservados"
        },
        en: {
            nav_home: "Home",
            nav_about: "About",
            nav_projects: "Projects",
            nav_skills: "Skills",
            nav_education: "Education",
            nav_contact: "Contact",
            hero_greeting: "Hi! I'm",
            hero_subtitle: "Full Stack Developer",
            hero_cta_projects: "View Projects",
            hero_cta_cv: "Download CV",
            about_title: "About Me",
            projects_title: "Main Projects",
            skills_title: "Technical Skills",
            education_title: "Education",
            contact_title: "Contact",
            footer_rights: "All rights reserved"
        },
        fr: {
            nav_home: "Accueil",
            nav_about: "À Propos",
            nav_projects: "Projets",
            nav_skills: "Compétences",
            nav_education: "Formation",
            nav_contact: "Contact",
            hero_greeting: "Salut! Je suis",
            hero_subtitle: "Développeur Full Stack",
            hero_cta_projects: "Voir les Projets",
            hero_cta_cv: "Télécharger CV",
            about_title: "À Propos de Moi",
            projects_title: "Projets Principaux",
            skills_title: "Compétences Techniques",
            education_title: "Formation",
            contact_title: "Contact",
            footer_rights: "Tous droits réservés"
        }
    };

    // Función para establecer el idioma
    function setLanguage(lang) {
        document.documentElement.setAttribute('lang', lang);
        localStorage.setItem('preferredLanguage', lang);

        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (translations[lang] && translations[lang][key]) {
                element.placeholder = translations[lang][key];
            }
        });
    }

    // Configurar los event listeners para el cambio de idioma
    document.querySelectorAll('.language-switcher [data-lang]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = link.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    // Establecer el idioma preferido al cargar la página
    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'es';
    setLanguage(preferredLanguage);
});

// Detener la animación del fondo después de 12 segundos
setTimeout(() => {
    const aurora = document.querySelector('.aurora-background');
    if (aurora) {
        aurora.style.animation = 'fadeOut 2s forwards';
    }
}, 12000);

// ===== FUNCIONALIDAD DEL BUSCADOR =====
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchClear = document.getElementById('search-clear');
    const searchResults = document.getElementById('search-results');
    const searchResultsList = document.getElementById('search-results-list');
    const resultsCount = document.getElementById('results-count');

    // Base de datos de contenido para búsqueda
    const searchDatabase = [
        {
            title: "Inicio",
            description: "Página principal del portfolio con información de presentación",
            section: "Navegación",
            url: "#inicio",
            keywords: ["inicio", "home", "principal", "presentación", "vilomar", "desarrollador"]
        },
        {
            title: "Sobre Mí",
            description: "Información personal y profesional, experiencia y trayectoria",
            section: "Información Personal",
            url: "#sobre-mi",
            keywords: ["sobre", "about", "personal", "experiencia", "trayectoria", "biografía"]
        },
        {
            title: "Habilidades",
            description: "Competencias técnicas, lenguajes de programación y tecnologías",
            section: "Competencias",
            url: "#habilidades",
            keywords: ["habilidades", "skills", "tecnologías", "programación", "competencias", "javascript", "html", "css", "react", "node"]
        },
        {
            title: "Proyectos",
            description: "Portfolio de trabajos realizados y proyectos destacados",
            section: "Portfolio",
            url: "#proyectos",
            keywords: ["proyectos", "projects", "portfolio", "trabajos", "desarrollos", "aplicaciones"]
        },
        {
            title: "Formación",
            description: "Educación académica, cursos y certificaciones obtenidas",
            section: "Educación",
            url: "#formacion",
            keywords: ["formación", "education", "estudios", "académica", "universidad", "cursos"]
        },
        {
            title: "Certificaciones",
            description: "Certificados profesionales y reconocimientos técnicos",
            section: "Logros",
            url: "#certificaciones",
            keywords: ["certificaciones", "certificates", "certificados", "reconocimientos", "logros"]
        },
        {
            title: "Contacto",
            description: "Información de contacto y formulario para comunicarse",
            section: "Comunicación",
            url: "#contacto",
            keywords: ["contacto", "contact", "comunicación", "email", "teléfono", "mensaje"]
        },
        {
            title: "Descargar CV",
            description: "Curriculum vitae en formato PDF para descarga",
            section: "Documentos",
            url: "docs/cv.pdf",
            keywords: ["cv", "curriculum", "resume", "descargar", "pdf", "documento"]
        },
        {
            title: "Proyecto MOVIBUSS",
            description: "Sistema de gestión de transporte público desarrollado",
            section: "Proyectos",
            url: "#proyectos",
            keywords: ["movibuss", "transporte", "público", "gestión", "sistema", "aplicación"]
        },
        {
            title: "Proyecto Hotel",
            description: "Sistema de reservas y gestión hotelera",
            section: "Proyectos", 
            url: "#proyectos",
            keywords: ["hotel", "reservas", "gestión", "hotelera", "sistema", "booking"]
        }
    ];

    // Función para realizar la búsqueda
    function performSearch(query) {
        if (!query || query.trim().length < 2) {
            hideSearchResults();
            return;
        }

        const searchTerm = query.toLowerCase().trim();
        const results = searchDatabase.filter(item => {
            return item.title.toLowerCase().includes(searchTerm) ||
                   item.description.toLowerCase().includes(searchTerm) ||
                   item.section.toLowerCase().includes(searchTerm) ||
                   item.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm));
        });

        displaySearchResults(results, searchTerm);
    }

    // Función para mostrar los resultados
    function displaySearchResults(results, searchTerm) {
        if (results.length === 0) {
            showNoResults(searchTerm);
            return;
        }

        resultsCount.textContent = `${results.length} resultado${results.length !== 1 ? 's' : ''}`;
        
        searchResultsList.innerHTML = results.map(result => `
            <a href="${result.url}" class="search-result-item" onclick="hideSearchResults()">
                <div class="search-result-icon">
                    ${getIconForSection(result.section)}
                </div>
                <div class="search-result-content">
                    <div class="search-result-title">${highlightText(result.title, searchTerm)}</div>
                    <div class="search-result-description">${highlightText(result.description, searchTerm)}</div>
                    <div class="search-result-section">${result.section}</div>
                </div>
            </a>
        `).join('');

        showSearchResults();
    }

    // Función para mostrar mensaje cuando no hay resultados
    function showNoResults(searchTerm) {
        resultsCount.textContent = '0 resultados';
        searchResultsList.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                        <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
                        <path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2"/>
                        <line x1="11" y1="8" x2="11" y2="14" stroke="currentColor" stroke-width="2"/>
                        <line x1="8" y1="11" x2="14" y2="11" stroke="currentColor" stroke-width="2"/>
                    </svg>
                </div>
                <p>No se encontraron resultados para "<strong>${searchTerm}</strong>"</p>
                <p>Intenta con otros términos de búsqueda</p>
            </div>
        `;
        showSearchResults();
    }

    // Función para resaltar texto coincidente
    function highlightText(text, searchTerm) {
        if (!searchTerm) return text;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<mark style="background: var(--accent-color); color: white; padding: 0 2px; border-radius: 2px;">$1</mark>');
    }

    // Función para obtener icono según la sección
    function getIconForSection(section) {
        const icons = {
            'Navegación': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" stroke-width="2"/></svg>',
            'Información Personal': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/></svg>',
            'Competencias': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 16V8C20.9996 7.64928 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64928 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="currentColor" stroke-width="2"/></svg>',
            'Portfolio': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"/><circle cx="9" cy="9" r="2" stroke="currentColor" stroke-width="2"/><path d="M21 15L16 10L5 21" stroke="currentColor" stroke-width="2"/></svg>',
            'Educación': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M22 10V6C22 5.46957 21.7893 4.96086 21.4142 4.58579C21.0391 4.21071 20.5304 4 20 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V10C2 10.5304 2.21071 11.0391 2.58579 11.4142C2.96086 11.7893 3.46957 12 4 12H20C20.5304 12 21.0391 11.7893 21.4142 11.4142C21.7893 11.0391 22 10.5304 22 10Z" stroke="currentColor" stroke-width="2"/></svg>',
            'Logros': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2"/></svg>',
            'Comunicación': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" stroke-width="2"/><polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2"/></svg>',
            'Documentos': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="2"/></svg>',
            'Proyectos': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"/><circle cx="9" cy="9" r="2" stroke="currentColor" stroke-width="2"/><path d="M21 15L16 10L5 21" stroke="currentColor" stroke-width="2"/></svg>'
        };
        return icons[section] || icons['Navegación'];
    }

    // Función para mostrar resultados
    function showSearchResults() {
        searchResults.style.display = 'block';
    }

    // Función para ocultar resultados
    function hideSearchResults() {
        searchResults.style.display = 'none';
    }

    // Event listeners
    if (searchInput) {
        // Búsqueda en tiempo real
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value;
            
            // Mostrar/ocultar botón de limpiar
            if (query.length > 0) {
                searchClear.style.display = 'flex';
            } else {
                searchClear.style.display = 'none';
                hideSearchResults();
            }

            // Realizar búsqueda con debounce
            clearTimeout(searchInput.searchTimeout);
            searchInput.searchTimeout = setTimeout(() => {
                performSearch(query);
            }, 300);
        });

        // Búsqueda al presionar Enter
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(searchInput.value);
            }
            
            // Cerrar resultados con Escape
            if (e.key === 'Escape') {
                hideSearchResults();
                searchInput.blur();
            }
        });
    }

    // Botón de búsqueda
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            performSearch(searchInput.value);
        });
    }

    // Botón de limpiar
    if (searchClear) {
        searchClear.addEventListener('click', () => {
            searchInput.value = '';
            searchClear.style.display = 'none';
            hideSearchResults();
            searchInput.focus();
        });
    }

    // Cerrar resultados al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            hideSearchResults();
        }
    });

    // Función global para ocultar resultados (usada en los enlaces)
    window.hideSearchResults = hideSearchResults;
});