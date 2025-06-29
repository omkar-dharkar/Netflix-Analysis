import { AnalyticsEngine } from './analytics-engine.js';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

export class Dashboard {
  constructor() {
    this.analytics = new AnalyticsEngine();
    this.charts = {};
    this.initializeDashboard();
  }

  initializeDashboard() {
    this.renderOverviewCards();
    this.renderConversionFunnel();
    this.renderCategoryPerformance();
    this.renderRevenueChart();
    this.renderTopProducts();
    this.renderPriceOptimization();
    this.renderMarketBasket();
    this.renderUserSegmentation();
    this.renderInsights();
  }

  renderOverviewCards() {
    const insights = this.analytics.generateInsights();
    const container = document.getElementById('overview-cards');
    
    if (!container) return;
    
    container.innerHTML = insights.map(insight => `
      <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wide">${insight.title}</h3>
          <div class="p-2 rounded-lg ${this.getIconBg(insight.type)}">
            <i class="${this.getIcon(insight.type)} text-white"></i>
          </div>
        </div>
        <div class="space-y-2">
          <p class="text-3xl font-bold text-gray-900">${insight.value}</p>
          <div class="flex items-center space-x-2">
            <span class="text-sm font-medium ${insight.trend.includes('+') || insight.trend === 'High' ? 'text-green-600' : 'text-blue-600'}">${insight.trend}</span>
          </div>
          <p class="text-sm text-gray-600">${insight.description}</p>
        </div>
      </div>
    `).join('');
  }

  getIcon(type) {
    const icons = {
      revenue: 'fas fa-dollar-sign',
      category: 'fas fa-chart-pie',
      conversion: 'fas fa-funnel-dollar',
      engagement: 'fas fa-users'
    };
    return icons[type] || 'fas fa-chart-line';
  }

  getIconBg(type) {
    const backgrounds = {
      revenue: 'bg-green-500',
      category: 'bg-blue-500',
      conversion: 'bg-purple-500',
      engagement: 'bg-orange-500'
    };
    return backgrounds[type] || 'bg-gray-500';
  }

  renderConversionFunnel() {
    const funnel = this.analytics.getConversionFunnel();
    const ctx = document.getElementById('conversionChart');
    
    if (!ctx) return;
    
    this.charts.conversion = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Views', 'Clicks', 'Add to Cart', 'Purchases'],
        datasets: [{
          label: 'User Actions',
          data: [funnel.views, funnel.clicks, funnel.addToCarts, funnel.purchases],
          backgroundColor: [
            'rgba(59, 130, 246, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(239, 68, 68, 0.8)'
          ],
          borderColor: [
            'rgb(59, 130, 246)',
            'rgb(16, 185, 129)',
            'rgb(245, 158, 11)',
            'rgb(239, 68, 68)'
          ],
          borderWidth: 2,
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Conversion Funnel Analysis'
          },
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }

  renderCategoryPerformance() {
    const categoryData = this.analytics.getCategoryPerformance();
    const ctx = document.getElementById('categoryChart');
    
    if (!ctx) return;
    
    this.charts.category = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: categoryData.map(c => c.category.charAt(0).toUpperCase() + c.category.slice(1)),
        datasets: [{
          data: categoryData.map(c => c.revenue),
          backgroundColor: [
            '#3B82F6', '#10B981', '#F59E0B', '#EF4444',
            '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'
          ],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Revenue by Category'
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }

  renderRevenueChart() {
    const seasonalData = this.analytics.getSeasonalTrends();
    const months = Object.keys(seasonalData);
    const revenues = Object.values(seasonalData).map(d => d.revenue);
    
    const ctx = document.getElementById('revenueChart');
    if (!ctx) return;
    
    this.charts.revenue = new Chart(ctx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          label: 'Revenue',
          data: revenues,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: 'rgb(59, 130, 246)',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 6
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Revenue Trends Over Time'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }

  renderTopProducts() {
    const topProducts = this.analytics.getTopPerformingProducts(5);
    const container = document.getElementById('top-products');
    
    if (!container) return;
    
    container.innerHTML = `
      <div class="bg-white rounded-xl shadow-lg p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Top Performing Products</h3>
        <div class="space-y-4">
          ${topProducts.map((product, index) => `
            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div class="flex items-center space-x-4">
                <div class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  ${index + 1}
                </div>
                <div>
                  <h4 class="font-medium text-gray-900">${product.name}</h4>
                  <p class="text-sm text-gray-500">${product.category}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-semibold text-gray-900">$${product.revenue.toLocaleString()}</p>
                <p class="text-sm text-gray-500">${product.conversionRate}% conversion</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderPriceOptimization() {
    const suggestions = this.analytics.getPriceOptimizationSuggestions().slice(0, 5);
    const container = document.getElementById('price-optimization');
    
    if (!container) return;
    
    container.innerHTML = `
      <div class="bg-white rounded-xl shadow-lg p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Price Optimization Suggestions</h3>
        <div class="space-y-4">
          ${suggestions.map(suggestion => `
            <div class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-start justify-between mb-2">
                <h4 class="font-medium text-gray-900">${suggestion.productName}</h4>
                <span class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  ${suggestion.confidence}% confidence
                </span>
              </div>
              <p class="text-sm text-gray-600 mb-2">${suggestion.suggestion}</p>
              <div class="flex items-center space-x-4 text-xs text-gray-500">
                <span>Current: $${suggestion.currentPrice}</span>
                <span>Category Avg: $${suggestion.categoryAverage}</span>
                <span>Conversion: ${suggestion.conversionRate}%</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderMarketBasket() {
    const associations = this.analytics.getMarketBasketAnalysis();
    const container = document.getElementById('market-basket');
    
    if (!container) return;
    
    container.innerHTML = `
      <div class="bg-white rounded-xl shadow-lg p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Market Basket Analysis</h3>
        <p class="text-sm text-gray-600 mb-4">Products frequently bought together</p>
        <div class="space-y-3">
          ${associations.map(assoc => `
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center space-x-2">
                <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                  ${assoc.antecedent}
                </span>
                <i class="fas fa-arrow-right text-gray-400"></i>
                <span class="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                  ${assoc.consequent}
                </span>
              </div>
              <div class="text-right text-sm">
                <div class="font-medium text-gray-900">${(assoc.confidence * 100).toFixed(1)}%</div>
                <div class="text-gray-500">${assoc.frequency} times</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderUserSegmentation() {
    const segments = this.analytics.getUserSegmentation();
    const container = document.getElementById('user-segments');
    
    if (!container) return;
    
    const segmentData = [
      { name: 'High Value', count: segments.highValue.length, color: 'bg-green-500' },
      { name: 'Frequent Users', count: segments.frequent.length, color: 'bg-blue-500' },
      { name: 'New Users', count: segments.newUsers.length, color: 'bg-yellow-500' },
      { name: 'At Risk', count: segments.atRisk.length, color: 'bg-red-500' }
    ];
    
    container.innerHTML = `
      <div class="bg-white rounded-xl shadow-lg p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">User Segmentation</h3>
        <div class="grid grid-cols-2 gap-4">
          ${segmentData.map(segment => `
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <div class="w-12 h-12 ${segment.color} rounded-full mx-auto mb-2 flex items-center justify-center">
                <span class="text-white font-bold text-lg">${segment.count}</span>
              </div>
              <h4 class="font-medium text-gray-900">${segment.name}</h4>
              <p class="text-sm text-gray-500">users</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderInsights() {
    const container = document.getElementById('ai-insights');
    if (!container) return;
    
    const insights = [
      {
        title: "Peak Shopping Hours",
        description: "Most purchases occur between 2-4 PM and 7-9 PM",
        action: "Schedule promotions during these peak hours",
        impact: "High"
      },
      {
        title: "Mobile vs Desktop",
        description: "60% of traffic is mobile, but desktop has 2x higher conversion",
        action: "Optimize mobile checkout experience",
        impact: "High"
      },
      {
        title: "Seasonal Patterns",
        description: "Electronics peak in November, Clothing in March/September",
        action: "Adjust inventory and marketing calendar",
        impact: "Medium"
      },
      {
        title: "Price Sensitivity",
        description: "Products priced 15% below category average show 40% higher conversion",
        action: "Review pricing strategy for underperforming items",
        impact: "High"
      }
    ];
    
    container.innerHTML = `
      <div class="bg-white rounded-xl shadow-lg p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          <i class="fas fa-brain mr-2 text-purple-500"></i>
          AI-Powered Insights
        </h3>
        <div class="space-y-4">
          ${insights.map(insight => `
            <div class="border-l-4 border-purple-500 pl-4 py-2">
              <h4 class="font-medium text-gray-900 mb-1">${insight.title}</h4>
              <p class="text-sm text-gray-600 mb-2">${insight.description}</p>
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-purple-600">${insight.action}</p>
                <span class="px-2 py-1 text-xs font-medium rounded-full ${
                  insight.impact === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }">
                  ${insight.impact} Impact
                </span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  refreshDashboard() {
    // Destroy existing charts
    Object.values(this.charts).forEach(chart => {
      if (chart) chart.destroy();
    });
    
    // Reinitialize
    this.initializeDashboard();
  }
}