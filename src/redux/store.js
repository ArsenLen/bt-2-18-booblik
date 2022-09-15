import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice'
import userReducer from './userSlice'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'user',
    version: 1,
    storage,
}

const persistedReducer = persistReducer(persistConfig, userReducer)

const store = configureStore({
    reducer : {
        cart : cartReducer,
        user : persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store)

export default store