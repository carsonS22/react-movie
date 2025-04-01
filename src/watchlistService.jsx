const WATCHLIST_KEY = 'popcornqueue_watchlist';

const watchlistService = {
  getWatchlist: () => {
    try {
      const watchlist = localStorage.getItem(WATCHLIST_KEY);
      return watchlist ? JSON.parse(watchlist) : [];
    } catch (error) {
      console.error('Error getting watchlist:', error);
      return [];
    }
  },

  addToWatchlist: (item) => {
    try {
      const watchlist = watchlistService.getWatchlist();
      
      // Check if item already exists in watchlist
      const existingItem = watchlist.find(
        (i) => i.id === item.id && i.category === item.category
      );
      
      if (!existingItem) {
        const updatedWatchlist = [...watchlist, item];
        localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updatedWatchlist));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      return false;
    }
  },

  removeFromWatchlist: (id, category) => {
    try {
      const watchlist = watchlistService.getWatchlist();
      const updatedWatchlist = watchlist.filter(
        (item) => !(item.id === id && item.category === category)
      );
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updatedWatchlist));
      return true;
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      return false;
    }
  },

  isInWatchlist: (id, category) => {
    try {
      const watchlist = watchlistService.getWatchlist();
      return watchlist.some(
        (item) => item.id === id && item.category === category
      );
    } catch (error) {
      console.error('Error checking watchlist:', error);
      return false;
    }
  }
};

export default watchlistService;