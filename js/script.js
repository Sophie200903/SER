} else if (type === 'success') {
            alertDiv.style.backgroundColor = '#d4edda';
            alertDiv.style.color = '#155724';
            alertDiv.style.border = '1px solid #c3e6cb';
        }
        
        // Añadir la alerta al cuerpo del documento
        document.body.appendChild(alertDiv);
        
        // Remover la alerta después de 3 segundos
        setTimeout(function() {
            alertDiv.style.opacity = '0';
            alertDiv.style.transition = 'opacity 0.5s ease';
            
            setTimeout(function() {
                document.body.removeChild(alertDiv);
            }, 500);
        }, 3000);
    }

    // Animación de aparición para elementos al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .about-text p, .about-image, .mv-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate-in');
            }
        });
    };

    // Añadir clase para elementos que se animarán
    const elementsToAnimate = document.querySelectorAll('.service-card, .about-text p, .about-image, .mv-card');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Añadir clase para elementos animados
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        </style>
    `);

    // Iniciar animación al cargar y al hacer scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Añadir efecto hover a las tarjetas de servicio para dispositivos que no son táctiles
    if (!('ontouchstart' in window)) {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            });
        });
    }

    // Contador para estadísticas (simulado)
    function startCounter() {
        if (document.querySelector('.counter')) {
            const counters = document.querySelectorAll('.counter');
            
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 segundos
                const step = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                requestAnimationFrame(updateCounter);
            });
        }
    }

    // Observer para iniciar contadores cuando sean visibles
    if ('IntersectionObserver' in window && document.querySelector('.counter')) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        document.querySelectorAll('.counters-container').forEach(section => {
            observer.observe(section);
        });
    }

    // Cambio de tema oscuro/claro (opcional)
    const themeToggle = document.createElement('button');
    themeToggle.id = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.style.position = 'fixed';
    themeToggle.style.bottom = '20px';
    themeToggle.style.right = '20px';
    themeToggle.style.width = '50px';
    themeToggle.style.height = '50px';
    themeToggle.style.borderRadius = '50%';
    themeToggle.style.backgroundColor = 'var(--primary-color)';
    themeToggle.style.color = 'white';
    themeToggle.style.border = 'none';
    themeToggle.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    themeToggle.style.cursor = 'pointer';
    themeToggle.style.zIndex = '999';
    themeToggle.style.display = 'flex';
    themeToggle.style.alignItems = 'center';
    themeToggle.style.justifyContent = 'center';
    themeToggle.style.fontSize = '1.2rem';
    
    document.body.appendChild(themeToggle);
    
    // Verificar tema guardado
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
    
    // Estilos para modo oscuro
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            body.dark-mode {
                background-color: #121212;
                color: #e0e0e0;
            }
            
            body.dark-mode header {
                background-color: #1f1f1f;
                box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
            }
            
            body.dark-mode .logo h1 {
                color: var(--primary-color);
            }
            
            body.dark-mode .logo p,
            body.dark-mode .menu a {
                color: #e0e0e0;
            }
            
            body.dark-mode .section-title {
                color: #e0e0e0;
            }
            
            body.dark-mode .servicios {
                background-color: #1a1a1a;
            }
            
            body.dark-mode .service-card,
            body.dark-mode .mv-card,
            body.dark-mode .contact-form {
                background-color: #2d2d2d;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                color: #e0e0e0;
            }
            
            body.dark-mode .service-card h3,
            body.dark-mode .mv-card h2 {
                color: var(--primary-color);
            }
            
            body.dark-mode .mision-vision {
                background-color: #1a1a1a;
            }
            
            body.dark-mode .form-group input,
            body.dark-mode .form-group select,
            body.dark-mode .form-group textarea {
                background-color: #3d3d3d;
                border-color: #4d4d4d;
                color: #e0e0e0;
            }
            
            body.dark-mode footer {
                background-color: #1f1f1f;
            }
        </style>
    `);
});
