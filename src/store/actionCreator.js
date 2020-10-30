import * as constants from "./constants";

export const getTableList = () => ({
    type:constants.GET_TABLE_LIST
})

export const tableListAction = (list) => ({
    type:constants.TABLE_LIST_ACTION,
    list
})
