function handleResize(elementID, text) {
    const element = document.getElementById(elementID);
    if (!element) return;

    if (window.innerWidth < 768) {
      element.innerHTML = text;
    } else {
      element.innerHTML = "<--";
    }
  }
  window.addEventListener("DOMContentLoaded", () => {
    handleResize("divi", "ꜛ");
    window.addEventListener("resize", () => handleResize("divi", "ꜛ"));
  });
  window.addEventListener("DOMContentLoaded", () => {
    handleResize("divi", "ꜛ");
    window.addEventListener("resize", () => handleResize("divi", "ꜛ"));
  });
  
// Handle mobile navigation
const nav = document.querySelector('.nav');
const menuToggle = document.createElement('button');
menuToggle.className = 'menu-toggle';
menuToggle.innerHTML = '☰';
document.querySelector('.Logo').appendChild(menuToggle);

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            nav.classList.remove('active');
        }
    });
});

// Theme toggle
const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle';
themeToggle.innerHTML = '🌓';
document.querySelector('.main-nav').appendChild(themeToggle);

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    themeToggle.innerHTML = document.body.classList.contains('light-theme') ? '🌙' : '🌓';
});

// Enhance video player
const video = document.querySelector('video');
if (video) {
    const controls = document.createElement('div');
    controls.className = 'video-controls';
    controls.innerHTML = `
        <button class="play-pause">▶️</button>
        <div class="progress">
            <div class="progress-bar"></div>
        </div>
        <button class="mute">🔊</button>
    `;
    video.parentNode.insertBefore(controls, video.nextSibling);

    const playPauseBtn = controls.querySelector('.play-pause');
    const progressBar = controls.querySelector('.progress-bar');
    const muteBtn = controls.querySelector('.mute');

    playPauseBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playPauseBtn.innerHTML = '⏸️';
        } else {
            video.pause();
            playPauseBtn.innerHTML = '▶️';
        }
    });

    video.addEventListener('timeupdate', () => {
        const progress = (video.currentTime / video.duration) * 100;
        progressBar.style.width = progress + '%';
    });

    muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        muteBtn.innerHTML = video.muted ? '🔇' : '🔊';
    });
}

// Add animation class to elements when they become visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.Heading, .PS, .BOT, .need').forEach(section => {
    observer.observe(section);
});

// Interactive BOT graph
const botData = document.querySelector('.BOT ul div');
if (botData) {
    const years = Array.from(botData.querySelectorAll('li')).map(li => {
        const [year, value] = li.textContent.trim().split(/\s+/);
        return { year, value: parseFloat(value) };
    });

    // Create canvas for interactive graph
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 400;
    canvas.style.width = '100%';
    canvas.style.height = 'auto';
    botData.parentNode.insertBefore(canvas, botData);

    const ctx = canvas.getContext('2d');
    
    // Draw interactive graph
    function drawGraph() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw axes
        ctx.beginPath();
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 2;
        ctx.moveTo(50, 350);
        ctx.lineTo(750, 350);
        ctx.moveTo(50, 50);
        ctx.lineTo(50, 350);
        ctx.stroke();

        // Plot points
        years.forEach((point, index) => {
            const x = 50 + (index * (700 / (years.length - 1)));
            const y = 350 - (point.value * 30);
            
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#00ffff';
            ctx.fill();
            
            // Add hover effect
            canvas.addEventListener('mousemove', (e) => {
                const rect = canvas.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;
                
                if (Math.abs(mouseX - x) < 10 && Math.abs(mouseY - y) < 10) {
                    ctx.beginPath();
                    ctx.arc(x, y, 8, 0, Math.PI * 2);
                    ctx.fillStyle = '#ff00ff';
                    ctx.fill();
                    
                    // Show tooltip
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
                    ctx.fillRect(x + 10, y - 30, 100, 30);
                    ctx.fillStyle = '#ffffff';
                    ctx.font = '14px Arial';
                    ctx.fillText(`${point.year}: ${point.value}`, x + 15, y - 10);
                }
            });
        });
    }

    drawGraph();
}

// Social media hover effects
document.querySelectorAll('.img a').forEach(link => {
    link.addEventListener('mouseover', () => {
        link.style.transform = 'scale(1.2) rotate(5deg)';
    });
    link.addEventListener('mouseout', () => {
        link.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Parallax scrolling effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.parallax').forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Typing animation for headings
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Apply typing animation to main heading
const mainHeading = document.querySelector('.Heading h1');
if (mainHeading) {
    const text = mainHeading.textContent;
    typeWriter(mainHeading, text);
}

// Add particle background effect
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    document.body.insertBefore(particlesContainer, document.body.firstChild);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
});

// Add section navigation dots
const sections = document.querySelectorAll('section, .Heading, .Aim, .need, .BOT');
const navDots = document.createElement('div');
navDots.className = 'nav-dots';
document.body.appendChild(navDots);

sections.forEach((section, index) => {
    const dot = document.createElement('div');
    dot.className = 'nav-dot';
    dot.addEventListener('click', () => {
        section.scrollIntoView({ behavior: 'smooth' });
    });
    navDots.appendChild(dot);
});

// Update active dot on scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    sections.forEach((section, index) => {
        const dot = navDots.children[index];
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
});

// Add 3D hover effect to cards
document.querySelectorAll('.Heading, .PS, .BOT').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// Add loading animation
const loadingAnimation = document.createElement('div');
loadingAnimation.className = 'loading-animation';
loadingAnimation.innerHTML = '<div class="loading-spinner"></div>';
document.body.appendChild(loadingAnimation);

// Hide loading animation when page is loaded
window.addEventListener('load', () => {
    loadingAnimation.classList.add('hidden');
    setTimeout(() => loadingAnimation.remove(), 500);
    
    // Add animation classes to elements
    document.querySelectorAll('.Heading, .PS, .BOT').forEach(element => {
        element.classList.add('animate');
    });
});

// Enhanced scroll handling
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const direction = scrollTop > lastScrollTop ? 'down' : 'up';
    
    // Update navigation visibility
    const nav = document.querySelector('.main-nav');
    if (direction === 'down' && scrollTop > 100) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Add smooth parallax effect
document.querySelectorAll('.parallax').forEach(element => {
    const speed = element.dataset.speed || 0.5;
    const yPos = -(window.pageYOffset * speed);
    element.style.transform = `translateY(${yPos}px)`;
});

// Enhanced image loading
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => {
        img.style.opacity = '1';
    });
    
    if (img.complete) {
        img.style.opacity = '1';
    }
});
  
  