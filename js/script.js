var typed = new Typed(".multiple-text",{
    strings:["Software engineer","Web developer"],
    typeSpeed:100,
    backSpeed:100,
    backDelay:100,
    loop:true
})

// DOM Elements
const menuBtn = document.querySelector('.menu-btn');
const navbar = document.querySelector('.navbar');
const scrollProgress = document.querySelector('.scroll-progress');
const sectionDots = document.querySelectorAll('.section-dot');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

// Menu Toggle
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navbar.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !menuBtn.contains(e.target)) {
        menuBtn.classList.remove('active');
        navbar.classList.remove('active');
    }
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Active Section Detection
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            updateActiveSection(id);
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Update Active Section
function updateActiveSection(sectionId) {
    // Update navigation links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });

    // Update section dots
    sectionDots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('data-section') === sectionId) {
            dot.classList.add('active');
        }
    });
}

// Smooth Scroll for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            // Close mobile menu if open
            menuBtn.classList.remove('active');
            navbar.classList.remove('active');
        }
    });
});

// Smooth Scroll for Section Dots
sectionDots.forEach(dot => {
    dot.addEventListener('click', () => {
        const targetId = dot.getAttribute('data-section');
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Header scroll effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(31, 36, 45, 0.95)';
    } else {
        header.style.background = 'transparent';
    }
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-progress');
const animateSkills = () => {
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            bar.style.width = bar.parentElement.getAttribute('data-level') + '%';
        }
    });
};

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

// Section fade-in-on-scroll animation
const revealSection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
            entry.target.classList.remove('section-hidden');
            observer.unobserve(entry.target);
        }
    });
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null, // viewport
    threshold: 0.15, // 15% of the section must be visible to trigger
});

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Loading animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-wrapper');
    if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.remove();
        }, 500);
    }
});