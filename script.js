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

      filteredRepos.forEach(repo => {
        const card = document.createElement('div');
        card.className = 'comic-panel bg-white p-6 text-left animate-pop-in';
        card.innerHTML = `
          <h3 class="text-2xl text-blue-600">${repo.name}</h3>
          <p class="mt-2 text-gray-700">${repo.description || "No description provided."}</p>
          <div class="mt-6 flex justify-between">
            <a href="${repo.html_url}" target="_blank"
               class="comic-button-small bg-gray-800 text-white py-2 px-4">Code</a>
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
    emailjs.init("Axo33InkCmjOX5kbu"); // replace with your actual public key
  })();

  const form = document.getElementById('contact-form');
  const statusMsg = document.getElementById('form-status');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    statusMsg.className = "mt-4 text-lg speech-bubble-mini"; // reset
    statusMsg.textContent = "⏳ Sending your message...";
    statusMsg.classList.remove("hidden");

    emailjs.sendForm('service_sdk6ck5', 'template_hiv8xn9', this)
      .then(() => {
        statusMsg.textContent = "✅ Message sent successfully! I'll get back to you soon.";
        statusMsg.classList.add("success");
        form.reset();
      }, (error) => {
        statusMsg.textContent = "❌ Failed to send message. Please try again later.";
        statusMsg.classList.add("error");
        console.error('EmailJS error:', error);
      });
  });
});

// Typing effect
const typingText = document.getElementById('typing-text');
const tagline = "7th-semester CSE Student ⚡ MERN Developer 💻 AI/ML Enthusiast 🤖";
let i = 0;

function typeWriter() {
  if (i < tagline.length) {
    typingText.textContent += tagline.charAt(i);
    i++;
    setTimeout(typeWriter, 80);
  }
}
typeWriter();
