import { Select } from 'antd'

const { Option } = Select

type AntSelectProps = {
	selectOptions: string[]
	// eslint-disable-next-line no-unused-vars
	onChange: (value: string[]) => void
}

export default function AntSelect({ selectOptions, onChange }: AntSelectProps) {
	return (
		<>
			<Select
				style={{ width: `${266}px` }}
				onChange={value => onChange(value)}
				mode='multiple'
				placeholder='Select Months'
				maxTagCount='responsive'
				defaultValue={selectOptions}
				showArrow={true}
				allowClear={false}
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
