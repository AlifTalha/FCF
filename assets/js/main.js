/* ===============================
   About Section Image Slider
================================= */
const slides = document.querySelector(".about-slider .slides");
const slideImages = document.querySelectorAll(".about-slider img");
const prevBtn = document.querySelector(".about-slider .prev");
const nextBtn = document.querySelector(".about-slider .next");

let index = 0;

function showSlide(i) {
  if (i < 0) index = slideImages.length - 1;
  else if (i >= slideImages.length) index = 0;
  else index = i;

  slides.style.transform = `translateX(-${index * 100}%)`;
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener("click", () => showSlide(index - 1));
  nextBtn.addEventListener("click", () => showSlide(index + 1));
}

// Auto-slide every 5 seconds
setInterval(() => {
  showSlide(index + 1);
}, 2000);




function updateClock() {
  const clockEl = document.getElementById('clock');
  const dateEl = document.getElementById('date');
  const now = new Date();

  // Time format HH:MM:SS
  const hours = String(now.getHours()).padStart(2,'0');
  const minutes = String(now.getMinutes()).padStart(2,'0');
  const seconds = String(now.getSeconds()).padStart(2,'0');
  clockEl.textContent = `${hours}:${minutes}:${seconds}`;

  // Date format e.g., Tuesday, Sep 3, 2025
  const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
  dateEl.textContent = now.toLocaleDateString('en-US', options);
}

// Update every second
setInterval(updateClock, 1000);
updateClock(); // Initial call




// ===============================
// Generic Slider Function
// ===============================
function initSlider(sliderSelector) {
  const slider = document.querySelector(sliderSelector);
  if (!slider) return;

  const slides = slider.querySelector('.slides');
  const slideImages = slides.querySelectorAll('img');
  const prevBtn = slider.querySelector('.prev');
  const nextBtn = slider.querySelector('.next');

  let index = 0;

  function showSlide(i) {
    if (i < 0) index = slideImages.length - 1;
    else if (i >= slideImages.length) index = 0;
    else index = i;
    slides.style.transform = `translateX(-${index * 100}%)`;
  }

  prevBtn.addEventListener('click', () => showSlide(index - 1));
  nextBtn.addEventListener('click', () => showSlide(index + 1));

  setInterval(() => showSlide(index + 1), 2000); // auto-slide
}

// Initialize both sliders
initSlider('.playground-slider');
initSlider('.jersey-slider');





// Gallery




// Optional: subtle hover zoom effect using JS
const galleryCards = document.querySelectorAll('.gallery-card');

galleryCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = "scale(1.05)";
    card.style.transition = "transform 0.3s";
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = "scale(1)";
    card.style.transition = "transform 0.3s";
  });
});


const sliderTrack = document.querySelector('.slider-track');

// Clone children to make infinite loop
sliderTrack.innerHTML += sliderTrack.innerHTML;





// Membership page specific functionality
function initMembershipPage() {
  // Plan selection smooth scroll
  const planLinks = document.querySelectorAll('.plan-card a[href="#register"]');
  if (planLinks.length > 0) {
    planLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const planType = this.closest('.plan-card').querySelector('h3').textContent.toLowerCase();
        
        // Set the plan selection in the form
        const planSelect = document.getElementById('plan');
        for (let i = 0; i < planSelect.options.length; i++) {
          if (planSelect.options[i].text.toLowerCase().includes(planType)) {
            planSelect.selectedIndex = i;
            break;
          }
        }
        
        // Scroll to form
        document.getElementById('register').scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMembershipPage);
} else {
  initMembershipPage();
}





 // Accordion functionality
    document.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const icon = header.querySelector('i');
        
        // Toggle active class
        content.classList.toggle('active');
        
        // Change icon
        if (content.classList.contains('active')) {
          icon.classList.remove('fa-plus');
          icon.classList.add('fa-minus');
        } else {
          icon.classList.remove('fa-minus');
          icon.classList.add('fa-plus');
        }
      });
    });
    
    // Form submission handling
    document.getElementById('membership-form').addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic form validation
      const requiredFields = this.querySelectorAll('[required]');
      let valid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = 'red';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });
      
      if (!valid) {
        alert('Please fill in all required fields.');
        return;
      }
      
      // In a real application, you would send the data to a server here
      alert('Thank you for your membership application! We will process it shortly.');
      this.reset();
    });
    
    // Highlight selected plan if coming from plan selection
    window.addEventListener('load', () => {
      const urlParams = new URLSearchParams(window.location.search);
      const plan = urlParams.get('plan');
      
      if (plan) {
        document.getElementById('plan').value = plan;
        
        // Scroll to form
        document.getElementById('register').scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
    

    