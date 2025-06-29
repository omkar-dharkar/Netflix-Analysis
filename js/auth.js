import { auth } from './firebase-config.js';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  FacebookAuthProvider, 
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';

class AuthManager {
  constructor() {
    this.googleProvider = new GoogleAuthProvider();
    this.facebookProvider = new FacebookAuthProvider();
    this.currentUser = null;
    this.initializeAuth();
  }

  initializeAuth() {
    // Listen for auth state changes
    onAuthStateChanged(auth, (user) => {
      this.currentUser = user;
      this.updateUI(user);
    });

    // Set up event listeners
    this.setupEventListeners();
  }

  setupEventListeners() {
    const googleLoginBtn = document.getElementById('google-login');
    const facebookLoginBtn = document.getElementById('facebook-login');
    const logoutBtn = document.getElementById('logout-btn');

    if (googleLoginBtn) {
      googleLoginBtn.addEventListener('click', () => this.signInWithGoogle());
    }

    if (facebookLoginBtn) {
      facebookLoginBtn.addEventListener('click', () => this.signInWithFacebook());
    }

    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => this.signOut());
    }
  }

  async signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, this.googleProvider);
      console.log('Google sign-in successful:', result.user);
    } catch (error) {
      console.error('Google sign-in error:', error);
      this.showAuthError('Failed to sign in with Google. Please try again.');
    }
  }

  async signInWithFacebook() {
    try {
      const result = await signInWithPopup(auth, this.facebookProvider);
      console.log('Facebook sign-in successful:', result.user);
    } catch (error) {
      console.error('Facebook sign-in error:', error);
      this.showAuthError('Failed to sign in with Facebook. Please try again.');
    }
  }

  async signOut() {
    try {
      await signOut(auth);
      console.log('Sign-out successful');
    } catch (error) {
      console.error('Sign-out error:', error);
      this.showAuthError('Failed to sign out. Please try again.');
    }
  }

  updateUI(user) {
    const loginButtons = document.getElementById('login-buttons');
    const userInfo = document.getElementById('user-info');
    const userName = document.getElementById('user-name');
    const userAvatar = document.getElementById('user-avatar');

    if (user) {
      // User is signed in
      if (loginButtons) loginButtons.classList.add('hidden');
      if (userInfo) userInfo.classList.remove('hidden');
      
      if (userName) userName.textContent = user.displayName || 'User';
      if (userAvatar) {
        userAvatar.src = user.photoURL || 'https://via.placeholder.com/40x40?text=U';
        userAvatar.alt = user.displayName || 'User Avatar';
      }
    } else {
      // User is signed out
      if (loginButtons) loginButtons.classList.remove('hidden');
      if (userInfo) userInfo.classList.add('hidden');
    }
  }

  showAuthError(message) {
    // Create a simple toast notification
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-up';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 5000);
  }

  getCurrentUser() {
    return this.currentUser;
  }
}

// Export singleton instance
export const authManager = new AuthManager();