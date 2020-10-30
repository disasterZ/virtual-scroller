import { put,takeEvery } from "redux-saga/effects";
import { GET_TABLE_LIST } from './constants';
import { tableListAction } from './actionCreator';
import axios from 'axios';

function* getTableList(){
    try{
        const res = yield axios.get('/api/zips.json');
        const action=tableListAction(res.data);
        yield put(action);
    }catch(e){
        yield console.log(e);
    }
}

function* TableSaga() {
    yield takeEvery(GET_TABLE_LIST,getTableList);
  }
  
  export default TableSaga;