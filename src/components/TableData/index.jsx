import React from 'react';
import PropTypes from 'prop-types';

const TableData = ({
  isEdit,
  editStatus,
  handleEditUpdate,
  handleChangeInput,
  handleKeyPress,
  data,
}) => {
  if (editStatus && isEdit) {
    return (
      <td className="text-center">
        <input
          className="form-control table__input"
          type="text"
          defaultValue={data}
          onChange={(e) => {
            handleChangeInput(e);
          }}
          onKeyPress={handleKeyPress}
        />
      </td>
    );
  }
  return (
    <td aria-hidden="true" className="text-center" onClick={handleEditUpdate}>
      {data}
    </td>
  );
};

export default TableData;

TableData.propTypes = {
  isEdit: PropTypes.bool.isRequired,
  editStatus: PropTypes.bool.isRequired,
  handleEditUpdate: PropTypes.func.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
  data: PropTypes.node.isRequired,
};
