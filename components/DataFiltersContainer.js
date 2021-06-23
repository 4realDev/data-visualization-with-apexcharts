import { useSelector, useDispatch } from 'react-redux'
import RangePicker from '../components/ant-design/AntRangePicker'
import rangePickerSlice, {
	setRangePickerSelection,
	setRangePickerSelectionMonths,
} from '../redux/features/rangePicker/rangePickerSlice'

import chartSlice, {
	filterNormalizedSeriesByMonths,
} from '../redux/features/chartData/chartSlice'

import Select from '../components/ant-design/AntSelect'
// import moment from 'moment'

const DataFiltersContainer = () => {
	const dispatch = useDispatch()
	const rangePickerSelection = useSelector(
		(state) => state.rangePicker.selection
	)

	const rangePickerEnabledValues = useSelector(
		(state) => state.rangePicker.enabledValues
	)

	const onRangePickerValuesChanged = (newSelection) => {
		const newSelectionMonths = newSelection.map(
			(selection) => parseInt(selection.month() + 1) // convert "Mon Feb 01 2021" to "02"
		)
		dispatch(setRangePickerSelection(newSelection))
		dispatch(setRangePickerSelectionMonths(newSelectionMonths))
		dispatch(filterNormalizedSeriesByMonths(newSelectionMonths))
	}

	return (
		<div>
			<RangePicker
				selectedValues={rangePickerSelection}
				enabledValues={rangePickerEnabledValues}
				onChange={onRangePickerValuesChanged}
			/>
		</div>
	)
}

export default DataFiltersContainer
