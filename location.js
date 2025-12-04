
// Properties data
const properties = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    location: 'Central District, San Francisco',
    price: 120,
    rating: 4.92,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    bedrooms: 2,
    bathrooms: 1,
  },
  {
    id: '2',
    title: 'Cozy Studio with City View',
    location: 'Riverside Area, San Francisco',
    price: 95,
    rating: 4.85,
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    bedrooms: 1,
    bathrooms: 1,
  },
  {
    id: '3',
    title: 'Charming Cottage Near Park',
    location: 'Green Valley, San Francisco',
    price: 150,
    rating: 4.96,
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233',
    bedrooms: 3,
    bathrooms: 2,
  },
  {
    id: '4',
    title: 'Stylish Loft Apartment',
    location: 'Arts District, San Francisco',
    price: 135,
    rating: 4.88,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
    bedrooms: 2,
    bathrooms: 2,
  }
];

// Popular locations data
const popularLocations = [
  {
    id: '1',
    name: 'San Francisco',
    properties: 534,
    image: 'https://images.unsplash.com/photo-1610484826967-09c5720778c7'
  },
  {
    id: '2',
    name: 'Los Angeles',
    properties: 621,
    image: 'https://images.unsplash.com/photo-1609924211018-5526c55bad5b'
  },
  {
    id: '3',
    name: 'New York',
    properties: 813,
    image: 'https://images.unsplash.com/photo-1611161356639-027a307maintediff=scale-down-width-800'
  },
  {
    id: '4',
    name: 'Chicago',
    properties: 385,
    image: 'https://images.unsplash.com/photo-1494522358652-f30e61a60313'
  }
];

// Function to render properties
function renderProperties() {
  const propertiesContainer = document.getElementById('properties-container');
  
  properties.forEach(property => {
    const propertyCard = document.createElement('div');
    propertyCard.className = 'property-card';
    
    propertyCard.innerHTML = `
      <div class="property-image-wrapper">
        <img 
          src="${property.image}" 
          alt="${property.title}"
          class="property-image"
        />
        <div class="property-rating">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="#0077C0" 
            class="property-rating-star"
          >
            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.006z" clip-rule="evenodd" />
          </svg>
          <span class="property-rating-value">${property.rating}</span>
        </div>
      </div>
      <div class="property-details">
        <h3 class="property-title">${property.title}</h3>
        <div class="property-location">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="property-location-icon">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span class="property-location-text">${property.location}</span>
        </div>
        <div class="property-features">
          <span>${property.bedrooms} Bedroom${property.bedrooms !== 1 ? 's' : ''}</span>
          <span class="property-divider">•</span>
          <span>${property.bathrooms} Bathroom${property.bathrooms !== 1 ? 's' : ''}</span>
        </div>
        <p class="property-price">
          $${property.price} <span class="property-price-unit">night</span>
        </p>
      </div>
    `;
    
    propertiesContainer.appendChild(propertyCard);
  });
}

// Function to render popular locations
function renderPopularLocations() {
  const locationsContainer = document.getElementById('locations-container');
  
  popularLocations.forEach(location => {
    const locationCard = document.createElement('div');
    locationCard.className = 'popular-location-card';
    
    locationCard.innerHTML = `
      <div class="location-image-wrapper">
        <img 
          src="${location.image}" 
          alt="${location.name}"
          class="location-image"
        />
      </div>
      <div class="location-overlay">
        <h3 class="location-name">${location.name}</h3>
        <p class="location-property-count">${location.properties} properties</p>
      </div>
    `;
    
    locationsContainer.appendChild(locationCard);
  });
}

// Add event listeners to filter buttons
function setupFilterButtons() {
  const filterButtons = document.querySelectorAll('.filter-button');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      this.classList.toggle('active');
    });
  });
}

// Set current year in footer
function setCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  renderProperties();
  renderPopularLocations();
  setupFilterButtons();
  setCurrentYear();
  
  // Add navigation for all pages
  const navLinks = document.querySelectorAll('a[href="index.html"], a[href="location.html"], a[href="explore.html"], a[href="about.html"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Update active state in navbar
      document.querySelectorAll('.navbar-actions a').forEach(navLink => {
        navLink.classList.remove('active');
      });
      
      this.classList.add('active');
    });
  });
});