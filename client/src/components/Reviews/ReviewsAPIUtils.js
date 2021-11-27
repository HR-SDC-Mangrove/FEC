import axios from 'axios';

export default {
  getProductReviews: async (productId, sortMethod) => {
    return await axios.get(`/api/reviews/${productId}/${sortMethod}`);
  },

  getProductMeta: async (productId) => {
    return await axios.get(`/api/reviews/meta/${productId}`);
  },

  sendHelpful: (reviewId) => {
    return axios.put(`/api/reviews/${reviewId}/helpful`)
      .then(res => {
        return res;
      })
      .catch(err => {
        alert('You have already marked this review as Helpful');
        return err;
      });
  },

  reportReview: (reviewId) => {
    return axios.put(`/api/reviews/${reviewId}/report`)
      .then(res => {
        return res;
      })
      .catch(err => {
        return err;
      });
  },

  submitFormData: (formData, config) => {
    return axios.post('/api/reviews', formData, config);
  },

  sendClickData: (clickData) => {
    return axios.post('/api/interactions/clickData', clickData);
  },

  getProductName: async (productId) => {
    return await axios.get(`/api/questions/productName/${productId}`);
  }
};
