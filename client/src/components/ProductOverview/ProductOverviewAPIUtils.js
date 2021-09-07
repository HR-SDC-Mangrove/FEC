import axios from 'axios';
// import { response } from 'express';

export default {
  getProductAndStyles(id) {

    return new Promise((resolve, reject) => {
      axios.get(`/api/products/${id}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {});
    });
  },
  // getReviews(id) {
  //   return new Promise((resolve, reject) => {
  //     axios
  //       .get(`/api/reviews/${id}/relevence`)
  //       .then(response => {
  //         resolve(response.data);
  //       })
  //       .catch(err => {
  //         reject(err);
  //       });
  //   });
  // },

  // sendClickData(clickData) {
  //   return axios.post('/api/interactions/clickData', clickData);
  // },
};

//old routes
// getProduct(id) {
//   return new Promise((resolve, reject) => {
//     axios
//       .get(`/api/products/${47422}`)
//       .then(response => {
//         resolve(response.data);
//       })
//       .catch(err => {
//         reject(err);
//       });
//   });
// },

// getProductStyles(id) {
//   return new Promise((resolve, reject) => {
//     axios
//       .get(`/api/products/${47422}/styles`)
//       .then(response => {
//         resolve(response.data);
//       })
//       .catch(err => {
//         reject(err);
//       });
//   });
// },
