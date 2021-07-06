import { Moment } from 'moment'
import { DatePicker } from 'antd'
import { RangeValue } from 'rc-picker/lib/interface'

const { RangePicker } = DatePicker

type AntRangePickerProps = {
	selectedValues: [Moment, Moment]
	enabledValues: string[]
	// eslint-disable-next-line no-unused-vars
	onChange: (value: RangeValue<Moment>) => void
}

const AntRangePicker = ({ selectedValues, enabledValues, onChange }: AntRangePickerProps) => {
	const dates: Moment[] = []
	// called for every picker-cell (x24 for months)
	const disabledDate = (current: Moment): boolean => {
		const nothingSelected = !dates || dates.length === 0

		// triggered when nothing is selected
		if (nothingSelected) {
			// check if current month is inside enabledMonthsRange
			return !enabledValues.includes(current.format('YYYY-MM'))
		}

		return false

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
				allowClear={false}
				defaultValue={selectedValues}
				defaultPickerValue={selectedValues}
				disabledDate={(current: Moment) => disabledDate(current)}
				onChange={(values: RangeValue<Moment>) => onChange(values)}
			/>
		</div>
	)
}

export default AntRangePicker
