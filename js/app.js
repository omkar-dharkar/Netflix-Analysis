import { authManager } from './auth.js';
import { ProductManager, productCategories } from './products.js';

class ProductFilterApp {
  constructor() {
    this.productManager = new ProductManager();
    this.isLoading = false;
    this.debounceTimer = null;
    
    this.initializeApp();
  }

  initializeApp() {
    this.renderCategories();
    this.setupEventListeners();
    this.filterAndRenderProducts();
  }

  renderCategories() {
    const categoryContainer = document.getElementById('category-container');
    if (!categoryContainer) return;

    categoryContainer.innerHTML = productCategories.map(category => `
      <div class="category-btn ${category.id === 'all' ? 'active' : ''}" data-category="${category.id}">
        <i class="${category.icon} mr-2"></i>
        ${category.name}
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
        this.filterAndRenderProducts();
      });
    }

    // Category buttons
    const categoryContainer = document.getElementById('category-container');
    if (categoryContainer) {
      categoryContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('category-btn')) {
          this.handleCategoryClick(e.target);
        }
      });
    }
  }

  debounceSearch(searchTerm) {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.filterAndRenderProducts();
    }, 300);
  }

  handleCategoryClick(categoryBtn) {
    // Remove active class from all category buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    categoryBtn.classList.add('active');
    
    // Add bounce animation
    categoryBtn.classList.add('bounce-subtle');
    setTimeout(() => {
      categoryBtn.classList.remove('bounce-subtle');
    }, 600);
    
    this.filterAndRenderProducts();
  }

  filterAndRenderProducts() {
    if (this.isLoading) return;
    
    this.showLoading(true);
    
    // Get current filter values
    const searchInput = document.getElementById('search-input');
    const sortSelect = document.getElementById('sort-select');
    const activeCategory = document.querySelector('.category-btn.active');
    
    const searchTerm = searchInput ? searchInput.value : '';
    const sortBy = sortSelect ? sortSelect.value : 'name';
    const category = activeCategory ? activeCategory.dataset.category : 'all';
    
    // Filter products
    const filteredProducts = this.productManager.filterProducts(searchTerm, category, sortBy);
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      this.renderProducts(filteredProducts, searchTerm);
      this.updateResultsCount();
      this.showLoading(false);
    }, 200);
  }

  renderProducts(products, searchTerm = '') {
    const productGrid = document.getElementById('product-grid');
    const noResults = document.getElementById('no-results');
    
    if (!productGrid || !noResults) return;

    if (products.length === 0) {
      productGrid.classList.add('hidden');
      noResults.classList.remove('hidden');
      return;
    }

    productGrid.classList.remove('hidden');
    noResults.classList.add('hidden');

    productGrid.innerHTML = products.map((product, index) => {
      const highlightedName = this.productManager.highlightSearchTerm(product.name, searchTerm);
      const highlightedDescription = this.productManager.highlightSearchTerm(product.description, searchTerm);
      
      return `
        <div class="product-card fade-in p-6" style="animation-delay: ${index * 0.05}s">
          <div class="relative mb-4">
            <img 
              src="${product.image}" 
              alt="${product.name}"
              class="w-full h-48 object-cover rounded-lg"
              loading="lazy"
            >
            <div class="absolute top-2 right-2">
              <span class="popularity-badge">
                <i class="fas fa-star text-yellow-500 mr-1"></i>
                ${product.popularity}
              </span>
            </div>
          </div>
          
          <div class="space-y-3">
            <h3 class="text-lg font-semibold text-gray-900 line-clamp-2">
              ${highlightedName}
            </h3>
            
            <p class="text-gray-600 text-sm line-clamp-2">
              ${highlightedDescription}
            </p>
            
            <div class="flex items-center justify-between">
              <span class="price-tag">
                $${product.price}
              </span>
              
              <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium">
                <i class="fas fa-shopping-cart mr-2"></i>
                Add to Cart
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

    const filteredCount = this.productManager.getProductCount();
    const totalCount = this.productManager.getTotalProductCount();
    
    resultsCount.textContent = `Showing ${filteredCount} of ${totalCount} products`;
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
  new ProductFilterApp();
});

// Add some utility CSS classes for line clamping
const style = document.createElement('style');
style.textContent = `
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;
document.head.appendChild(style);