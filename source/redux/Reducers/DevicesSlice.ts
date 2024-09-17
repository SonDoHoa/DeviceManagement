import {createSlice} from '@reduxjs/toolkit';

export interface DeviceState {
  id: number;
  name: string;
  description: string;
  quantity: number;
  status: boolean;
  note: string;
  fee: string;
  image: string;
}

interface InitialType {
  devices: DeviceState[];
}

const initialState: InitialType = {
  devices: [],
};

const devicesSlice = createSlice({
  name: 'devices',
  initialState: initialState,
  reducers: {
    addDevices(state, action) {
      const map = new Map([...state.devices, ...action.payload]
         .map(obj => [obj.id, obj]));

         state.devices = Array.from(map.values());
    },
    removeDevices(state, action) {
      state.devices = state.devices.filter(
        item => item.id !== action.payload.id,
      );
    },
    updateDevices(state, action) {
      let index = state.devices.findIndex(item => item.id === action.payload.id);
      state.devices[index] = action.payload;

    },
    clearCart(state) {
      state.devices = [];
    },
  },
});

export const {addDevices, removeDevices, clearCart, updateDevices} =
  devicesSlice.actions;
export default devicesSlice.reducer;
