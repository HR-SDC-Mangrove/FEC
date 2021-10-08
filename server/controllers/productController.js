const axios = require('axios');

// const getProductAndStyles = (req, res) => {
//   axios.get(`http://localhost:3101/products/product_id=${req.params.productId}`)
//     .then((response) => {

//       res.json(response.data);
//     })
//     .catch(err => {
//       // reject(err);
//       console.log(err);
//     });
// };

// module.exports = {
//   getProductAndStyles
// };

const getProduct = (req, res) => {
  axios
    .get(`${process.env.OVERVIEW_URL}/id=${req.params.productId}`, {
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
    .get(`${process.env.OVERVIEW_URL}/id=${req.params.productId}/styles`, {
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
