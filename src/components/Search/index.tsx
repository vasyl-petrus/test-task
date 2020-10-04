import React, { useState } from 'react';

interface Props {
  onSearch: (search: string) => void;
}

export default (props: Props) => {
  const [value, setValue] = useState('');
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className="input-group mb-3 mt-3">
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
