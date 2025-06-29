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
    
    this.initializeApp();
  }

  initializeApp() {
    this.renderGenres();
    this.setupEventListeners();
    this.setupTabNavigation();
    this.filterAndRenderContent();
    this.setupAnalyticsFeatures();
    
    // Initialize dashboard after a short delay to ensure DOM is ready
    setTimeout(() => {
      this.initializeDashboard();
    }, 100);
  }

  initializeDashboard() {
    // Only initialize dashboard if we're on the dashboard tab and it hasn't been initialized
    if (this.currentTab === 'dashboard' && !this.dashboard) {
      this.dashboard = new NetflixDashboard();
    }
  }

  renderGenres() {
    const genreContainer = document.getElementById('genre-container');
    if (!genreContainer) return;

    genreContainer.innerHTML = contentGenres.map(genre => `
      <div class="genre-btn ${genre.id === 'all' ? 'active' : ''}" data-genre="${genre.id}">
        <i class="${genre.icon} mr-2"></i>
        ${genre.name}
      </div>
    `).join('');
  }

  setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.debounceSearch(e.target.value);
      });
    }

    // Sort select
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.filterAndRenderContent();
      });
    }

    // Genre buttons
    const genreContainer = document.getElementById('genre-container');
    if (genreContainer) {
      genreContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('genre-btn')) {
          this.handleGenreClick(e.target);
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
        
        // Remove active class from all tabs and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.add('hidden'));
        
        // Add active class to clicked tab and show corresponding content
        button.classList.add('active');
        const targetContent = document.getElementById(`${targetTab}-content`);
        if (targetContent) {
          targetContent.classList.remove('hidden');
        }
        
        this.currentTab = targetTab;
        
        // Initialize dashboard when switching to dashboard tab
        if (targetTab === 'dashboard' && !this.dashboard) {
          // Small delay to ensure the content is visible
          setTimeout(() => {
            this.initializeDashboard();
          }, 50);
        }
        
        // Hide mobile menu after selection
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
          mobileMenu.classList.add('hidden');
        }
      });
    });
  }

  setupAnalyticsFeatures() {
    // Recommendation engine
    const recommendationGenre = document.getElementById('recommendation-genre');
    const generateRecommendations = document.getElementById('generate-recommendations');
    
    if (recommendationGenre) {
      // Populate genre options
      const genres = [...new Set(this.contentManager.allContent.map(c => c.genre))];
      recommendationGenre.innerHTML = '<option value="">Select a genre...</option>' +
        genres.map(genre => `<option value="${genre}">${genre.charAt(0).toUpperCase() + genre.slice(1)}</option>`).join('');
    }
    
    if (generateRecommendations) {
      generateRecommendations.addEventListener('click', () => {
        const selectedGenre = recommendationGenre.value;
        if (selectedGenre) {
          this.generateRecommendations(selectedGenre);
        }
      });
    }
  }

  generateRecommendations(genre) {
    const recommendations = this.analytics.getContentRecommendations(genre);
    const resultsContainer = document.getElementById('recommendation-results');
    
    if (resultsContainer) {
      resultsContainer.classList.remove('hidden');
      resultsContainer.innerHTML = `
        <h4 class="font-medium text-white mb-3">Recommended ${genre.charAt(0).toUpperCase() + genre.slice(1)} Content</h4>
        <div class="space-y-2">
          ${recommendations.map(content => `
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
          `).join('')}
        </div>
      `;
    }
  }

  debounceSearch(searchTerm) {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.filterAndRenderContent();
    }, 300);
  }

  handleGenreClick(genreBtn) {
    // Remove active class from all genre buttons
    document.querySelectorAll('.genre-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    genreBtn.classList.add('active');
    
    // Add bounce animation
    genreBtn.classList.add('bounce-subtle');
    setTimeout(() => {
      genreBtn.classList.remove('bounce-subtle');
    }, 600);
    
    this.filterAndRenderContent();
  }

  filterAndRenderContent() {
    if (this.isLoading) return;
    
    this.showLoading(true);
    
    // Get current filter values
    const searchInput = document.getElementById('search-input');
    const sortSelect = document.getElementById('sort-select');
    const activeGenre = document.querySelector('.genre-btn.active');
    
    const searchTerm = searchInput ? searchInput.value : '';
    const sortBy = sortSelect ? sortSelect.value : 'title';
    const genre = activeGenre ? activeGenre.dataset.genre : 'all';
    
    // Filter content
    const filteredContent = this.contentManager.filterContent(searchTerm, genre, sortBy);
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      this.renderContent(filteredContent, searchTerm);
      this.updateResultsCount();
      this.showLoading(false);
    }, 200);
  }

  renderContent(content, searchTerm = '') {
    const contentGrid = document.getElementById('content-grid');
    const noResults = document.getElementById('no-results');
    
    if (!contentGrid || !noResults) return;

    if (content.length === 0) {
      contentGrid.classList.add('hidden');
      noResults.classList.remove('hidden');
      return;
    }

    contentGrid.classList.remove('hidden');
    noResults.classList.add('hidden');

    contentGrid.innerHTML = content.map((item, index) => {
      const highlightedTitle = this.contentManager.highlightSearchTerm(item.title, searchTerm);
      const highlightedDescription = this.contentManager.highlightSearchTerm(item.description, searchTerm);
      
      return `
        <div class="content-card glow-effect fade-in" style="animation-delay: ${index * 0.05}s">
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
      if (show) {
        loadingSpinner.classList.remove('hidden');
      } else {
        loadingSpinner.classList.add('hidden');
      }
    }
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new NetflixAnalyticsApp();
});