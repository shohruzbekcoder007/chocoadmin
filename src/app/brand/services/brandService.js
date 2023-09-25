import axios, { headerConfig } from '../../../utils/baseUrl';
import brandConfig from './brandConfig';

class BrandService {

    getBrand = () => {
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

}

const instance = new BrandService();

export default instance;