import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products : [],
    quantity : 0,
    totalPrice : 0,
}

const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers : {
        addToCart(state, action) {
            state.products.push(action.payload.product)
            state.quantity++
            state.totalPrice = state.totalPrice + action.payload.product.count * action.payload.product.price
        }
    }
})

export const { addToCart } = cartSlice.actions
export default cartSlice.reducer;