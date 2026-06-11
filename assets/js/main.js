/*=============== LOADER ===============*/
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => { preloader.style.display = 'none'; }, 500);
        }, 2000);
    }
});

/*=============== HAMBURGER MENU ===============*/
const hamburger  = document.querySelector('.hamburger');
const navMenu2   = document.querySelector('.nav-menu');
const navLinks   = document.querySelectorAll('.nav-link');

if (hamburger && navMenu2) {
    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('active');
        navMenu2.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu2.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}

/*=============== SCROLL HEADER ===============*/
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY >= 50);
}, { passive: true });

/*=============== ACTIVE NAV LINK ON SCROLL ===============*/
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
        const top    = section.offsetTop;
        const height = section.offsetHeight;
        const id     = section.getAttribute('id');
        const link   = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });

/*=============== SCROLL TO TOP ===============*/
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/*=============== TOAST ===============*/
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => { toast.className = 'toast'; }, 4000);
}

/*=============== CONTACT FORM — feedback visuel ===============*/
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        const orig = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
        btn.disabled = true;
        btn.style.background = 'linear-gradient(135deg,#22c55e,#16a34a)';
        showToast('Message envoyé avec succès !');
        setTimeout(() => {
            contactForm.reset();
            btn.innerHTML = orig;
            btn.disabled = false;
            btn.style.background = '';
        }, 3000);
    });
}

/*=============== THREE.JS — fond de particules fixe ===============*/
let scene, camera, renderer, particles;

function initThreeJS() {
    scene  = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const canvas = document.getElementById('three-canvas');
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    createParticles();
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
    const material = new THREE.PointsMaterial({ color: 0xff6b35, size: 0.05 });
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

window.addEventListener('load', () => {
    setTimeout(() => {
        if (typeof THREE !== 'undefined') initThreeJS();
    }, 2500);
});

window.addEventListener('resize', () => {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}, { passive: true });

/*=============== PORTFOLIO FILTERS ===============*/
const filterBtns     = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        portfolioItems.forEach(item => {
            const show = filter === 'all' || item.getAttribute('data-category') === filter;
            item.style.display = show ? 'block' : 'none';
            if (show) item.style.animation = 'fadeInUp 0.5s ease forwards';
        });
    });
});

/*=============== SCROLL REVEAL ===============*/
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({ origin: 'top', distance: '60px', duration: 2000, delay: 200, reset: true });

    sr.reveal('.hero-title',        { delay: 300 });
    sr.reveal('.hero-description',  { delay: 400 });
    sr.reveal('.hero-buttons',      { delay: 500 });
    sr.reveal('.section-title',     { delay: 200 });
    sr.reveal('.section-subtitle',  { delay: 300 });
    sr.reveal('.about-image',       { origin: 'left',   delay: 300 });
    sr.reveal('.about-text',        { origin: 'right',  delay: 300 });
    sr.reveal('.portfolio-item',    { interval: 100,    origin: 'bottom' });
    sr.reveal('.service-card',      { interval: 200,    origin: 'bottom' });
    sr.reveal('.contact-info',      { origin: 'left',   delay: 300 });
    sr.reveal('.contact-form',      { origin: 'right',  delay: 300 });
    sr.reveal('.comments-stats',    { delay: 200 });
    sr.reveal('.comment-form-wrapper', { origin: 'bottom', delay: 300 });
}

/*=============== COMMENTS SYSTEM ===============*/
const STORAGE_KEY = 'artcode_comments_v1';

const SEED_COMMENTS = [
    {
        id: 1,
        name: 'Amina Traoré',
        service: 'Portrait Studio',
        rating: 5,
        message: "Johann a su capturer exactement ce que je voulais. Les photos sont magnifiques, l'ambiance était détendue et très professionnelle. Je recommande vivement !",
        date: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString()
    },
    {
        id: 2,
        name: 'Moussa Ouédraogo',
        service: 'Événement Corporate',
        rating: 5,
        message: "Couverture impeccable de notre séminaire annuel. Les photos reflètent parfaitement l'énergie de l'événement. Très professionnel et ponctuel.",
        date: new Date(Date.now() - 21 * 24 * 3600 * 1000).toISOString()
    },
    {
        id: 3,
        name: 'Fatoumata Diallo',
        service: 'Mariage',
        rating: 5,
        message: "Nos photos de mariage sont un vrai trésor. Chaque cliché raconte notre histoire avec une sensibilité rare. Merci du fond du cœur !",
        date: new Date(Date.now() - 45 * 24 * 3600 * 1000).toISOString()
    }
];

function loadComments() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [...SEED_COMMENTS];
    } catch { return [...SEED_COMMENTS]; }
}

function saveComments(comments) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(comments)); } catch {}
}

function getInitials(name) {
    return name.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
}

function formatDate(iso) {
    const diff  = Date.now() - new Date(iso).getTime();
    const mins  = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days  = Math.floor(diff / 86400000);
    if (mins  < 1)  return "À l'instant";
    if (mins  < 60) return `Il y a ${mins} min`;
    if (hours < 24) return `Il y a ${hours} h`;
    if (days  === 1) return 'Hier';
    if (days  < 30) return `Il y a ${days} jours`;
    return `Il y a ${Math.floor(days / 30)} mois`;
}

function renderStars(rating) {
    return Array.from({ length: 5 }, (_, i) =>
        `<i class="fas fa-star${i < rating ? '' : ' empty'}"></i>`
    ).join('');
}

function escapeHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
}

function createCommentCard(comment) {
    const article = document.createElement('article');
    article.className = 'comment-card';
    article.innerHTML = `
        <div class="comment-top">
            <div class="comment-avatar" aria-hidden="true">${getInitials(comment.name)}</div>
            <div class="comment-meta">
                <div class="comment-author">${escapeHtml(comment.name)}</div>
                ${comment.service ? `<span class="comment-service">${escapeHtml(comment.service)}</span>` : ''}
            </div>
            <time class="comment-date" datetime="${comment.date}">${formatDate(comment.date)}</time>
        </div>
        <div class="comment-stars" aria-label="Note : ${comment.rating} sur 5">${renderStars(comment.rating)}</div>
        <p class="comment-text">${escapeHtml(comment.message)}</p>`;
    return article;
}

function updateStats(comments) {
    const totalEl    = document.getElementById('totalComments');
    const avgEl      = document.getElementById('avgRating');
    const avgStarsEl = document.getElementById('avgStars');
    if (!totalEl) return;
    totalEl.textContent = comments.length;
    if (!comments.length) { avgEl.textContent = '—'; avgStarsEl.innerHTML = ''; return; }
    const avg = comments.reduce((s, c) => s + c.rating, 0) / comments.length;
    avgEl.textContent    = avg.toFixed(1);
    avgStarsEl.innerHTML = renderStars(Math.round(avg));
}

function renderComments() {
    const list  = document.getElementById('commentsList');
    const noMsg = document.getElementById('noComments');
    if (!list) return;
    const comments = loadComments();
    list.querySelectorAll('.comment-card').forEach(el => el.remove());
    updateStats(comments);
    if (!comments.length) { if (noMsg) noMsg.style.display = 'block'; return; }
    if (noMsg) noMsg.style.display = 'none';
    [...comments].reverse().forEach(c => list.appendChild(createCommentCard(c)));
}

function initCommentForm() {
    /* --- Étoiles interactives --- */
    const starInput   = document.getElementById('starInput');
    const ratingInput = document.getElementById('cRating');
    if (starInput && ratingInput) {
        const stars = starInput.querySelectorAll('.star-btn');
        stars.forEach((star, i) => {
            star.addEventListener('mouseenter', () =>
                stars.forEach((s, j) => s.classList.toggle('hovered', j <= i))
            );
            star.addEventListener('click', () => {
                const val = +star.dataset.val;
                ratingInput.value = val;
                stars.forEach((s, j) => {
                    s.classList.toggle('selected', j < val);
                    s.classList.remove('hovered');
                });
            });
        });
        starInput.addEventListener('mouseleave', () =>
            stars.forEach(s => s.classList.remove('hovered'))
        );
    }

    /* --- Compteur de caractères --- */
    const msgInput  = document.getElementById('cMessage');
    const charCount = document.getElementById('charCount');
    if (msgInput && charCount) {
        msgInput.addEventListener('input', () => {
            const len = msgInput.value.length;
            charCount.textContent = len;
            charCount.parentElement.classList.toggle('warn', len > 450);
        });
    }

    /* --- Soumission --- */
    const form = document.getElementById('commentForm');
    if (!form) return;
    form.addEventListener('submit', e => {
        e.preventDefault();
        const name    = document.getElementById('cName').value.trim();
        const service = document.getElementById('cService').value;
        const rating  = +document.getElementById('cRating').value;
        const message = document.getElementById('cMessage').value.trim();

        if (!name)    { showToast('Veuillez entrer votre nom.', 'error');        return; }
        if (rating < 1) { showToast('Veuillez sélectionner une note.', 'error'); return; }
        if (!message) { showToast('Veuillez écrire un commentaire.', 'error');   return; }

        const comments = loadComments();
        comments.push({ id: Date.now(), name, service, rating, message, date: new Date().toISOString() });
        saveComments(comments);
        renderComments();

        form.reset();
        document.getElementById('cRating').value = 0;
        document.querySelectorAll('.star-btn').forEach(s => s.classList.remove('selected', 'hovered'));
        if (charCount) { charCount.textContent = '0'; charCount.parentElement.classList.remove('warn'); }

        showToast('Merci pour votre avis ! Votre commentaire a été publié.', 'success');
        document.getElementById('commentsList').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

/* --- Initialisation --- */
document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem(STORAGE_KEY)) saveComments(SEED_COMMENTS);
    renderComments();
    initCommentForm();
});
