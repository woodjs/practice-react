import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socketClient from 'socket.io-client';
import Table from '../components/Table';
import TableRow from '../components/TableRow';
import TableDataContainer from './TableDataContainer';
import { updateDataTable, getData } from '../redux/actions';
import { SERVER } from '../redux/types';

const TableContainer = () => {
  const dispatch = useDispatch();
  const socket = socketClient.connect(SERVER); // connect к сокету
  // Тут я вешаю событие в сокетах на products, от сервера получаю уже готовый массив
  socket.on('products', (data) => {
    dispatch(getData(data));
  });

  socket.on('connection', (username) => {
    console.log(`Привет, ${username}`);
  });

  socket.on('message', (message) => {
    console.log(`Сообщение: ${message}`);
  });

  const products = useSelector((state) => state.products.products);
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
              const object = { id: index + 1, value, replace };
              dispatch(updateDataTable(object));
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
                <TableDataContainer>{totalProduct}</TableDataContainer>
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
    <Table
      renderData={productRendering(products)} // renderData
    />
  );
};

export default TableContainer;
