import { useAppSelector, useAppDispatch } from 'redux/hooks'
import { Moment } from 'moment'
import { RangeValue } from 'rc-picker/lib/interface'
import {
	momentSelectionToMonthNumberSelection,
	YYYYMMSelectionToMonthNumberSelection,
	momentSelectionToYYYYMMSelection,
	YYYYMMSelectionToMomentSelection,
} from '../helper/antRangePickerSelectionConverter'
import RangePicker from './ant-design/AntRangePicker'
import { setRangePickerSelection } from '../redux/features/rangePicker/rangePickerSlice'
import Select from './ant-design/AntSelect'
import { setSelectFilterSelection } from '../redux/features/selectFilter/selectFilterSlice'
import { filterNormalizedSeries } from '../redux/features/chartData/chartSlice'
import { COLORS } from '../shared/colors'

const DataFiltersContainer = () => {
	const dispatch = useAppDispatch()
	const rangePickerSelection = useAppSelector(state => state.rangePicker.selection)
	const rangePickerEnabledValues = useAppSelector(state => state.rangePicker.enabledValues)
	const selectFilterInitialSelection = useAppSelector(state => state.selectFilter.initialSelection)
	const selectFilterSelection = useAppSelector(state => state.selectFilter.selection)

	// handler for AntRangePicker component
	const handleRangePickerOnChanged = (rangeSelection: RangeValue<Moment>) => {
		if (rangeSelection === null) return
		const rangeFilterSelectionMonthStrings = momentSelectionToYYYYMMSelection(rangeSelection[0], rangeSelection[1])
		const rangeFilterSelectionMonthNumbers = momentSelectionToMonthNumberSelection(rangeSelection[0], rangeSelection[1])
		dispatch(setRangePickerSelection(rangeFilterSelectionMonthStrings))
		dispatch(
			filterNormalizedSeries({
				rangeSelection: rangeFilterSelectionMonthNumbers,
				seriesSelection: selectFilterSelection,
			}),
		)
	}

	// handler for AntSelect component
	const handleSelectFilterOnChange = (seriesFilterSelection: string[]) => {
		const rangeFilterSelectionMonthNumbers = YYYYMMSelectionToMonthNumberSelection(
			rangePickerSelection[0],
			rangePickerSelection[1],
		)
		dispatch(setSelectFilterSelection(seriesFilterSelection))
		dispatch(
			filterNormalizedSeries({
				rangeSelection: rangeFilterSelectionMonthNumbers,
				seriesSelection: seriesFilterSelection,
			}),
		)
	}

	return (
		<div className='flex justify-start flex-row p-10 gap-5' style={{ backgroundColor: COLORS.chartLayoutBackground }}>
			<div>
				<h3 className='text-white text-left text-sm font-bold'>MONTH RANGE SELECTION</h3>
				<RangePicker
					selectedValues={YYYYMMSelectionToMomentSelection(rangePickerSelection[0], rangePickerSelection[1])}
					enabledValues={rangePickerEnabledValues}
					onChange={handleRangePickerOnChanged}
				/>
			</div>
			<div>
				<h3 className='text-white text-left text-sm font-bold'>SERIES SELECTION</h3>
				{/* prettier-ignore */}
				<Select 
					selectOptions={selectFilterInitialSelection} 
					onChange={handleSelectFilterOnChange} 
				/>
			</div>
		</div>
	)
}

export default DataFiltersContainer
