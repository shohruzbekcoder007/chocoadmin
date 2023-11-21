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

    getSizes = (product_type) => {
        return new Promise((resolve, reject) => {
            axios.get(`${TaskConfig.size}?product_type=${product_type}`, {
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

    getOneProduct = (id) => {
        return new Promise((resolve, reject) => {
            axios.get(`${TaskConfig.product}${id}`, {
                headers: headerConfig(),
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }

    updateProduct = (id, data) => {
        return new Promise((resolve, reject) => {
            axios.patch(`${TaskConfig.product}${id}/`, data, {
                headers: headerConfig(),
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }

    deleteProduct = (id) => {
        return new Promise((resolve, reject) => {
            axios.delete(`${TaskConfig.product}${id}/`, {
                headers: headerConfig(),
            })
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
        })
    }

    getProductImages = (id) => {
        return new Promise((resolve, reject) => {
            axios.get(`${TaskConfig.product}${id}/images/`, {
                headers: headerConfig(),
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }

    createProductImage = (data) => {
        return new Promise((resolve, reject) => {
            axios.post(
                TaskConfig.product_image,
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

    removeImage = (id) => {
        return new Promise((resolve, reject) => {
            axios.delete(`${TaskConfig.product_image}${id}/`, {
                headers: headerConfig(),
            })
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
        })
    }

    // author

    getAuthors = () => {
        return new Promise((resolve, reject) => {
            axios.get(`${TaskConfig.author}?page_size=1000`, {
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