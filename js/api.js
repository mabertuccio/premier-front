class API {
  constructor() {
    this.PORT = 5000;
    this.BASE_URL = `http://localhost:${this.PORT}`;
  }

  async handleRequest(method, endpoint) {
    try {
      const response = await fetch(`${this.BASE_URL}/${endpoint}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Fetching Error:', error);
    }
  }
}

export default API;
