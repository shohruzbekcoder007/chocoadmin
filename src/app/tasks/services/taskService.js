import axios, { headerConfig } from '../../../utils/baseUrl';
import TaskConfig from './taskConfig';

class TaskService {
    getProducts = (url_query) => {
        return new Promise((resolve, reject) => {
            axios.get(`${TaskConfig.product}${url_query}`, {
                headers: headerConfig(),
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }
}

const instance = new TaskService();

export default instance;