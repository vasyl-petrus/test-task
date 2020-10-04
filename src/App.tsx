import React, { Component } from 'react';
import _ from 'lodash';
import ReactPaginate from 'react-paginate';
import { Data, DataDetails } from './interfaces/Data';
import Loader from './components/Loader';
import Table from './components/Table';
import DetailRowInfo from './components/DetailRowInfo';
import ModeSelector from './components/ModeSelector';
import Search from './components/Search';

interface Props {}
interface State {
  data: Data[];
  isLoading: boolean;
  sortDirection: string;
  sortedField: string;
  row: DataDetails | null;
  isModeSelected: boolean;
  currentPage: number;
  search: string;
}

export class App extends Component<Props, State> {
  state = {
    data: [],
    isLoading: true,
    sortDirection: 'asc',
    sortedField: '',
    row: null,
    isModeSelected: false,
    currentPage: 0,
    search: ''
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
    debugger;
    this.setState({
      data: orderedData,
      isLoading: false,
      sortedField: field,
      sortDirection: sortType
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

  handlePageChange = (props: { selected: number }) => {
    this.setState({
      currentPage: props.selected
    });
  };

  searchHandler = (search: string) => {
    this.setState({ search, currentPage: 0 });
  };

  getFilteredData = () => {
    const { data, search } = this.state;
    if (!search) {
      return data;
    }

    return data.filter((item: Data) => {
      return (
        item['firstName'].toLowerCase().includes(search.toLowerCase()) ||
        item['lastName'].toLowerCase().includes(search.toLowerCase()) ||
        item['email'].toLowerCase().includes(search.toLowerCase())
      );
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
    const filteredData = this.getFilteredData();
    const pageCount = Math.ceil(filteredData.length / pageSize);
    const displayData = _.chunk(filteredData, pageSize)[currentPage];

    if (!isModeSelected) {
      return (
        <div className="container">
          <ModeSelector onSelect={this.selectMode} />
        </div>
      );
    }

    return (
      <main className="container-fluid">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Search onSearch={this.searchHandler} />
            <Table
              data={displayData}
              onSort={this.onSort}
              onSelectRow={this.onSelectRow}
              sortDirection={sortDirection}
              sortedField={sortedField}
            />
          </>
        )}
        {data.length > pageSize ? (
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pageCount}
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
