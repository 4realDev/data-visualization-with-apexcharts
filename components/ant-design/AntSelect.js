import { Select } from 'antd'
const { Option } = Select
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	removeBySelection,
	addBySelection,
	clearBySelection,
} from '../../redux/features/barChart/barChartSlice'

export default function AntSelect() {
	const barChartSeries = useSelector((state) => state.barChart.series)
	const selectedCategories = barChartSeries[0].data.map((serie) => serie.x)
	const dispatch = useDispatch()

	const handleOnSelect = (value, event) => {
		let index = selectedCategories.indexOf(value)
		console.log('Select: ' + value + 'on Index Position: ' + index)
		dispatch(addBySelection(index))
	}
	const handleOnDeselect = (value, event) => {
		let index = selectedCategories.indexOf(value)
		console.log('Deselect: ' + value + 'on Index Position: ' + index)
		dispatch(removeBySelection(value))
	}

	const handleOnClear = (value, event) => {
		dispatch(clearBySelection())
	}

	return (
		<>
			<Select
				style={{ width: 150 + 'px' }}
				onSelect={(value, event) => handleOnSelect(value, event)}
				onDeselect={(value, event) => handleOnDeselect(value, event)}
				onClear={(value, event) => handleOnClear(value, event)}
				size='small'
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
