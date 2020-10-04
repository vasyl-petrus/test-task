import React from 'react';
import { Data } from '../../interfaces/Data';

interface Props {
  data: Data[];
  sortedField: string;
  sortDirection: string;
  onSort: (field: string) => void;
  onSelectRow: (row: Data) => void;
}

export default (props: Props) => (
  <table className="table">
    <thead className="thead-dark">
      <tr>
        <th onClick={() => props.onSort('id')}>
          {props.sortedField === 'id'
            ? (props.sortDirection === 'desc' && <span>&darr; </span>) ||
              (props.sortDirection === 'asc' && <span>&uarr; </span>)
            : null}
          ID
        </th>
        <th onClick={() => props.onSort('firstName')}>
          {props.sortedField === 'firstName'
            ? (props.sortDirection === 'desc' && <span>&darr; </span>) ||
              (props.sortDirection === 'asc' && <span>&uarr; </span>)
            : null}
          First Name
        </th>
        <th onClick={() => props.onSort('lastName')}>
          {props.sortedField === 'lastName'
            ? (props.sortDirection === 'desc' && <span>&darr; </span>) ||
              (props.sortDirection === 'asc' && <span>&uarr; </span>)
            : null}
          Last Name
        </th>
        <th onClick={() => props.onSort('email')}>
          {props.sortedField === 'email'
            ? (props.sortDirection === 'desc' && <span>&darr; </span>) ||
              (props.sortDirection === 'asc' && <span>&uarr; </span>)
            : null}
          Email
        </th>
        <th onClick={() => props.onSort('phone')}>
          {props.sortedField === 'phone'
            ? (props.sortDirection === 'desc' && <span>&darr; </span>) ||
              (props.sortDirection === 'asc' && <span>&uarr; </span>)
            : null}
          Phone
        </th>
      </tr>
    </thead>
    <tbody>
      {props.data.map((item: Data, index: number) => (
        <tr
          key={`${item.id}${index + 1}`}
          onClick={() => props.onSelectRow(item)}
        >
          <td>{item.id}</td>
          <td>{item.firstName}</td>
          <td>{item.lastName}</td>
          <td>{item.email}</td>
          <td>{item.phone}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
