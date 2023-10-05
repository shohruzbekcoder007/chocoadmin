import { banner } from 'src/utils/API_urls';
import axios, { headerConfig } from '../../../utils/baseUrl';

class BrandService {
    getBanners = () => {
        return new Promise((resolve, reject) => {
            axios.get(banner, {
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