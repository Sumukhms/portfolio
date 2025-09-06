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

      const filteredRepos = repos.filter(repo =>
        repo.name.toLowerCase() !== 'dsa' && repo.name.toLowerCase() !== 'html-portfolio'
      );

      // Sort repos by most recent
      filteredRepos.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));

      filteredRepos.forEach((repo, index) => {
        const card = document.createElement('div');
        card.className = 'comic-panel p-6 text-left animate-pop-in';
        card.style.animationDelay = `${index * 150}ms`;
        card.innerHTML = `
          <h3 class="text-2xl text-blue-400">${repo.name}</h3>
          <p class="mt-2 text-gray-400 min-h-[6rem]">${repo.description || "No description provided."}</p>
          <div class="mt-6 flex justify-between">
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
    statusMsg.classList.remove("hidden");

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
        typingText.style.borderRight = '3px solid #a0aec0'; // Keep cursor visible

        let typeSpeed = isDeleting ? 100 : 200;

        if (!isDeleting && charIndex === currentTagline.length) {
            typeSpeed = 2000; // Pause at the end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            taglineIndex = (taglineIndex + 1) % taglines.length;
            typeSpeed = 500; // Pause before typing new line
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

    // ===== Tour Bot Logic =====
    const tourBot = document.getElementById('tour-bot');
    const tourBubble = document.getElementById('tour-bubble');
    const startTourBtn = document.getElementById('start-tour-btn');

    const tourStops = [
        { selector: '#about', dialogue: 'Hi! I am your guide. Let me show you Sumukh\'s origin story.' },
        { selector: '#projects', dialogue: 'KAPOW! Here are all the awesome projects he has built.' },
        { selector: '#skills', dialogue: 'These are his superpowers... I mean, his skills.' },
        { selector: '#certifications', dialogue: 'He has also collected these powerful artifacts, also known as certificates!' },
        { selector: '#resume', dialogue: 'Want the full story? You can download his secret file right here.' },
        { selector: '#contact', dialogue: 'Got a mission? Let\'s team up! Contact him here. Thanks for visiting!' }
    ];

    let currentStop = 0;
    let isTourActive = false;

    function startTour() {
        if (isTourActive) return;
        isTourActive = true;
        startTourBtn.style.display = 'none';
        tourBot.classList.remove('hidden');
        moveToStop(0);
    }

    function moveToStop(index) {
        if (index >= tourStops.length) {
            endTour();
            return;
        }

        currentStop = index;
        const stop = tourStops[index];
        const targetElement = document.querySelector(stop.selector);

        // Remove previous highlight
        document.querySelectorAll('.highlight-section').forEach(el => el.classList.remove('highlight-section'));

        // Scroll to and highlight the new section
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetElement.classList.add('highlight-section');

        // Position bot and update dialogue
        const rect = targetElement.getBoundingClientRect();
        tourBot.style.top = `${window.scrollY + rect.top + (rect.height / 2) - 40}px`;
        tourBot.style.left = '20px'; // Keep it on the left
        
        tourBubble.textContent = stop.dialogue;
        tourBot.classList.add('show-bubble');

        setTimeout(() => {
            moveToStop(index + 1);
        }, 7000); // 7 seconds per stop
    }

    function endTour() {
        tourBot.classList.add('hidden');
        document.querySelectorAll('.highlight-section').forEach(el => el.classList.remove('highlight-section'));
        isTourActive = false;
        // The start button will reappear on page reload
    }

    startTourBtn.addEventListener('click', startTour);
});