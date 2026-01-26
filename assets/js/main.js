/*=============== LOADER ===============*/
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 2000); // Loader visible pendant 2 secondes
    }
});

/*=============== SHOW MENU ===============*/
const navMenu=document.getElementById('nav-menu'),
      navToggle=document.getElementById('nav-toggle'),
      navClose=document.getElementById('nav-close')

      /* Menu show */
      if(navToggle){
        navToggle.addEventListener('click',()=>{
            navMenu.classList.add('show-menu')
        })
      }

    //   hidden menu
    if(navClose){
        navClose.addEventListener('click',()=>{navMenu.classList.remove('show-menu')})
    }

/*=============== REMOVE MENU MOBILE ===============*/
const navLink=document.querySelectorAll('.nav__link')

const linkAction=()=>{
    const navMenu=document.getElementById('nav-menu')
    navLink.forEach(n=>n.addEventListener('click',linkAction))

}
// CHANGE BACKGROUND HEADER

const scrollHeader=()=>{
    const header=document.getElementById('header')
    this.scrollY>=50?header.classList.add('scroll-header')
                    : header.classList.remove('scroll-header')
}

/*=============== ADD BLUR HEADER ===============*/


/*=============== EMAIL JS ===============*/


/*=============== SHOW SCROLL UP ===============*/ 


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/


/*=============== THREE.JS INITIALIZATION ===============*/
let scene, camera, renderer, particles;

function initThreeJS() {
    // Création de la scène
    scene = new THREE.Scene();
    
    // Caméra
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Ajouter le canvas au hero
    const heroSection = document.querySelector('.home');
    if (heroSection) {
        heroSection.appendChild(renderer.domElement);
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = '0';
        renderer.domElement.style.left = '0';
        renderer.domElement.style.zIndex = '-1';
    }
    
    // Créer des particules
    createParticles();
    
    // Animation
    animate();
}

function createParticles() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    
    for (let i = 0; i < 1000; i++) {
        vertices.push(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
        );
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    
    const material = new THREE.PointsMaterial({
        color: 0x00ff88,
        size: 0.05
    });
    
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

function animate() {
    requestAnimationFrame(animate);
    
    if (particles) {
        particles.rotation.x += 0.001;
        particles.rotation.y += 0.002;
    }
    
    renderer.render(scene, camera);
}

// Initialiser Three.js après le chargement
window.addEventListener('load', () => {
    setTimeout(() => {
        if (typeof THREE !== 'undefined') {
            initThreeJS();
        }
    }, 2500);
});

// Responsive
window.addEventListener('resize', () => {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
});

/*=============== PORTFOLIO FILTERS ===============*/
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(button => button.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 2000,
        delay: 200,
        reset: true
    });

    // Hero animations
    sr.reveal('.hero-title', { delay: 300 });
    sr.reveal('.hero-description', { delay: 400 });
    sr.reveal('.hero-buttons', { delay: 500 });

    // Section animations
    sr.reveal('.section-title', { delay: 200 });
    sr.reveal('.section-subtitle', { delay: 300 });

    // About section
    sr.reveal('.about-image', { origin: 'left', delay: 300 });
    sr.reveal('.about-text', { origin: 'right', delay: 300 });

    // Portfolio section
    sr.reveal('.portfolio-item', { 
        interval: 100,
        origin: 'bottom'
    });

    // Services section
    sr.reveal('.service-card', {
        interval: 200,
        origin: 'bottom'
    });

    // Contact section
    sr.reveal('.contact-info', { origin: 'left', delay: 300 });
    sr.reveal('.contact-form', { origin: 'right', delay: 300 });
}
