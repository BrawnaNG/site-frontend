import api from "./api";
import TokenService from "./token.service";

class AuthService {
  login(user) {
    return api
      .post('token/', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.access) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    TokenService.removeUser();
  }

  register(user) {
    return api.post('accounts/registration/', {
      username: user.username,
      email: user.email,
      password: user.password,
      alias: user.alias
    });
  }

  async getRole() {
    const rs = await api.get("accounts/role/");
    return rs.data.role;
  }
  
}

export default new AuthService();