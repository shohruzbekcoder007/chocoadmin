import FuseUtils from '@fuse/utils/FuseUtils';
// import axios from 'axios';
import axios, { headerConfig } from '../../../../utils/baseUrl';
import jwtDecode from 'jwt-decode';
import jwtServiceConfig from './jwtServiceConfig';


/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors(); 
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
            // if you ever get an unauthorized response, logout the user
            this.emit('onAutoLogout', 'Invalid access_token');
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    const access_token = this.getAccessToken();

    if (!access_token) {
      this.emit('onNoAccessToken');
      return;
    }

    this.isAuthTokenValid(access_token)
  };

  createUser = (data) => {
    return new Promise((resolve, reject) => {
      axios.post(jwtServiceConfig.signUp, data).then((response) => {
        if (response.data.user) {
          this.setSession(response.data.access_token);
          resolve(response.data.user);
          this.emit('onLogin', response.data.user);
        } else {
          reject(response.data.error);
        }
      });
    });
  };

  signInWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      axios
        .post(jwtServiceConfig.signIn, {
            username: email,
            password,
        })
        .then((response) => {
          if (response.data.access) {
            this.setSession(response.data.access);
            axios.get(jwtServiceConfig.getUser, {
              headers: headerConfig(),
          }).then(response => {
            console.log(response)
              let admin_user = {
                uuid: response.data.id,
                from: "custom-db",
                role: "admin",
                data: {
                  displayName: "Admin",
                  photoURL: "assets/images/avatars/brian-hughes.jpg",
                  email: "admin@fusetheme.com",
                  settings: {
                    layout: {},
                    theme: {}
                  },
                  shortcuts: [
                    "apps.calendar",
                    "apps.mailbox",
                    "apps.contacts"
                  ]
                }
              }
              resolve(admin_user);
              this.emit('onLogin', admin_user);
            }).catch(error => {
              console.log(error)
            })
          } else {
            reject(response.data.error);
          }
        });
    });
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      axios.get(jwtServiceConfig.getUser, {
        headers: headerConfig(),
    }).then(response => {
        let admin_user = {
          uuid: response.data.id,
          from: "custom-db",
          role: "admin",
          data: {
            displayName: "Admin",
            photoURL: "assets/images/avatars/brian-hughes.jpg",
            email: "admin@fusetheme.com",
            settings: {
              layout: {},
              theme: {}
            },
            shortcuts: [
              "apps.calendar",
              "apps.mailbox",
              "apps.contacts"
            ]
          }
        }
        resolve(admin_user);
        this.emit('onLogin', admin_user);
      }).catch(error => {
          this.logout();
          reject(new Error('Failed to login with token.'));
      })
    });
  };

  updateUserData = (user) => {
    return axios.post(jwtServiceConfig.updateUser, {
      user,
    });
  };

  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem('jwt_access_token', access_token);
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    } 
    else {
      localStorage.removeItem('jwt_access_token');
      delete axios.defaults.headers.common.Authorization;
    }
  };

  logout = () => {
    this.setSession(null);
    this.emit('onLogout', 'Logged out');
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    
    this.signInWithToken().then(_ => {
      return true;
    }).catch(error => {
      return false;
    })    
  };

  getAccessToken = () => {
    return window.localStorage.getItem('jwt_access_token');
  };
}

const instance = new JwtService();

export default instance;
