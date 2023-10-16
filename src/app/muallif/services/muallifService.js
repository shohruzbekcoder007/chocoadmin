import { author } from 'src/utils/API_urls';
import axios, { headerConfig } from '../../../utils/baseUrl';

class muallifService {

    getMuallif = (page) => {
        return new Promise((resolve, reject) => {
            axios.get(`${author}?page=${page}`, {
                headers: headerConfig(),
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }

    createMuallif = (data) => {
        return new Promise((resolve, reject) => {
            axios.post(
                author,
                data,
                {
                    headers: headerConfig(),
                }
            ).then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            });
        })
    }

    deleteMuallif = (id) => {
        return new Promise((resolve, reject) => {
            axios.delete(`${author}${id}`,{
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

    getOneMuallif = (id) => {
        return new Promise((resolve, reject) => {
            axios.get(`${author}${id}`, {
                headers: headerConfig(),
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }

    updateMuallif = (id, data) => {
        return new Promise((resolve, reject) => {
            axios.put(`${author}${id}/`, data, {
                headers: headerConfig(),
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }

}

const instance = new muallifService();

export default instance;