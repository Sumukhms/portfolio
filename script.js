document.addEventListener('DOMContentLoaded', () => {
  // ===== GitHub Projects Fetch =====
  const projectsContainer = document.getElementById('projects-container');
  const loader = document.getElementById('loader');
  const errorMessage = document.getElementById('error-message');

  const fetchAllProjects = async () => {
    try {
      const response = await fetch('https://api.github.com/users/Sumukhms/repos');
      if (!response.ok) throw new Error("Failed to fetch GitHub repositories");
      const repos = await response.json();

      loader.style.display = 'none';
      projectsContainer.innerHTML = '';

      // Repositories that should NEVER appear on your portfolio
      const hiddenRepos = [
        "dsa",
        "html-portfolio",
        "portfolio",
        "sumukhms",
        "investiq-dummy",
        "scalartech_deforge"
      ];

      // Filter out hidden repos
      const filteredRepos = repos.filter(repo => {
        return !hiddenRepos.includes(repo.name.toLowerCase());
      });


      // ========== CORRECTED SORTING LOGIC ==========
      // The names in this array now EXACTLY match your repository names on GitHub.
      const priorityProjects = [
        'InvestIQ',
        'edugram',
        'echomood',
        'newsmonkey', // Corrected from 'NewsMonkey'
        'weather',  // Corrected from 'Weather'
        'textutils',
        
      ];

      filteredRepos.sort((a, b) => {
        const aIndex = priorityProjects.indexOf(a.name);
        const bIndex = priorityProjects.indexOf(b.name);

        if (aIndex > -1 && bIndex > -1) {
          return aIndex - bIndex;
        }
        if (aIndex > -1) {
          return -1;
        }
        if (bIndex > -1) {
          return 1;
        }
        return new Date(b.pushed_at) - new Date(a.pushed_at);
      });
      // ===========================================

      filteredRepos.forEach((repo, index) => {
        const card = document.createElement('div');
        card.className = 'comic-panel p-6 text-left animate-pop-in flex flex-col';
        card.style.animationDelay = `${index * 150}ms`;
        card.innerHTML = `
          <div class="flex-grow">
            <h3 class="text-2xl text-blue-400">${repo.name}</h3>
            <p class="mt-2 text-gray-400">${repo.description || "No description provided."}</p>
          </div>
          <div class="mt-6 flex justify-between items-center">
            <a href="${repo.html_url}" target="_blank"
               class="comic-button-small bg-gray-700 text-white py-2 px-4">Code</a>
            ${repo.homepage ? `<a href="${repo.homepage}" target="_blank"
               class="comic-button-small bg-green-500 text-black py-2 px-4">Live Demo</a>` : ''}
          </div>
        `;
        projectsContainer.appendChild(card);
      });
    } catch (err) {
      console.error(err);
      loader.style.display = 'none';
      errorMessage.textContent = 'Could not load projects from GitHub.';
      errorMessage.style.display = 'block';
    }
  };
  fetchAllProjects();

  // ===== EmailJS Contact Form =====
  (function() {
    emailjs.init("Axo33InkCmjOX5kbu");
  })();

  const form = document.getElementById('contact-form');
  const statusMsg = document.getElementById('form-status');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    statusMsg.className = "mt-4 text-lg speech-bubble-mini";
    statusMsg.textContent = "⏳ Sending your message...";
    statusMsg.classList.remove("hidden", "success", "error");

    emailjs.sendForm('service_sdk6ck5', 'template_hiv8xn9', this)
      .then(() => {
        statusMsg.textContent = "✅ Message sent! I'll get back to you soon.";
        statusMsg.classList.add("success");
        form.reset();
      }, (error) => {
        statusMsg.textContent = "❌ Failed to send. Please try again.";
        statusMsg.classList.add("error");
        console.error('EmailJS error:', error);
      });
  });

    // ===== Improved Typing Effect =====
    const typingText = document.getElementById('typing-text');
    const taglines = [
        "7th-semester CSE Student ⚡",
        "MERN Developer 💻",
        "AI/ML Enthusiast 🤖"
    ];
    let taglineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentTagline = taglines[taglineIndex];
        let displayText = '';

        if (isDeleting) {
            displayText = currentTagline.substring(0, charIndex - 1);
            charIndex--;
        } else {
            displayText = currentTagline.substring(0, charIndex + 1);
            charIndex++;
        }

        typingText.textContent = displayText;
        typingText.style.borderRight = '3px solid #a0aec0';

        let typeSpeed = isDeleting ? 100 : 200;

        if (!isDeleting && charIndex === currentTagline.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            taglineIndex = (taglineIndex + 1) % taglines.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    type();

  // ===== Daily Comic Quote =====
    const quotes = [
        "Why do programmers prefer dark mode? Because light attracts bugs!",
        "I'm not a great programmer; I'm just a good programmer with great habits.",
        "A programmer's wife asks him to go to the store. She says, 'Buy a loaf of bread. If they have eggs, buy a dozen.' The programmer returns with 12 loaves of bread.",
        "There are 10 types of people in the world: those who understand binary, and those who don't.",
        "Programming is like trying to solve a puzzle. Except you don't have the box, the pieces are all the same color, and the puzzle changes every time you blink."
    ];
    const quoteText = document.getElementById('quote-text');
    let quoteIndex = 0;

    function showNextQuote() {
        quoteText.style.opacity = 0;
        setTimeout(() => {
            quoteIndex = (quoteIndex + 1) % quotes.length;
            quoteText.textContent = `"${quotes[quoteIndex]}"`;
            quoteText.style.opacity = 1;
        }, 500);
    }
    quoteText.textContent = `"${quotes[quoteIndex]}"`;
    setInterval(showNextQuote, 10000);

    // ===== Konami Code Easter Egg =====
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                const egg = document.getElementById('konami-egg');
                egg.classList.remove('hidden');
                egg.classList.add('konami-animation');
                setTimeout(() => {
                    egg.classList.add('hidden');
                    egg.classList.remove('konami-animation');
                }, 1000);
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    // ===== Interactive Avatar Logic =====
    const pupilLeft = document.getElementById('pupil-left');
    const pupilRight = document.getElementById('pupil-right');
    const eyeLeft = document.getElementById('eye-left');
    const eyeRight = document.getElementById('eye-right');

    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;

        const movePupil = (eye, pupil) => {
            const eyeRect = eye.getBoundingClientRect();
            const eyeCenterX = eyeRect.left + eyeRect.width / 2;
            const eyeCenterY = eyeRect.top + eyeRect.height / 2;
            
            const deltaX = clientX - eyeCenterX;
            const deltaY = clientY - eyeCenterY;
            
            const angle = Math.atan2(deltaY, deltaX);
            
            const maxRadius = eyeRect.width / 4;
            
            const moveX = Math.cos(angle) * maxRadius;
            const moveY = Math.sin(angle) * maxRadius;

            pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
        };

        movePupil(eyeLeft, pupilLeft);
        movePupil(eyeRight, pupilRight);
    });
});