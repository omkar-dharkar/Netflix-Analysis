import { products } from './products.js';
import * as ss from 'simple-statistics';

export class AnalyticsEngine {
  constructor() {
    this.products = products;
    this.userInteractions = this.generateMockUserData();
    this.marketTrends = this.generateMarketTrends();
    this.priceHistory = this.generatePriceHistory();
  }

  // Generate realistic mock user interaction data
  generateMockUserData() {
    const interactions = [];
    const actionTypes = ['view', 'click', 'add_to_cart', 'purchase', 'search'];
    const timeRanges = this.generateTimeRanges(30); // Last 30 days
    
    for (let i = 0; i < 10000; i++) {
      const product = this.products[Math.floor(Math.random() * this.products.length)];
      const timestamp = timeRanges[Math.floor(Math.random() * timeRanges.length)];
      const action = actionTypes[Math.floor(Math.random() * actionTypes.length)];
      
      // Bias interactions based on product popularity
      const popularityWeight = product.popularity / 100;
      if (Math.random() < popularityWeight) {
        interactions.push({
          id: i,
          productId: product.id,
          productName: product.name,
          category: product.category,
          action: action,
          timestamp: timestamp,
          userId: `user_${Math.floor(Math.random() * 1000)}`,
          sessionId: `session_${Math.floor(Math.random() * 5000)}`,
          price: product.price,
          deviceType: Math.random() > 0.6 ? 'mobile' : 'desktop',
          location: this.getRandomLocation()
        });
      }
    }
    
    return interactions.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }

  generateTimeRanges(days) {
    const ranges = [];
    const now = new Date();
    
    for (let i = 0; i < days; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      // Generate multiple timestamps per day
      for (let hour = 0; hour < 24; hour += Math.random() * 3) {
        const timestamp = new Date(date);
        timestamp.setHours(Math.floor(hour), Math.floor(Math.random() * 60));
        ranges.push(timestamp.toISOString());
      }
    }
    
    return ranges;
  }

  getRandomLocation() {
    const locations = [
      'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX',
      'Phoenix, AZ', 'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA',
      'Dallas, TX', 'San Jose, CA', 'Austin, TX', 'Jacksonville, FL'
    ];
    return locations[Math.floor(Math.random() * locations.length)];
  }

  generateMarketTrends() {
    const categories = [...new Set(this.products.map(p => p.category))];
    const trends = {};
    
    categories.forEach(category => {
      const categoryProducts = this.products.filter(p => p.category === category);
      const avgPrice = ss.mean(categoryProducts.map(p => p.price));
      const avgPopularity = ss.mean(categoryProducts.map(p => p.popularity));
      
      trends[category] = {
        averagePrice: avgPrice,
        averagePopularity: avgPopularity,
        productCount: categoryProducts.length,
        growthRate: (Math.random() - 0.5) * 20, // -10% to +10%
        seasonalityIndex: Math.random() * 2,
        competitionIndex: Math.random() * 100
      };
    });
    
    return trends;
  }

  generatePriceHistory() {
    const history = {};
    
    this.products.forEach(product => {
      const pricePoints = [];
      const basePrice = product.price;
      const days = 90;
      
      for (let i = days; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        // Add some realistic price fluctuation
        const volatility = 0.1; // 10% volatility
        const randomFactor = (Math.random() - 0.5) * volatility;
        const seasonalFactor = Math.sin((i / days) * Math.PI * 2) * 0.05;
        const price = basePrice * (1 + randomFactor + seasonalFactor);
        
        pricePoints.push({
          date: date.toISOString().split('T')[0],
          price: Math.round(price * 100) / 100
        });
      }
      
      history[product.id] = pricePoints;
    });
    
    return history;
  }

  // Advanced Analytics Methods
  
  getConversionFunnel() {
    const funnel = {
      views: this.userInteractions.filter(i => i.action === 'view').length,
      clicks: this.userInteractions.filter(i => i.action === 'click').length,
      addToCarts: this.userInteractions.filter(i => i.action === 'add_to_cart').length,
      purchases: this.userInteractions.filter(i => i.action === 'purchase').length
    };
    
    funnel.clickRate = (funnel.clicks / funnel.views * 100).toFixed(2);
    funnel.cartRate = (funnel.addToCarts / funnel.clicks * 100).toFixed(2);
    funnel.conversionRate = (funnel.purchases / funnel.addToCarts * 100).toFixed(2);
    
    return funnel;
  }

  getCategoryPerformance() {
    const categories = [...new Set(this.products.map(p => p.category))];
    
    return categories.map(category => {
      const categoryInteractions = this.userInteractions.filter(i => i.category === category);
      const categoryProducts = this.products.filter(p => p.category === category);
      
      const revenue = categoryInteractions
        .filter(i => i.action === 'purchase')
        .reduce((sum, i) => sum + i.price, 0);
      
      const avgPrice = ss.mean(categoryProducts.map(p => p.price));
      const avgPopularity = ss.mean(categoryProducts.map(p => p.popularity));
      
      return {
        category,
        revenue,
        interactions: categoryInteractions.length,
        products: categoryProducts.length,
        avgPrice,
        avgPopularity,
        revenuePerProduct: revenue / categoryProducts.length,
        engagementScore: categoryInteractions.length / categoryProducts.length
      };
    }).sort((a, b) => b.revenue - a.revenue);
  }

  getTopPerformingProducts(limit = 10) {
    const productStats = {};
    
    this.products.forEach(product => {
      const interactions = this.userInteractions.filter(i => i.productId === product.id);
      const purchases = interactions.filter(i => i.action === 'purchase');
      const views = interactions.filter(i => i.action === 'view');
      
      productStats[product.id] = {
        ...product,
        totalInteractions: interactions.length,
        totalPurchases: purchases.length,
        totalViews: views.length,
        revenue: purchases.reduce((sum, p) => sum + p.price, 0),
        conversionRate: views.length > 0 ? (purchases.length / views.length * 100).toFixed(2) : 0,
        engagementScore: interactions.length * (product.popularity / 100)
      };
    });
    
    return Object.values(productStats)
      .sort((a, b) => b.engagementScore - a.engagementScore)
      .slice(0, limit);
  }

  getPriceOptimizationSuggestions() {
    const suggestions = [];
    
    this.products.forEach(product => {
      const categoryProducts = this.products.filter(p => p.category === product.category);
      const categoryPrices = categoryProducts.map(p => p.price);
      const avgCategoryPrice = ss.mean(categoryPrices);
      const pricePercentile = ss.quantileRank(categoryPrices, product.price);
      
      const interactions = this.userInteractions.filter(i => i.productId === product.id);
      const conversionRate = this.calculateConversionRate(interactions);
      
      let suggestion = '';
      let confidence = 0;
      
      if (pricePercentile > 0.8 && conversionRate < 5) {
        suggestion = 'Consider reducing price - currently priced high with low conversion';
        confidence = 85;
      } else if (pricePercentile < 0.2 && conversionRate > 15) {
        suggestion = 'Consider increasing price - high demand suggests price elasticity';
        confidence = 75;
      } else if (product.popularity > 90 && pricePercentile < 0.5) {
        suggestion = 'Premium pricing opportunity - high popularity with competitive price';
        confidence = 70;
      }
      
      if (suggestion) {
        suggestions.push({
          productId: product.id,
          productName: product.name,
          currentPrice: product.price,
          categoryAverage: avgCategoryPrice.toFixed(2),
          pricePercentile: (pricePercentile * 100).toFixed(1),
          conversionRate: conversionRate.toFixed(2),
          suggestion,
          confidence
        });
      }
    });
    
    return suggestions.sort((a, b) => b.confidence - a.confidence);
  }

  calculateConversionRate(interactions) {
    const views = interactions.filter(i => i.action === 'view').length;
    const purchases = interactions.filter(i => i.action === 'purchase').length;
    return views > 0 ? (purchases / views * 100) : 0;
  }

  getSeasonalTrends() {
    const monthlyData = {};
    
    this.userInteractions.forEach(interaction => {
      const month = new Date(interaction.timestamp).toLocaleString('default', { month: 'long' });
      if (!monthlyData[month]) {
        monthlyData[month] = { interactions: 0, revenue: 0, categories: {} };
      }
      
      monthlyData[month].interactions++;
      
      if (interaction.action === 'purchase') {
        monthlyData[month].revenue += interaction.price;
      }
      
      if (!monthlyData[month].categories[interaction.category]) {
        monthlyData[month].categories[interaction.category] = 0;
      }
      monthlyData[month].categories[interaction.category]++;
    });
    
    return monthlyData;
  }

  getUserSegmentation() {
    const userStats = {};
    
    this.userInteractions.forEach(interaction => {
      if (!userStats[interaction.userId]) {
        userStats[interaction.userId] = {
          totalInteractions: 0,
          totalSpent: 0,
          categories: new Set(),
          deviceTypes: new Set(),
          firstSeen: interaction.timestamp,
          lastSeen: interaction.timestamp
        };
      }
      
      const user = userStats[interaction.userId];
      user.totalInteractions++;
      user.categories.add(interaction.category);
      user.deviceTypes.add(interaction.deviceType);
      
      if (interaction.action === 'purchase') {
        user.totalSpent += interaction.price;
      }
      
      if (new Date(interaction.timestamp) < new Date(user.firstSeen)) {
        user.firstSeen = interaction.timestamp;
      }
      if (new Date(interaction.timestamp) > new Date(user.lastSeen)) {
        user.lastSeen = interaction.timestamp;
      }
    });
    
    // Segment users
    const segments = {
      highValue: [],
      frequent: [],
      newUsers: [],
      atRisk: []
    };
    
    Object.entries(userStats).forEach(([userId, stats]) => {
      const daysSinceFirst = (new Date() - new Date(stats.firstSeen)) / (1000 * 60 * 60 * 24);
      const daysSinceLast = (new Date() - new Date(stats.lastSeen)) / (1000 * 60 * 60 * 24);
      
      if (stats.totalSpent > 500) {
        segments.highValue.push({ userId, ...stats });
      }
      if (stats.totalInteractions > 50) {
        segments.frequent.push({ userId, ...stats });
      }
      if (daysSinceFirst < 7) {
        segments.newUsers.push({ userId, ...stats });
      }
      if (daysSinceLast > 14 && stats.totalSpent > 0) {
        segments.atRisk.push({ userId, ...stats });
      }
    });
    
    return segments;
  }

  getMarketBasketAnalysis() {
    const baskets = {};
    const coOccurrences = {};
    
    // Group purchases by session
    this.userInteractions
      .filter(i => i.action === 'purchase')
      .forEach(interaction => {
        if (!baskets[interaction.sessionId]) {
          baskets[interaction.sessionId] = [];
        }
        baskets[interaction.sessionId].push(interaction.category);
      });
    
    // Calculate co-occurrence matrix
    Object.values(baskets).forEach(basket => {
      for (let i = 0; i < basket.length; i++) {
        for (let j = i + 1; j < basket.length; j++) {
          const pair = [basket[i], basket[j]].sort().join('-');
          coOccurrences[pair] = (coOccurrences[pair] || 0) + 1;
        }
      }
    });
    
    // Convert to association rules
    const associations = Object.entries(coOccurrences)
      .map(([pair, count]) => {
        const [cat1, cat2] = pair.split('-');
        const support = count / Object.keys(baskets).length;
        return {
          antecedent: cat1,
          consequent: cat2,
          support: support.toFixed(3),
          frequency: count,
          confidence: (count / Object.values(baskets).filter(b => b.includes(cat1)).length).toFixed(3)
        };
      })
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 10);
    
    return associations;
  }

  predictDemand(productId, days = 30) {
    const product = this.products.find(p => p.id === productId);
    if (!product) return null;
    
    const historicalData = this.userInteractions
      .filter(i => i.productId === productId && i.action === 'purchase')
      .map(i => ({
        date: new Date(i.timestamp).toISOString().split('T')[0],
        sales: 1
      }));
    
    // Simple moving average prediction
    const recentSales = historicalData.slice(-7).length; // Last 7 days
    const avgDailySales = recentSales / 7;
    const predictedDemand = Math.round(avgDailySales * days);
    
    return {
      productId,
      productName: product.name,
      historicalAverage: avgDailySales.toFixed(2),
      predictedDemand,
      confidence: Math.min(95, 60 + (recentSales * 5)), // Higher confidence with more data
      factors: {
        seasonality: product.category === 'clothing' ? 'High' : 'Medium',
        trend: recentSales > avgDailySales ? 'Increasing' : 'Stable',
        popularity: product.popularity
      }
    };
  }

  generateInsights() {
    const insights = [];
    
    // Revenue insights
    const totalRevenue = this.userInteractions
      .filter(i => i.action === 'purchase')
      .reduce((sum, i) => sum + i.price, 0);
    
    insights.push({
      type: 'revenue',
      title: 'Total Revenue Generated',
      value: `$${totalRevenue.toLocaleString()}`,
      trend: '+12.5%',
      description: 'Based on simulated purchase data over the last 30 days'
    });
    
    // Top category insight
    const categoryPerf = this.getCategoryPerformance();
    const topCategory = categoryPerf[0];
    
    insights.push({
      type: 'category',
      title: 'Top Performing Category',
      value: topCategory.category.charAt(0).toUpperCase() + topCategory.category.slice(1),
      trend: `$${topCategory.revenue.toLocaleString()} revenue`,
      description: `Generated ${((topCategory.revenue / totalRevenue) * 100).toFixed(1)}% of total revenue`
    });
    
    // Conversion rate insight
    const funnel = this.getConversionFunnel();
    
    insights.push({
      type: 'conversion',
      title: 'Overall Conversion Rate',
      value: `${funnel.conversionRate}%`,
      trend: funnel.conversionRate > 10 ? '+Good' : 'Needs Improvement',
      description: 'From add-to-cart to purchase completion'
    });
    
    // User engagement insight
    const uniqueUsers = new Set(this.userInteractions.map(i => i.userId)).size;
    const avgInteractionsPerUser = this.userInteractions.length / uniqueUsers;
    
    insights.push({
      type: 'engagement',
      title: 'User Engagement Score',
      value: avgInteractionsPerUser.toFixed(1),
      trend: avgInteractionsPerUser > 10 ? 'High' : 'Medium',
      description: 'Average interactions per user session'
    });
    
    return insights;
  }
}