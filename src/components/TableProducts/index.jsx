import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

import Table from 'react-bootstrap/Table';
import TableProductHead from '../TableProductHead/index';

const TableProducts = ({ renderData }) => (
  <Table striped bordered hover>
    <TableProductHead />
    {renderData}
  </Table>
);

export default TableProducts;

TableProducts.propTypes = {
  renderData: PropTypes.node.isRequired,
};
