export const STORE_INITIAL_DATA = 'STORE_INITIAL_DATA';

export const UPDATE_QUANTITY = 'INCREMENT_QUANTITY';

export const DECREMENT_QUANTITY = 'DECREMENT_QUANTITY';

export const GET_DATA = 'GET_ALL_DATA';

export const doInitializeState = (data) => ({
    type: STORE_INITIAL_DATA,
    payload: data
});

export const incrementQuantity = (data) => ({
    type: UPDATE_QUANTITY,
    payload: data
});


export const deccrementQuantity = (data) => ({
    type: DECREMENT_QUANTITY,
    payload: data
});

export const getAllData = () => ({
    type: GET_DATA,
    payload: {}
});
