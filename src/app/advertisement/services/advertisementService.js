import { advertisement } from 'src/utils/API_urls';
import axios, { headerConfig } from '../../../utils/baseUrl';

class AdvertisementService {
    getAdvertisementList = () => {
        return new Promise((resolve, reject) => {
            axios.get(advertisement, {
                headers: headerConfig(),
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }

    deleteAdvertisement = (id) => {
        return new Promise((resolve, reject) => {
            axios.delete(`${advertisement}${id}/`,{
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

    // createAdvertisement
    createAdvertisement = (data) => {
        return new Promise((resolve, reject) => {
            axios.post(
                advertisement,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt_access_token")}`,
                        'Content-Type': 'multipart/form-data'
                    },
                }
            ).then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            });
        })
    }

    updateAdvertisement = (id, data) => {
        return new Promise((resolve, reject) => {
            axios.put(`${advertisement}${id}/`, data, {
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

    getOneAdvertisement = (id) => {
        return new Promise((resolve, reject) => {
            axios.get(`${advertisement}${id}`, {
                headers: headerConfig(),
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }

}

const instance = new AdvertisementService();

export default instance;