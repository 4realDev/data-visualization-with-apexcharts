import { createSlice } from '@reduxjs/toolkit'
import {server} from "../../../config/config";

export const chartSlice = createSlice({
	name: 'chartData', // called for example with useSelector((state) => state.barChart.series)
	initialState: {
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
	},
})

export const fetchData = () => async dispatch => {
	console.log('here 2');
	const resChartData = await fetch(`${server}/api/chartData`);
	console.log('....', resChartData);
	const chartData = await resChartData.json();

	console.log('data', chartData);

	dispatch(setInitialChartData(chartData));
};

// Action creators are generated for each case reducer function
export const { setInitialChartData } = chartSlice.actions
export default chartSlice.reducer
