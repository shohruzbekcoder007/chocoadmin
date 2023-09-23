import axios from '../../../utils/baseUrl';
import categoryConfig from './categoryConfig';

class CategoryService {
    constructor(){
        
    }

    getCategory = () => {
        return new Promise((resolve, reject) => {
            axios.get(categoryConfig.category).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }
}

const instance = new CategoryService();

export default instance;