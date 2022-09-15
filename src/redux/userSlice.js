import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user : null
}

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        loginSuccess(state, action) {
            state.user = action.payload // action.payload.user = 
        }
    }
})

export const { loginSuccess } = userSlice.actions
export default userSlice.reducer;