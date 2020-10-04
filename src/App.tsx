import React, { Component } from 'react';
import _ from 'lodash';
import ReactPaginate from 'react-paginate';
import { Data, DataDetails } from './interfaces/Data';
import Loader from './components/Loader';
import Table from './components/Table';
import DetailRowInfo from './components/DetailRowInfo';
import ModeSelector from './components/ModeSelector';

interface Props {}
interface State {
  data: Data[];
  isLoading: boolean;
  sortDirection: string;
  sortedField: string;
  row: DataDetails | null;
  isModeSelected: boolean;
}

export class App extends Component<Props, State> {
  state = {
    data: [],
    isLoading: true,
    sortDirection: 'asc',
    sortedField: '',
    row: null,
    isModeSelected: false
  };

  fetchData = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      data,
      isLoading: false
    });
  };

  onSort = (field: string) => {
    const { data, sortDirection } = this.state;
    const dataForSorting = data.concat();
    const sortType = sortDirection === 'asc' ? 'desc' : 'asc';
    const orderedData = _.orderBy(dataForSorting, field, sortType);
    this.setState({
      data: orderedData,
      isLoading: false,
      sortedField: field,
      sortDirection
    });
  };

  onSelectRow = (row: DataDetails) =>
    this.setState({
      row
    });

  selectMode = (url: string) => {
    this.setState({
      isLoading: true,
      isModeSelected: true
    });

    this.fetchData(url);
  };

  render() {
    const {
      row,
      data,
      isLoading,
      sortedField,
      sortDirection,
      isModeSelected
    } = this.state;

    if (!isModeSelected) {
      return (
        <div className="container">
          <ModeSelector onSelect={this.selectMode} />
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
            onSort={this.onSort}
            onSelectRow={this.onSelectRow}
            sortDirection={sortDirection}
            sortedField={sortedField}
          />
        )}
        {row && <DetailRowInfo rowData={row} />}
      </main>
    );
  }
}

export default App;
