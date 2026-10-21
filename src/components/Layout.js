import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = ({ loading, error }) => (
  <div className="site-frame">
    <header className="site-header">
      <div className="site-brand">
        <p className="site-title">VĂN PHÒNG PHẨM</p>
        <p className="site-subtitle">SỔ THEO DÕI KHO</p>
      </div>
    </header>
    <NavBar />
    <main className="page-content">
      {loading ? <p>Đang tải...</p> : error ? <p>Không tải được dữ liệu.</p> : <Outlet />}
    </main>
  </div>
);

export default Layout;
