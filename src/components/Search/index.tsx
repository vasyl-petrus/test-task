import React, { useState } from 'react';

export default (props: any) => {
  const [value, setValue] = useState('');
  const changeHandler = (e: any) => {
    setValue(e.target.value);
  };
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Recipient's username"
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
        value={value}
        onChange={changeHandler}
      />
      <div className="input-group-append">
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={() => props.onSearch(value)}
        >
          Search
        </button>
      </div>
    </div>
  );
};
