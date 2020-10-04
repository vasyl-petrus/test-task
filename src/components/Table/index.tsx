import React from 'react';
import { Data } from '../../interfaces/Data';

export default (props: any) => (
  <table className="table">
    <thead className="thead-dark">
      <tr>
        <th onClick={props.onSort.bind(null, 'id')}>
          {props.sortedField === 'id'
            ? (props.sortDirection === 'desc' && <span>&darr; </span>) ||
              (props.sortDirection === 'asc' && <span>&uarr; </span>)
            : null}
          ID
        </th>
        <th onClick={props.onSort.bind(null, 'firstName')}>
          {props.sortedField === 'firstName'
            ? (props.sortDirection === 'desc' && <span>&darr; </span>) ||
              (props.sortDirection === 'asc' && <span>&uarr; </span>)
            : null}
          First Name
        </th>
        <th onClick={props.onSort.bind(null, 'lastName')}>
          {props.sortedField === 'lastName'
            ? (props.sortDirection === 'desc' && <span>&darr; </span>) ||
              (props.sortDirection === 'asc' && <span>&uarr; </span>)
            : null}
          Last Name
        </th>
        <th onClick={props.onSort.bind(null, 'email')}>
          {props.sortedField === 'email'
            ? (props.sortDirection === 'desc' && <span>&darr; </span>) ||
              (props.sortDirection === 'asc' && <span>&uarr; </span>)
            : null}
          Email
        </th>
        <th onClick={props.onSort.bind(null, 'phone')}>
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
          onClick={props.onSelectRow.bind(null, item)}
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
