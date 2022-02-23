import { createStore, combineReducers } from "redux";
import FoodItemsReducer from '../reducer/FoodItemsReducer';
import { composeWithDevTools } from "redux-devtools-extension";

const reducers = {FoodItemsReducer};


const rootReducer = combineReducers(reducers);

export const configureStore = () => 
    createStore(
        rootReducer,
        composeWithDevTools()
    )