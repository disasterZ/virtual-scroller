import { TABLE_LIST_ACTION } from "./constants";

const defaultState = {
    list:[],
    header:[
        {
            title:'Id',
            dataIndex:'_id',
            width:100,
        },
        {
            title:'City',
            dataIndex:'city',
            width:100,
        },
        {
            title:'Location',
            dataIndex:'loc',
            width:200,
        },
        {
            title:'Pop',
            dataIndex:'pop',
            width:100,
        },
        {
            title:'State',
            dataIndex:'state',
            width:100,
        }
    ]
};


// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
    switch (action.type) {
        case TABLE_LIST_ACTION:
            const newState=JSON.parse(JSON.stringify(state));
            newState.list = action.list;
            return newState
        default:
            return state;

    }
}