import { Select } from 'antd'
import PropTypes from 'prop-types'

const { Option } = Select

export default function AntSelect({ selectOptions, onChange }) {
	return (
		<>
			<Select
				style={{ width: `${266}px` }}
				onChange={value => onChange(value)}
				mode='multiple'
				placeholder='Select Months'
				maxTagCount='responsive'
				defaultValue={selectOptions}
				showArrow='true'
				allowClear='false'
			>
				{selectOptions.map((option, index) => (
					// eslint-disable-next-line react/no-array-index-key
					<Option key={index} value={option}>
						{option}
					</Option>
				))}
			</Select>
		</>
	)
}

AntSelect.propTypes = {
	selectOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
	onChange: PropTypes.func.isRequired,
}
