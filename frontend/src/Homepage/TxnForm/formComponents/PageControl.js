import React, { useState } from 'react';
import "./styles/PageControl.css"

const PageControl = ({ setPageSize }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue) {
      setPageSize(Number(inputValue));
      setInputValue(''); 
    }
  };

  return (
    <div className="page-control-main">
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          className="page-size-input"
          placeholder="Enter page size"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          min="1"
        />
        <button type="submit" className="pagination-button">
          Set Page Size
        </button>
      </form>
    </div>
  );
};

export default PageControl;
