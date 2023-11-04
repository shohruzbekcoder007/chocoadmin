import { variant } from '../../../utils/API_urls';
import axios, { headerConfig } from '../../../utils/baseUrl';

class SizeService {

    getVariants = () => {
        return new Promise((resolve, reject) => {
            axios.get(variant, {
                headers: headerConfig(),
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }

    getVariant = (id) => {
        return new Promise((resolve, reject) => {
            axios.get(`${variant}${id}`, {
                headers: headerConfig(),
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }

    deleteVariant = (id) => {
        return new Promise((resolve, reject) => {
            axios.delete(`${variant}${id}`,{
                headers: headerConfig(),
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }

    createVariant = (data) => {
        return new Promise((resolve, reject) => {
            axios.post(
                variant,
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

    updateVariant = (id, data) => {
        return new Promise((resolve, reject) => {
            axios.put(`${variant}${id}/`, data, {
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