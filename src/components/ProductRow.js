import { Link } from 'react-router-dom';
import { formatMoney } from '../data';

const ProductRow = ({ product, onStockChange, onDeleteProduct }) => {
  const { id, name, category, price, stock } = product;

  return (
    <tr>
      <td><Link to={`/products/${id}`}>{name}</Link></td>
      <td>{category}</td>
      <td>{formatMoney(price)}</td>
      <td className={stock < 5 ? 'low-stock' : ''}>{stock}</td>
      <td className="actions">
        <button
          type="button"
          aria-label={`Nhập thêm 1 sản phẩm ${name}`}
          onClick={() => onStockChange(id, 1)}
        >+</button>
        <button
          type="button"
          aria-label={`Xuất 1 sản phẩm ${name}`}
          onClick={() => onStockChange(id, -1)}
          disabled={stock === 0}
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
