import { createSlice } from '@reduxjs/toolkit'

export const selectFilterSlice = createSlice({
	name: 'selectFilter',
	initialState: {
		initialSelection: ['Music', 'Photos', 'Files'],
		selection: ['Music', 'Photos', 'Files'],
	},

	reducers: {
		// Redux Toolkit allows us to write "mutating" logic in reducers. It
		// doesn't actually mutate the state because it uses the Immer library,
		// which detects changes to a "draft state" and produces a brand new
		// immutable state based off those changes
		setSelectFilterSelection: (state, action) => {
			state.selection = action.payload
		},
	},
})

// Action creators are generated for each case reducer function
export const { setSelectFilterSelection } = selectFilterSlice.actions
export default selectFilterSlice.reducer
