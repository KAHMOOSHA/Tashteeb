import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PropTypes } from 'prop-types';
import ProductCard from '../products/productCard';
import './style.css';

function RelatedProducts({ categoryId }) {
  const [info, setInfo] = useState([]);
  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    const fetchData = async () => {
      const datares = await axios.get(`/category/${categoryId}/products`, {
        cancelToken: source.token,
      });
      setInfo(datares.data);
    };
    fetchData();
    return () => source.cancel();
  }, []);
  return (
    <div className="related-products">
      { info.length ? (
        <div className="RelatedProducts">
          <h4> Related Products </h4>
          <div className="RelatedProducts-container">
            {info.map((item) => (
              <ProductCard
                id={item.id}
                price={item.price}
                name={item.name}
                image={item.image}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>

  );
}
RelatedProducts.propTypes = {
  categoryId: PropTypes.number.isRequired,
};

export default RelatedProducts;