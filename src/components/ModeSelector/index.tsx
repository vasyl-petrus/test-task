import React from 'react';

interface Props {
  onSelect: (url: string) => void;
}

export default (props: Props) => {
  const smallUrl = `http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`;
  const bigUrl = `http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`;

  return (
    <section className="center">
      <button
        onClick={() => props.onSelect(smallUrl)}
        className="btn btn-success"
      >
        32 items
      </button>
      <button onClick={() => props.onSelect(bigUrl)} className="btn btn-danger">
        1000 items
      </button>
    </section>
  );
};
