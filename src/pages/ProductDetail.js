import { useNavigate, useParams } from 'react-router-dom';
import { formatMoney } from '../data';

const ProductDetail = ({ products }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = Number(id);
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return <p>Không tìm thấy sản phẩm.</p>;
  }

  return (
    <section>
      <h1>Chi tiết sản phẩm</h1>
      <p>Tên sản phẩm: {product.name}</p>
      <p>Danh mục: {product.category}</p>
      <p>Giá: {formatMoney(product.price)}</p>
      <p>Tồn kho: {product.stock}</p>
      <button type="button" onClick={() => navigate(-1)}>Quay lại</button>
    </section>
  );
};

export default ProductDetail;
