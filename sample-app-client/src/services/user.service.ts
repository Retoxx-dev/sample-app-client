import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:80/v1/';

class UserService {
  saveCurrentUser() {
    return axios.get(API_URL + 'users/me', { headers: authHeader() })
      .then((response) => {
        if (response.data) {
          localStorage.setItem('currentUser', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  // saveCurrentUser2(token: string) {
  //   const config = {
  //     headers: {
  //       'accept': 'application/json',
  //       'Authorization': 'Bearer ' + token
  //     },
  //   };

  //   return axios.get(API_URL + 'users/me', config)
  //     .then((response) => {
  //       if (response.data) {
  //         localStorage.setItem('currentUser', JSON.stringify(response.data));
  //       }
  //       return response.data;
  //     });
  // }

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

  getUserInitials() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser) {
      const first_name = currentUser.first_name || '';
      const last_name = currentUser.last_name || '';
      const initials = first_name.charAt(0) + last_name.charAt(0);
      return initials.toUpperCase();
    }
    return '';
  }
}

export default new UserService();
