export const STORE_INITIAL_DATA = 'STORE_INITIAL_DATA';

export const UPDATE_QUANTITY = 'INCREMENT_QUANTITY';

export const DECREMENT_QUANTITY = 'DECREMENT_QUANTITY';

export const GET_DATA = 'GET_ALL_DATA';

export const ADD_TO_CART = 'ADD_TO_CART';

export const UPDATE_FOOD_ITEMS = 'UPDATE_FOOD_ITEMS'

export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
//

export const updateFoodItems = (data) => ({
    type : UPDATE_FOOD_ITEMS,
    payload : data
});

export const addToCart = (data) => ({
    type : ADD_TO_CART,
    payload : data
});

export const removeFromCart = (data) => ({
    type : REMOVE_FROM_CART,
    payload : data
});

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
