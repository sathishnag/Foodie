import { set } from "react-native-reanimated";
import { deccrementQuantity, incrementQuantity } from "../actions/actions";

const initialState = {
    items : [],
    cart : [],
    selectedCount : 0
}


export const FoodItemsReducer = ( state = initialState, action) => {
    const { type, payload } = action;

    const incrementQuantityVal = (payload) => {
        return (
            state.items.map((item) => {
            item.subcategory.map((subitem) => {
                if(subitem.id == payload.item.id) {
                    subitem.qty = subitem.qty + 1;
                }
            }
            )
            return item;
        }))
    };

    const decrementQuantityVal = (payload) => {
        return (
            state.items.map((item) => {
            item.subcategory.map((subitem) => {
                if(subitem.id == payload.item.id) {
                    subitem.qty = subitem.qty - 1;
                }
            }
            )
            return item;
        }))
    }

    switch (type) {
        case 'STORE_INITIAL_DATA' : {
            return ({
                items : payload,
                cart : [],
                selectedCount : 0
            }
            )
        }
        case 'UPDATE_FOOD_ITEMS' : {
            return ({
                ...state,
                items : payload
            }
            )
        }

        case 'INCREMENT_QUANTITY' : {
            const dataVal = incrementQuantityVal(payload);
            return(
                {
                ...state,
                items : dataVal
                }
            )
        }

        case 'DECREMENT_QUANTITY' : {
            const decData = decrementQuantityVal(payload);
            return(
                {
                ...state,
                items : decData
                }
            )
        }

        case 'REMOVE_FROM_CART' : {
            state.cart.map((cartData, index) => {
                if(cartData.id  == payload.item.id) {
                    cartData.qty = cartData.qty - 1;
                    if(cartData.qty < 1) {
                        state.cart.splice(index, 1);
                    }
                    return cartData;
                }
            })
            state.selectedCount = state.selectedCount-1;
            return {
                ...state
            }
        }

        case 'ADD_TO_CART' : {
            let check  = false;
            if(state.selectedCount == 0) {
                const newItem = {
                    ...payload.item,
                    qty: 1
                };
                state.cart.push(newItem);
                state.selectedCount = state.selectedCount+1;
            }else {
                state.cart.map((cartData) => {
                        if(cartData.id  == payload.item.id) {
                            cartData.qty = cartData.qty + 1;
                            check = true;
                            return cartData;
                        }
                })
                if(!check){
                    let newItem = {
                        ...payload.item,
                        qty:1
                    }
                    state.cart.push(newItem);
                }
                state.selectedCount = state.selectedCount+1;
            }

            return {
                ...state
            } 
        }

        case 'GET_ALL_DATA' : {
            return state;
        }

        default: // need this for default case
        return state 
    }
}
export default FoodItemsReducer;