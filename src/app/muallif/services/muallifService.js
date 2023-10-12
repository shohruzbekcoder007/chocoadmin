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

}

const instance = new muallifService();

export default instance;