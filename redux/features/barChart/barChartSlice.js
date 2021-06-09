import { createSlice } from '@reduxjs/toolkit'

let initialSeries = []

export const barChartSlice = createSlice({
	name: 'barChart', // called for example with useSelector((state) => state.barChart.series)
	initialState: {
		series: [
			{
				name: 'Music',
				data: [
					{ x: 'January', y: 14 },
					{ x: 'February', y: 25 },
					{ x: 'March', y: 21 },
					{ x: 'April', y: 17 },
					{ x: 'May', y: 12 },
					{ x: 'June', y: 13 },
					{ x: 'July', y: 11 },
					{ x: 'August', y: 19 },
					{ x: 'September', y: 23 },
					{ x: 'October', y: 10 },
					{ x: 'November', y: 14 },
					{ x: 'December', y: 9 },
				],
			},
			{
				name: 'Photos',
				data: [
					{ x: 'January', y: 13 },
					{ x: 'February', y: 23 },
					{ x: 'March', y: 20 },
					{ x: 'April', y: 8 },
					{ x: 'May', y: 13 },
					{ x: 'June', y: 27 },
					{ x: 'July', y: 33 },
					{ x: 'August', y: 12 },
					{ x: 'September', y: 8 },
					{ x: 'October', y: 11 },
					{ x: 'November', y: 21 },
					{ x: 'December', y: 7 },
				],
			},
			{
				name: 'Files',
				data: [
					{ x: 'January', y: 11 },
					{ x: 'February', y: 17 },
					{ x: 'March', y: 15 },
					{ x: 'April', y: 15 },
					{ x: 'May', y: 21 },
					{ x: 'June', y: 14 },
					{ x: 'July', y: 15 },
					{ x: 'August', y: 13 },
					{ x: 'September', y: 5 },
					{ x: 'October', y: 15 },
					{ x: 'November', y: 7 },
					{ x: 'December', y: 11 },
				],
			},
		],
	},

	reducers: {
		// Redux Toolkit allows us to write "mutating" logic in reducers. It
		// doesn't actually mutate the state because it uses the Immer library,
		// which detects changes to a "draft state" and produces a brand new
		// immutable state based off those changes
		setInitialBarChartData: (state, action) => {
			initialSeries = action.payload
			state.series = action.payload
		},

		addBySelection: (state, action) => {
			state.series.forEach((serie, index) => {
				serie.data.splice(
					action.payload,
					0,
					// go through every serie in the progomal series data
					initialSeries[index].data[action.payload]
				)
			})
		},

		removeBySelection: (state, action) => {
			state.series.forEach((serie) => {
				serie.data.splice(action.payload, 1)
			})
		},

		clearBySelection: (state) => {
			state.series.forEach((serie) => {
				serie.data = []
			})
		},
	},
})

// Action creators are generated for each case reducer function
export const {
	setInitialBarChartData,
	removeBySelection,
	addBySelection,
	clearBySelection,
} = barChartSlice.actions
export default barChartSlice.reducer
