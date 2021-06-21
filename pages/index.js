import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react'

import DataGraph from '../components/DataGraph'
import { initDefaultCharLayout } from '../components/charts/DefaultLayout'

import Select from '../components/ant-design/AntSelect'
import RangePicker from '../components/ant-design/AntRangePicker'
import moment from 'moment'

import { useDispatch, useSelector } from 'react-redux'
import chartSlice, {
	fetchChartData,
	filterNormalizedSeriesByMonths,
} from '../redux/features/chartData/chartSlice'
import rangePickerSlice, {
	setRangePickerSelection,
	setRangePickerSelectionMonths,
} from '../redux/features/rangePicker/rangePickerSlice'

export default function Home({ chartData }) {
	const dispatch = useDispatch()

	const rangePickerSelection = useSelector(
		(state) => state.rangePicker.selection
	)
	const rangePickerEnabledValues = useSelector(
		(state) => state.rangePicker.enabledValues
	)

	useEffect(function onFirstMount() {
		initDefaultCharLayout()
		dispatch(fetchChartData())
	}, []) // empty dependencies array means "run this once on first mount"

	const onRangePickerValuesChanged = (newSelection) => {
		const newSelectionMonths = newSelection.map(
			(selection) => parseInt(selection.month() + 1) // convert "Mon Feb 01 2021" to "02"
		)
		dispatch(setRangePickerSelection(newSelection))
		dispatch(setRangePickerSelectionMonths(newSelectionMonths))
		dispatch(filterNormalizedSeriesByMonths(newSelectionMonths))
	}

	return (
		<div className='min-h-screen bg-gray-800'>
			<h1 className='text-white text-center text-4xl font-semibold py-5'>
				DASHBOARD
			</h1>

			<p className='text-white font-semibold p-0 mg-0 px-20'>
				Select data-range:
			</p>
			<div className='px-20'>
				<RangePicker
					selectedValues={rangePickerSelection}
					enabledValues={rangePickerEnabledValues}
					onChange={onRangePickerValuesChanged}
				/>
			</div>
			<DataGraph selection={rangePickerSelection} />
		</div>
	)
}
