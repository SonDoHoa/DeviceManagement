import { configureStore } from '@reduxjs/toolkit';
import devicesReducer from '../redux/Reducers/DevicesSlice';
import customerReducer from '../redux//Reducers/CustomerSlice';

export const store = configureStore({
  reducer: {
    devices: devicesReducer,
    customer: customerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
