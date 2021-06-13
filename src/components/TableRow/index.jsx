import React from 'react';
import PropTypes from 'prop-types';

const TableRow = ({ children }) => <tr className="text-center">{children}</tr>;

TableRow.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TableRow;
