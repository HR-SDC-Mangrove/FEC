const axios = require('axios');

const getProduct = (req, res) => {
  axios
    .get(`${process.env.OVERVIEW_URL}/products/${req.params.productId}`, {
      headers: {
        Authorization: process.env.TOKEN,
      },
    })
    .then(response => {
      res.json(response.data);
    })
    .catch(err => {
      console.error(err);
    });
};

const getProductStyles = (req, res) => {
  axios
    .get(`${process.env.OVERVIEW_URL}/products/${req.params.productId}/styles`, {
      headers: {
        Authorization: process.env.TOKEN,
      },
    })
    .then(response => {
      res.json(response.data);
    })
    .catch(err => {
      console.error(err);
    });
};

module.exports = {
  getProduct,
  getProductStyles,
};
