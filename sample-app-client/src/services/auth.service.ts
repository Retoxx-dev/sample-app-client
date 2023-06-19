import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:80/v1/';

class AuthService {
  login(username: string, password: string) {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    return axios.post(API_URL + 'login', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then((response) => {
        if (response.data.access_token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    });
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('currentUser');
  }

  register(email: string, password: string, first_name: string, last_name: string) {
    return axios.post(API_URL + 'register', {
      email,
      password,
      first_name,
      last_name
    },
    { 
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  updateCurrentUser(updatedUser: any) {
    return axios.patch(API_URL + 'users/me', updatedUser, { headers: authHeader() })
      .then((response) => {
        if (response.data) {
          localStorage.setItem('currentUser', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user')!);
  }

  getCurrentLocalUser() {
    return JSON.parse(localStorage.getItem('currentUser')!);
  }
}

export default new AuthService();