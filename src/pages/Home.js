import { formatMoney } from '../data';

const Home = ({ products }) => {
  const lowStockCount = products.filter((product) => product.stock < 5).length;
  const totalStockValue = products.reduce((total, product) => total + product.price * product.stock, 0);

  return (
    <section>
      <h1>Kho hàng</h1>
      <p>Tổng số sản phẩm: {products.length}</p>
      <p>Số sản phẩm sắp hết hàng: {lowStockCount}</p>
      <p>Tổng giá trị kho: {formatMoney(totalStockValue)}</p>
    </section>
  );
};

export default Home;
