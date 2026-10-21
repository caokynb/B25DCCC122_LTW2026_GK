import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FilterBar from '../components/FilterBar';
import ProductTable from '../components/ProductTable';

const ProductList = ({ products, onStockChange, onDeleteProduct }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const clearingMessage = useRef(false);

  useEffect(() => {
    const incomingMessage = location.state?.message;

    if (incomingMessage) {
      setMessage(incomingMessage);
      clearingMessage.current = true;
      navigate('/products', { replace: true, state: null });
    } else if (clearingMessage.current) {
      clearingMessage.current = false;
    } else {
      setMessage('');
    }
  }, [location.key, location.pathname, location.state, navigate]);

  useEffect(() => {
    if (!message) {
      return undefined;
    }

    const timeout = setTimeout(() => setMessage(''), 3000);
    return () => clearTimeout(timeout);
  }, [message]);

  const handleQueryShift = (event) => setQuery(event.target.value);
  const handleCategoryChange = (event) => setCategory(event.target.value);
  const normalizedQuery = query.trim().toLowerCase();
  const filteredProducts = products.filter((product) => (
    product.name.toLowerCase().includes(normalizedQuery)
    && (category === 'all' || product.category === category)
  ));

  return (
    <section>
      <h1>Danh sách sản phẩm</h1>
      {message && (
        <div className="notice" role="status">
          <span>{message}</span>
          <button type="button" aria-label="Đóng thông báo" onClick={() => setMessage('')}>×</button>
        </div>
      )}
      <FilterBar
        query={query}
        category={category}
        onQueryChange={handleQueryShift}
        onCategoryChange={handleCategoryChange}
      />
      <p>Tìm thấy {filteredProducts.length} sản phẩm</p>
      <ProductTable
        products={filteredProducts}
        onStockChange={onStockChange}
        onDeleteProduct={onDeleteProduct}
      />
    </section>
  );
};

export default ProductList;
