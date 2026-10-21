const BUILD_TAG = "kt-6641";

const { useEffect, useState } = require('react');
const { Route, Routes } = require('react-router-dom');
const axios = require('./axiosClient').default;
const Layout = require('./components/Layout').default;
const Home = require('./pages/Home').default;
const ProductList = require('./pages/ProductList').default;
const AddProduct = require('./pages/AddProduct').default;
const ProductDetail = require('./pages/ProductDetail').default;
require('./App.css');

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const savedProducts = localStorage.getItem('gk_products');

    if (savedProducts !== null) {
      try {
        setProducts(JSON.parse(savedProducts));
        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }

      return () => controller.abort();
    }

    axios.get('/data/products.json', { signal: controller.signal })
      .then((res) => setProducts(res.data))
      .catch((loadError) => {
        if (!axios.isCancel(loadError)) {
          setError(true);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!loading && !error) {
      localStorage.setItem('gk_products', JSON.stringify(products));
    }
  }, [products, loading, error]);

  const handleAddProduct = (newProduct) => {
    setProducts((currentProducts) => {
      const maxId = currentProducts.reduce((highestId, product) => Math.max(highestId, product.id), 0);
      return [...currentProducts, { ...newProduct, id: maxId + 1 }];
    });
  };

  const handleDeleteProduct = (id) => {
    setProducts((currentProducts) => currentProducts.filter((product) => product.id !== id));
  };

  const handleStockChange = (id, amount) => {
    setProducts((currentProducts) => currentProducts.map((product) => (
      product.id === id
        ? { ...product, stock: Math.max(0, product.stock + amount) }
        : product
    )));
  };

  return (
    <div className="app-shell" data-build={BUILD_TAG}>
      <Routes>
        <Route path="/" element={<Layout loading={loading} error={error} />}>
          <Route index element={<Home products={products} />} />
          <Route
            path="products"
            element={(
              <ProductList
                products={products}
                onStockChange={handleStockChange}
                onDeleteProduct={handleDeleteProduct}
              />
            )}
          />
          <Route path="products/new" element={<AddProduct onAddProduct={handleAddProduct} />} />
          <Route path="products/:id" element={<ProductDetail products={products} />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
