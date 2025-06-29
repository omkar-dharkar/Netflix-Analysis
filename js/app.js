import { authManager } from './auth.js';
import { ContentManager, contentGenres } from './content.js';
import { NetflixDashboard } from './dashboard.js';
import { NetflixAnalyticsEngine } from './analytics-engine.js';

class NetflixAnalyticsApp {
  constructor() {
    this.contentManager = new ContentManager();
    this.dashboard = null;
    this.analytics = new NetflixAnalyticsEngine();
    this.isLoading = false;
    this.debounceTimer = null;
    this.currentTab = 'dashboard';
    this.dashboardInitialized = false;
    this.lastRenderTime = 0;
    
    this.initializeApp();
  }

  initializeApp() {
    this.renderGenres();
    this.setupEventListeners();
    this.setupTabNavigation();
    this.filterAndRenderContent();
    this.setupAnalyticsFeatures();
    
    // Initialize dashboard with a small delay to ensure DOM is ready
    setTimeout(() => {
      if (this.currentTab === 'dashboard') {
        this.initializeDashboard();
      }
    }, 100);
  }

  initializeDashboard() {
    if (this.dashboardInitialized || !this.isDashboardVisible()) return;
    
    try {
      this.dashboard = new NetflixDashboard();
      this.dashboardInitialized = true;
    } catch (error) {
      console.error('Dashboard initialization failed:', error);
    }
  }

  isDashboardVisible() {
    const dashboardContent = document.getElementById('dashboard-content');
    return dashboardContent && !dashboardContent.classList.contains('hidden');
  }

  renderGenres() {
    const genreContainer = document.getElementById('genre-container');
    if (!genreContainer) return;

    const genreHTML = contentGenres.map(genre => `
      <div class="genre-btn ${genre.id === 'all' ? 'active' : ''}" data-genre="${genre.id}">
        <i class="${genre.icon} mr-2"></i>
        ${genre.name}
      </div>
    `).join('');
    
    genreContainer.innerHTML = genreHTML;
  }

  setupEventListeners() {
    // Search input with optimized debouncing
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.debounceSearch(e.target.value);
      });
    }

    // Sort select
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        this.filterAndRenderContent();
      });
    }

    // Genre buttons with event delegation
    const genreContainer = document.getElementById('genre-container');
    if (genreContainer) {
      genreContainer.addEventListener('click', (e) => {
        const genreBtn = e.target.closest('.genre-btn');
        if (genreBtn) {
          this.handleGenreClick(genreBtn);
        }
      });
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
    }
  }

  setupTabNavigation() {
    const tabButtons = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetTab = button.dataset.tab;
        
        // Prevent unnecessary re-renders
        if (this.currentTab === targetTab) return;
        
        // Update tab states
        this.switchTab(targetTab, tabButtons, tabContents);
        
        // Initialize dashboard only when needed
        if (targetTab === 'dashboard' && !this.dashboardInitialized) {
          setTimeout(() => this.initializeDashboard(), 50);
        }
        
        // Hide mobile menu
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
          mobileMenu.classList.add('hidden');
        }
      });
    });
  }

  switchTab(targetTab, tabButtons, tabContents) {
    // Remove active states
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => {
      content.classList.add('hidden');
      content.classList.remove('active');
    });
    
    // Set active states
    const activeButton = document.querySelector(`[data-tab="${targetTab}"]`);
    const targetContent = document.getElementById(`${targetTab}-content`);
    
    if (activeButton) activeButton.classList.add('active');
    if (targetContent) {
      targetContent.classList.remove('hidden');
      targetContent.classList.add('active');
    }
    
    this.currentTab = targetTab;
  }

  setupAnalyticsFeatures() {
    const recommendationGenre = document.getElementById('recommendation-genre');
    const generateRecommendations = document.getElementById('generate-recommendations');
    
    if (recommendationGenre) {
      const genres = [...new Set(this.contentManager.allContent.map(c => c.genre))];
      const options = ['<option value="">Select a genre...</option>'];
      genres.forEach(genre => {
        options.push(`<option value="${genre}">${genre.charAt(0).toUpperCase() + genre.slice(1)}</option>`);
      });
      recommendationGenre.innerHTML = options.join('');
    }
    
    if (generateRecommendations) {
      generateRecommendations.addEventListener('click', () => {
        const selectedGenre = recommendationGenre?.value;
        if (selectedGenre) {
          this.generateRecommendations(selectedGenre);
        }
      });
    }
  }

  generateRecommendations(genre) {
    const recommendations = this.analytics.getContentRecommendations(genre);
    const resultsContainer = document.getElementById('recommendation-results');
    
    if (!resultsContainer) return;
    
    resultsContainer.classList.remove('hidden');
    
    const recommendationHTML = recommendations.map(content => `
      <div class="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
        <div>
          <h5 class="font-medium text-white">${content.title}</h5>
          <p class="text-sm text-gray-400">${content.reason} • Rating: ${content.rating}</p>
        </div>
        <div class="text-right">
          <div class="text-sm font-medium text-green-400">${content.recommendationScore.toFixed(1)}</div>
          <div class="text-xs text-gray-400">Score</div>
        </div>
      </div>
    `).join('');
    
    resultsContainer.innerHTML = `
      <h4 class="font-medium text-white mb-3">Recommended ${genre.charAt(0).toUpperCase() + genre.slice(1)} Content</h4>
      <div class="space-y-2">${recommendationHTML}</div>
    `;
  }

  debounceSearch(searchTerm) {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.filterAndRenderContent();
    }, 300);
  }

  handleGenreClick(genreBtn) {
    // Quick state update
    const activeBtn = document.querySelector('.genre-btn.active');
    if (activeBtn && activeBtn !== genreBtn) {
      activeBtn.classList.remove('active');
    }
    
    genreBtn.classList.add('active');
    this.filterAndRenderContent();
  }

  filterAndRenderContent() {
    if (this.isLoading) return;
    
    // Throttle rendering to prevent excessive calls
    const now = Date.now();
    if (now - this.lastRenderTime < 100) return;
    this.lastRenderTime = now;
    
    this.showLoading(true);
    
    // Get filter values
    const searchInput = document.getElementById('search-input');
    const sortSelect = document.getElementById('sort-select');
    const activeGenre = document.querySelector('.genre-btn.active');
    
    const searchTerm = searchInput?.value || '';
    const sortBy = sortSelect?.value || 'title';
    const genre = activeGenre?.dataset.genre || 'all';
    
    // Filter and render
    const filteredContent = this.contentManager.filterContent(searchTerm, genre, sortBy);
    
    // Use setTimeout to prevent blocking
    setTimeout(() => {
      this.renderContent(filteredContent, searchTerm);
      this.updateResultsCount();
      this.showLoading(false);
    }, 0);
  }

  renderContent(content, searchTerm = '') {
    const contentGrid = document.getElementById('content-grid');
    const noResults = document.getElementById('no-results');
    
    if (!contentGrid || !noResults) return;

    if (content.length === 0) {
      contentGrid.style.display = 'none';
      noResults.style.display = 'block';
      return;
    }

    noResults.style.display = 'none';
    contentGrid.style.display = 'grid';

    // Batch render for better performance
    const contentHTML = content.map((item, index) => {
      const highlightedTitle = this.contentManager.highlightSearchTerm(item.title, searchTerm);
      const highlightedDescription = this.contentManager.highlightSearchTerm(item.description, searchTerm);
      
      return `
        <div class="content-card" style="animation-delay: ${Math.min(index * 0.01, 0.5)}s">
          <div class="content-image-container">
            <img 
              src="${item.image}" 
              alt="${item.title}"
              class="content-image"
              loading="lazy"
            >
            <div class="rating-badge">
              <i class="fas fa-star text-yellow-400 mr-1"></i>
              ${item.rating}
            </div>
            <div class="type-badge">
              ${item.type}
            </div>
          </div>
          
          <div class="content-info">
            <h3 class="content-title">
              ${highlightedTitle}
            </h3>
            
            <p class="content-description">
              ${highlightedDescription}
            </p>
            
            <div class="content-meta">
              <span class="genre-tag">
                ${item.genre.charAt(0).toUpperCase() + item.genre.slice(1)}
              </span>
              <span class="year-tag">
                ${item.year}
              </span>
            </div>
            
            <div class="content-footer">
              <div class="popularity-score">
                <i class="fas fa-fire text-red-500 mr-1"></i>
                ${item.popularity}% popular
              </div>
              
              <button class="watch-btn">
                <i class="fas fa-play mr-2"></i>
                Watch Now
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
    
    contentGrid.innerHTML = contentHTML;
  }

  updateResultsCount() {
    const resultsCount = document.getElementById('results-count');
    if (!resultsCount) return;

    const filteredCount = this.contentManager.getContentCount();
    const totalCount = this.contentManager.getTotalContentCount();
    
    resultsCount.textContent = `Showing ${filteredCount} of ${totalCount} titles`;
  }

  showLoading(show) {
    this.isLoading = show;
    const loadingSpinner = document.getElementById('loading-spinner');
    
    if (loadingSpinner) {
      loadingSpinner.style.display = show ? 'block' : 'none';
    }
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new NetflixAnalyticsApp();
});