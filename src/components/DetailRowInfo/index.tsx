import React from 'react';
import { DataDetails } from '../../interfaces/Data';

interface Props {
  rowData: DataDetails | null;
}

export default (props: Props) =>
  props.rowData && (
    <section>
      <hr />
      <p>
        User <b>{`${props.rowData.firstName} ${props.rowData.lastName}`}</b>
      </p>
      <p>
        Description:
        <br />
        <textarea
          style={{ width: '50%', height: '100px' }}
          defaultValue={props.rowData.description}
        />
      </p>
      <p>
        Street: <b>{props.rowData.address.streetAddress}</b>
      </p>
      <p>
        City: <b>{props.rowData.address.city}</b>
      </p>
      <p>
        State: <b>{props.rowData.address.city}</b>
      </p>
      <p>
        Zip: <b>{props.rowData.address.zip}</b>
      </p>
    </section>
  );
