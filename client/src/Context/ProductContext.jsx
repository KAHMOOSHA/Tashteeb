/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const Context = createContext();
function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({});

  return (
    <Context.Provider
      value={{
        products,
        setProducts,
        form,
        setForm,
      }}
    >
      {children}
    </Context.Provider>
  );
}

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export { ProductProvider, Context };