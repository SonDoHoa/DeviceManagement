import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface CustomerState {
   email: string,
   fullName: string,
   phoneNumber: string,
   address: string,
   dayOfBirth: string
 }

 const initialState: CustomerState = {
   email: '',
   fullName: '',
   phoneNumber: '',
   address: '',
   dayOfBirth: '',
 };

const CustomerSlice = createSlice({
  name: 'devices',
  initialState: initialState,
  reducers: {
    CustomerUpdate(state, action) {
      return {
         ...state,
         ...action.payload,
      };
    },
  },
});

export const { CustomerUpdate } = CustomerSlice.actions;
export default CustomerSlice.reducer;
