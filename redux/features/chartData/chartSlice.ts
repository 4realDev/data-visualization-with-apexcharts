/* eslint-disable no-use-before-define */

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from 'redux/store'
import { server } from '../../../config/config'
import { normalizeSeriesDataMonths } from '../../../helper/normalizerMonths'

type ApexChartSerie = {
	name: string
	data: {
		x: string
		y: number
	}[]
}

type NormalizedApexChartSerie = {
	name: string
	data: {
		x: number
		y: number
	}[]
}

type FilterData = {
	rangeSelection: number[]
	seriesSelection: string[]
}

interface ChartDataState {
	loading: string
	series: ApexChartSerie[]
	normalizedSeries: NormalizedApexChartSerie[]
	filteredNormalizedSeries: NormalizedApexChartSerie[]
}

const initialState: ChartDataState = {
	loading: 'idle',
	series: [],
	normalizedSeries: [],
	filteredNormalizedSeries: [],
}

export const chartSlice = createSlice({
	name: 'chartData', // called for example with useSelector((state) => state.chartData.series)
	initialState,
	reducers: {
		// Redux Toolkit allows us to write "mutating" logic in reducers. It
		// doesn't actually mutate the state because it uses the Immer library,
		// which detects changes to a "draft state" and produces a brand new
		// immutable state based off those changes

		usersLoading(state) {
			// Use a "state machine" approach for loading state instead of booleans
			if (state.loading === 'idle') {
				state.loading = 'pending'
			}
		},

		usersReceived(state) {
			if (state.loading === 'pending') {
				state.loading = 'idle'
			}
		},

		setFetchedSeries: (state, action: PayloadAction<ApexChartSerie[]>) => {
			state.series = action.payload
		},

		setNormalizedSeries: (state, action: PayloadAction<NormalizedApexChartSerie[]>) => {
			state.normalizedSeries = normalizeSeriesDataMonths(action.payload)
			state.filteredNormalizedSeries = state.normalizedSeries
		},

		filterNormalizedSeries: (state, action: PayloadAction<FilterData>) => {
			const normalizedSeriesFilteredBySerieAndMonthSelection: NormalizedApexChartSerie[] = state.normalizedSeries
				.filter(serie => action.payload.seriesSelection.includes(serie.name))
				.map(serie => ({
					name: serie.name,
					data: serie.data.reduce((filtered: any, dataTuple) => {
						if (dataTuple.x >= action.payload.rangeSelection[0] && dataTuple.x <= action.payload.rangeSelection[1])
							filtered.push(dataTuple)
						return filtered
					}, []),
				}))

			state.filteredNormalizedSeries = normalizedSeriesFilteredBySerieAndMonthSelection
		},
	},
})

export const fetchChartData = () => async (dispatch: AppDispatch) => {
	dispatch(usersLoading())
	const resChartData = await fetch(`${server}/api/chartData`)
	const chartData = await resChartData.json()
	dispatch(setFetchedSeries(chartData))
	dispatch(setNormalizedSeries(chartData))
	dispatch(usersReceived())
}

// Action creators are generated for each case reducer function
export const { usersLoading, usersReceived, setFetchedSeries, setNormalizedSeries, filterNormalizedSeries } =
	chartSlice.actions
export default chartSlice.reducer
