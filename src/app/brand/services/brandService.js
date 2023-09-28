import axios, { headerConfig } from '../../../utils/baseUrl';
import brandConfig from './brandConfig';

class BrandService {

    getBrands = () => {
        return new Promise((resolve, reject) => {
            axios.get(brandConfig.brand, {
                headers: headerConfig(),
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }

    deleteBrand = (id) => {
        return new Promise((resolve, reject) => {
            axios.delete(`${brandConfig.brand}${id}`,{
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

    createBrand = (data) => {
        return new Promise((resolve, reject) => {
            axios.post(
                brandConfig.brand,
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

    getOneBrand = (id) => {
        return new Promise((resolve, reject) => {
            axios.get(`${brandConfig.brand}${id}`, {
                headers: headerConfig(),
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }

    updateBrand = (id, data) => {
        return new Promise((resolve, reject) => {
            axios.put(`${brandConfig.brand}${id}/`, data, {
                headers: headerConfig(),
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