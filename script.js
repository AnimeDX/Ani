// Mobile Menu Toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
  const navMenu = document.querySelector('.nav-menu');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-menu').classList.remove('active');
  });
});

// Tab Switching for Commands
document.querySelectorAll('.tab-btn').forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons and contents
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked button
    button.classList.add('active');
    
    // Show corresponding content
    const tabId = button.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
  });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Update active nav link
      document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
      this.classList.add('active');
      
      // Scroll to target
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Back to Top Button
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Animated Counter for Stats (Optional)
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16); // 60fps
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start) + '+';
    }
  }, 16);
}

// Start counters when page loads
window.addEventListener('load', () => {
  // You can replace these with actual bot stats if available
  const serverCount = document.getElementById('server-count');
  const commandCount = document.getElementById('command-count');
  const userCount = document.getElementById('user-count');
  
  if (serverCount) animateCounter(serverCount, 150);
  if (commandCount) animateCounter(commandCount, 50);
  if (userCount) animateCounter(userCount, 10000);
});

// Add animation to feature cards on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
    }
  });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
  observer.observe(card);
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });
  
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Discord Bot Invite URL Generator (For testing)
function generateInviteUrl() {
  const clientId = prompt('Enter your Discord Bot Client ID:');
  if (clientId) {
    const permissions = '8'; // Administrator
    const url = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=${permissions}&scope=bot%20applications.commands`;
    const inviteBtn = document.querySelector('.btn-large');
    inviteBtn.href = url;
    alert(`Invite URL updated! Your bot's invite link is now active.`);
  }
}

// Uncomment the line below to enable manual client ID input
// document.querySelector('.btn-large').addEventListener('click', generateInviteUrl);