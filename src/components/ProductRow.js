import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatMoney } from '../data';

const ProductRow = ({ product, onStockChange, onDeleteProduct }) => {
  const { id, name, category, price, stock } = product;
  const [quantityChange, setQuantityChange] = useState(1);
  const validQuantity = Number.isInteger(quantityChange) && quantityChange > 0;

  return (
    <tr>
      <td><Link to={`/products/${id}`}>{name}</Link></td>
      <td>{category}</td>
      <td>{formatMoney(price)}</td>
      <td className={stock < 5 ? 'low-stock' : ''}>{stock}</td>
      <td className="actions">
        <div className="quantity-control">
          <label className="visually-hidden" htmlFor={`quantity-${id}`}>Số lượng nhập hoặc xuất</label>
          <input
            id={`quantity-${id}`}
            type="number"
            min="1"
            step="1"
            value={quantityChange}
            onChange={(event) => setQuantityChange(event.target.value === '' ? '' : Number(event.target.value))}
          />
        </div>
        <button
          type="button"
          aria-label={`Nhập thêm ${quantityChange || 0} sản phẩm ${name}`}
          onClick={() => onStockChange(id, quantityChange)}
          disabled={!validQuantity}
        >+</button>
        <button
          type="button"
          aria-label={`Xuất ${quantityChange || 0} sản phẩm ${name}`}
          onClick={() => onStockChange(id, -quantityChange)}
          disabled={stock === 0 || !validQuantity || quantityChange > stock}
        >-</button>
        <button
          type="button"
          className="delete-button"
          aria-label={`Xóa sản phẩm ${name}`}
          onClick={() => onDeleteProduct(id)}
        >Xóa</button>
      </td>
    </tr>
  );
};

export default ProductRow;
