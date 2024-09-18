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
      const map = new Map(
        [...state.devices, ...action.payload].map(obj => [obj.id, obj]),
      );

      state.devices = Array.from(map.values());
    },
    removeDevices(state, action) {
      let newA = state.devices;
      newA = newA.filter(
        ar =>
          !action.payload.find(
            (rm: any) => rm.fee === ar.fee && ar.id === rm.id,
          ),
      );

      const map = new Map(newA.map(obj => [obj.id, obj]));
      state.devices = Array.from(map.values());
    },
    updateDevices(state, action) {
      let index = state.devices.findIndex(
        item => item.id === action.payload.id,
      );
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
