import React from 'react';
import './index.scss';
import TableHead from '../TableHead/index';

const Table = ({ renderData }) => (
  <table className="table table-bordered">
    <TableHead />
    {renderData}
  </table>
);

export default Table;
