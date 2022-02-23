import { set } from "react-native-reanimated";
import { incrementQuantity } from "../actions/actions";

const initialState = {
    items : [],
    cart : [],
    selectedCounnt : 0
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
    }

    switch (type) {
        case 'STORE_INITIAL_DATA' : {
            return ({
                ...state,
                items:payload
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
            return (state.items.map((item) => {
                item.subcategory.map((subitem) => {
                    if(subitem.id == payload.item.id) {
                        subitem.qty = subitem.qty - 1;
                    }
                }
                )
                return item;
            }))
        }


        case 'GET_ALL_DATA' : {
            return state;
        }

        default: // need this for default case
        return state 
    }
}
export default FoodItemsReducer;