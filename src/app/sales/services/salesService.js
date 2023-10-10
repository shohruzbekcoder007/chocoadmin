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

}

const instance = new SalesService();

export default instance;