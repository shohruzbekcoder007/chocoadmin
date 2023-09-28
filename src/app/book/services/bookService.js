import axios, { headerConfig } from '../../../utils/baseUrl';
import bookConfig from './bookConfig';

class BrandService {
    getBrands = () => {
        return new Promise((resolve, reject) => {
            axios.get(bookConfig.book, {
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