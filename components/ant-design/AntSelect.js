import { Select } from 'antd'
const { Option } = Select
import React, { useState, useEffect } from 'react'

export default function AntSelect() {
	const handleOnSelect = (value, event) => {
		// let index = selectedCategories.indexOf(value)
		// console.log('Select: ' + value + 'on Index Position: ' + index)
		// dispatch(addBySelection(index))
	}
	const handleOnDeselect = (value, event) => {
		// let index = selectedCategories.indexOf(value)
		// console.log('Deselect: ' + value + 'on Index Position: ' + index)
		// dispatch(removeBySelection(value))
	}

	const handleOnClear = (value, event) => {
		// dispatch(clearBySelection())
	}

	const selectedCategories = [1, 2, 3]

	return (
		<>
			<Select
				style={{ width: 266 + 'px' }}
				onSelect={(value, event) => handleOnSelect(value, event)}
				onDeselect={(value, event) => handleOnDeselect(value, event)}
				onClear={(value, event) => handleOnClear(value, event)}
				mode='multiple'
				placeholder='Select Months'
				maxTagCount='responsive'
				defaultValue={selectedCategories}
				value={selectedCategories}
				showArrow='true'
				allowClear='true'
			>
				{selectedCategories.map((category, index) => (
					<Option key={index} value={category}>
						{category}
					</Option>
				))}
			</Select>
		</>
	)
}
