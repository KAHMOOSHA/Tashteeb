import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Component/Home';
import ProductDetailes from './Component/ProductDetailes';
import NotFoundPage from './Pages/NotFound';
import { ProvideAuth } from './Context/AuthContext';
import EngineerPage from './Pages/EngineerPage';
import Cart from './Pages/Cart';

function App() {
  return (
    <div className="App">
      <ProvideAuth>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/info" element={<ProductDetailes />} />
            <Route path="/eng" element={<EngineerPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </ProvideAuth>
    </div>
  );
}
export default App;
