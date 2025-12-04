document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const closeSidebarButton = document.querySelector('.close-sidebar');
  const mobileSidebar = document.getElementById('mobileSidebar');
  
  // Create sidebar overlay
  const sidebarOverlay = document.createElement('div');
  sidebarOverlay.className = 'sidebar-overlay';
  document.body.appendChild(sidebarOverlay);
  
  // Toggle mobile sidebar
  function toggleSidebar() {
    mobileSidebar.classList.toggle('active');
    sidebarOverlay.classList.toggle('active');
    document.body.classList.toggle('overflow-hidden');
  }
  
  // Open sidebar
  mobileMenuButton.addEventListener('click', toggleSidebar);
  
  // Close sidebar
  closeSidebarButton.addEventListener('click', toggleSidebar);
  sidebarOverlay.addEventListener('click', toggleSidebar);
  
  // Header scroll effect
  const header = document.querySelector('.site-header');
  let isScrolled = false;
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 10) {
      if (!isScrolled) {
        header.style.boxShadow = 'var(--shadow-sm)';
        isScrolled = true;
      }
    } else {
      if (isScrolled) {
        header.style.boxShadow = 'none';
        isScrolled = false;
      }
    }
  });
  
  // Property carousel functionality
  const prevButton = document.querySelector('.carousel-control.prev');
  const nextButton = document.querySelector('.carousel-control.next');
  const propertyCards = document.querySelectorAll('.property-card');
  
  if (prevButton && nextButton && propertyCards.length > 0) {
    let currentIndex = 0;
    const cardsPerView = window.innerWidth < 640 ? 1 : 
                         window.innerWidth < 1024 ? 2 : 3;
    
    // Initialize visibility
    updateCardVisibility();
    
    // Next slide
    nextButton.addEventListener('click', function() {
      currentIndex = (currentIndex + 1) % (propertyCards.length - cardsPerView + 1);
      updateCardVisibility();
    });
    
    // Previous slide
    prevButton.addEventListener('click', function() {
      currentIndex = currentIndex === 0 ? 
                     propertyCards.length - cardsPerView : 
                     currentIndex - 1;
      updateCardVisibility();
    });
    
    // Update which cards are visible
    function updateCardVisibility() {
      propertyCards.forEach((card, index) => {
        if (index >= currentIndex && index < currentIndex + cardsPerView) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
      const newCardsPerView = window.innerWidth < 640 ? 1 : 
                              window.innerWidth < 1024 ? 2 : 3;
      
      if (newCardsPerView !== cardsPerView) {
        currentIndex = 0;
        updateCardVisibility();
      }
    });
  }
  
  // Animation on scroll
  const animatedElements = document.querySelectorAll('.property-card, .destination-card, .benefit-card');
  
  function checkVisibility() {
    animatedElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('animate-fade-in');
      }
    });
  }
  
  // Check elements visibility on initial load
  checkVisibility();
  
  // Check elements visibility on scroll
  window.addEventListener('scroll', checkVisibility);
});
