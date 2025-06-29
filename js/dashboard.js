import { NetflixAnalyticsEngine } from './analytics-engine.js';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

export class NetflixDashboard {
  constructor() {
    this.analytics = new NetflixAnalyticsEngine();
    this.charts = {};
    this.isInitialized = false;
    this.initializeDashboard();
  }

  initializeDashboard() {
    if (this.isInitialized) return;
    
    // Check if dashboard elements are available and visible
    if (!this.checkDashboardElements()) {
      console.warn('Dashboard elements not ready');
      return;
    }

    this.isInitialized = true;
    
    try {
      // Initialize components in order of importance
      this.renderOverviewCards();
      
      // Use setTimeout to prevent blocking the main thread
      setTimeout(() => {
        this.renderViewingFunnel();
        this.renderGenrePerformance();
      }, 50);
      
      setTimeout(() => {
        this.renderEngagementChart();
        this.renderTopContent();
      }, 100);
      
      setTimeout(() => {
        this.renderContentPerformance();
        this.renderAudienceSegmentation();
        this.renderViewingPatterns();
        this.renderInsights();
      }, 150);
      
    } catch (error) {
      console.error('Error initializing dashboard:', error);
      this.isInitialized = false;
    }
  }

  checkDashboardElements() {
    const requiredElements = [
      'overview-cards',
      'viewingChart',
      'genreChart',
      'engagementChart'
    ];

    return requiredElements.every(id => {
      const element = document.getElementById(id);
      return element && element.offsetParent !== null;
    });
  }

  renderOverviewCards() {
    const insights = this.analytics.generateInsights();
    const container = document.getElementById('overview-cards');
    
    if (!container) return;
    
    const cardsHTML = insights.map(insight => `
      <div class="bg-gray-900 rounded-xl shadow-2xl p-6 border border-gray-800 hover:border-red-600 transition-all duration-300">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium text-gray-400 uppercase tracking-wide">${insight.title}</h3>
          <div class="p-2 rounded-lg ${this.getIconBg(insight.type)}">
            <i class="${this.getIcon(insight.type)} text-white"></i>
          </div>
        </div>
        <div class="space-y-2">
          <p class="text-3xl font-bold text-white">${insight.value}</p>
          <div class="flex items-center space-x-2">
            <span class="text-sm font-medium ${insight.trend.includes('+') || insight.trend === 'High' ? 'text-green-400' : 'text-red-400'}">${insight.trend}</span>
          </div>
          <p class="text-sm text-gray-400">${insight.description}</p>
        </div>
      </div>
    `).join('');
    
    container.innerHTML = cardsHTML;
  }

  getIcon(type) {
    const icons = {
      viewing: 'fas fa-play',
      genre: 'fas fa-chart-pie',
      engagement: 'fas fa-heart',
      users: 'fas fa-users'
    };
    return icons[type] || 'fas fa-chart-line';
  }

  getIconBg(type) {
    const backgrounds = {
      viewing: 'bg-red-600',
      genre: 'bg-blue-600',
      engagement: 'bg-purple-600',
      users: 'bg-green-600'
    };
    return backgrounds[type] || 'bg-gray-600';
  }

  renderViewingFunnel() {
    const funnel = this.analytics.getViewingFunnel();
    const ctx = document.getElementById('viewingChart');
    
    if (!ctx) return;
    
    // Destroy existing chart
    if (this.charts.viewing) {
      this.charts.viewing.destroy();
    }
    
    this.charts.viewing = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Browse', 'Start Watching', 'Engaged (30min+)', 'Complete'],
        datasets: [{
          label: 'Viewer Journey',
          data: [funnel.browsing, funnel.starts, funnel.midpoint, funnel.completions],
          backgroundColor: [
            'rgba(239, 68, 68, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(34, 197, 94, 0.8)',
            'rgba(168, 85, 247, 0.8)'
          ],
          borderColor: [
            'rgb(239, 68, 68)',
            'rgb(245, 158, 11)',
            'rgb(34, 197, 94)',
            'rgb(168, 85, 247)'
          ],
          borderWidth: 2,
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        animation: {
          duration: 1000
        },
        plugins: {
          title: {
            display: true,
            text: 'Viewing Funnel Analysis',
            color: '#ffffff'
          },
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: '#ffffff'
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#ffffff'
            }
          }
        }
      }
    });
  }

  renderGenrePerformance() {
    const genreData = this.analytics.getGenrePerformance();
    const ctx = document.getElementById('genreChart');
    
    if (!ctx) return;
    
    // Destroy existing chart
    if (this.charts.genre) {
      this.charts.genre.destroy();
    }
    
    this.charts.genre = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: genreData.map(g => g.genre.charAt(0).toUpperCase() + g.genre.slice(1)),
        datasets: [{
          data: genreData.map(g => g.totalWatchTime),
          backgroundColor: [
            '#EF4444', '#F59E0B', '#10B981', '#3B82F6',
            '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16',
            '#F97316', '#6366F1'
          ],
          borderWidth: 2,
          borderColor: '#1F2937'
        }]
      },
      options: {
        responsive: true,
        animation: {
          duration: 1000
        },
        plugins: {
          title: {
            display: true,
            text: 'Watch Time by Genre',
            color: '#ffffff'
          },
          legend: {
            position: 'bottom',
            labels: {
              color: '#ffffff'
            }
          }
        }
      }
    });
  }

  renderEngagementChart() {
    const patterns = this.analytics.getViewingPatterns();
    const hourlyData = Object.entries(patterns.hourly)
      .sort(([a], [b]) => parseInt(a) - parseInt(b))
      .map(([hour, count]) => ({ hour: parseInt(hour), count }));
    
    const ctx = document.getElementById('engagementChart');
    if (!ctx) return;
    
    // Destroy existing chart
    if (this.charts.engagement) {
      this.charts.engagement.destroy();
    }
    
    this.charts.engagement = new Chart(ctx, {
      type: 'line',
      data: {
        labels: hourlyData.map(d => `${d.hour}:00`),
        datasets: [{
          label: 'Viewing Activity',
          data: hourlyData.map(d => d.count),
          borderColor: 'rgb(239, 68, 68)',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: 'rgb(239, 68, 68)',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 6
        }]
      },
      options: {
        responsive: true,
        animation: {
          duration: 1000
        },
        plugins: {
          title: {
            display: true,
            text: 'Viewing Activity by Hour',
            color: '#ffffff'
          },
          legend: {
            labels: {
              color: '#ffffff'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: '#ffffff'
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#ffffff'
            }
          }
        }
      }
    });
  }

  renderTopContent() {
    const topContent = this.analytics.getTopPerformingContent(5);
    const container = document.getElementById('top-content');
    
    if (!container) return;
    
    const contentHTML = topContent.map((content, index) => `
      <div class="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700">
        <div class="flex items-center space-x-4">
          <div class="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
            ${index + 1}
          </div>
          <div>
            <h4 class="font-medium text-white">${content.title}</h4>
            <p class="text-sm text-gray-400">${content.type} • ${content.genre}</p>
          </div>
        </div>
        <div class="text-right">
          <p class="font-semibold text-white">${content.totalViews.toLocaleString()} views</p>
          <p class="text-sm text-gray-400">${content.completionRate}% completion</p>
        </div>
      </div>
    `).join('');
    
    container.innerHTML = `
      <div class="bg-gray-900 rounded-xl shadow-2xl p-6 border border-gray-800">
        <h3 class="text-lg font-semibold text-white mb-4">Top Performing Content</h3>
        <div class="space-y-4">
          ${contentHTML}
        </div>
      </div>
    `;
  }

  renderContentPerformance() {
    const genrePerf = this.analytics.getGenrePerformance().slice(0, 5);
    const container = document.getElementById('content-performance');
    
    if (!container) return;
    
    const performanceHTML = genrePerf.map(genre => `
      <div class="border border-gray-700 rounded-lg p-4">
        <div class="flex items-start justify-between mb-2">
          <h4 class="font-medium text-white capitalize">${genre.genre}</h4>
          <span class="px-2 py-1 text-xs font-medium bg-red-900 bg-opacity-50 text-red-300 rounded-full">
            ${genre.engagementScore} score
          </span>
        </div>
        <div class="grid grid-cols-2 gap-4 text-xs text-gray-400">
          <div>
            <span class="block">Watch Time: ${Math.round(genre.totalWatchTime / 60)}h</span>
            <span class="block">Avg Rating: ${genre.avgRating}</span>
          </div>
          <div>
            <span class="block">Content: ${genre.contentCount} titles</span>
            <span class="block">Views: ${genre.viewCount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    `).join('');
    
    container.innerHTML = `
      <div class="bg-gray-900 rounded-xl shadow-2xl p-6 border border-gray-800">
        <h3 class="text-lg font-semibold text-white mb-4">Genre Performance Analysis</h3>
        <div class="space-y-4">
          ${performanceHTML}
        </div>
      </div>
    `;
  }

  renderAudienceSegmentation() {
    const segments = this.analytics.getAudienceSegmentation();
    const container = document.getElementById('audience-segments');
    
    if (!container) return;
    
    const segmentData = [
      { name: 'Binge Watchers', count: segments.bingeWatchers.length, color: 'bg-red-600', description: '3+ hours/day' },
      { name: 'Casual Viewers', count: segments.casualViewers.length, color: 'bg-blue-600', description: '<1 hour/day' },
      { name: 'Genre Lovers', count: segments.genreLovers.length, color: 'bg-purple-600', description: '1-2 genres' },
      { name: 'New Users', count: segments.newUsers.length, color: 'bg-green-600', description: '<7 days' }
    ];
    
    const segmentHTML = segmentData.map(segment => `
      <div class="text-center p-4 bg-gray-800 rounded-lg border border-gray-700">
        <div class="w-12 h-12 ${segment.color} rounded-full mx-auto mb-2 flex items-center justify-center">
          <span class="text-white font-bold text-lg">${segment.count}</span>
        </div>
        <h4 class="font-medium text-white text-sm">${segment.name}</h4>
        <p class="text-xs text-gray-400">${segment.description}</p>
      </div>
    `).join('');
    
    container.innerHTML = `
      <div class="bg-gray-900 rounded-xl shadow-2xl p-6 border border-gray-800">
        <h3 class="text-lg font-semibold text-white mb-4">Audience Segmentation</h3>
        <div class="grid grid-cols-2 gap-4">
          ${segmentHTML}
        </div>
      </div>
    `;
  }

  renderViewingPatterns() {
    const patterns = this.analytics.getViewingPatterns();
    const deviceData = Object.entries(patterns.deviceUsage);
    const container = document.getElementById('viewing-patterns');
    
    if (!container) return;
    
    const deviceHTML = deviceData.map(([device, count]) => {
      const percentage = (count / deviceData.reduce((sum, [,c]) => sum + c, 0) * 100).toFixed(1);
      return `
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <i class="fas fa-${this.getDeviceIcon(device)} text-gray-400"></i>
            <span class="text-white capitalize">${device.replace('_', ' ')}</span>
          </div>
          <div class="flex items-center space-x-3">
            <div class="w-24 bg-gray-700 rounded-full h-2">
              <div class="bg-red-600 h-2 rounded-full" style="width: ${percentage}%"></div>
            </div>
            <span class="text-gray-400 text-sm w-12">${percentage}%</span>
          </div>
        </div>
      `;
    }).join('');
    
    container.innerHTML = `
      <div class="bg-gray-900 rounded-xl shadow-2xl p-6 border border-gray-800">
        <h3 class="text-lg font-semibold text-white mb-4">Device Usage Patterns</h3>
        <div class="space-y-3">
          ${deviceHTML}
        </div>
      </div>
    `;
  }

  getDeviceIcon(device) {
    const icons = {
      smart_tv: 'tv',
      mobile: 'mobile-alt',
      desktop: 'desktop',
      tablet: 'tablet-alt'
    };
    return icons[device] || 'device';
  }

  renderInsights() {
    const container = document.getElementById('ai-insights');
    if (!container) return;
    
    const insights = [
      {
        title: "Peak Viewing Hours",
        description: "Most viewing activity occurs between 8-11 PM across all time zones",
        action: "Schedule new releases and promotions during prime time",
        impact: "High"
      },
      {
        title: "Mobile vs TV Viewing",
        description: "Mobile accounts for 35% of starts but only 20% of completions",
        action: "Optimize mobile experience for longer viewing sessions",
        impact: "High"
      },
      {
        title: "Binge-Watching Patterns",
        description: "Series with 6-8 episodes show highest completion rates",
        action: "Consider limited series format for new content",
        impact: "Medium"
      },
      {
        title: "Genre Preferences by Age",
        description: "18-34 prefer thriller/sci-fi, 35+ prefer drama/documentary",
        action: "Personalize homepage recommendations by age group",
        impact: "High"
      }
    ];
    
    const insightsHTML = insights.map(insight => `
      <div class="border-l-4 border-red-600 pl-4 py-2">
        <h4 class="font-medium text-white mb-1">${insight.title}</h4>
        <p class="text-sm text-gray-400 mb-2">${insight.description}</p>
        <div class="flex items-center justify-between">
          <p class="text-sm font-medium text-red-400">${insight.action}</p>
          <span class="px-2 py-1 text-xs font-medium rounded-full ${
            insight.impact === 'High' ? 'bg-red-900 bg-opacity-50 text-red-300' : 'bg-yellow-900 bg-opacity-50 text-yellow-300'
          }">
            ${insight.impact} Impact
          </span>
        </div>
      </div>
    `).join('');
    
    container.innerHTML = `
      <div class="bg-gray-900 rounded-xl shadow-2xl p-6 border border-gray-800">
        <h3 class="text-lg font-semibold text-white mb-4">
          <i class="fas fa-brain mr-2 text-red-500"></i>
          AI-Powered Insights
        </h3>
        <div class="space-y-4">
          ${insightsHTML}
        </div>
      </div>
    `;
  }

  refreshDashboard() {
    // Destroy existing charts
    Object.values(this.charts).forEach(chart => {
      if (chart) chart.destroy();
    });
    
    this.charts = {};
    this.isInitialized = false;
    
    // Reinitialize
    this.initializeDashboard();
  }
}