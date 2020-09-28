import React from 'react';
import { DataDetails } from '../../interfaces/Data';

export default (props: { rowData: DataDetails }) => (
  <section>
    <p>
      Выбран пользователь <b>Sue Corson</b>
    </p>
    <p>
      Описание:
      <br />
      <textarea defaultValue={props.rowData.description} />
    </p>
    <p>
      Адрес проживания: <b>{props.rowData.address.streetAddress}</b>
    </p>
    <p>
      Город: <b>{props.rowData.address.city}</b>
    </p>
    <p>
      Провинция/штат: <b>{props.rowData.address.city}</b>
    </p>
    <p>
      Индекс: <b>{props.rowData.address.zip}</b>
    </p>
  </section>
);
