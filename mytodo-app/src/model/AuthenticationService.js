class AuthenticationService {
  static authenticateUser(accessToken) {
    sessionStorage.setItem("accessToken", accessToken);
  }
  static isUserLoggedIn() {
    let accessToken = sessionStorage.getItem("accessToken");
    if (accessToken === null) return false;
    return true;
  }
  static getAccessToken() {
    let accessToken = sessionStorage.getItem("accessToken");
    if (accessToken === null) return false;
    return accessToken;
  }
  static logout() {
    sessionStorage.removeItem("accessToken");
  }
}

export default AuthenticationService;
