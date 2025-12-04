// Sample data for properties
const properties = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    host: 'Hosted by Emma',
    location: 'Central District, San Francisco',
    price: 120,
    rating: 4.92,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    type: 'apartment',
    tags: ['pet-friendly', 'luxury'],
    bedrooms: 2,
    bathrooms: 1,
    date: '2023-08-15'
  },
  {
    id: '2',
    title: 'Cozy Studio with City View',
    host: 'Hosted by Michael',
    location: 'Riverside Area, San Francisco',
    price: 95,
    rating: 4.85,
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    type: 'studio',
    tags: ['budget', 'eco-home'],
    bedrooms: 1,
    bathrooms: 1,
    date: '2023-09-20'
  },
  {
    id: '3',
    title: 'Charming Cottage Near Park',
    host: 'Hosted by Sarah',
    location: 'Green Valley, San Francisco',
    price: 150,
    rating: 4.96,
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233',
    type: 'cottage',
    tags: ['family', 'eco-home'],
    bedrooms: 3,
    bathrooms: 2,
    date: '2023-07-30'
  },
  {
    id: '4',
    title: 'Stylish Loft Apartment',
    host: 'Hosted by David',
    location: 'Arts District, San Francisco',
    price: 135,
    rating: 4.88,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
    type: 'apartment',
    tags: ['luxury'],
    bedrooms: 2,
    bathrooms: 2,
    date: '2023-10-05'
  },
  {
    id: '5',
    title: 'Waterfront House with Deck',
    host: 'Hosted by Anna',
    location: 'Bay Area, San Francisco',
    price: 210,
    rating: 4.97,
    image: 'https://images.unsplash.com/photo-1571055107559-3e67626fa8be',
    type: 'house',
    tags: ['pet-friendly', 'luxury'],
    bedrooms: 4,
    bathrooms: 3,
    date: '2023-08-25'
  },
  {
    id: '6',
    title: 'Urban Micro Studio',
    host: 'Hosted by Chris',
    location: 'Downtown, San Francisco',
    price: 75,
    rating: 4.77,
    image: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8',
    type: 'studio',
    tags: ['budget'],
    bedrooms: 1,
    bathrooms: 1,
    date: '2023-09-10'
  },
  {
    id: '7',
    title: 'Garden Cottage Retreat',
    host: 'Hosted by Maria',
    location: 'Sunset District, San Francisco',
    price: 165,
    rating: 4.93,
    image: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90',
    type: 'cottage',
    tags: ['eco-home', 'family'],
    bedrooms: 2,
    bathrooms: 2,
    date: '2023-10-15'
  },
  {
    id: '8',
    title: 'Luxury Penthouse Suite',
    host: 'Hosted by James',
    location: 'Financial District, San Francisco',
    price: 275,
    rating: 4.99,
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd',
    type: 'apartment',
    tags: ['luxury'],
    bedrooms: 3,
    bathrooms: 3,
    date: '2023-07-20'
  }
];

// Generate additional properties for loading more
const additionalProperties = [...properties].map((property, index) => {
  const id = (index + properties.length + 1).toString();
  return {
    ...property,
    id,
    price: Math.floor(property.price * 0.9 + Math.random() * 60),
    rating: (4.7 + Math.random() * 0.29).toFixed(2),
    date: '2023-11-' + (index + 5).toString().padStart(2, '0')
  };
});

// Favorites storage
let favorites = JSON.parse(localStorage.getItem('bookitFavorites')) || [];

// Current state
let currentFilters = {
  minPrice: null,
  maxPrice: null,
  rating: null,
  type: [],
  tags: []
};

let currentSort = 'recent';
let currentPage = 1;
let propertiesPerPage = 8;
let filteredProperties = [...properties];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  renderProperties();
  setupEventListeners();
  updateResultCount();
  setCurrentYear();
});

// Render properties based on current filters and pagination
function renderProperties() {
  const propertiesContainer = document.getElementById('properties-container');
  const displayProperties = getDisplayProperties();
  
  propertiesContainer.innerHTML = '';
  
  displayProperties.forEach(property => {
    const isFavorite = favorites.includes(property.id);
    
    const propertyCard = document.createElement('div');
    propertyCard.className = 'property-card';
    
    propertyCard.innerHTML = `
      <div class="property-image-wrapper">
        <img 
          src="${property.image}" 
          alt="${property.title}"
          class="property-image"
        />
        <div class="property-type-tag">${capitalizeFirstLetter(property.type)}</div>
        <button class="property-favorite ${isFavorite ? 'active' : ''}" data-id="${property.id}">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ${isFavorite ? 'fill="#e53e3e"' : 'fill="none"'} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
        <div class="property-rating">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="var(--color-blue)" class="property-rating-star">
            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.006z" clip-rule="evenodd" />
          </svg>
          <span class="property-rating-value">${property.rating}</span>
        </div>
      </div>
      <div class="property-details">
        <h3 class="property-title">${property.title}</h3>
        <p class="property-host">${property.host}</p>
        <div class="property-location">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="property-location-icon">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span class="property-location-text">${property.location}</span>
        </div>
        <div class="property-tags">
          ${property.tags.map(tag => `<span class="property-tag">${formatTag(tag)}</span>`).join('')}
        </div>
        <p class="property-price">
          $${property.price} <span class="property-price-unit">night</span>
        </p>
      </div>
    `;
    
    propertiesContainer.appendChild(propertyCard);
  });
  
  // Add event listeners for favorites
  document.querySelectorAll('.property-favorite').forEach(button => {
    button.addEventListener('click', function() {
      toggleFavorite(this.dataset.id);
      this.classList.toggle('active');
      updateFavoriteButtonState(this, this.dataset.id);
    });
  });
  
  // Hide or show load more button based on remaining properties
  const loadMoreButton = document.getElementById('load-more-button');
  if (currentPage * propertiesPerPage >= filteredProperties.length) {
    loadMoreButton.style.display = 'none';
  } else {
    loadMoreButton.style.display = 'block';
  }
}

function getDisplayProperties() {
  // Apply filters
  applyFilters();
  
  // Apply sorting
  applySorting();
  
  // Apply pagination
  return filteredProperties.slice(0, currentPage * propertiesPerPage);
}

function applyFilters() {
  filteredProperties = [...properties, ...additionalProperties].filter(property => {
    // Price filter
    if (currentFilters.minPrice && property.price < currentFilters.minPrice) {
      return false;
    }
    
    if (currentFilters.maxPrice && property.price > currentFilters.maxPrice) {
      return false;
    }
    
    // Rating filter
    if (currentFilters.rating && property.rating < currentFilters.rating) {
      return false;
    }
    
    // Type filter
    if (currentFilters.type.length > 0 && !currentFilters.type.includes(property.type)) {
      return false;
    }
    
    // Tags filter
    if (currentFilters.tags.length > 0 && !currentFilters.tags.some(tag => property.tags.includes(tag))) {
      return false;
    }
    
    return true;
  });
}

function applySorting() {
  switch (currentSort) {
    case 'recent':
      filteredProperties.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case 'price-low':
      filteredProperties.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filteredProperties.sort((a, b) => b.price - a.price);
      break;
    case 'rating-high':
      filteredProperties.sort((a, b) => b.rating - a.rating);
      break;
  }
}

function setupEventListeners() {
  // Price filters
  document.getElementById('min-price').addEventListener('change', function() {
    currentFilters.minPrice = this.value ? Number(this.value) : null;
  });
  
  document.getElementById('max-price').addEventListener('change', function() {
    currentFilters.maxPrice = this.value ? Number(this.value) : null;
  });
  
  // Rating filter
  document.getElementById('rating-select').addEventListener('change', function() {
    currentFilters.rating = this.value === 'any' ? null : Number(this.value);
  });
  
  // Sort options
  document.getElementById('sort-select').addEventListener('change', function() {
    currentSort = this.value;
    currentPage = 1; // Reset pagination when sort changes
    renderProperties();
  });
  
  // Property type buttons
  document.querySelectorAll('.property-type-button').forEach(button => {
    button.addEventListener('click', function() {
      const type = this.dataset.type;
      this.classList.toggle('active');
      
      if (this.classList.contains('active')) {
        if (!currentFilters.type.includes(type)) {
          currentFilters.type.push(type);
        }
      } else {
        currentFilters.type = currentFilters.type.filter(t => t !== type);
      }
    });
  });
  
  // Tag buttons
  document.querySelectorAll('.tag-button').forEach(button => {
    button.addEventListener('click', function() {
      const tag = this.dataset.tag;
      this.classList.toggle('active');
      
      if (this.classList.contains('active')) {
        if (!currentFilters.tags.includes(tag)) {
          currentFilters.tags.push(tag);
        }
      } else {
        currentFilters.tags = currentFilters.tags.filter(t => t !== tag);
      }
    });
  });
  
  // Apply filters button
  document.querySelector('.apply-filters-button').addEventListener('click', function() {
    currentPage = 1; // Reset to first page when applying new filters
    renderProperties();
    updateResultCount();
    updateActiveFiltersText();
  });
  
  // Clear filters button
  document.querySelector('.clear-filters-button').addEventListener('click', function() {
    // Reset all filters
    currentFilters = {
      minPrice: null,
      maxPrice: null,
      rating: null,
      type: [],
      tags: []
    };
    
    // Reset UI
    document.getElementById('min-price').value = '';
    document.getElementById('max-price').value = '';
    document.getElementById('rating-select').value = 'any';
    document.querySelectorAll('.property-type-button').forEach(button => {
      button.classList.remove('active');
    });
    document.querySelectorAll('.tag-button').forEach(button => {
      button.classList.remove('active');
    });
    
    // Reset to first page
    currentPage = 1;
    
    // Update UI
    renderProperties();
    updateResultCount();
    updateActiveFiltersText();
  });
  
  // Load more button
  document.getElementById('load-more-button').addEventListener('click', function() {
    currentPage += 1;
    renderProperties();
  });
}

function toggleFavorite(propertyId) {
  if (favorites.includes(propertyId)) {
    favorites = favorites.filter(id => id !== propertyId);
  } else {
    favorites.push(propertyId);
  }
  
  // Save to local storage
  localStorage.setItem('bookitFavorites', JSON.stringify(favorites));
}

function updateFavoriteButtonState(button, propertyId) {
  const isFavorite = favorites.includes(propertyId);
  
  // Update SVG fill
  const svg = button.querySelector('svg');
  if (isFavorite) {
    svg.setAttribute('fill', '#e53e3e');
  } else {
    svg.setAttribute('fill', 'none');
  }
}

function updateResultCount() {
  const countElement = document.getElementById('results-count');
  countElement.textContent = `(${filteredProperties.length})`;
}

function updateActiveFiltersText() {
  const filtersTextElement = document.getElementById('active-filters');
  const activeFilters = [];
  
  if (currentFilters.minPrice) {
    activeFilters.push(`Min $${currentFilters.minPrice}`);
  }
  
  if (currentFilters.maxPrice) {
    activeFilters.push(`Max $${currentFilters.maxPrice}`);
  }
  
  if (currentFilters.rating) {
    activeFilters.push(`${currentFilters.rating}+ rating`);
  }
  
  if (currentFilters.type.length > 0) {
    activeFilters.push(`Types: ${currentFilters.type.map(capitalizeFirstLetter).join(', ')}`);
  }
  
  if (currentFilters.tags.length > 0) {
    activeFilters.push(`Tags: ${currentFilters.tags.map(formatTag).join(', ')}`);
  }
  
  if (activeFilters.length > 0) {
    filtersTextElement.textContent = `Filtered by: ${activeFilters.join(' • ')}`;
  } else {
    filtersTextElement.textContent = 'Showing all available properties';
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatTag(tag) {
  return tag.split('-').map(capitalizeFirstLetter).join('-');
}

// Set current year in footer
function setCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}