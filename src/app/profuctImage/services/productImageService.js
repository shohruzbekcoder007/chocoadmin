import { color, product_image } from 'src/utils/API_urls';
import axios, { headerConfig } from '../../../utils/baseUrl';

class ColorService {

    getProductImages = () => {
        return new Promise((resolve, reject) => {
            axios.get(product_image, {
                headers: headerConfig(),
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }

}

const instance = new ColorService();

export default instance;