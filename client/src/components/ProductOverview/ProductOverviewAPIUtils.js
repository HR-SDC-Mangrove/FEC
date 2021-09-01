import axios from 'axios';

export default {
  getProductAndStyles(id) {
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:3000/products/product_id=${id}`)
        .then((response) => {

          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getProduct(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/api/products/${47422}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  getProductStyles(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/api/products/${47422}/styles`)
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  getReviews(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/api/reviews/${id}/relevence`)
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  sendClickData(clickData) {
    return axios.post('/api/interactions/clickData', clickData);
  },
};
