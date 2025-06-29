// Product data and management
export const productCategories = [
  { id: 'all', name: 'All Products', icon: 'fas fa-th' },
  { id: 'electronics', name: 'Electronics', icon: 'fas fa-laptop' },
  { id: 'clothing', name: 'Clothing', icon: 'fas fa-tshirt' },
  { id: 'home', name: 'Home & Garden', icon: 'fas fa-home' },
  { id: 'books', name: 'Books', icon: 'fas fa-book' },
  { id: 'sports', name: 'Sports', icon: 'fas fa-dumbbell' },
  { id: 'beauty', name: 'Beauty', icon: 'fas fa-spa' },
  { id: 'toys', name: 'Toys', icon: 'fas fa-gamepad' }
];

export const products = [
  // Electronics
  { id: 1, name: 'iPhone 15 Pro', category: 'electronics', price: 999, popularity: 95, description: 'Latest Apple smartphone with advanced features', image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 2, name: 'Samsung Galaxy S24', category: 'electronics', price: 899, popularity: 90, description: 'Premium Android smartphone', image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 3, name: 'MacBook Pro M3', category: 'electronics', price: 1999, popularity: 88, description: 'Professional laptop for creators', image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400' },
  { id: 4, name: 'Dell XPS 13', category: 'electronics', price: 1299, popularity: 85, description: 'Ultra-portable Windows laptop', image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 5, name: 'iPad Air', category: 'electronics', price: 599, popularity: 82, description: 'Versatile tablet for work and play', image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 6, name: 'Sony WH-1000XM5', category: 'electronics', price: 399, popularity: 87, description: 'Premium noise-canceling headphones', image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 7, name: 'Apple Watch Series 9', category: 'electronics', price: 399, popularity: 83, description: 'Advanced smartwatch with health features', image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 8, name: 'Nintendo Switch OLED', category: 'electronics', price: 349, popularity: 89, description: 'Hybrid gaming console', image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 9, name: 'Samsung 4K Smart TV', category: 'electronics', price: 799, popularity: 78, description: '55-inch 4K QLED television', image: 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 10, name: 'Canon EOS R6', category: 'electronics', price: 2499, popularity: 76, description: 'Professional mirrorless camera', image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 11, name: 'Dyson V15 Detect', category: 'electronics', price: 749, popularity: 81, description: 'Advanced cordless vacuum cleaner', image: 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 12, name: 'Tesla Model Y Charger', category: 'electronics', price: 500, popularity: 74, description: 'Home charging solution for Tesla', image: 'https://images.pexels.com/photos/110844/pexels-photo-110844.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 13, name: 'Google Pixel 8 Pro', category: 'electronics', price: 999, popularity: 79, description: 'AI-powered Android smartphone', image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 14, name: 'Microsoft Surface Pro 9', category: 'electronics', price: 1099, popularity: 77, description: '2-in-1 laptop tablet hybrid', image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400' },
  { id: 15, name: 'AirPods Pro 2', category: 'electronics', price: 249, popularity: 86, description: 'Premium wireless earbuds', image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400' },

  // Clothing
  { id: 16, name: 'Nike Air Max 270', category: 'clothing', price: 150, popularity: 92, description: 'Comfortable running shoes', image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 17, name: 'Levi\'s 501 Jeans', category: 'clothing', price: 89, popularity: 88, description: 'Classic straight-leg denim', image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 18, name: 'Adidas Ultraboost 22', category: 'clothing', price: 180, popularity: 85, description: 'Premium running sneakers', image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 19, name: 'Champion Hoodie', category: 'clothing', price: 45, popularity: 83, description: 'Comfortable pullover hoodie', image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 20, name: 'Ralph Lauren Polo Shirt', category: 'clothing', price: 89, popularity: 79, description: 'Classic cotton polo shirt', image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 21, name: 'North Face Jacket', category: 'clothing', price: 199, popularity: 87, description: 'Waterproof outdoor jacket', image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 22, name: 'Converse Chuck Taylor', category: 'clothing', price: 65, popularity: 91, description: 'Iconic canvas sneakers', image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 23, name: 'Zara Blazer', category: 'clothing', price: 129, popularity: 76, description: 'Professional business blazer', image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 24, name: 'H&M Dress', category: 'clothing', price: 39, popularity: 82, description: 'Casual summer dress', image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 25, name: 'Uniqlo T-Shirt', category: 'clothing', price: 19, popularity: 89, description: 'Basic cotton t-shirt', image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 26, name: 'Patagonia Fleece', category: 'clothing', price: 149, popularity: 84, description: 'Eco-friendly fleece jacket', image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 27, name: 'Vans Old Skool', category: 'clothing', price: 65, popularity: 86, description: 'Classic skate shoes', image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 28, name: 'Tommy Hilfiger Shirt', category: 'clothing', price: 79, popularity: 75, description: 'Designer button-down shirt', image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 29, name: 'Gap Chinos', category: 'clothing', price: 59, popularity: 78, description: 'Casual khaki pants', image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 30, name: 'Under Armour Shorts', category: 'clothing', price: 35, popularity: 81, description: 'Athletic performance shorts', image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=400' },

  // Home & Garden
  { id: 31, name: 'KitchenAid Stand Mixer', category: 'home', price: 379, popularity: 93, description: 'Professional stand mixer for baking', image: 'https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 32, name: 'Instant Pot Duo', category: 'home', price: 99, popularity: 91, description: 'Multi-use pressure cooker', image: 'https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 33, name: 'Ninja Blender', category: 'home', price: 149, popularity: 87, description: 'High-performance blender', image: 'https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 34, name: 'Roomba i7+', category: 'home', price: 799, popularity: 84, description: 'Self-emptying robot vacuum', image: 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 35, name: 'Philips Hue Lights', category: 'home', price: 199, popularity: 82, description: 'Smart LED lighting system', image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 36, name: 'Nest Thermostat', category: 'home', price: 249, popularity: 79, description: 'Smart home thermostat', image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 37, name: 'Weber Genesis Grill', category: 'home', price: 899, popularity: 86, description: 'Premium gas barbecue grill', image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 38, name: 'Shark Navigator Vacuum', category: 'home', price: 179, popularity: 88, description: 'Upright vacuum cleaner', image: 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 39, name: 'Cuisinart Coffee Maker', category: 'home', price: 89, popularity: 85, description: 'Programmable drip coffee maker', image: 'https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 40, name: 'All-Clad Cookware Set', category: 'home', price: 599, popularity: 81, description: 'Professional stainless steel pots', image: 'https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 41, name: 'Dyson Air Purifier', category: 'home', price: 449, popularity: 77, description: 'HEPA air purification system', image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 42, name: 'Ring Video Doorbell', category: 'home', price: 199, popularity: 83, description: 'Smart security doorbell', image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 43, name: 'Tempur-Pedic Pillow', category: 'home', price: 149, popularity: 78, description: 'Memory foam pillow', image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 44, name: 'Breville Espresso Machine', category: 'home', price: 699, popularity: 76, description: 'Semi-automatic espresso maker', image: 'https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 45, name: 'Casper Mattress', category: 'home', price: 1095, popularity: 80, description: 'Memory foam mattress', image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400' },

  // Books
  { id: 46, name: 'The Psychology of Money', category: 'books', price: 16, popularity: 94, description: 'Financial wisdom and behavioral insights', image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 47, name: 'Atomic Habits', category: 'books', price: 18, popularity: 96, description: 'Guide to building good habits', image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 48, name: 'Dune', category: 'books', price: 17, popularity: 89, description: 'Classic science fiction novel', image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 49, name: 'The Seven Husbands of Evelyn Hugo', category: 'books', price: 15, popularity: 92, description: 'Contemporary fiction bestseller', image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 50, name: 'Educated', category: 'books', price: 16, popularity: 88, description: 'Memoir about education and family', image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 51, name: 'The Midnight Library', category: 'books', price: 14, popularity: 87, description: 'Philosophical fiction about life choices', image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 52, name: 'Sapiens', category: 'books', price: 19, popularity: 91, description: 'Brief history of humankind', image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 53, name: 'The Alchemist', category: 'books', price: 13, popularity: 90, description: 'Inspirational novel about following dreams', image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 54, name: 'Becoming', category: 'books', price: 20, popularity: 85, description: 'Michelle Obama\'s memoir', image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 55, name: 'The Silent Patient', category: 'books', price: 16, popularity: 84, description: 'Psychological thriller novel', image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 56, name: 'Where the Crawdads Sing', category: 'books', price: 15, popularity: 86, description: 'Mystery and coming-of-age story', image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 57, name: 'The Power of Now', category: 'books', price: 17, popularity: 83, description: 'Spiritual guide to enlightenment', image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 58, name: 'Think and Grow Rich', category: 'books', price: 14, popularity: 82, description: 'Classic personal development book', image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 59, name: 'The Subtle Art of Not Giving a F*ck', category: 'books', price: 16, popularity: 81, description: 'Counterintuitive approach to living', image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 60, name: '1984', category: 'books', price: 13, popularity: 89, description: 'Dystopian social science fiction', image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400' },

  // Sports
  { id: 61, name: 'Peloton Bike+', category: 'sports', price: 2495, popularity: 87, description: 'Premium indoor cycling bike', image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 62, name: 'Bowflex Dumbbells', category: 'sports', price: 349, popularity: 91, description: 'Adjustable weight dumbbells', image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 63, name: 'Yoga Mat Premium', category: 'sports', price: 89, popularity: 88, description: 'Non-slip exercise yoga mat', image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 64, name: 'Fitbit Charge 5', category: 'sports', price: 179, popularity: 84, description: 'Advanced fitness tracker', image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 65, name: 'TRX Suspension Trainer', category: 'sports', price: 195, popularity: 82, description: 'Bodyweight training system', image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 66, name: 'Wilson Tennis Racket', category: 'sports', price: 199, popularity: 79, description: 'Professional tennis racket', image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 67, name: 'Spalding Basketball', category: 'sports', price: 29, popularity: 86, description: 'Official size basketball', image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 68, name: 'Garmin GPS Watch', category: 'sports', price: 449, popularity: 83, description: 'Multi-sport GPS smartwatch', image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 69, name: 'Resistance Bands Set', category: 'sports', price: 39, popularity: 89, description: 'Complete resistance training kit', image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 70, name: 'Hydro Flask Water Bottle', category: 'sports', price: 45, popularity: 85, description: 'Insulated stainless steel bottle', image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 71, name: 'NordicTrack Treadmill', category: 'sports', price: 1599, popularity: 78, description: 'Commercial-grade treadmill', image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 72, name: 'Callaway Golf Clubs', category: 'sports', price: 899, popularity: 76, description: 'Complete golf club set', image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 73, name: 'Foam Roller', category: 'sports', price: 35, popularity: 87, description: 'Muscle recovery foam roller', image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 74, name: 'Protein Powder', category: 'sports', price: 49, popularity: 90, description: 'Whey protein supplement', image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 75, name: 'Kettlebell Set', category: 'sports', price: 129, popularity: 81, description: 'Cast iron kettlebell weights', image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400' },

  // Beauty
  { id: 76, name: 'Fenty Beauty Foundation', category: 'beauty', price: 38, popularity: 93, description: 'Full coverage liquid foundation', image: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 77, name: 'The Ordinary Serum', category: 'beauty', price: 12, popularity: 91, description: 'Niacinamide skincare serum', image: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 78, name: 'Charlotte Tilbury Lipstick', category: 'beauty', price: 37, popularity: 88, description: 'Luxury matte lipstick', image: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 79, name: 'Drunk Elephant Moisturizer', category: 'beauty', price: 68, popularity: 86, description: 'Hydrating facial moisturizer', image: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 80, name: 'Rare Beauty Blush', category: 'beauty', price: 23, popularity: 89, description: 'Liquid blush for natural glow', image: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 81, name: 'Glossier Cloud Paint', category: 'beauty', price: 20, popularity: 87, description: 'Gel-cream blush', image: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 82, name: 'Tatcha Cleanser', category: 'beauty', price: 38, popularity: 84, description: 'Rice enzyme powder cleanser', image: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 83, name: 'Urban Decay Eyeshadow', category: 'beauty', price: 54, popularity: 85, description: 'Naked eyeshadow palette', image: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 84, name: 'Laneige Lip Mask', category: 'beauty', price: 24, popularity: 90, description: 'Overnight lip treatment', image: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 85, name: 'Olaplex Hair Treatment', category: 'beauty', price: 30, popularity: 88, description: 'Bond building hair treatment', image: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 86, name: 'Dyson Hair Dryer', category: 'beauty', price: 429, popularity: 82, description: 'Supersonic hair dryer', image: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 87, name: 'Gua Sha Tool', category: 'beauty', price: 25, popularity: 83, description: 'Rose quartz facial massage tool', image: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 88, name: 'Retinol Cream', category: 'beauty', price: 45, popularity: 86, description: 'Anti-aging night cream', image: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 89, name: 'Vitamin C Serum', category: 'beauty', price: 32, popularity: 89, description: 'Brightening facial serum', image: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 90, name: 'Jade Roller', category: 'beauty', price: 18, popularity: 81, description: 'Facial massage roller', image: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=400' },

  // Toys
  { id: 91, name: 'LEGO Creator Set', category: 'toys', price: 89, popularity: 94, description: 'Advanced building block set', image: 'https://images.pexels.com/photos/298825/pexels-photo-298825.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 92, name: 'Nintendo Switch Pro Controller', category: 'toys', price: 69, popularity: 91, description: 'Wireless gaming controller', image: 'https://images.pexels.com/photos/298825/pexels-photo-298825.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 93, name: 'Barbie Dreamhouse', category: 'toys', price: 199, popularity: 88, description: 'Multi-story dollhouse playset', image: 'https://images.pexels.com/photos/298825/pexels-photo-298825.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 94, name: 'Hot Wheels Track Set', category: 'toys', price: 45, popularity: 89, description: 'Racing track with loop', image: 'https://images.pexels.com/photos/298825/pexels-photo-298825.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 95, name: 'Nerf Blaster', category: 'toys', price: 35, popularity: 92, description: 'Foam dart blaster toy', image: 'https://images.pexels.com/photos/298825/pexels-photo-298825.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 96, name: 'Rubik\'s Cube', category: 'toys', price: 15, popularity: 85, description: 'Classic 3x3 puzzle cube', image: 'https://images.pexels.com/photos/298825/pexels-photo-298825.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 97, name: 'Remote Control Car', category: 'toys', price: 79, popularity: 87, description: 'High-speed RC racing car', image: 'https://images.pexels.com/photos/298825/pexels-photo-298825.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 98, name: 'Play-Doh Set', category: 'toys', price: 25, popularity: 86, description: 'Modeling compound activity set', image: 'https://images.pexels.com/photos/298825/pexels-photo-298825.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 99, name: 'Pokémon Cards', category: 'toys', price: 12, popularity: 93, description: 'Trading card game booster pack', image: 'https://images.pexels.com/photos/298825/pexels-photo-298825.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 100, name: 'Monopoly Board Game', category: 'toys', price: 32, popularity: 84, description: 'Classic property trading game', image: 'https://images.pexels.com/photos/298825/pexels-photo-298825.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 101, name: 'Drone with Camera', category: 'toys', price: 299, popularity: 82, description: 'Quadcopter with HD camera', image: 'https://images.pexels.com/photos/298825/pexels-photo-298825.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 102, name: 'Magic 8-Ball', category: 'toys', price: 8, popularity: 78, description: 'Fortune-telling novelty toy', image: 'https://images.pexels.com/photos/298825/pexels-photo-298825.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 103, name: 'Jenga Classic', category: 'toys', price: 10, popularity: 83, description: 'Wooden block stacking game', image: 'https://images.pexels.com/photos/298825/pexels-photo-298825.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 104, name: 'Fidget Spinner', category: 'toys', price: 5, popularity: 79, description: 'Stress-relief spinning toy', image: 'https://images.pexels.com/photos/298825/pexels-photo-298825.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 105, name: 'Chess Set', category: 'toys', price: 49, popularity: 81, description: 'Wooden chess board and pieces', image: 'https://images.pexels.com/photos/298825/pexels-photo-298825.jpeg?auto=compress&cs=tinysrgb&w=400' }
];

export class ProductManager {
  constructor() {
    this.allProducts = [...products];
    this.filteredProducts = [...products];
    this.currentCategory = 'all';
    this.currentSearchTerm = '';
    this.currentSortBy = 'name';
  }

  filterProducts(searchTerm = '', category = 'all', sortBy = 'name') {
    this.currentSearchTerm = searchTerm.toLowerCase();
    this.currentCategory = category;
    this.currentSortBy = sortBy;

    let filtered = this.allProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.currentSearchTerm) ||
                           product.description.toLowerCase().includes(this.currentSearchTerm);
      const matchesCategory = category === 'all' || product.category === category;
      
      return matchesSearch && matchesCategory;
    });

    // Sort products
    filtered = this.sortProducts(filtered, sortBy);
    
    this.filteredProducts = filtered;
    return filtered;
  }

  sortProducts(products, sortBy) {
    const sorted = [...products];
    
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'popularity':
        return sorted.sort((a, b) => b.popularity - a.popularity);
      case 'name':
      default:
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  }

  getFilteredProducts() {
    return this.filteredProducts;
  }

  getProductCount() {
    return this.filteredProducts.length;
  }

  getTotalProductCount() {
    return this.allProducts.length;
  }
}