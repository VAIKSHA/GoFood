import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {

    switch (action.type) {
        case "ADD":
            return [...state, {
                id: action.id,
                name: action.name,
                quantity: action.quantity,
                size: action.size,
                price: action.price,
                img: action.img
            }]
        case "REMOVE":
            let newArr = [...state] // state is directly not removed
            newArr.splice(action.index, 1)
            return newArr;
        case "UPDATE":
            return state.map(item =>
                item.id === action.id && item.size === action.size
                    ? {
                        ...item,
                        quantity: action.quantity,
                        price: action.price,
                    }
                    : item
            );
        case "DROP":
            let empArr = []
            return empArr
        default:
            return state
    }

}

export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, []);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart = () => useContext(CartStateContext)
export const useDispatchCart = () => useContext(CartDispatchContext)