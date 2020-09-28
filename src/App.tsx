import React, { useState } from 'react';
import _ from 'lodash';
import ReactPaginate from 'react-paginate';
import { Data, DataDetails } from './interfaces/Data';
import Loader from './components/Loader';
import Table from './components/Table';
import DetailRowInfo from './components/DetailRowInfo';
import ModeSelector from './components/ModeSelector';

const App = () => {
  const [data, setData] = useState<Data[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortedField, setSortedField] = useState('');
  const [row, setRow] = useState<DataDetails | null>(null);
  const [isModeSelected, setMode] = useState(false);

  const fetchData = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();

    setData(data);
    setIsLoading(false);
  };

  const onSort = (field: string) => {
    const dataForSorting = data.concat();
    const sortType = sortDirection === 'asc' ? 'desc' : 'asc';
    const orderedData = _.orderBy(dataForSorting, field, sortType);

    setData(orderedData);
    setSortedField(field);
    setSortDirection(sortType);
  };

  const onSelectRow = (row: DataDetails) => {
    setRow(row);
  };

  const selectMode = (url: string) => {
    setMode(true);
    setIsLoading(true);
    fetchData(url);
  };

  if (!isModeSelected) {
    return (
      <div className="container">
        <ModeSelector onSelect={selectMode} />
      </div>
    );
  }

  return (
    <main className="container">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          aria-label="search"
          aria-describedby="basic-addon2"
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button">
            Search
          </button>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <Table
          data={data}
          onSort={onSort}
          onSelectRow={onSelectRow}
          sortDirection={sortDirection}
          sortedField={sortedField}
        />
      )}
      {row && <DetailRowInfo rowData={row} />}
    </main>
  );
};

export default App;
