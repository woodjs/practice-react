import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableRow from '../components/TableRow';
import TableDataContainer from './TableDataContainer';
import TableProducts from '../components/TableProducts';

import { updateDataTable, getData } from '../redux/actions/products';
import { getProducts } from '../redux/reducers/products';

const TableContainer = ({ socket }) => {
  const dispatch = useDispatch();

  const products = useSelector((state) => getProducts(state.products));

  socket.on('products', (data) => {
    dispatch(getData(data));
  });

  const productRendering = (data) => {
    const totalProducts = (arr) => {
      let sum = 0;
      arr.forEach((item) => {
        sum += item.count * item.priceForOne;
      });
      return sum;
    };
    if (data.length > 0) {
      return (
        <tbody>
          {data.map((product, index) => {
            const totalProduct = product.count * product.priceForOne;
            const updateProduct = (value, replace) => {
              const object = {
                id: index + 1,
                value,
                replace,
              };
              dispatch(updateDataTable(object));
              socket.emit('update', object);
            };
            return (
              <TableRow key={product.id}>
                <TableDataContainer
                  isEdit
                  replace="name"
                  handleUpdate={updateProduct}
                >
                  {product.name}
                </TableDataContainer>
                <TableDataContainer
                  isEdit
                  replace="count"
                  handleUpdate={updateProduct}
                >
                  {product.count}
                </TableDataContainer>
                <TableDataContainer
                  isEdit
                  replace="priceForOne"
                  handleUpdate={updateProduct}
                >
                  {product.priceForOne}
                </TableDataContainer>
                <td>{totalProduct}</td>
              </TableRow>
            );
          })}
          <TableRow>
            <td colSpan="4" className="text-right">
              <p className="table__total font-weight-bold mb-0">
                Общая стоимость:{' '}
                <span className="table__total__price font-weight-normal">
                  {totalProducts(data)} руб.
                </span>
              </p>
            </td>
          </TableRow>
        </tbody>
      );
    }
    return (
      <tbody>
        <TableRow>
          <td colSpan="4" className="text-center">
            <p>Данных пока что нет :(</p>
          </td>
        </TableRow>
      </tbody>
    );
  };

  return (
    // <Table
    //   renderData={productRendering(products)} // renderData
    // />
    <TableProducts renderData={productRendering(products)} />
  );
};

export default TableContainer;
