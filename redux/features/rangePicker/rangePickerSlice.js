import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

export const rangePickerSlice = createSlice({
	name: 'rangePicker', // called for example with useSelector((state) => state.barChart.series)
	initialState: {
		selection: [moment('2021-01', 'YYYY-MM'), moment('2021-12', 'YYYY-MM')],
		enabledValues: [
			'2021-01',
			'2021-02',
			'2021-03',
			'2021-04',
			'2021-05',
			'2021-06',
			'2021-07',
			'2021-08',
			'2021-09',
			'2021-10',
			'2021-11',
			'2021-12',
		],
	},

	reducers: {
		// Redux Toolkit allows us to write "mutating" logic in reducers. It
		// doesn't actually mutate the state because it uses the Immer library,
		// which detects changes to a "draft state" and produces a brand new
		// immutable state based off those changes
		setRangePickerSelection: (state, action) => {
			state.selection = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setRangePickerSelection } = rangePickerSlice.actions;
export default rangePickerSlice.reducer;
