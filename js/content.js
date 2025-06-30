// Netflix content data and management
export const contentGenres = [
  { id: 'all', name: 'All Content', icon: 'fas fa-th' },
  { id: 'action', name: 'Action', icon: 'fas fa-fist-raised' },
  { id: 'comedy', name: 'Comedy', icon: 'fas fa-laugh' },
  { id: 'drama', name: 'Drama', icon: 'fas fa-theater-masks' },
  { id: 'thriller', name: 'Thriller', icon: 'fas fa-eye' },
  { id: 'documentary', name: 'Documentary', icon: 'fas fa-video' },
  { id: 'romance', name: 'Romance', icon: 'fas fa-heart' },
  { id: 'horror', name: 'Horror', icon: 'fas fa-ghost' },
  { id: 'sci-fi', name: 'Sci-Fi', icon: 'fas fa-rocket' },
  { id: 'animation', name: 'Animation', icon: 'fas fa-palette' }
];

export const netflixContent = [
  // Action
  { id: 1, title: 'Stranger Things', type: 'series', genre: 'action', rating: 8.7, year: 2016, seasons: 4, episodes: 42, description: 'Supernatural thriller set in 1980s Indiana', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 95, viewingHours: 2400000 },
  { id: 2, title: 'The Witcher', type: 'series', genre: 'action', rating: 8.2, year: 2019, seasons: 3, episodes: 24, description: 'Fantasy adventure following Geralt of Rivia', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 88, viewingHours: 1800000 },
  { id: 3, title: 'Extraction', type: 'movie', genre: 'action', rating: 6.8, year: 2020, runtime: 116, description: 'Black market mercenary rescue mission', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 82, viewingHours: 950000 },
  { id: 4, title: 'Money Heist', type: 'series', genre: 'action', rating: 8.3, year: 2017, seasons: 5, episodes: 41, description: 'Spanish heist crime drama series', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 91, viewingHours: 2100000 },
  { id: 5, title: 'Red Notice', type: 'movie', genre: 'action', rating: 6.4, year: 2021, runtime: 118, description: 'FBI profiler pursues art thieves', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 79, viewingHours: 890000 },

  // Comedy
  { id: 6, title: 'The Good Place', type: 'series', genre: 'comedy', rating: 8.2, year: 2016, seasons: 4, episodes: 50, description: 'Philosophical comedy about the afterlife', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 87, viewingHours: 1600000 },
  { id: 7, title: 'Brooklyn Nine-Nine', type: 'series', genre: 'comedy', rating: 8.4, year: 2013, seasons: 8, episodes: 153, description: 'Police procedural comedy series', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 89, viewingHours: 1750000 },
  { id: 8, title: 'Don\'t Look Up', type: 'movie', genre: 'comedy', rating: 7.2, year: 2021, runtime: 138, description: 'Satirical disaster comedy film', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 84, viewingHours: 1200000 },
  { id: 9, title: 'Schitt\'s Creek', type: 'series', genre: 'comedy', rating: 8.5, year: 2015, seasons: 6, episodes: 80, description: 'Family loses fortune and moves to small town', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 92, viewingHours: 1950000 },
  { id: 10, title: 'The Kissing Booth', type: 'movie', genre: 'comedy', rating: 6.0, year: 2018, runtime: 105, description: 'Teen romantic comedy', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 76, viewingHours: 720000 },

  // Drama
  { id: 11, title: 'The Crown', type: 'series', genre: 'drama', rating: 8.7, year: 2016, seasons: 6, episodes: 60, description: 'British royal family historical drama', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 90, viewingHours: 2200000 },
  { id: 12, title: 'Ozark', type: 'series', genre: 'drama', rating: 8.4, year: 2017, seasons: 4, episodes: 44, description: 'Money laundering crime drama', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 86, viewingHours: 1850000 },
  { id: 13, title: 'Marriage Story', type: 'movie', genre: 'drama', rating: 7.9, year: 2019, runtime: 137, description: 'Divorce drama starring Adam Driver', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 81, viewingHours: 980000 },
  { id: 14, title: 'House of Cards', type: 'series', genre: 'drama', rating: 8.7, year: 2013, seasons: 6, episodes: 73, description: 'Political thriller drama series', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 85, viewingHours: 1700000 },
  { id: 15, title: 'The Irishman', type: 'movie', genre: 'drama', rating: 7.8, year: 2019, runtime: 209, description: 'Epic crime drama by Martin Scorsese', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 83, viewingHours: 1100000 },

  // Thriller
  { id: 16, title: 'Mindhunter', type: 'series', genre: 'thriller', rating: 8.6, year: 2017, seasons: 2, episodes: 19, description: 'FBI criminal psychology profiling', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 88, viewingHours: 1650000 },
  { id: 17, title: 'You', type: 'series', genre: 'thriller', rating: 7.7, year: 2018, seasons: 4, episodes: 40, description: 'Psychological thriller about obsession', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 84, viewingHours: 1450000 },
  { id: 18, title: 'Bird Box', type: 'movie', genre: 'thriller', rating: 6.6, year: 2018, runtime: 124, description: 'Post-apocalyptic psychological horror', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 87, viewingHours: 1300000 },
  { id: 19, title: 'Dark', type: 'series', genre: 'thriller', rating: 8.8, year: 2017, seasons: 3, episodes: 26, description: 'German sci-fi thriller series', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 91, viewingHours: 1900000 },
  { id: 20, title: 'The Platform', type: 'movie', genre: 'thriller', rating: 7.0, year: 2019, runtime: 94, description: 'Spanish dystopian thriller', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 78, viewingHours: 850000 },

  // Documentary
  { id: 21, title: 'Making a Murderer', type: 'series', genre: 'documentary', rating: 8.6, year: 2015, seasons: 2, episodes: 20, description: 'True crime documentary series', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 89, viewingHours: 1750000 },
  { id: 22, title: 'Tiger King', type: 'series', genre: 'documentary', rating: 7.5, year: 2020, seasons: 2, episodes: 12, description: 'True crime about exotic animal owners', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 93, viewingHours: 2050000 },
  { id: 23, title: 'My Octopus Teacher', type: 'movie', genre: 'documentary', rating: 8.1, year: 2020, runtime: 85, description: 'Nature documentary about octopus friendship', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 82, viewingHours: 920000 },
  { id: 24, title: 'The Social Dilemma', type: 'movie', genre: 'documentary', rating: 7.6, year: 2020, runtime: 94, description: 'Documentary about social media impact', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 86, viewingHours: 1150000 },
  { id: 25, title: 'Wild Wild Country', type: 'series', genre: 'documentary', rating: 8.2, year: 2018, seasons: 1, episodes: 6, description: 'Documentary about controversial commune', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 80, viewingHours: 1050000 },

  // Romance
  { id: 26, title: 'Bridgerton', type: 'series', genre: 'romance', rating: 7.3, year: 2020, seasons: 2, episodes: 16, description: 'Period romance drama series', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 94, viewingHours: 2300000 },
  { id: 27, title: 'To All the Boys I\'ve Loved Before', type: 'movie', genre: 'romance', rating: 7.0, year: 2018, runtime: 99, description: 'Teen romantic comedy film', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 85, viewingHours: 1200000 },
  { id: 28, title: 'Emily in Paris', type: 'series', genre: 'romance', rating: 6.8, year: 2020, seasons: 3, episodes: 30, description: 'American marketing executive in Paris', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 81, viewingHours: 1400000 },
  { id: 29, title: 'The Half of It', type: 'movie', genre: 'romance', rating: 6.9, year: 2020, runtime: 104, description: 'Coming-of-age romantic drama', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 77, viewingHours: 780000 },
  { id: 30, title: 'Virgin River', type: 'series', genre: 'romance', rating: 7.4, year: 2019, seasons: 4, episodes: 42, description: 'Small-town romance drama', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 83, viewingHours: 1550000 },

  // Horror
  { id: 31, title: 'The Haunting of Hill House', type: 'series', genre: 'horror', rating: 8.6, year: 2018, seasons: 1, episodes: 10, description: 'Supernatural horror family drama', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 87, viewingHours: 1650000 },
  { id: 32, title: 'His House', type: 'movie', genre: 'horror', rating: 6.5, year: 2020, runtime: 93, description: 'Refugee couple haunted by past', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 74, viewingHours: 680000 },
  { id: 33, title: 'Midnight Mass', type: 'series', genre: 'horror', rating: 7.7, year: 2021, seasons: 1, episodes: 7, description: 'Religious horror limited series', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 79, viewingHours: 950000 },
  { id: 34, title: 'Fear Street Trilogy', type: 'movie', genre: 'horror', rating: 6.7, year: 2021, runtime: 107, description: 'Horror trilogy based on R.L. Stine books', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 82, viewingHours: 1100000 },
  { id: 35, title: 'The Ritual', type: 'movie', genre: 'horror', rating: 6.3, year: 2017, runtime: 94, description: 'Friends encounter ancient evil in forest', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 71, viewingHours: 620000 },

  // Sci-Fi
  { id: 36, title: 'Black Mirror', type: 'series', genre: 'sci-fi', rating: 8.8, year: 2011, seasons: 6, episodes: 27, description: 'Anthology series about technology', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 92, viewingHours: 2100000 },
  { id: 37, title: 'Lost in Space', type: 'series', genre: 'sci-fi', rating: 7.3, year: 2018, seasons: 3, episodes: 28, description: 'Family stranded in space adventure', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 80, viewingHours: 1350000 },
  { id: 38, title: 'The Midnight Sky', type: 'movie', genre: 'sci-fi', rating: 5.7, year: 2020, runtime: 118, description: 'Post-apocalyptic space drama', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 73, viewingHours: 750000 },
  { id: 39, title: 'Altered Carbon', type: 'series', genre: 'sci-fi', rating: 8.0, year: 2018, seasons: 2, episodes: 18, description: 'Cyberpunk detective series', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 84, viewingHours: 1450000 },
  { id: 40, title: 'Stowaway', type: 'movie', genre: 'sci-fi', rating: 5.6, year: 2021, runtime: 116, description: 'Space mission survival thriller', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 69, viewingHours: 580000 },

  // Animation
  { id: 41, title: 'BoJack Horseman', type: 'series', genre: 'animation', rating: 8.8, year: 2014, seasons: 6, episodes: 77, description: 'Adult animated comedy-drama', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 89, viewingHours: 1800000 },
  { id: 42, title: 'Klaus', type: 'movie', genre: 'animation', rating: 8.2, year: 2019, runtime: 96, description: 'Christmas animated family film', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 86, viewingHours: 1250000 },
  { id: 43, title: 'Big Mouth', type: 'series', genre: 'animation', rating: 7.8, year: 2017, seasons: 6, episodes: 61, description: 'Adult animated coming-of-age comedy', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 82, viewingHours: 1500000 },
  { id: 44, title: 'The Mitchells vs. The Machines', type: 'movie', genre: 'animation', rating: 7.6, year: 2021, runtime: 113, description: 'Family vs robot apocalypse comedy', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 84, viewingHours: 1180000 },
  { id: 45, title: 'Castlevania', type: 'series', genre: 'animation', rating: 8.3, year: 2017, seasons: 4, episodes: 32, description: 'Dark fantasy animated series', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', popularity: 87, viewingHours: 1650000 }
];

export class ContentManager {
  constructor() {
    this.allContent = [...netflixContent];
    this.filteredContent = [...netflixContent];
    this.currentGenre = 'all';
    this.currentSearchTerm = '';
    this.currentSortBy = 'title';
  }

  filterContent(searchTerm = '', genre = 'all', sortBy = 'title') {
    this.currentSearchTerm = searchTerm.toLowerCase();
    this.currentGenre = genre;
    this.currentSortBy = sortBy;

    let filtered = this.allContent.filter(content => {
      const matchesSearch = content.title.toLowerCase().includes(this.currentSearchTerm) ||
                           content.description.toLowerCase().includes(this.currentSearchTerm);
      const matchesGenre = genre === 'all' || content.genre === genre;
      
      return matchesSearch && matchesGenre;
    });

    // Sort content
    filtered = this.sortContent(filtered, sortBy);
    
    this.filteredContent = filtered;
    return filtered;
  }

  sortContent(content, sortBy) {
    const sorted = [...content];
    
    switch (sortBy) {
      case 'rating-low':
        return sorted.sort((a, b) => a.rating - b.rating);
      case 'rating-high':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'year':
        return sorted.sort((a, b) => b.year - a.year);
      case 'popularity':
        return sorted.sort((a, b) => b.popularity - a.popularity);
      case 'title':
      default:
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
    }
  }

  highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  }

  getFilteredContent() {
    return this.filteredContent;
  }

  getContentCount() {
    return this.filteredContent.length;
  }

  getTotalContentCount() {
    return this.allContent.length;
  }
}