import { createSlice } from '@reduxjs/toolkit'
import { server } from '../../../config/config'

export const chartSlice = createSlice({
	name: 'chartData', // called for example with useSelector((state) => state.barChart.series)
	initialState: {
		loading: 'idle',
		series: [],
	},

	reducers: {
		// Redux Toolkit allows us to write "mutating" logic in reducers. It
		// doesn't actually mutate the state because it uses the Immer library,
		// which detects changes to a "draft state" and produces a brand new
		// immutable state based off those changes
		setInitialChartData: (state, action) => {
			state.series = action.payload
		},
		usersLoading(state, action) {
			// Use a "state machine" approach for loading state instead of booleans
			if (state.loading === 'idle') {
				state.loading = 'pending'
			}
		},
		usersReceived(state, action) {
			if (state.loading === 'pending') {
				state.loading = 'idle'
				state.series = action.payload
			}
		},
	},
})

export const fetchChartData = () => async (dispatch) => {
	dispatch(usersLoading())
	const resChartData = await fetch(`${server}/api/chartData`)
	const chartData = await resChartData.json()
	dispatch(usersReceived(chartData))
}

// Action creators are generated for each case reducer function
export const { usersLoading, usersReceived, setInitialChartData } =
	chartSlice.actions
export default chartSlice.reducer
