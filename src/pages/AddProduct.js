import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data';

const AddProduct = ({ onAddProduct }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim() || !category || price === '' || stock === '') {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    if (!Number.isFinite(price) || price <= 0 || !Number.isInteger(stock) || stock < 0) {
      setError('Giá phải lớn hơn 0, số lượng là số nguyên không âm');
      return;
    }

    const newName = name.trim();
    const message = `Đã thêm sản phẩm ${newName}`;
    onAddProduct({ name: newName, category, price: Number(price), stock: Number(stock) });
    navigate('/products', { replace: true, state: { message } });
  };

  return (
    <section>
      <h1>Thêm sản phẩm</h1>
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="product-name">Tên sản phẩm</label>
          <input
            id="product-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="product-category">Danh mục</label>
          <select
            id="product-category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {CATEGORIES.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="product-price">Giá</label>
          <input
            id="product-price"
            type="number"
            min="0"
            value={price}
            onChange={(event) => setPrice(event.target.value === '' ? '' : Number(event.target.value))}
          />
        </div>
        <div className="field">
          <label htmlFor="product-stock">Số lượng tồn</label>
          <input
            id="product-stock"
            type="number"
            min="0"
            step="1"
            value={stock}
            onChange={(event) => setStock(event.target.value === '' ? '' : Number(event.target.value))}
          />
        </div>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button type="submit">Thêm</button>
      </form>
    </section>
  );
};

export default AddProduct;
