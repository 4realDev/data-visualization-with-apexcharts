import { useState } from 'react'
import { DatePicker } from 'antd'
const { RangePicker } = DatePicker
import moment from 'moment'

const AntRangePicker = ({ selectedValues, enabledValues, onChange }) => {
	const [dates, setDates] = useState([])
	// called for every picker-cell (x24 for months)
	const disabledDate = (current) => {
		let nothingSelected = !dates || dates.length === 0

		// triggered when nothing is selected
		if (nothingSelected) {
			// check if current month is inside enabledMonthsRange
			return !enabledValues.includes(current.format('YYYY-MM'))
		}

		// Get difference between current date and first selection
		// If difference is bigger then 7, the current date is already too late
		// const tooLate = dates[0] && current.diff(dates[0], 'months') > 7
		// const tooEarly = dates[1] && dates[1].diff(current, 'months') > 7
		// return tooEarly || tooLate
	}

	return (
		<div>
			<RangePicker
				picker='month'
				defaultValue={selectedValues}
				defaultPickerValue={selectedValues}
				disabledDate={(current) => disabledDate(current)}
				onChange={(val) => onChange(val)}
			/>
		</div>
	)
}

export default AntRangePicker
