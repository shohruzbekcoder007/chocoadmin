import { sales } from 'src/utils/API_urls';
import axios, { headerConfig } from '../../../utils/baseUrl';

class SalesService {

    getSales = () => {
        return new Promise((resolve, reject) => {
            axios.get(sales, {
                headers: headerConfig(),
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }

    createSales = (data) => {
        return new Promise((resolve, reject) => {
            axios.post(sales, data, {
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

    deleteSales = (id) => {
        return new Promise((resolve, reject) => {
            axios.delete(`${sales}${id}`,{
                headers: headerConfig(),
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }
}

const instance = new SalesService();

export default instance;