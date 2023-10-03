import { color } from 'src/utils/API_urls';
import axios, { headerConfig } from '../../../utils/baseUrl';

class ColorService {

    getColors = () => {
        return new Promise((resolve, reject) => {
            axios.get(color, {
                headers: headerConfig(),
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }

    deleteColor = (id) => {
        return new Promise((resolve, reject) => {
            axios.delete(`${color}${id}`,{
                headers: headerConfig(),
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }

    createColor = (data) => {
        return new Promise((resolve, reject) => {
            axios.post(
                color,
                data,
                {
                    headers: headerConfig(),
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

    getOneColor = () => {
        return new Promise((resolve, reject) => {
            axios.get(`${color}${id}`, {
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