import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreator from './store/actionCreator';
import VirtualScroller from './VirtualScroller';
import { Table } from 'antd';
import './style.css';
import 'antd/dist/antd.css';

class Tables extends Component {

  componentWillMount() {
    this.props.getList();
  }


  render() {
    const { list, columns } = this.props;
    return (

      <VirtualScroller
        className="viewport"
        get={getData}
        settings={SETTINGS}
        list={list}
        columns={columns}
        row={rowTemplate}
      />
    )
  }




}

const SETTINGS = {
  itemHeight: 20,
  amount: 40,
  tolerance: 10,
  minIndex: 1,
  maxIndex: 29353,
  startIndex: 0
};

function getData(offset, limit, list) {
  const data = [];
  if (list) {
    const start = Math.max(SETTINGS.minIndex, offset);
    const end = Math.min(offset + limit - 1, SETTINGS.maxIndex);
    if (start <= end) {
      for (let i = start; i <= end; i++) {
        data.push(list[i]);
      }
    }
  }
  return data;
};

function rowTemplate(data,columns) {
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: data.length }}
      scroll={{ y: 600 }}
      rowKey={record => record._id}
    />
  )
};

const mapStateToProps = (state) => ({
  list: state.list,
  columns: state.header
})

const mapDispatchToProps = (dispatch) => ({
  getList() {
    const action = actionCreator.getTableList();
    dispatch(action);
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Tables);