import { CATEGORIES } from '../data';

const FilterBar = ({ query, category, onQueryChange, onCategoryChange }) => (
  <div className="filter-bar">
    <div className="field">
      <label htmlFor="product-query">Tìm kiếm</label>
      <input
        id="product-query"
        type="text"
        value={query}
        onChange={onQueryChange}
        placeholder="Tìm kiếm theo tên sản phẩm"
      />
    </div>
    <div className="field">
      <label htmlFor="product-category-filter">Danh mục</label>
      <select
        id="product-category-filter"
        value={category}
        onChange={onCategoryChange}
      >
        <option value="all">Tất cả</option>
        {CATEGORIES.map((item) => <option key={item} value={item}>{item}</option>)}
      </select>
    </div>
  </div>
);

export default FilterBar;
