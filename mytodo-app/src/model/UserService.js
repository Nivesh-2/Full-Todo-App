import axios from "axios";

const url = "http://localhost:5000/user/";

class UserService {
  static registerUser(user){
    return axios.post(url+"register/", user);
  }
  static authenticateUser(user){
    return axios.post(url+'login/', user);
  }
  static checkAuth(accessToken){
    let token = {accessToken: accessToken};
    return axios.post(url, token);
  }
}

export default UserService;
