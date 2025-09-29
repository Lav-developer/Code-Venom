// Enhanced JavaScript with modern features - CLEAN VERSION
console.log('Script loaded successfully');

// Immediate loading screen fix
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.querySelector('.loader');
    const body = document.body;
    if (loader && body) {
      loader.style.opacity = '0';
      body.classList.remove('loading');
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }
  }, 1000);
});

class CodeVenomWebsite {
  constructor() {
    this.init();
  }

  init() {
    this.setupLoader();
    this.setupCursor();
    this.setupNavigation();
    this.setupMatrixRain();
    this.setupAnimations();
    this.setupGame();
    this.setupScrollEffects();
    this.setupTypeWriter();
    this.setupCounters();
    this.setupFormHandling();
    this.setupThemeToggle();
    this.setupKeyboardNavigation();
    this.setupScrollToTop();
    this.fixNavbarDuplication();
  }

  // Fix navbar duplication issue
  fixNavbarDuplication() {
    const navbars = document.querySelectorAll('.navbar');
    if (navbars.length > 1) {
      for (let i = 1; i < navbars.length; i++) {
        navbars[i].remove();
      }
    }
    
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.style.transform = 'translateZ(0)';
      navbar.style.willChange = 'transform';
    }
  }

  // Loading Screen
  setupLoader() {
    window.addEventListener('load', () => {
      const loader = document.querySelector('.loader');
      const body = document.body;
      
      setTimeout(() => {
        loader.style.opacity = '0';
        body.classList.remove('loading');
        setTimeout(() => {
          loader.style.display = 'none';
        }, 500);
      }, 2000);
    });

    const loaderText = document.querySelectorAll('.loader-text span');
    loaderText.forEach((span, index) => {
      span.style.setProperty('--i', index);
    });
  }

  // Custom Cursor
  setupCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (!cursor || !follower) return;
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      requestAnimationFrame(animateFollower);
    };
    animateFollower();

    const interactiveElements = document.querySelectorAll('a, button, .project-card, .team-card');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        follower.style.transform = 'scale(1.5)';
      });
      element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        follower.style.transform = 'scale(1)';
      });
    });
  }

  // Navigation
  setupNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
        }
      });
    });

    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
      } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
      }
    });
  }

  // Enhanced Matrix Rain Effect
  setupMatrixRain() {
    const canvas = document.getElementById('matrixRain');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    let isVisible = true;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const isMobile = window.innerWidth <= 768;
    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]()ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｦｲｸｺｿﾁﾄﾉﾌﾔﾖﾙﾚﾛﾝ';
    const fontSize = isMobile ? 10 : 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const drawMatrix = () => {
      if (!isVisible) return;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#39FF14';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      
      animationId = requestAnimationFrame(drawMatrix);
    };

    drawMatrix();

    document.addEventListener('visibilitychange', () => {
      isVisible = !document.hidden;
      if (isVisible) {
        drawMatrix();
      } else {
        cancelAnimationFrame(animationId);
      }
    });
  }

  // Scroll Animations
  setupAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          
          if (entry.target.classList.contains('skill-category')) {
            const progressBar = entry.target.querySelector('.skill-progress');
            if (progressBar) {
              const progress = progressBar.dataset.progress;
              setTimeout(() => {
                progressBar.style.setProperty('--width', progress + '%');
              }, 500);
            }
          }
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
      '.hero-content, .section-header, .about-card, .skill-category, .project-card, .team-card, .event-card, .form-group'
    );

    animatedElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(element);
    });
  }

  // Typewriter Effect
  setupTypeWriter() {
    const typingElement = document.querySelector('.typing');
    if (!typingElement) return;

    const text = typingElement.textContent;
    typingElement.textContent = '';
    
    let index = 0;
    const typeWriter = () => {
      if (index < text.length) {
        typingElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
      }
    };

    setTimeout(typeWriter, 2000);
  }

  // Counter Animation
  setupCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
      const target = parseInt(counter.dataset.target);
      const increment = target / 200;
      let current = 0;

      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      updateCounter();
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    });

    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }

  // Enhanced Snake Game Implementation
  setupGame() {
    const canvas = document.getElementById('snakeGame');
    if (!canvas) {
      console.warn('Snake game canvas not found');
      return;
    }

    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('score');
    const highScoreElement = document.getElementById('highScore');
    const startBtn = document.getElementById('startGame');
    const pauseBtn = document.getElementById('pauseGame');
    const resetBtn = document.getElementById('resetGame');

    // Check if all elements exist
    if (!scoreElement || !highScoreElement || !startBtn || !pauseBtn || !resetBtn) {
      console.warn('Some game elements not found');
      return;
    }

    // Game state
    let gameRunning = false;
    let gamePaused = false;
    let gameLoop = null;
    let score = 0;
    let highScore = parseInt(localStorage.getItem('snakeHighScore')) || 0;
    let particles = [];
    let gameSpeed = 150;

    // Game settings
    const gridSize = 20;
    const tileCount = canvas.width / gridSize;

    // Snake
    let snake = [
      { x: 10, y: 10 }
    ];
    let dx = 0;
    let dy = 0;

    // Food
    let food = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    };

    // Initialize display
    highScoreElement.textContent = highScore;

    // Particle system
    const createParticles = (x, y) => {
      for (let i = 0; i < 15; i++) {
        particles.push({
          x: x,
          y: y,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8,
          life: 30,
          color: Math.random() > 0.5 ? '#39FF14' : '#FF4757'
        });
      }
    };

    const updateParticles = () => {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.life--;
        
        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }
    };

    const drawParticles = () => {
      particles.forEach(p => {
        ctx.save();
        ctx.globalAlpha = p.life / 30;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x - 2, p.y - 2, 4, 4);
        ctx.restore();
      });
    };

    // Enhanced draw functions
    const drawSnake = () => {
      snake.forEach((segment, index) => {
        if (index === 0) {
          // Head with glow effect
          ctx.fillStyle = '#00FF41';
          ctx.shadowColor = '#00FF41';
          ctx.shadowBlur = 8;
          ctx.fillRect(segment.x * gridSize + 2, segment.y * gridSize + 2, gridSize - 4, gridSize - 4);
          
          // Eyes
          ctx.fillStyle = '#000000';
          ctx.shadowBlur = 0;
          ctx.fillRect(segment.x * gridSize + 6, segment.y * gridSize + 6, 3, 3);
          ctx.fillRect(segment.x * gridSize + 11, segment.y * gridSize + 6, 3, 3);
        } else {
          // Body with gradient effect
          const opacity = 1 - (index * 0.1);
          ctx.fillStyle = `rgba(57, 255, 20, ${Math.max(opacity, 0.3)})`;
          ctx.shadowColor = '#39FF14';
          ctx.shadowBlur = 4;
          ctx.fillRect(segment.x * gridSize + 1, segment.y * gridSize + 1, gridSize - 2, gridSize - 2);
        }
      });
      ctx.shadowBlur = 0;
    };

    const drawFood = () => {
      // Pulsing food effect
      const time = Date.now() * 0.005;
      const pulse = Math.sin(time) * 0.2 + 0.8;
      
      ctx.fillStyle = '#FF4757';
      ctx.shadowColor = '#FF4757';
      ctx.shadowBlur = 10 * pulse;
      
      const size = (gridSize - 4) * pulse;
      const offset = (gridSize - size) / 2;
      
      ctx.fillRect(
        food.x * gridSize + offset, 
        food.y * gridSize + offset, 
        size, 
        size
      );
      ctx.shadowBlur = 0;
    };

    const clearCanvas = () => {
      // Gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(5, 5, 5, 1)');
      gradient.addColorStop(1, 'rgba(10, 15, 10, 1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Grid effect
      ctx.strokeStyle = 'rgba(57, 255, 20, 0.1)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= tileCount; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvas.width, i * gridSize);
        ctx.stroke();
      }
    };

    const generateFood = () => {
      food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
      };
      
      // Make sure food doesn't spawn on snake
      for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
          generateFood();
          return;
        }
      }
    };

    const updateGame = () => {
      if (!gameRunning || gamePaused || dx === 0 && dy === 0) return;

      // Move snake head
      const head = { x: snake[0].x + dx, y: snake[0].y + dy };

      // Check wall collision
      if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        gameOver();
        return;
      }

      // Check self collision (only if snake has more than 1 segment)
      if (snake.length > 1) {
        for (let segment of snake) {
          if (head.x === segment.x && head.y === segment.y) {
            gameOver();
            return;
          }
        }
      }

      snake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElement.textContent = score;
        
        // Create eating particles
        createParticles(food.x * gridSize + gridSize/2, food.y * gridSize + gridSize/2);
        
        // Increase game speed slightly
        if (score % 5 === 0 && gameSpeed > 80) {
          gameSpeed -= 5;
          clearInterval(gameLoop);
          gameLoop = setInterval(() => {
            updateGame();
            draw();
          }, gameSpeed);
        }
        
        generateFood();
        
        // Update high score with celebration
        if (score > highScore) {
          highScore = score;
          highScoreElement.textContent = highScore;
          localStorage.setItem('snakeHighScore', highScore);
          
          // New high score particles
          createParticles(canvas.width / 2, 50);
        }
      } else {
        snake.pop();
      }
    };

    const draw = () => {
      clearCanvas();
      drawFood();
      drawSnake();
      updateParticles();
      drawParticles();
    };

    const gameOver = () => {
      gameRunning = false;
      gamePaused = false;
      clearInterval(gameLoop);
      
      // Create particle explosion effect
      createParticles(snake[0].x * gridSize + gridSize/2, snake[0].y * gridSize + gridSize/2);
      
      // Draw game over screen with animation
      setTimeout(() => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Animated game over text
        ctx.fillStyle = '#FF4757';
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'center';
        ctx.shadowColor = '#FF4757';
        ctx.shadowBlur = 10;
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 30);
        
        ctx.fillStyle = '#39FF14';
        ctx.font = '18px Arial';
        ctx.shadowColor = '#39FF14';
        ctx.shadowBlur = 5;
        ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 10);
        
        if (score === highScore && score > 0) {
          ctx.fillStyle = '#FFD700';
          ctx.font = '14px Arial';
          ctx.fillText('NEW HIGH SCORE!', canvas.width / 2, canvas.height / 2 + 35);
        }
        
        ctx.shadowBlur = 0;
      }, 500);
      
      startBtn.textContent = 'Play Again';
      startBtn.disabled = false;
      pauseBtn.disabled = true;
      pauseBtn.textContent = 'Pause';
    };

    const startGame = () => {
      if (gameRunning) return;
      
      // Clear any existing game over display
      clearCanvas();
      
      gameRunning = true;
      gamePaused = false;
      score = 0;
      scoreElement.textContent = score;
      gameSpeed = 150;
      
      // Reset snake to center with proper initial direction
      snake = [
        { x: Math.floor(tileCount / 2), y: Math.floor(tileCount / 2) }
      ];
      dx = 1; // Start moving right
      dy = 0;
      
      generateFood();
      
      startBtn.textContent = 'Playing...';
      startBtn.disabled = true;
      pauseBtn.disabled = false;
      pauseBtn.textContent = 'Pause';
      
      // Initial draw
      draw();
      
      // Add small delay before starting movement
      setTimeout(() => {
        gameLoop = setInterval(() => {
          updateGame();
          draw();
        }, gameSpeed);
      }, 500);
    };

    const pauseGame = () => {
      if (!gameRunning) return;
      
      gamePaused = !gamePaused;
      pauseBtn.textContent = gamePaused ? 'Resume' : 'Pause';
      
      if (gamePaused) {
        clearInterval(gameLoop);
      } else {
        gameLoop = setInterval(() => {
          updateGame();
          draw();
        }, 150);
      }
    };

    const resetGame = () => {
      gameRunning = false;
      gamePaused = false;
      clearInterval(gameLoop);
      
      score = 0;
      scoreElement.textContent = score;
      gameSpeed = 150;
      particles = [];
      
      // Reset snake to center
      snake = [{ x: Math.floor(tileCount / 2), y: Math.floor(tileCount / 2) }];
      dx = 0;
      dy = 0;
      
      generateFood();
      draw();
      
      startBtn.textContent = 'Start Game';
      startBtn.disabled = false;
      pauseBtn.textContent = 'Pause';
      pauseBtn.disabled = true;
    };

    // Event listeners with navigation fix
    startBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      startGame();
    });

    pauseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      pauseGame();
    });

    resetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      resetGame();
    });

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
      if (!gameRunning || gamePaused) return;

      // Prevent default behavior for game keys
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }

      switch (e.key.toLowerCase()) {
        case 'arrowup':
        case 'w':
          if (dy !== 1) { dx = 0; dy = -1; }
          break;
        case 'arrowdown':
        case 's':
          if (dy !== -1) { dx = 0; dy = 1; }
          break;
        case 'arrowleft':
        case 'a':
          if (dx !== 1) { dx = -1; dy = 0; }
          break;
        case 'arrowright':
        case 'd':
          if (dx !== -1) { dx = 1; dy = 0; }
          break;
        case ' ':
          e.preventDefault();
          pauseGame();
          break;
      }
    });

    // Initialize game display
    resetGame();
  }

  // Scroll Effects
  setupScrollEffects() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelectorAll('.parallax');
      
      parallax.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });

      const floatingElements = document.querySelectorAll('.floating-elements .code-block');
      floatingElements.forEach((element, index) => {
        const rate = scrolled * -0.3 * (index + 1);
        element.style.transform = `translateY(${rate}px)`;
      });
    });
  }

  // Form Handling
  setupFormHandling() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      
      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalText = submitBtn.querySelector('span').textContent;
      
      submitBtn.querySelector('span').textContent = 'Submitting...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        submitBtn.querySelector('span').textContent = 'Application Sent! ✓';
        submitBtn.style.background = '#00FF41';
        
        setTimeout(() => {
          submitBtn.querySelector('span').textContent = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
          contactForm.reset();
        }, 3000);
      }, 2000);
    });

    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'scale(1.02)';
      });
      
      input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'scale(1)';
      });
    });
  }

  // Theme Toggle
  setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);

      themeToggle.style.transform = 'rotate(360deg)';
      setTimeout(() => {
        themeToggle.style.transform = '';
      }, 300);
    });
  }

  // Keyboard Navigation
  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        if (hamburger && navMenu) {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
        }
      }

      if (e.key === 'Tab') {
        const interactiveElements = document.querySelectorAll('a, button, input, textarea');
        interactiveElements.forEach((element) => {
          element.addEventListener('focus', () => {
            element.style.outline = '2px solid var(--primary-green)';
          });
          element.addEventListener('blur', () => {
            element.style.outline = '';
          });
        });
      }

      // Prevent page scrolling when using arrow keys in game section
      const gameSection = document.getElementById('game');
      if (gameSection && this.isElementInViewport(gameSection)) {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
          e.preventDefault();
        }
      }
    });
  }

  // Helper function to check if element is in viewport
  isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Scroll to Top
  setupScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (!scrollToTopBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    });

    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Global scroll function
function scrollToSection(sectionId) {
  const target = document.getElementById(sectionId);
  if (target) {
    const offsetTop = target.offsetTop - 80;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
}

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
  try {
    new CodeVenomWebsite();
  } catch (error) {
    console.error('Error initializing CodeVenomWebsite:', error);
    // Fallback: Remove loading screen manually
    setTimeout(() => {
      const loader = document.querySelector('.loader');
      const body = document.body;
      if (loader && body) {
        loader.style.opacity = '0';
        body.classList.remove('loading');
        setTimeout(() => {
          loader.style.display = 'none';
        }, 500);
      }
    }, 2000);
  }
});

// Additional enhancements
document.addEventListener('DOMContentLoaded', () => {
  // Project filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 100);
        } else {
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Enhanced button interactions
  const buttons = document.querySelectorAll('.cta-primary, .cta-secondary, .game-btn, .filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translateY(0) scale(1)';
    });
    
    btn.addEventListener('mousedown', () => {
      btn.style.transform = 'translateY(0) scale(0.98)';
    });
    
    btn.addEventListener('mouseup', () => {
      btn.style.transform = 'translateY(-2px) scale(1.05)';
    });
  });

  // Navigation highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  const highlightNavigation = () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', highlightNavigation);

  // CSS for active nav link
  const style = document.createElement('style');
  style.textContent = `
    .nav-link.active {
      color: var(--primary-green) !important;
    }
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
    @keyframes scoreUp {
      0% { opacity: 1; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(-50px); }
    }
  `;
  document.head.appendChild(style);
});