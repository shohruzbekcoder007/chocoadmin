import { order } from 'src/utils/API_urls';
import axios, { headerConfig } from '../../../utils/baseUrl';

class OrderService {

    getOrders = (url_query) => {
        return new Promise((resolve, reject) => {
            axios.get(`${order}${url_query}`, {
                headers: headerConfig(),
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }

    updateOrder = (data) => {
        return new Promise((resolve, reject) => {
            axios.put(`${order}${id}/`, data, {
                headers: headerConfig(),
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }
}

const instance = new OrderService();

export default instance;