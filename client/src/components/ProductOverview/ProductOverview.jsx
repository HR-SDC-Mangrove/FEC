import React from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineCheck, AiOutlineStar } from 'react-icons/ai';
import { MdFullscreen } from 'react-icons/md';
import API from './ProductOverviewAPIUtils.js';
import { map } from 'lodash';
import helpers from '../../helpers.js';

import Stars from '../Stars/Stars.jsx';
import CustomSelect from './CustomSelect.jsx';
import ProductImage from './ProductImage.jsx';
import ProductDetails from './ProductDetails.jsx';
import ProductExtra from './ProductExtra.jsx';
import Tracked from './ClickTracker.jsx';

import '../../styles.scss';
import './ProductOverview.scss';

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      productStyles: {},
      selectedStyle: '',
      selectedSku: null,
      reviews: {},
      images: [],
      fullscreen: false,
      selectedQuantity: 0,
    };

    this.onChange = this.onChange.bind(this);
    this.changeSku = this.changeSku.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
  }

  async componentDidMount() {
    await API.getProductAndStyles(this.props.productId)
      .then(response => {
        this.setState({
          product: response.product.data,
          productStyles: response.styles.data.results,
          selectedStyle: response.styles.data.results[0],
          selectedSku: null,
          images: response.styles.data.results[0].photos,
          currentImageUrl: response.styles.data.results[0].photos[0].url,
        });
      })
      .catch(err=> {
        console.log(err);
      });
  }

  onChange(key, val) {
    this.setState({
      [key]: val,
    });
  }

  changeSku(skuId) {
    let sku = map(this.state.selectedStyle.skus, (sku, key) => {
      sku.sku_id = key;
      return sku;
    }).find(sku => sku.sku_id === skuId);

    this.setState({
      selectedSku: sku,
      selectedQuantity: sku?.quantity > 0 ? 1 : '',
    });
  }

  changeStyle(styleId) {
    let style = this.state.productStyles.results.find(result => result.style_id === styleId);
    let skus = map(style.skus, (sku, key) => {
      sku.sku_id = key;
      return sku;
    });

    this.setState({
      selectedStyle: style,
      selectedSku: null,
      images: [...style.photos],
      currentImageUrl: style.photos[0].url,
      selectedQuantity: 0,
    });
  }

  toggleFullScreen() {
    this.setState({
      fullscreen: !this.state.fullscreen,
    });
  }

  render() {
    return (
      <div id='product-overview'>
        <div id='announcement-banner'>
          <p className='light'>
            <i>Site-wide announcement message!</i> -- sale / discount <b>offer</b> -- <u>new product highlight</u>
          </p>
        </div>

        <div id='product-main' className={`${this.state.fullscreen ? 'fullscreen' : ''}`}>
          <ProductImage
            data={{
              currentImageUrl: this.state.currentImageUrl,
              images: this.state.images,
              fullscreen: this.state.fullscreen,
            }}
            methods={{
              toggleFullScreen: this.toggleFullScreen,
              onChange: this.onChange,
            }}
          />
          <ProductDetails
            data={{
              reviews: this.state.reviews,
              product: this.state.product,
              productStyles: this.state.productStyles,
              selectedSku: this.state.selectedSku,
              selectedStyle: this.state.selectedStyle,
              productStyles: this.state.productStyles,
              selectedQuantity: this.state.selectedQuantity,
            }}
            methods={{
              addToBag: this.props.addToBag,
              onChange: this.onChange,
              changeSku: this.changeSku,
              changeStyle: this.changeStyle,
            }}
          />
        </div>

        <div id='product-extra'>
          <ProductExtra product={this.state.product} />
        </div>
      </div>
    );
  }
}

export default ProductOverview;
export const tracked = Tracked(ProductOverview, 'ProductOverview');
