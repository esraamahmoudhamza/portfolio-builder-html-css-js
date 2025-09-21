const form = document.getElementById('portfolioForm');
const preview = document.getElementById('preview');
const templateButtons = document.querySelectorAll('.template-btn');
let selectedTemplate = 'template1';

// Template selection
templateButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    selectedTemplate = btn.dataset.template;
    preview.className = selectedTemplate;
  });
});

// Update Preview on input
form.addEventListener('input', updatePreview);

// Generate Portfolio button
form.addEventListener('submit', e => {
  e.preventDefault();
  // Save data in sessionStorage to pass to the output page
  const portfolioData = {
    name: document.getElementById('name').value || 'Your Name',
    bio: document.getElementById('bio').value || 'Your short bio goes here...',
    skills: document.getElementById('skills').value.split(',').map(s => s.trim()).filter(s => s),
    projects: document.getElementById('projects').value.split(',').map(p => p.trim()).filter(p => p),
    email: document.getElementById('email').value || 'your@email.com',
    themeColor: document.getElementById('themeColor').value,
    template: selectedTemplate,
    imageSrc: document.getElementById('previewImage').src
  };
  sessionStorage.setItem('portfolioData', JSON.stringify(portfolioData));
  window.location.href = 'portfolio.html'; // Redirect to output page
});

function updatePreview() {
  // Update text
  document.getElementById('previewName').textContent = document.getElementById('name').value || 'Your Name';
  document.getElementById('previewBio').textContent = document.getElementById('bio').value || 'Your short bio goes here...';

  // Skills
  const skills = document.getElementById('skills').value.split(',').map(s => s.trim()).filter(s => s);
  document.getElementById('previewSkills').innerHTML = skills.length ? skills.map(s => `<li>${s}</li>`).join('') : '<li>HTML</li><li>CSS</li><li>JS</li>';

  // Projects
  const projects = document.getElementById('projects').value.split(',').map(p => p.trim()).filter(p => p);
  document.getElementById('previewProjects').innerHTML = projects.length ? projects.map(p => `<li>${p}</li>`).join('') : '<li>Project1</li><li>Project2</li>';

  // Email
  document.getElementById('previewEmail').textContent = document.getElementById('email').value || 'your@email.com';

  // Theme color
  const themeColor = document.getElementById('themeColor').value;
  document.body.style.color = themeColor;
  document.querySelectorAll('button').forEach(btn => btn.style.background = themeColor);
  document.querySelectorAll('.preview-section, form').forEach(el => el.style.boxShadow = `0 0 20px ${themeColor}`);
  document.querySelectorAll('h1, h2, h3').forEach(h => h.style.textShadow = `0 0 5px ${themeColor}, 0 0 10px ${themeColor}`);

  // Profile image
  const fileInput = document.getElementById('profileImage');
  const previewImage = document.getElementById('previewImage');
  if(fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = e => {
      previewImage.src = e.target.result;
    };
    reader.readAsDataURL(fileInput.files[0]);
  }
}
