import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:80/v1/';

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
  
  forgotPassword(email: string) {
    return axios.post(API_URL + 'forgot-password', { email })
    .then((response) => {
      return response.data;
    });
  }
  
  resetPassword(token: string, password: string) {
    return axios.post(API_URL + 'reset-password', { token, password })
    .then((response) => {
      return response.data;
    });
  }
  
  isAuthenticated() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.access_token) {
      try {
        axios.get(API_URL + 'users/me', { headers: authHeader() })
          .then(response => {
            return true;
          })
          .catch(error => {
            if (error.response && error.response.status === 401) {
              this.logout();
              console.log('User is not authenticated');
              return false;
            }
            console.error('Error occurred:', error);
            console.log('User authentication status unknown');
            return false;
          });
        console.log('User is authenticated');
        return true;
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          this.logout();
          console.log('User is not authenticated');
        }
        console.log('User is not authenticated');
        return false;
      }
    }
    return false;
  } 

  isSuperUser() {
    const user = this.getCurrentLocalUser();
    const superuser = user?.is_superuser || false;
    return superuser;
  }
  
}

export default new AuthService();