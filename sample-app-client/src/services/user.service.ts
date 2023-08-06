import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:80/v1/';

class UserService {
  saveCurrentUser() {
    return axios.get(API_URL + 'users/me', { headers: authHeader() })
      .then((response) => {
        if (response.data) {
          localStorage.setItem('currentUser', JSON.stringify(response.data));
          console.log(response.data);
        }
        return response.data;
      });
  }

  getAllUsers() {
    return axios.get(API_URL + 'users', { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  deleteUser(id: string) {
    return axios.delete(API_URL + 'users/' + id, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  updateUser(id: string, data: any) {
    return axios.patch(API_URL + 'users/' + id, data, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
}

export default new UserService();
