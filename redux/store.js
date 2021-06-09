import { configureStore } from '@reduxjs/toolkit'
import barChartReducer from './features/barChart/barChartSlice'

// accepts reducer functions as named argument
// automatically sets up store with DevTools, Thunks and other necessary default settings
export default configureStore({
	reducer: {
		barChart: barChartReducer,
	},
})
