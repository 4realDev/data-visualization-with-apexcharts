import { configureStore } from '@reduxjs/toolkit'
import chartReducer from './features/chartData/chartSlice'
import rangePickerReducer from './features/rangePicker/rangePickerSlice'
import selectFilterReducer from './features/selectFilter/selectFilterSlice'

// accepts reducer functions as named argument
// automatically sets up store with DevTools, Thunks and other necessary default settings
export const store = configureStore({
	reducer: {
		chartData: chartReducer,
		rangePicker: rangePickerReducer,
		selectFilter: selectFilterReducer,
	},
})

// configureStore Does not need additional typings
// But RootState type and Dispatch type should be extracted to reference them as needed

// Infer `RootState` and `AppDispatch` types from store itself -> ensures states gets updated on additional slices
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {chartData: chartReducer, rangePicker: rangePickerReducer, selectFilter: selectFilterReducer}
export type AppDispatch = typeof store.dispatch
