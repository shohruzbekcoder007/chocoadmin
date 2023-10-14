import { banner } from 'src/utils/API_urls';
import axios, { headerConfig } from '../../../utils/baseUrl';

class BrandService {
    getBanners = () => {
        return new Promise((resolve, reject) => {
            axios.get(banner, {
                headers: headerConfig(),
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }

    createBanner = (data) => {
        return new Promise((resolve, reject) => {
            axios.post(
                banner,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt_access_token")}`,
                        'Content-Type': 'multipart/form-data'
                      },
                }
            ).then((response) => {
                console.log(response)
                resolve(response)
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            });
        })
    }

    deleteBanner = (id) => {
        return new Promise((resolve, reject) => {
            axios.delete(`${banner}${id}`,{
                headers: headerConfig(),
            })
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
        })
    }

    getOneBanner = (id) => {
        return new Promise((resolve, reject) => {
            axios.get(`${banner}${id}`, {
                headers: headerConfig(),
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }

    updateBanner = (id, data) => {
        return new Promise((resolve, reject) => {
            axios.put(`${banner}${id}/`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt_access_token")}`,
                    'Content-Type': 'multipart/form-data'
                },
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }
}

const instance = new BrandService();

export default instance;