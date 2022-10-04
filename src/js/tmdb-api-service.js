const axios = require('axios');

export default class TmdbApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchMovie() {
    try {
      const BASE_URL = 'https://api.themoviedb.org/3/';
      const API_KEY = '5fe2b2c003e2bf661ee6b8424d931ac2';
      const options = new URLSearchParams({
        api_key: API_KEY,
        query: this.searchQuery,
        page: this.page,
      });
      const response = await axios.get(`${BASE_URL}search/movie?${options}`);
      return response;
    } catch (error) {
      console.clear();
    }
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  getpage() {
    return this.page;
  }

  incrementPage() {
    this.page += 1;
  }

  decrementPage() {
    this.page -= 1;
  }

  resetPage() {
    this.page = 1;
  }

  setPage(newPage) {
    this.page = newPage;
  }
}
