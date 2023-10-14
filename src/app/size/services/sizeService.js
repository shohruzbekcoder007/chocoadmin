import { size } from '../../../utils/API_urls';
import axios, { headerConfig } from '../../../utils/baseUrl';

class SizeService {

    getSizes = () => {
        return new Promise((resolve, reject) => {
            axios.get(size, {
                headers: headerConfig(),
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }

    deleteSize = (id) => {
        return new Promise((resolve, reject) => {
            axios.delete(`${size}${id}`,{
                headers: headerConfig(),
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }

    createSize = (data) => {
        return new Promise((resolve, reject) => {
            axios.post(
                size,
                data,
                {
                    headers: headerConfig(),
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

    updateSize = (id, data) => {
        return new Promise((resolve, reject) => {
            axios.put(`${size}${id}/`, data, {
                headers: headerConfig(),
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }
}

const instance = new SizeService();

export default instance;