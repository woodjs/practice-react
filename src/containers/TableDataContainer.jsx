import React, { useState } from 'react';
import TableData from '../components/TableData';

const TableDataContainer = ({ isEdit, replace, handleUpdate, children }) => {
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState(children);
  const handleEditUpdate = () => setEdit(!edit);
  const handleChangeInput = (event) => {
    setInput(event.target.value);
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleUpdate(input, replace);
      handleEditUpdate();
    }
  };

  return (
    <TableData
      isEdit={isEdit}
      editStatus={edit}
      handleEditUpdate={handleEditUpdate}
      handleChangeInput={handleChangeInput}
      handleKeyPress={handleKeyPress}
      data={children}
    />
  );
};

export default TableDataContainer;
