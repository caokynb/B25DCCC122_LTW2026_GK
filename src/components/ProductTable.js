import ProductRow from './ProductRow';

const ProductTable = ({ products, onStockChange, onDeleteProduct }) => (
  <div className="table-wrap">
    <table className="product-table">
      <thead>
        <tr>
          <th>Tên sản phẩm</th>
          <th>Danh mục</th>
          <th>Giá</th>
          <th>Tồn kho</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {products.length > 0 ? products.map((product) => (
          <ProductRow
            key={product.id}
            product={product}
            onStockChange={onStockChange}
            onDeleteProduct={onDeleteProduct}
          />
        )) : (
          <tr>
            <td colSpan="5" className="empty-row">Không có dữ liệu.</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default ProductTable;
