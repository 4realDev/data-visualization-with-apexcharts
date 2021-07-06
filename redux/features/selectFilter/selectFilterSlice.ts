import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SelectFilterState {
	initialSelection: string[]
	selection: string[]
}

const initialState: SelectFilterState = {
	initialSelection: ['Music', 'Photos', 'Files'],
	selection: ['Music', 'Photos', 'Files'],
}

export const selectFilterSlice = createSlice({
	name: 'selectFilter',
	initialState,
	reducers: {
		setSelectFilterSelection: (state, action: PayloadAction<string[]>) => {
			state.selection = action.payload
		},
	},
})

// Action creators are generated for each case reducer function
export const { setSelectFilterSelection } = selectFilterSlice.actions
export default selectFilterSlice.reducer
