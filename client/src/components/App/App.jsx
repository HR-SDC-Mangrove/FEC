import React from 'react';
import '../../styles.scss';
import './App.scss';

import Header from '../Header/Header.jsx';
import RatingsAndReviews from '../Reviews/RatingsAndReviews.jsx';
import Stars from '../Reviews/Stars.jsx';
import ProductOverview from '../ProductOverview/ProductOverview.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: {}
    };
  }

  render() {
    return (
      <div className="wrapper">
        <Header currentProduct={this.state.currentProduct} />
        <RatingsAndReviews productId="28215"/>
        <ProductOverview />
      </div>
    );
  }
}

export default App;
