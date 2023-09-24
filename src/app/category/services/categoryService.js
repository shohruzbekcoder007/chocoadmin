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

    createCategort = (data) => {
        return new Promise((resolve, reject) => {
            axios.post(
                categoryConfig.category,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt_access_token")}`,
                        'Content-Type': 'multipart/form-data'
                      },
                }
            ).then((response) => {
                console.log(response)
                resolve(response)
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            });
        })
        
    }
}

const instance = new CategoryService();

export default instance;