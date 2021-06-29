import { createSlice } from '@reduxjs/toolkit'
import { server } from '../../../config/config'
import { normalizeSeriesDataMonths } from '../../../helper/normalizerMonths'

export const chartSlice = createSlice({
	name: 'chartData', // called for example with useSelector((state) => state.chartData.series)
	initialState: {
		loading: 'idle',
		series: [],
		normalizedSeries: [],
		filteredNormalizedSeries: [],
	},

	reducers: {
		// Redux Toolkit allows us to write "mutating" logic in reducers. It
		// doesn't actually mutate the state because it uses the Immer library,
		// which detects changes to a "draft state" and produces a brand new
		// immutable state based off those changes

		usersLoading(state, action) {
			// Use a "state machine" approach for loading state instead of booleans
			if (state.loading === 'idle') {
				state.loading = 'pending'
			}
		},

		usersReceived(state, action) {
			if (state.loading === 'pending') {
				state.loading = 'idle'
			}
		},

		setFetchedSeries: (state, action) => {
			state.series = action.payload
		},

		setNormalizedSeries: (state, action) => {
			state.normalizedSeries = normalizeSeriesDataMonths(action.payload)
			state.filteredNormalizedSeries = state.normalizedSeries
		},

		filterNormalizedData: (state, action) => {
			const normalizedSeriesFilteredBySerieAndMonthSelection =
				state.normalizedSeries
					.filter((serie) =>
						action.payload.seriesSelection.includes(serie.name)
					)
					.map((serie) => {
						return {
							name: serie.name,
							data: serie.data.reduce((filtered, dataTuple) => {
								if (
									dataTuple.x >=
										action.payload.rangeSelection[0] &&
									dataTuple.x <=
										action.payload.rangeSelection[1]
								)
									filtered.push(dataTuple)
								return filtered
							}, []),
						}
					})

			state.filteredNormalizedSeries =
				normalizedSeriesFilteredBySerieAndMonthSelection
		},
	},
})

export const fetchChartData = () => async (dispatch) => {
	dispatch(usersLoading())
	const resChartData = await fetch(`${server}/api/chartData`)
	const chartData = await resChartData.json()
	dispatch(setFetchedSeries(chartData))
	dispatch(setNormalizedSeries(chartData))
	dispatch(usersReceived())
}

// ARRAY METHODS
// forEach -> does not mutate - return resulted array - do not manipulate original array
// map -> mutating original array - only when we want to change the original data -> returns without return statement (all arrow)
// reduce -> mutate
// filter -> mutate

// OBJECT METHODS
// Object -> Object.keys -> for default JS Object
// use Object.create instead {}
// Objet.methods
// Object.keys
// Object.values
// Object.entries

// accessing object recursivly

// Action creators are generated for each case reducer function
export const {
	usersLoading,
	usersReceived,
	setFetchedSeries,
	setNormalizedSeries,
	filterNormalizedData,
} = chartSlice.actions
export default chartSlice.reducer
