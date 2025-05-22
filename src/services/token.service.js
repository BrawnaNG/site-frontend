class TokenService {
    getLocalRefreshToken() {
      const refresh = JSON.parse(localStorage.getItem("refresh"));
      return refresh;
    }
    
    updateRefreshToken(refreshToken) {
      localStorage.setItem("refresh", JSON.stringify(refreshToken));
    }
    
    clearRefreshToken() {
      localStorage.removeItem("refresh");
    }
  }
  
  export default new TokenService();