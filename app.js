// DOM Elements
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const backButton = document.getElementById('backButton');

// Mobile Menu Toggle
if (mobileMenuButton && mobileMenu && mobileMenuClose) {
  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.add('active');
  });
  
  mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
  });
}

// Back Button Functionality
if (backButton) {
  backButton.addEventListener('click', () => {
    window.history.back();
  });
}

// Helper Functions
function getPropertyById(id) {
  return properties.find(property => property.id === id);
}

function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    id: params.get('id'),
    location: params.get('location'),
    date: params.get('date'),
    price: params.get('price')
  };
}

// Create Property Card Element
function createPropertyCard(property) {
  const propertyCard = document.createElement('div');
  propertyCard.className = 'property-card';
  
  const featuredBadge = property.isFeatured ? `<div class="property-badge">Featured</div>` : '';
  
  propertyCard.innerHTML = `
    <a href="property.html?id=${property.id}">
      <div class="property-image">
        <img src="${property.image}" alt="${property.title}">
        ${featuredBadge}
        <div class="property-overlay">
          <div class="property-overlay-content">
            <span class="property-type">${property.type}</span>
            <div class="property-rating">
              <i class="fas fa-star"></i>
              <span>${property.rating.toFixed(1)} (${property.reviewCount})</span>
            </div>
          </div>
        </div>
      </div>
      <div class="property-content">
        <h3>${property.title}</h3>
        <p>${property.location}</p>
        <div class="property-price">
          <span class="price">$${property.price}</span>
          <span class="period">/night</span>
        </div>
      </div>
    </a>
  `;
  
  return propertyCard;
}

// Create Location Card Element
function createLocationCard(location) {
  const locationCard = document.createElement('div');
  locationCard.className = 'destination-card';
  
  locationCard.innerHTML = `
    <a href="explore.html?location=${location.slug}">
      <img src="${location.image}" alt="${location.name}">
      <div class="destination-content">
        <h3>${location.name}</h3>
        <p>${location.propertyCount} properties</p>
      </div>
    </a>
  `;
  
  return locationCard;
}

// Home Page Functionality
const featuredPropertiesGrid = document.getElementById('featuredPropertiesGrid');
const popularLocationsGrid = document.getElementById('popularLocationsGrid');

if (featuredPropertiesGrid) {
  const featuredProperties = properties.filter(property => property.isFeatured);
  
  featuredProperties.forEach(property => {
    featuredPropertiesGrid.appendChild(createPropertyCard(property));
  });
}

if (popularLocationsGrid) {
  locations.forEach(location => {
    popularLocationsGrid.appendChild(createLocationCard(location));
  });
}

// Explore Page Functionality
const propertiesGrid = document.getElementById('propertiesGrid');
const noResults = document.getElementById('noResults');
const resultsTitle = document.getElementById('resultsTitle');
const resultsCount = document.getElementById('resultsCount');
const propertyTypeFilter = document.getElementById('propertyTypeFilter');
const sortFilter = document.getElementById('sortFilter');
const searchForm = document.getElementById('searchForm');

if (propertiesGrid) {
  const params = getUrlParams();
  let filteredProperties = [...properties];
  
  // Apply URL filters
  if (params.location) {
    filteredProperties = filteredProperties.filter(p => 
      p.location.toLowerCase().includes(params.location.toLowerCase())
    );
    resultsTitle.textContent = `Properties in ${params.location}`;
  }
  
  if (params.date) {
    // In a real app, we would filter by date availability
    // For this demo, we'll just show all properties
  }
  
  if (params.price) {
    switch(params.price) {
      case '1': // less than 60
        filteredProperties = filteredProperties.filter(p => p.price < 60);
        break;
      case '2': // 60-120
        filteredProperties = filteredProperties.filter(p => p.price >= 60 && p.price <= 120);
        break;
      case '3': // 121-200
        filteredProperties = filteredProperties.filter(p => p.price > 120 && p.price <= 200);
        break;
      case '4': // 200+
        filteredProperties = filteredProperties.filter(p => p.price > 200);
        break;
    }
  }
  
  // Populate filters with URL param values
  if (params.location && document.getElementById('locationInput')) {
    document.getElementById('locationInput').value = params.location;
  }
  
  if (params.date && document.getElementById('dateInput')) {
    document.getElementById('dateInput').value = params.date;
  }
  
  if (params.price && document.getElementById('priceInput')) {
    document.getElementById('priceInput').value = params.price;
  }
  
  // Update result count
  resultsCount.textContent = `${filteredProperties.length} properties found`;
  
  // Apply filters and sort
  function applyFilters() {
    // Clear previous results
    propertiesGrid.innerHTML = '';
    
    // Get filter values
    const propertyType = propertyTypeFilter.value;
    const sortOption = sortFilter.value;
    let currentProperties = [...filteredProperties];
    
    // Filter by property type
    if (propertyType !== 'all') {
      currentProperties = currentProperties.filter(p => p.type.toLowerCase() === propertyType.toLowerCase());
    }
    
    // Sort properties
    switch(sortOption) {
      case 'price-asc':
        currentProperties.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        currentProperties.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        currentProperties.sort((a, b) => b.rating - a.rating);
        break;
      default: // recommended
        break;
    }
    
    // Update result count
    resultsCount.textContent = `${currentProperties.length} properties found`;
    
    // Display properties or no results message
    if (currentProperties.length > 0) {
      currentProperties.forEach(property => {
        propertiesGrid.appendChild(createPropertyCard(property));
      });
      noResults.classList.add('hidden');
    } else {
      noResults.classList.remove('hidden');
    }
  }
  
  // Add event listeners for filters
  if (propertyTypeFilter) {
    propertyTypeFilter.addEventListener('change', applyFilters);
  }
  
  if (sortFilter) {
    sortFilter.addEventListener('change', applyFilters);
  }
  
  // Initial render
  applyFilters();
}

// Property Detail Page Functionality
const propertyDetailContainer = document.getElementById('propertyDetailContainer');
const propertyDetailContent = document.getElementById('propertyDetailContent');
const propertyNotFound = document.getElementById('propertyNotFound');
const similarPropertiesSection = document.getElementById('similarPropertiesSection');
const similarPropertiesGrid = document.getElementById('similarPropertiesGrid');

if (propertyDetailContent) {
  const params = getUrlParams();
  const propertyId = params.id;
  
  if (propertyId) {
    const property = getPropertyById(propertyId);
    
    if (property) {
      document.title = `${property.title} - Bookit`;
      
      // Create property detail HTML
      const propertyDetailHTML = `
        <div class="property-header">
          <div>
            <h1>${property.title}</h1>
            <div class="property-meta">
              <div class="location">
                <i class="fas fa-map-marker-alt"></i>
                <span>${property.location}</span>
              </div>
              <div class="dot-separator"></div>
              <div class="rating">
                <i class="fas fa-star"></i>
                <span>${property.rating.toFixed(1)} (${property.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
          <div>
            <div class="property-price">
              <span class="property-price-detail">$${property.price}</span>
              <span class="price-period">/night</span>
            </div>
          </div>
        </div>
        
        <div class="property-detail-image">
          <img src="${property.image}" alt="${property.title}">
        </div>
        
        <div class="property-content-grid">
          <div class="property-info">
            <div class="host-info">
              <h2>${property.type} hosted by John Doe</h2>
              <div class="amenity-grid">
                <div class="amenity-item">
                  <i class="fas fa-bed"></i>
                  <span>${property.bedrooms} Bedrooms</span>
                </div>
                <div class="amenity-item">
                  <i class="fas fa-bath"></i>
                  <span>${property.bathrooms} Bathrooms</span>
                </div>
                <div class="amenity-item">
                  <i class="fas fa-users"></i>
                  <span>${property.guests} Guests</span>
                </div>
                <div class="amenity-item">
                  <i class="fas fa-ruler-combined"></i>
                  <span>${property.size}</span>
                </div>
              </div>
              <p class="property-description">
                ${property.description}
              </p>
            </div>
            
            <div class="amenities-section">
              <h3>Amenities</h3>
              <div class="amenities-grid">
                ${property.amenities.map(amenity => `
                  <div class="amenity">
                    <i class="fas fa-check"></i>
                    <span>${amenity}</span>
                  </div>
                `).join('')}
              </div>
            </div>
            
            <div class="location-section" style="margin-top: 2rem;">
              <h3>Location</h3>
              <div style="background-color: #f1f5f9; height: 16rem; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; margin-top: 1rem;">
                <p style="color: #64748b;">Map view of ${property.location}</p>
              </div>
            </div>
          </div>
          
          <div>
            <div class="booking-box">
              <h3>Book this property</h3>
              
              <div class="booking-inputs">
                <div>
                  <label>Check-in</label>
                  <div class="input-icon">
                    <i class="fas fa-calendar"></i>
                    <input type="date" id="checkinDate">
                  </div>
                </div>
                
                <div>
                  <label>Check-out</label>
                  <div class="input-icon">
                    <i class="fas fa-calendar"></i>
                    <input type="date" id="checkoutDate">
                  </div>
                </div>
                
                <div>
                  <label>Guests</label>
                  <select id="guestCount">
                    <option value="1">1 guest</option>
                    <option value="2">2 guests</option>
                    <option value="3">3 guests</option>
                    <option value="4">4 guests</option>
                    <option value="5">5+ guests</option>
                  </select>
                </div>
              </div>
              
              <div class="booking-price">
                <div class="booking-price-row">
                  <span>$${property.price} x 5 nights</span>
                  <span>$${property.price * 5}</span>
                </div>
                <div class="booking-price-row">
                  <span>Cleaning fee</span>
                  <span>$60</span>
                </div>
                <div class="booking-price-row">
                  <span>Service fee</span>
                  <span>$80</span>
                </div>
              </div>
              
              <div class="booking-total">
                <span>Total</span>
                <span>$${property.price * 5 + 60 + 80}</span>
              </div>
              
              <button class="btn btn-primary" style="width: 100%;">Book now</button>
            </div>
          </div>
        </div>
      `;
      
      // Display property details
      propertyDetailContent.innerHTML = propertyDetailHTML;
      
      // Find similar properties (excluding current one)
      const similarProperties = properties
        .filter(p => p.id !== property.id && p.type === property.type)
        .slice(0, 3);
      
      if (similarProperties.length > 0) {
        similarPropertiesSection.classList.remove('hidden');
        
        similarProperties.forEach(similarProperty => {
          similarPropertiesGrid.appendChild(createPropertyCard(similarProperty));
        });
      }
      
    } else {
      propertyDetailContent.classList.add('hidden');
      propertyNotFound.classList.remove('hidden');
    }
  } else {
    propertyDetailContent.classList.add('hidden');
    propertyNotFound.classList.remove('hidden');
  }
}

// Submit Property Form
const propertySubmitForm = document.getElementById('propertySubmitForm');
const imagePreview = document.getElementById('imagePreview');
const propertyImages = document.getElementById('propertyImages');

if (propertySubmitForm) {
  propertySubmitForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // In a real app, we would send the form data to the server
    // For this demo, we'll just show an alert
    alert('Property submitted successfully! In a real application, this would be saved to a database.');
    
    // Reset the form
    propertySubmitForm.reset();
    if (imagePreview) {
      imagePreview.innerHTML = '';
    }
  });
}

if (propertyImages) {
  propertyImages.addEventListener('change', function(e) {
    if (imagePreview) {
      imagePreview.innerHTML = '';
      
      // Show image previews
      const files = e.target.files;
      const maxFiles = 5;
      
      for (let i = 0; i < Math.min(files.length, maxFiles); i++) {
        const file = files[i];
        const reader = new FileReader();
        
        reader.onload = function(event) {
          const img = document.createElement('img');
          img.src = event.target.result;
          imagePreview.appendChild(img);
        };
        
        reader.readAsDataURL(file);
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuButton = document.getElementById('mobileMenuButton');
  
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', function() {
      // Create mobile menu if it doesn't exist
      let mobileMenu = document.querySelector('.mobile-menu');
      
      if (!mobileMenu) {
        mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        mobileMenu.innerHTML = `
          <div class="container">
            <div class="mobile-menu-header">
              <div class="logo">Bookit</div>
              <button class="mobile-menu-close">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <nav class="mobile-nav">
              <a href="index.html">Home</a>
              <a href="explore.html">Explore</a>
              <a href="dashboard.html">Dashboard</a>
              <a href="listings.html">Listings</a>
              <a href="payments.html">Payments</a>
              <a href="bookings.html">Bookings</a>
              <a href="reviews.html">Reviews</a>
              <a href="profile.html">Profile</a>
            </nav>
            <div class="mobile-auth">
              <button class="btn btn-primary btn-full">Logout</button>
            </div>
          </div>
        `;
        document.body.appendChild(mobileMenu);
        
        // Add close functionality
        const closeButton = mobileMenu.querySelector('.mobile-menu-close');
        closeButton.addEventListener('click', function() {
          mobileMenu.classList.remove('active');
        });
      }
      
      // Toggle mobile menu
      mobileMenu.classList.toggle('active');
    });
  }

  // Profile page tab functionality
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  
  if (tabButtons.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get the tab id to show
        const tabId = this.getAttribute('data-tab');
        const tabToShow = document.getElementById(tabId + '-tab');
        
        if (tabToShow) {
          tabToShow.classList.add('active');
        }
      });
    });
  }

  // Password visibility toggle
  const passwordToggleButtons = document.querySelectorAll('.password-toggle');
  
  if (passwordToggleButtons.length > 0) {
    passwordToggleButtons.forEach(button => {
      button.addEventListener('click', function() {
        const inputField = this.parentElement.querySelector('input');
        
        if (inputField.type === 'password') {
          inputField.type = 'text';
          this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';
        } else {
          inputField.type = 'password';
          this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
        }
      });
    });
  }

  // Search functionality
  const searchInputs = document.querySelectorAll('input[type="search"]');
  
  if (searchInputs.length > 0) {
    searchInputs.forEach(input => {
      input.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const tableRows = document.querySelectorAll('tbody tr');
        
        tableRows.forEach(row => {
          const text = row.textContent.toLowerCase();
          if (text.includes(searchTerm)) {
            row.style.display = '';
          } else {
            row.style.display = 'none';
          }
        });
        
        // For reviews page
        const reviewCards = document.querySelectorAll('.dashboard-card');
        if (reviewCards.length > 0) {
          reviewCards.forEach(card => {
            if (!card.querySelector('.tab-content')) { // Skip profile page cards
              const text = card.textContent.toLowerCase();
              if (text.includes(searchTerm)) {
                card.style.display = '';
              } else {
                card.style.display = 'none';
              }
            }
          });
        }
      });
    });
  }

  // Filter selects
  const filterSelects = document.querySelectorAll('.select-filter');
  
  if (filterSelects.length > 0) {
    filterSelects.forEach(select => {
      select.addEventListener('change', function() {
        const filterValue = this.value;
        
        // For bookings page
        if (this.closest('main').querySelector('table')) {
          const tableRows = document.querySelectorAll('tbody tr');
          
          tableRows.forEach(row => {
            const statusCell = row.querySelector('td:nth-child(6)');
            if (statusCell) {
              const status = statusCell.textContent.trim().toLowerCase();
              
              if (filterValue === 'all' || status.includes(filterValue.toLowerCase())) {
                row.style.display = '';
              } else {
                row.style.display = 'none';
              }
            }
          });
        }
        
        // For reviews page
        if (this.closest('main').querySelector('.dashboard-card')) {
          const reviewCards = document.querySelectorAll('.dashboard-card');
          
          reviewCards.forEach(card => {
            if (!card.querySelector('.tab-content')) { // Skip profile page cards
              const propertyText = card.querySelector('.text-sm.text-gray-500')?.textContent || '';
              
              if (filterValue === 'all' || propertyText.toLowerCase().includes(filterValue.toLowerCase())) {
                card.style.display = '';
              } else {
                card.style.display = 'none';
              }
            }
          });
        }
      });
    });
  }
  
  // Form submission handlers
  const forms = document.querySelectorAll('form');
  if (forms.length > 0) {
    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Form submitted successfully! (This is a demo)');
      });
    });
  }
  
  // Accept/Decline booking buttons
  const actionButtons = document.querySelectorAll('.btn-outline.text-green-600, .btn-outline.text-red-600');
  if (actionButtons.length > 0) {
    actionButtons.forEach(button => {
      button.addEventListener('click', function() {
        const action = this.textContent.trim();
        const row = this.closest('tr');
        const property = row.querySelector('td:first-child').textContent;
        
        alert(`Booking for "${property}" has been ${action}d!`);
        
        // Update status cell
        const statusCell = row.querySelector('td:nth-child(6) span');
        if (statusCell) {
          if (action === 'Accept') {
            statusCell.textContent = 'Confirmed';
            statusCell.className = 'px-2 py-1 rounded-full text-xs bg-green-100 text-green-800';
          } else if (action === 'Decline') {
            statusCell.textContent = 'Cancelled';
            statusCell.className = 'px-2 py-1 rounded-full text-xs bg-red-100 text-red-800';
          }
        }
        
        // Replace action buttons with view details button
        const actionsCell = row.querySelector('td:last-child');
        actionsCell.innerHTML = '<button class="btn btn-sm btn-outline">View Details</button>';
      });
    });
  }
  
  // Reply to review buttons
  const replyButtons = document.querySelectorAll('.dashboard-card-footer .btn-outline');
  if (replyButtons.length > 0) {
    replyButtons.forEach(button => {
      button.addEventListener('click', function() {
        const card = this.closest('.dashboard-card');
        const guestName = card.querySelector('h3').textContent;
        
        const replyForm = document.createElement('div');
        replyForm.className = 'mt-4';
        replyForm.innerHTML = `
          <textarea class="form-textarea w-full" placeholder="Write your reply to ${guestName}..." rows="3"></textarea>
          <div class="flex justify-end gap-2 mt-2">
            <button class="btn btn-sm btn-outline cancel-reply">Cancel</button>
            <button class="btn btn-sm btn-primary send-reply">Send Reply</button>
          </div>
        `;
        
        // Replace button with form
        this.style.display = 'none';
        card.querySelector('.dashboard-card-footer').appendChild(replyForm);
        
        // Add event listeners to new buttons
        card.querySelector('.cancel-reply').addEventListener('click', function() {
          replyForm.remove();
          button.style.display = '';
        });
        
        card.querySelector('.send-reply').addEventListener('click', function() {
          const replyText = replyForm.querySelector('textarea').value;
          if (replyText.trim()) {
            alert(`Reply sent to ${guestName}!`);
            
            // Show sent message
            replyForm.innerHTML = `
              <div class="text-sm text-green-600 mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline mr-1"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Reply sent
              </div>
            `;
            
            // Remove after 3 seconds
            setTimeout(() => {
              replyForm.remove();
              button.style.display = '';
            }, 3000);
          } else {
            alert('Please write a reply before sending.');
          }
        });
      });
    });
  }
  
  // Notification toggles
  const switchInputs = document.querySelectorAll('.switch-input');
  if (switchInputs.length > 0) {
    switchInputs.forEach(input => {
      input.addEventListener('change', function() {
        const settingName = this.id;
        const isEnabled = this.checked;
        console.log(`${settingName} is now ${isEnabled ? 'enabled' : 'disabled'}`);
      });
    });
  }
});