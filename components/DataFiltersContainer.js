import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RangePicker from '../components/ant-design/AntRangePicker';
import { setRangePickerSelection } from '../redux/features/rangePicker/rangePickerSlice';
import { setSelectFilterSelection } from '../redux/features/selectFilter/selectFilterSlice';
import { filterNormalizedData } from '../redux/features/chartData/chartSlice';
import Select from '../components/ant-design/AntSelect';
import { COLORS } from '../helper/colors';

const DataFiltersContainer = () => {
	const dispatch = useDispatch();
	const rangePickerSelection = useSelector((state) => state.rangePicker.selection);

	const rangePickerEnabledValues = useSelector((state) => state.rangePicker.enabledValues);

	const selectFilterInitialSelection = useSelector((state) => state.selectFilter.initialSelection);

	const selectFilterSelection = useSelector((state) => state.selectFilter.selection);

	const handleRangePickerOnChanged = (rangeSelection) => {
		const rangeFilterSelectionMonths = rangeSelection.map(
			(selection) => parseInt(selection.month() + 1) // convert "Mon Feb 01 2021" to "02"
		);
		dispatch(setRangePickerSelection(rangeSelection));
		dispatch(
			filterNormalizedData({
				rangeSelection: rangeFilterSelectionMonths,
				seriesSelection: selectFilterSelection,
			})
		);
	};

	const handleSelectFilterOnChange = (seriesFilterSelection) => {
		const rangeFilterSelectionMonths = rangePickerSelection.map(
			(selection) => parseInt(selection.month() + 1) // convert "Mon Feb 01 2021" to "02"
		);
		dispatch(setSelectFilterSelection(seriesFilterSelection));
		dispatch(
			filterNormalizedData({
				rangeSelection: rangeFilterSelectionMonths,
				seriesSelection: seriesFilterSelection,
			})
		);
	};

	return (
		<div
			className='flex justify-start flex-row p-10 gap-5'
			style={{ backgroundColor: COLORS.chartLayoutBackground }}>
			<div>
				<h3 className='text-white text-left text-sm font-bold'>Date</h3>
				<RangePicker
					selectedValues={rangePickerSelection}
					enabledValues={rangePickerEnabledValues}
					onChange={handleRangePickerOnChanged}
				/>
			</div>
			<div>
				<h3 className='text-white text-left text-sm font-bold'>Series</h3>
				<Select
					selectOptions={selectFilterInitialSelection}
					onChange={handleSelectFilterOnChange}
				/>
			</div>
		</div>
	);
};

export default DataFiltersContainer;
