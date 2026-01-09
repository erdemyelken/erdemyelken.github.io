// ==========================================
// Animated Chess Background
// ==========================================
function createChessBackground() {
    const chessBg = document.getElementById('chessBg');
    const symbols = ['♔', '♕', '♖', '♗', '♘', '♙'];
    
    for (let i = 0; i < 15; i++) {
        const square = document.createElement('div');
        square.className = 'chess-square';
        square.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        square.style.left = Math.random() * 100 + '%';
        square.style.top = Math.random() * 100 + '%';
        square.style.fontSize = (Math.random() * 40 + 40) + 'px';
        square.style.animationDelay = Math.random() * 5 + 's';
        square.style.color = `rgba(168, 85, 247, ${Math.random() * 0.3 + 0.2})`;
        chessBg.appendChild(square);
    }
}

// ==========================================
// Animated Music Notes
// ==========================================
function createMusicNotes() {
    const musicNotes = document.getElementById('musicNotes');
    const notes = ['♪', '♫', '♬', '♩'];
    
    setInterval(() => {
        const note = document.createElement('div');
        note.className = 'note';
        note.textContent = notes[Math.floor(Math.random() * notes.length)];
        note.style.left = Math.random() * 100 + '%';
        note.style.animationDuration = (Math.random() * 4 + 6) + 's';
        note.style.color = `rgba(59, 130, 246, ${Math.random() * 0.5 + 0.3})`;
        musicNotes.appendChild(note);
        
        // Remove note after animation completes
        setTimeout(() => note.remove(), 8000);
    }, 2000);
}

// ==========================================
// Smooth Scroll Navigation
// ==========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    });
}

// ==========================================
// Interactive Skill Cards
// ==========================================
function initSkillCards() {
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = '';
            }, 200);
        });
    });
}

// ==========================================
// Background Music Control
// ==========================================
let isMusicPlaying = false;

function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const control = document.getElementById('musicControl');
    
    if (isMusicPlaying) {
        music.pause();
        control.textContent = '🎵';
        control.classList.remove('playing');
        isMusicPlaying = false;
    } else {
        music.play().catch(err => {
            console.log('Autoplay was prevented:', err);
        });
        control.textContent = '🔊';
        control.classList.add('playing');
        isMusicPlaying = true;
    }
}

// ==========================================
// Chess Knight Sound Effect
// ==========================================
function playSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
        console.log('Audio playback not supported');
    }
}

// ==========================================
// Parallax Effect on Scroll
// ==========================================
function initParallax() {
    const chessBg = document.getElementById('chessBg');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        chessBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    });
}

// ==========================================
// Project Card Animations
// ==========================================
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1
    });
    
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(card);
    });
}

// ==========================================
// Interest Items Interaction
// ==========================================
function initInterestItems() {
    const interests = document.querySelectorAll('.interest-item');
    
    interests.forEach(item => {
        item.addEventListener('mouseenter', () => {
            interests.forEach(other => {
                if (other !== item) {
                    other.style.opacity = '0.5';
                }
            });
        });
        
        item.addEventListener('mouseleave', () => {
            interests.forEach(other => {
                other.style.opacity = '1';
            });
        });
    });
}

// ==========================================
// Initialize All Functions on Page Load
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    createChessBackground();
    createMusicNotes();
    initSmoothScroll();
    initSkillCards();
    initParallax();
    initProjectCards();
    initInterestItems();
    
    console.log('🚀 Portfolio loaded successfully!');
});

// ==========================================
// Handle Window Resize
// ==========================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        console.log('Window resized - layout adjusted');
    }, 250);
});