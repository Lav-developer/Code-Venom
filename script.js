// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.navbar ul');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
        navMenu.classList.remove('active'); // Close menu on mobile after clicking
    });
});

// Event listener for Join the Clan button
document.getElementById('joinClanBtn').addEventListener('click', () => {
    window.scrollTo({
        top: document.getElementById('join').offsetTop - 80,
        behavior: 'smooth'
    });
});

// Ensure project links work by not overriding their default behavior
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', (e) => {
        // Let the default behavior (navigating to href) happen
        // No need to preventDefault unless adding custom behavior
    });
});

// Typing animation for hero tagline
const typingElement = document.querySelector('.typing');
const text = typingElement.textContent;
typingElement.textContent = '';
let i = 0;

function type() {
    if (i < text.length) {
        typingElement.textContent += text.charAt(i);
        i++;
        setTimeout(type, 100);
    } else {
        typingElement.style.borderRight = 'none';
    }
}

setTimeout(type, 500);

// Matrix Rain Background
const matrixCanvas = document.getElementById('matrixRain');
const matrixCtx = matrixCanvas.getContext('2d');

matrixCanvas.height = window.innerHeight;
matrixCanvas.width = window.innerWidth;

const chars = '01@#$%';
const fontSize = 14;
const columns = matrixCanvas.width / fontSize;
const drops = [];

for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function drawMatrix() {
    matrixCtx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

    matrixCtx.fillStyle = 'rgba(0, 255, 0, 0.6)';
    matrixCtx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        matrixCtx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

// Resize canvas on window resize
window.addEventListener('resize', () => {
    matrixCanvas.height = window.innerHeight;
    matrixCanvas.width = window.innerWidth;
});

// Snake Game
const canvas = document.getElementById('snakeGame');
const ctx = canvas.getContext('2d');

// Ensure canvas size is set correctly
canvas.width = 400;
canvas.height = 400;

const gridSize = 20;
const tileCount = canvas.width / gridSize;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;
let gameOver = false;

const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('gameOver');

function drawGame() {
    if (gameOver) return;

    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    snake.forEach(segment => {
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    });

    ctx.fillStyle = '#fff';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);

    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
    } else {
        snake.pop();
    }

    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        endGame();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame();
        }
    }
}

function endGame() {
    gameOver = true;
    gameOverElement.style.display = 'block';
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    dx = 0;
    dy = 0;
    score = 0;
    scoreElement.textContent = score;
    food = { x: 15, y: 15 };
    gameOver = false;
    gameOverElement.style.display = 'none';
}

document.addEventListener('keydown', (e) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
    }

    if (gameOver) return;

    switch (e.key) {
        case 'ArrowUp':
            if (dy !== 1) { dx = 0; dy = -1; }
            break;
        case 'ArrowDown':
            if (dy !== -1) { dx = 0; dy = 1; }
            break;
        case 'ArrowLeft':
            if (dx !== 1) { dx = -1; dy = 0; }
            break;
        case 'ArrowRight':
            if (dx !== -1) { dx = 1; dy = 0; }
            break;
    }
});

let touchStartX = 0;
let touchStartY = 0;

canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (gameOver) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 30 && dx !== -1) {
            dx = 1;
            dy = 0;
        } else if (deltaX < -30 && dx !== 1) {
            dx = -1;
            dy = 0;
        }
    } else {
        if (deltaY > 30 && dy !== -1) {
            dx = 0;
            dy = 1;
        } else if (deltaY < -30 && dy !== 1) {
            dx = 0;
            dy = -1;
        }
    }

    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
});

setInterval(drawGame, 200);