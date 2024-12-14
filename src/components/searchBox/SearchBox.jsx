import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SvgSearch } from '../../svg/SVGFiles';

function SearchBox({ placeholder, field }) {
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const [keyword, setKeyword] = useState(query.get(field) || '');

  const handleSearch = () => {
    if (keyword === '') {
      navigate('/page=1');
    }
    navigate(`?page=1&name=${keyword}`);
  };

  const keyDownHandler = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <label className="searchbar mobile-disappear">
      <div className="searchbar__svg svg-box" onClick={handleSearch}>
        {SvgSearch}
      </div>
      <input
        type="text"
        autoComplete="off"
        placeholder={placeholder}
        onKeyDown={keyDownHandler}
        onChange={(event) => setKeyword(event.target.value)}
        value={keyword}
      />
    </label>
  );
}

export default SearchBox;
