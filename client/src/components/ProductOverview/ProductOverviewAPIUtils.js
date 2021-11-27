import axios from 'axios';

export default {
  async getProductAndStyles(id) {
    const product = await axios.get(`/api/products/${id}`);
    const styles = await axios.get(`/api/products/${id}/styles`);

    styles.data.results.forEach(style => {
      let output = [];

      for (let sku in style.skus) {
        output.push(style.skus[sku]);
      }

      style.skus = output;
    });

    let output = { product, styles };

    return output;
  }
};