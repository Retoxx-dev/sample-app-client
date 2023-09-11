import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:80/v1/';

class MfaService {
  checkMfaStatus() {
    return axios.get(API_URL + 'users/me', { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  checkMfaLoginStatus(token: string) {
    const config = {
      headers: {
        'accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    };

    return axios.get(API_URL + 'users/me', config)
      .then((response) => {
        return response;
      });
  }

  disableMfa() {
    const config = {
      headers: {
        ...authHeader(),
        'accept': 'application/json',
      },
    };
  
    return axios.post(API_URL + 'otp/disable', {}, config)
      .then((response) => {
        return response.data;
      });
  }

  generateMfa(){
    const config = {
      headers: {
        ...authHeader(),
        'accept': 'application/json',
      },
    };

    return axios.post(API_URL + 'otp/generate', {}, config)
      .then((response) => {
        return response.data;
      });
  }

  enableMfa(token: any){
    const config = {
      headers: {
        ...authHeader(),
        'accept': 'application/json',
      },
    };

    return axios.post(API_URL + 'otp/enable', token, config)
      .then((response) => {
        return response.data;
      });
  }

  validateOtp(token: any, otp: any){
    const config = {
      headers: {
        'accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    };

    return axios.post(API_URL + 'otp/validate', otp, config)
      .then((response) => {
        return response;
      });
  }
}

export default new MfaService();

// TODO: delete this and unify services