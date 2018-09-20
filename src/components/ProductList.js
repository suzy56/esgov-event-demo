import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const ProductList = ({ products }) => {
  const columns = [ {
    title: '序号',
    dataIndex: 'id',
  },{
    title: '事件编号',
    dataIndex: 'num',
    render: value => <a >{value}</a>,
  }, {
    title: '事件标题',
    dataIndex: 'title',
    render: value => <a >{value}</a>,
  }, {
    title: '位置说明',
    dataIndex: 'place',
  }, {
    title: '事件类型',
    dataIndex: 'type'
  }, {
    title: '事发时间',
    dataIndex: 'time',
  }, {
    title: '流转环节',
    dataIndex: 'step',
  },];
  return (
    <Table
      dataSource={products}
      columns={columns}
    />
  );
};

ProductList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
};

export default ProductList;