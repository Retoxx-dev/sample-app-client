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

  updateUserProfileImage(file: any) {
    const config = {
      headers: {
        ...authHeader(),
        'Content-Type': 'multipart/form-data',
        'accept': 'application/json',
      }
    };
    const formData = new FormData();
    formData.append(
      'file',
      file
    );
    return axios.post(API_URL + 'change_profile_picture', formData, config)
      .then((response) => {
        return response.data;
      });
  }

  getUserProfileImage() {
    return axios.get(API_URL + 'get_profile_picture', { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
}

export default new UserService();
