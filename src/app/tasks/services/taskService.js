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

    getCategory = (product_type) => {
        return new Promise((resolve, reject) => {
            axios.get(`${TaskConfig.category}?product_type=${product_type}`, {
                headers: headerConfig(),
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }

    getSizes = () => {
        return new Promise((resolve, reject) => {
            axios.get(TaskConfig.size, {
                headers: headerConfig(),
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }

    getAdvertisement = () => {
        return new Promise((resolve, reject) => {
            axios.get(TaskConfig.advertisement, {
                headers: headerConfig(),
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }

    getBannerList = () => {
        return new Promise((resolve, reject) => {
            axios.get(TaskConfig.banner, {
                headers: headerConfig(),
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }

    createProduct = (data) => {
        return new Promise((resolve, reject) => {
            axios.post(
                TaskConfig.product,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt_access_token")}`,
                        "Content-Type": "multipart/form-data"
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

    getColors = () => {
        return new Promise((resolve, reject) => {
            axios.get(TaskConfig.color, {
                headers: headerConfig(),
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }

    getBrandList = (product_type) => {
        return new Promise((resolve, reject) => {
            axios.get(`${TaskConfig.brand}?product_type=${product_type}`, {
                headers: headerConfig(),
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }

    getDiscountList = () => {
        return new Promise((resolve, reject) => {
            axios.get(TaskConfig.sales, {
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