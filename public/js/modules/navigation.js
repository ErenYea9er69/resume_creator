export function setupNavigation() {
  const sectionButtons = document.querySelectorAll('.section-btn');
  const formSections = document.querySelectorAll('.form-section');
  
  sectionButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and sections
      sectionButtons.forEach(btn => btn.classList.remove('active'));
      formSections.forEach(section => section.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Show corresponding section
      const sectionId = `${button.dataset.section}-section`;
      document.getElementById(sectionId).classList.add('active');
    });
  });
} 