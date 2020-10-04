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
  currentPage: number;
}

export class App extends Component<Props, State> {
  state = {
    data: [],
    isLoading: true,
    sortDirection: 'asc',
    sortedField: '',
    row: null,
    isModeSelected: false,
    currentPage: 0
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

  handlePageChange = (props: any) => {
    console.log(props.selected);

    this.setState({
      currentPage: props.selected
    });
  };

  render() {
    const {
      row,
      data,
      isLoading,
      sortedField,
      sortDirection,
      isModeSelected,
      currentPage
    } = this.state;
    const pageSize = 50;
    const pageCount = 100;
    const displayData = _.chunk(data, pageSize)[currentPage];
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
            data={displayData}
            onSort={this.onSort}
            onSelectRow={this.onSelectRow}
            sortDirection={sortDirection}
            sortedField={sortedField}
          />
        )}
        {data.length > pageSize ? (
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={20}
            forcePage={currentPage}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageChange}
            containerClassName={'pagination'}
            activeClassName={'active'}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            nextClassName="page-item"
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
          />
        ) : null}
        {row && <DetailRowInfo rowData={row} />}
      </main>
    );
  }
}

export default App;
