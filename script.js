// Form submission handling
document.querySelector('.signup-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    if (!email) {
        showError('Please enter your email address.');
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address.');
        return;
    }
    
    // Show success message
    showSuccess('Thank you for signing up! We\'ll be in touch soon.');
    emailInput.value = '';
});

// Modal functionality
function openLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    // Reset forms
    document.getElementById('loginForm').reset();
    document.getElementById('signupFormModal').reset();
    // Show login form by default
    showLoginForm();
}

function showSignupForm() {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('signupContainer').style.display = 'block';
}

function showLoginForm() {
    document.getElementById('signupContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'block';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('loginModal');
    if (event.target === modal) {
        closeLoginModal();
    }
}

// Login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    if (!email || !password) {
        showModalError('Please fill in all fields.');
        return;
    }
    
    if (!isValidEmail(email)) {
        showModalError('Please enter a valid email address.');
        return;
    }
    
    // Simulate login process
    showModalSuccess('Signing in...');
    setTimeout(() => {
        showModalSuccess('Welcome back! You have successfully signed in.');
        setTimeout(() => {
            closeLoginModal();
        }, 2000);
    }, 1500);
});

// Signup form submission
document.getElementById('signupFormModal').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    if (!name || !email || !password || !confirmPassword) {
        showModalError('Please fill in all fields.');
        return;
    }
    
    if (!isValidEmail(email)) {
        showModalError('Please enter a valid email address.');
        return;
    }
    
    if (password.length < 6) {
        showModalError('Password must be at least 6 characters long.');
        return;
    }
    
    if (password !== confirmPassword) {
        showModalError('Passwords do not match.');
        return;
    }
    
    // Simulate signup process
    showModalSuccess('Creating your account...');
    setTimeout(() => {
        showModalSuccess('Account created successfully! Welcome to Netflix.');
        setTimeout(() => {
            closeLoginModal();
        }, 2000);
    }, 1500);
});

// Modal message functions
function showModalError(message) {
    removeModalMessages();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'modal-message error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #e50914;
        background: rgba(229, 9, 20, 0.1);
        border: 1px solid #e50914;
        padding: 12px;
        border-radius: 4px;
        margin: 10px 0;
        font-size: 0.9rem;
        text-align: center;
    `;
    
    const activeContainer = document.querySelector('.login-container:not([style*="display: none"]), .signup-container:not([style*="display: none"])');
    activeContainer.appendChild(errorDiv);
    
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

function showModalSuccess(message) {
    removeModalMessages();
    
    const successDiv = document.createElement('div');
    successDiv.className = 'modal-message success';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        color: #00ff00;
        background: rgba(0, 255, 0, 0.1);
        border: 1px solid #00ff00;
        padding: 12px;
        border-radius: 4px;
        margin: 10px 0;
        font-size: 0.9rem;
        text-align: center;
    `;
    
    const activeContainer = document.querySelector('.login-container:not([style*="display: none"]), .signup-container:not([style*="display: none"])');
    activeContainer.appendChild(successDiv);
    
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.remove();
        }
    }, 5000);
}

function removeModalMessages() {
    const existingMessages = document.querySelectorAll('.modal-message');
    existingMessages.forEach(msg => msg.remove());
}

// Subscribe Modal functionality
function openSubscribeModal() {
    document.getElementById('subscribeModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add staggered animation to plan cards
    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach((card, index) => {
        card.style.setProperty('--plan-index', index);
    });
}

function closeSubscribeModal() {
    document.getElementById('subscribeModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function selectPlan(planType) {
    const planNames = {
        'basic': 'Basic',
        'standard': 'Standard', 
        'premium': 'Premium'
    };
    
    const planPrices = {
        'basic': '$8.99',
        'standard': '$13.99',
        'premium': '$17.99'
    };
    
    // Show selection confirmation
    showSubscribeSuccess(`You've selected the ${planNames[planType]} plan for ${planPrices[planType]}/month!`);
    
    // Simulate subscription process
    setTimeout(() => {
        showSubscribeSuccess('Setting up your subscription...');
        setTimeout(() => {
            showSubscribeSuccess('Welcome to Netflix! Your subscription is now active.');
            setTimeout(() => {
                closeSubscribeModal();
            }, 2000);
        }, 1500);
    }, 1000);
}

function showSubscribeSuccess(message) {
    removeSubscribeMessages();
    
    const successDiv = document.createElement('div');
    successDiv.className = 'subscribe-message success';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        color: #00ff00;
        background: rgba(0, 255, 0, 0.1);
        border: 1px solid #00ff00;
        padding: 12px;
        border-radius: 4px;
        margin: 10px 0;
        font-size: 0.9rem;
        text-align: center;
        animation: messageSlideIn 0.3s ease-out;
    `;
    
    const subscribeContainer = document.querySelector('.subscribe-container');
    subscribeContainer.appendChild(successDiv);
    
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.remove();
        }
    }, 5000);
}

function removeSubscribeMessages() {
    const existingMessages = document.querySelectorAll('.subscribe-message');
    existingMessages.forEach(msg => msg.remove());
}

// Close subscribe modal when clicking outside
window.addEventListener('click', function(event) {
    const subscribeModal = document.getElementById('subscribeModal');
    if (event.target === subscribeModal) {
        closeSubscribeModal();
    }
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show error message
function showError(message) {
    // Remove existing messages
    removeMessages();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'message error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #e50914;
        background: rgba(229, 9, 20, 0.1);
        border: 1px solid #e50914;
        padding: 8px 12px;
        border-radius: 4px;
        margin-top: 8px;
        font-size: 0.9rem;
        text-align: center;
    `;
    
    document.querySelector('.signup-form').appendChild(errorDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

// Show success message
function showSuccess(message) {
    // Remove existing messages
    removeMessages();
    
    const successDiv = document.createElement('div');
    successDiv.className = 'message success';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        color: #00ff00;
        background: rgba(0, 255, 0, 0.1);
        border: 1px solid #00ff00;
        padding: 8px 12px;
        border-radius: 4px;
        margin-top: 8px;
        font-size: 0.9rem;
        text-align: center;
    `;
    
    document.querySelector('.signup-form').appendChild(successDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.remove();
        }
    }, 5000);
}

// Remove existing messages
function removeMessages() {
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
}

// Add click effects to movie cards
document.querySelectorAll('.movie-card').forEach(card => {
    card.addEventListener('click', function() {
        const movieTitle = this.querySelector('h4').textContent;
        const movieGenre = this.querySelector('p').textContent;
        alert(`🎬 ${movieTitle}\n\nGenre: ${movieGenre}\n\nThis would open the movie details page in a real Netflix app!`);
    });
});

// Add smooth scrolling for better UX
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Add staggered animations for movie cards
    const movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach((card, index) => {
        card.style.setProperty('--card-index', index);
    });
    
    // Add intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    movieCards.forEach(card => {
        observer.observe(card);
    });
    
    // Add floating animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setInterval(() => {
            heroContent.style.transform = 'translateY(-2px)';
            setTimeout(() => {
                heroContent.style.transform = 'translateY(0)';
            }, 1000);
        }, 3000);
    }
}); 