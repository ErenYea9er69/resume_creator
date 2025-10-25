export function setupPersonalInfo() {
  const fullNameInput = document.getElementById('fullName');
  const jobTitleInput = document.getElementById('jobTitle');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const locationInput = document.getElementById('location');
  const profileImageInput = document.getElementById('profileImage');
  const imagePreview = document.getElementById('imagePreview');
  
  // Update preview when inputs change
  fullNameInput.addEventListener('input', updatePersonalInfo);
  jobTitleInput.addEventListener('input', updatePersonalInfo);
  emailInput.addEventListener('input', updatePersonalInfo);
  phoneInput.addEventListener('input', updatePersonalInfo);
  locationInput.addEventListener('input', updatePersonalInfo);
  
  // Handle profile image upload
  profileImageInput.addEventListener('change', handleImageUpload);
  
  function updatePersonalInfo() {
    document.getElementById('preview-name').textContent = fullNameInput.value || 'Your Name';
    document.getElementById('preview-title').textContent = jobTitleInput.value || 'Your Job Title';
    document.getElementById('preview-email').textContent = emailInput.value || 'email@example.com';
    document.getElementById('preview-phone').textContent = phoneInput.value || 'Phone Number';
    document.getElementById('preview-location').textContent = locationInput.value || 'Location';
  }
  
  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      
      reader.onload = function(event) {
        // Display image in the editor preview
        imagePreview.innerHTML = `<img src="${event.target.result}" alt="Profile">`;
        
        // Display image in the resume preview
        document.getElementById('preview-image').innerHTML = `<img src="${event.target.result}" alt="Profile">`;
      };
      
      reader.readAsDataURL(file);
      
      // Optional: Upload to server for persistence
      uploadImageToServer(file);
    } else {
      alert('Please select an image file');
    }
  }
  
  function uploadImageToServer(file) {
    const formData = new FormData();
    formData.append('profileImage', file);
    
    fetch('/upload-image', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('Image uploaded successfully:', data.filePath);
      }
    })
    .catch(error => {
      console.error('Error uploading image:', error);
    });
  }
} 