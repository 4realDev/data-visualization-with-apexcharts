import React, { useState } from 'react';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import PropTypes from 'prop-types';

const AntRangePicker = ({ selectedValues, enabledValues, onChange }) => {
	const [dates, setDates] = useState([]);
	// called for every picker-cell (x24 for months)
	const disabledDate = (current) => {
		const nothingSelected = !dates || dates.length === 0;

		// triggered when nothing is selected
		if (nothingSelected) {
			// check if current month is inside enabledMonthsRange
			return !enabledValues.includes(current.format('YYYY-MM'));
		}
	};

	return (
		<div>
			<RangePicker
				picker='month'
				allowClear={false}
				defaultValue={selectedValues}
				defaultPickerValue={selectedValues}
				disabledDate={(current) => disabledDate(current)}
				onChange={(val) => onChange(val)}
			/>
		</div>
	);
};

AntRangePicker.propTypes = {
	selectedValues: PropTypes.any,
	enabledValues: PropTypes.any,
	onChange: PropTypes.any,
};

export default AntRangePicker;
