import { netflixContent } from './content.js';
import * as ss from 'simple-statistics';

export class NetflixAnalyticsEngine {
  constructor() {
    this.content = netflixContent;
    this.viewingData = this.generateMockViewingData();
    this.userProfiles = this.generateUserProfiles();
    this.engagementMetrics = this.generateEngagementMetrics();
  }

  // Generate realistic mock viewing data
  generateMockViewingData() {
    const viewingData = [];
    const actionTypes = ['start', 'pause', 'resume', 'complete', 'skip', 'rewatch'];
    const timeRanges = this.generateTimeRanges(30); // Last 30 days
    const devices = ['smart_tv', 'mobile', 'desktop', 'tablet'];
    
    for (let i = 0; i < 50000; i++) {
      const content = this.content[Math.floor(Math.random() * this.content.length)];
      const timestamp = timeRanges[Math.floor(Math.random() * timeRanges.length)];
      const action = actionTypes[Math.floor(Math.random() * actionTypes.length)];
      const device = devices[Math.floor(Math.random() * devices.length)];
      
      // Bias viewing based on content popularity
      const popularityWeight = content.popularity / 100;
      if (Math.random() < popularityWeight) {
        viewingData.push({
          id: i,
          contentId: content.id,
          contentTitle: content.title,
          contentType: content.type,
          genre: content.genre,
          action: action,
          timestamp: timestamp,
          userId: `user_${Math.floor(Math.random() * 5000)}`,
          sessionId: `session_${Math.floor(Math.random() * 20000)}`,
          device: device,
          watchTime: this.generateWatchTime(content, action),
          location: this.getRandomLocation(),
          userAge: Math.floor(Math.random() * 60) + 18,
          userGender: Math.random() > 0.5 ? 'M' : 'F'
        });
      }
    }
    
    return viewingData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }

  generateWatchTime(content, action) {
    const baseTime = content.type === 'movie' ? 
      (content.runtime || 120) : 
      (content.episodes ? content.episodes * 45 : 45);
    
    switch (action) {
      case 'complete':
        return Math.floor(baseTime * (0.8 + Math.random() * 0.2)); // 80-100% completion
      case 'skip':
        return Math.floor(baseTime * Math.random() * 0.3); // 0-30% watched
      case 'pause':
      case 'resume':
        return Math.floor(baseTime * Math.random() * 0.7); // 0-70% watched
      default:
        return Math.floor(baseTime * Math.random());
    }
  }

  generateTimeRanges(days) {
    const ranges = [];
    const now = new Date();
    
    for (let i = 0; i < days; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      // Generate multiple timestamps per day with realistic viewing patterns
      const peakHours = [19, 20, 21, 22]; // Prime time
      const regularHours = [7, 8, 12, 13, 14, 15, 16, 17, 18, 23];
      
      [...peakHours, ...peakHours, ...regularHours].forEach(hour => {
        if (Math.random() > 0.3) { // 70% chance of activity in each hour
          const timestamp = new Date(date);
          timestamp.setHours(hour, Math.floor(Math.random() * 60));
          ranges.push(timestamp.toISOString());
        }
      });
    }
    
    return ranges;
  }

  generateUserProfiles() {
    const profiles = {};
    const ageGroups = ['18-24', '25-34', '35-44', '45-54', '55+'];
    const preferences = ['binge_watcher', 'casual_viewer', 'genre_specific', 'new_releases'];
    
    for (let i = 0; i < 5000; i++) {
      const userId = `user_${i}`;
      profiles[userId] = {
        ageGroup: ageGroups[Math.floor(Math.random() * ageGroups.length)],
        preferredGenres: this.getRandomGenres(2 + Math.floor(Math.random() * 3)),
        viewingPattern: preferences[Math.floor(Math.random() * preferences.length)],
        avgSessionLength: 30 + Math.floor(Math.random() * 120), // 30-150 minutes
        preferredDevice: ['smart_tv', 'mobile', 'desktop', 'tablet'][Math.floor(Math.random() * 4)],
        subscriptionTier: Math.random() > 0.7 ? 'premium' : 'standard'
      };
    }
    
    return profiles;
  }

  getRandomGenres(count) {
    const genres = ['action', 'comedy', 'drama', 'thriller', 'documentary', 'romance', 'horror', 'sci-fi', 'animation'];
    const shuffled = genres.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  generateEngagementMetrics() {
    const metrics = {};
    
    this.content.forEach(content => {
      const contentViews = this.viewingData.filter(v => v.contentId === content.id);
      const completions = contentViews.filter(v => v.action === 'complete');
      const starts = contentViews.filter(v => v.action === 'start');
      
      metrics[content.id] = {
        totalViews: starts.length,
        completionRate: starts.length > 0 ? (completions.length / starts.length * 100).toFixed(2) : 0,
        avgWatchTime: contentViews.length > 0 ? 
          ss.mean(contentViews.map(v => v.watchTime)).toFixed(2) : 0,
        rewatchRate: this.calculateRewatchRate(contentViews),
        deviceBreakdown: this.getDeviceBreakdown(contentViews),
        peakViewingHours: this.getPeakViewingHours(contentViews)
      };
    });
    
    return metrics;
  }

  calculateRewatchRate(views) {
    const rewatches = views.filter(v => v.action === 'rewatch');
    const totalViews = views.filter(v => v.action === 'start');
    return totalViews.length > 0 ? (rewatches.length / totalViews.length * 100).toFixed(2) : 0;
  }

  getDeviceBreakdown(views) {
    const devices = {};
    views.forEach(view => {
      devices[view.device] = (devices[view.device] || 0) + 1;
    });
    return devices;
  }

  getPeakViewingHours(views) {
    const hours = {};
    views.forEach(view => {
      const hour = new Date(view.timestamp).getHours();
      hours[hour] = (hours[hour] || 0) + 1;
    });
    
    const sortedHours = Object.entries(hours)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([hour]) => parseInt(hour));
    
    return sortedHours;
  }

  getRandomLocation() {
    const locations = [
      'Los Angeles, CA', 'New York, NY', 'London, UK', 'Toronto, CA',
      'Sydney, AU', 'Berlin, DE', 'Tokyo, JP', 'São Paulo, BR',
      'Mumbai, IN', 'Mexico City, MX', 'Paris, FR', 'Seoul, KR'
    ];
    return locations[Math.floor(Math.random() * locations.length)];
  }

  // Advanced Analytics Methods
  
  getViewingFunnel() {
    const funnel = {
      browsing: this.viewingData.length,
      starts: this.viewingData.filter(v => v.action === 'start').length,
      midpoint: this.viewingData.filter(v => v.watchTime > 30).length,
      completions: this.viewingData.filter(v => v.action === 'complete').length
    };
    
    funnel.startRate = (funnel.starts / funnel.browsing * 100).toFixed(2);
    funnel.engagementRate = (funnel.midpoint / funnel.starts * 100).toFixed(2);
    funnel.completionRate = (funnel.completions / funnel.starts * 100).toFixed(2);
    
    return funnel;
  }

  getGenrePerformance() {
    const genres = [...new Set(this.content.map(c => c.genre))];
    
    return genres.map(genre => {
      const genreContent = this.content.filter(c => c.genre === genre);
      const genreViews = this.viewingData.filter(v => v.genre === genre);
      
      const totalWatchTime = genreViews.reduce((sum, v) => sum + v.watchTime, 0);
      const avgRating = ss.mean(genreContent.map(c => c.rating));
      const avgPopularity = ss.mean(genreContent.map(c => c.popularity));
      
      return {
        genre,
        totalWatchTime,
        viewCount: genreViews.length,
        contentCount: genreContent.length,
        avgRating: avgRating.toFixed(2),
        avgPopularity: avgPopularity.toFixed(1),
        watchTimePerContent: (totalWatchTime / genreContent.length).toFixed(0),
        engagementScore: (genreViews.length * avgPopularity / 100).toFixed(0)
      };
    }).sort((a, b) => b.totalWatchTime - a.totalWatchTime);
  }

  getTopPerformingContent(limit = 10) {
    const contentStats = {};
    
    this.content.forEach(content => {
      const views = this.viewingData.filter(v => v.contentId === content.id);
      const completions = views.filter(v => v.action === 'complete');
      const starts = views.filter(v => v.action === 'start');
      
      contentStats[content.id] = {
        ...content,
        totalViews: starts.length,
        totalCompletions: completions.length,
        totalWatchTime: views.reduce((sum, v) => sum + v.watchTime, 0),
        completionRate: starts.length > 0 ? (completions.length / starts.length * 100).toFixed(2) : 0,
        engagementScore: (starts.length * (content.popularity / 100) * content.rating).toFixed(0)
      };
    });
    
    return Object.values(contentStats)
      .sort((a, b) => b.engagementScore - a.engagementScore)
      .slice(0, limit);
  }

  getAudienceSegmentation() {
    const segments = {
      bingeWatchers: [],
      casualViewers: [],
      genreLovers: [],
      newUsers: []
    };
    
    const userStats = {};
    
    this.viewingData.forEach(view => {
      if (!userStats[view.userId]) {
        userStats[view.userId] = {
          totalWatchTime: 0,
          sessionsCount: 0,
          genresWatched: new Set(),
          avgSessionLength: 0,
          firstSeen: view.timestamp,
          lastSeen: view.timestamp,
          completions: 0
        };
      }
      
      const user = userStats[view.userId];
      user.totalWatchTime += view.watchTime;
      user.genresWatched.add(view.genre);
      
      if (view.action === 'complete') {
        user.completions++;
      }
      
      if (new Date(view.timestamp) < new Date(user.firstSeen)) {
        user.firstSeen = view.timestamp;
      }
      if (new Date(view.timestamp) > new Date(user.lastSeen)) {
        user.lastSeen = view.timestamp;
      }
    });
    
    Object.entries(userStats).forEach(([userId, stats]) => {
      const daysSinceFirst = (new Date() - new Date(stats.firstSeen)) / (1000 * 60 * 60 * 24);
      const avgWatchTime = stats.totalWatchTime / Math.max(1, daysSinceFirst);
      
      if (avgWatchTime > 180) { // 3+ hours per day
        segments.bingeWatchers.push({ userId, ...stats });
      } else if (avgWatchTime < 60) { // Less than 1 hour per day
        segments.casualViewers.push({ userId, ...stats });
      }
      
      if (stats.genresWatched.size <= 2) {
        segments.genreLovers.push({ userId, ...stats });
      }
      
      if (daysSinceFirst < 7) {
        segments.newUsers.push({ userId, ...stats });
      }
    });
    
    return segments;
  }

  getContentRecommendations(genre) {
    const genreContent = this.content.filter(c => c.genre === genre);
    const genreViews = this.viewingData.filter(v => v.genre === genre);
    
    // Calculate recommendation score based on rating, popularity, and recent viewing trends
    const recommendations = genreContent.map(content => {
      const contentViews = genreViews.filter(v => v.contentId === content.id);
      const recentViews = contentViews.filter(v => {
        const viewDate = new Date(v.timestamp);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return viewDate > weekAgo;
      });
      
      const trendingScore = recentViews.length * 10;
      const qualityScore = content.rating * 10;
      const popularityScore = content.popularity;
      
      return {
        ...content,
        recommendationScore: (trendingScore + qualityScore + popularityScore) / 3,
        recentViews: recentViews.length,
        reason: this.getRecommendationReason(content, recentViews.length)
      };
    });
    
    return recommendations
      .sort((a, b) => b.recommendationScore - a.recommendationScore)
      .slice(0, 5);
  }

  getRecommendationReason(content, recentViews) {
    if (recentViews > 100) return 'Trending now';
    if (content.rating > 8.5) return 'Critically acclaimed';
    if (content.popularity > 90) return 'Highly popular';
    if (content.year >= 2023) return 'New release';
    return 'Recommended for you';
  }

  getViewingPatterns() {
    const patterns = {
      hourly: {},
      daily: {},
      deviceUsage: {},
      genreByTime: {}
    };
    
    this.viewingData.forEach(view => {
      const date = new Date(view.timestamp);
      const hour = date.getHours();
      const day = date.toLocaleDateString('en-US', { weekday: 'long' });
      
      // Hourly patterns
      patterns.hourly[hour] = (patterns.hourly[hour] || 0) + 1;
      
      // Daily patterns
      patterns.daily[day] = (patterns.daily[day] || 0) + 1;
      
      // Device usage
      patterns.deviceUsage[view.device] = (patterns.deviceUsage[view.device] || 0) + 1;
      
      // Genre by time
      const timeSlot = hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';
      if (!patterns.genreByTime[timeSlot]) patterns.genreByTime[timeSlot] = {};
      patterns.genreByTime[timeSlot][view.genre] = (patterns.genreByTime[timeSlot][view.genre] || 0) + 1;
    });
    
    return patterns;
  }

  generateInsights() {
    const insights = [];
    
    // Total viewing time insight
    const totalWatchTime = this.viewingData.reduce((sum, v) => sum + v.watchTime, 0);
    const avgDailyWatchTime = totalWatchTime / 30; // 30 days
    
    insights.push({
      type: 'viewing',
      title: 'Total Watch Time',
      value: `${Math.round(totalWatchTime / 60).toLocaleString()}h`,
      trend: '+15.2%',
      description: 'Total hours watched across all content in the last 30 days'
    });
    
    // Top genre insight
    const genrePerf = this.getGenrePerformance();
    const topGenre = genrePerf[0];
    
    insights.push({
      type: 'genre',
      title: 'Most Watched Genre',
      value: topGenre.genre.charAt(0).toUpperCase() + topGenre.genre.slice(1),
      trend: `${topGenre.viewCount.toLocaleString()} views`,
      description: `Accounts for ${((topGenre.totalWatchTime / totalWatchTime) * 100).toFixed(1)}% of total watch time`
    });
    
    // Completion rate insight
    const funnel = this.getViewingFunnel();
    
    insights.push({
      type: 'engagement',
      title: 'Completion Rate',
      value: `${funnel.completionRate}%`,
      trend: funnel.completionRate > 60 ? '+Good' : 'Needs Improvement',
      description: 'Percentage of started content that gets completed'
    });
    
    // User engagement insight
    const uniqueUsers = new Set(this.viewingData.map(v => v.userId)).size;
    const avgViewsPerUser = this.viewingData.length / uniqueUsers;
    
    insights.push({
      type: 'users',
      title: 'User Engagement',
      value: avgViewsPerUser.toFixed(1),
      trend: avgViewsPerUser > 15 ? 'High' : 'Medium',
      description: 'Average viewing sessions per user'
    });
    
    return insights;
  }
}