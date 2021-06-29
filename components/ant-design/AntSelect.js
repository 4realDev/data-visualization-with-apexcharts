import { Select } from 'antd'
const { Option } = Select
import React, { useState, useEffect } from 'react'

export default function AntSelect({ selectOptions, onChange }) {
	return (
		<>
			<Select
				style={{ width: 266 + 'px' }}
				onChange={(value) => onChange(value)}
				mode='multiple'
				placeholder='Select Months'
				maxTagCount='responsive'
				defaultValue={selectOptions}
				//value={selectOptions}
				showArrow='true'
				allowClear='false'
			>
				{selectOptions.map((option, index) => (
					<Option key={index} value={option}>
						{option}
					</Option>
				))}
			</Select>
		</>
	)
}
