// Achievements page interactions
document.addEventListener('DOMContentLoaded', function() {
  // Animation for timeline items
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  function checkScroll() {
    timelineItems.forEach(item => {
      const position = item.getBoundingClientRect();
      
      // If item is in viewport
      if(position.top < window.innerHeight - 100) {
        item.style.opacity = 1;
        item.style.transform = 'translateX(0)';
      }
    });
  }
  
  // Initialize timeline animation
  timelineItems.forEach(item => {
    item.style.opacity = 0;
    item.style.transition = 'all 0.5s ease';
    
    if(item.classList.contains('timeline-item:nth-child(odd)')) {
      item.style.transform = 'translateX(-50px)';
    } else {
      item.style.transform = 'translateX(50px)';
    }
  });
  
  // Check scroll on load and scroll
  checkScroll();
  window.addEventListener('scroll', checkScroll);
  
  // Trophy hover effect enhancement
  const trophyItems = document.querySelectorAll('.trophy-item');
  
  trophyItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.querySelector('.trophy-overlay').style.opacity = 1;
    });
    
    item.addEventListener('mouseleave', function() {
      this.querySelector('.trophy-overlay').style.opacity = 0;
    });
  });
});