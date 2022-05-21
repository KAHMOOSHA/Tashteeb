import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import ProductTable from './Table';
import DashboardModal from './Modal';
import { Context } from '../../Context/ProductContext';

function ProductList() {
  const { setProducts } = useContext(Context);
  useEffect(() => {
    axios.get('/products').then((res) => {
      const result = res.data.product.rows.map((item) => {
        const {
          id, name, price, category,
        } = item;
        return {
          key: id,
          id,
          name,
          price,
          category,
        };
      });
      setProducts(result);
    });
  }, []);
  return (
    <section className="dashboard-product-list">
      <div className="add-product-btn">
        <DashboardModal title="Add Product " />
      </div>
      <ProductTable />
    </section>
  );
}

export default ProductList;
