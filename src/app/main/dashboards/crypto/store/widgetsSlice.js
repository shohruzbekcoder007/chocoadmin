import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getWidgets = createAsyncThunk('cryptoDashboardApp/widgets/getWidgets', async () => {
  const response = await axios.get('/api/dashboards/crypto/widgets');

  const data = await response.data;

  return data;
});

const widgetsSlice = createSlice({
  name: 'cryptoDashboardApp/widgets',
  initialState: null,
  reducers: {},
  extraReducers: {
    [getWidgets.fulfilled]: (state, action) => action.payload,
  },
});

export const selectWidgets = ({ cryptoDashboardApp }) => cryptoDashboardApp.widgets;
export const selectPrices = ({ cryptoDashboardApp }) => cryptoDashboardApp.prices;
export const selectWallets = ({ cryptoDashboardApp }) => cryptoDashboardApp.wallets;

export default widgetsSlice.reducer;
