import { configureStore } from '@reduxjs/toolkit';
import chartReducer from './features/chartData/chartSlice';
import rangePickerReducer from './features/rangePicker/rangePickerSlice';
import selectFilterReducer from './features/selectFilter/selectFilterSlice';

// accepts reducer functions as named argument
// automatically sets up store with DevTools, Thunks and other necessary default settings
export default configureStore({
	reducer: {
		chartData: chartReducer,
		rangePicker: rangePickerReducer,
		selectFilter: selectFilterReducer,
	},
});
