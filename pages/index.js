import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react'

import DataGraph from '../components/DataGraph'
import { initDefaultCharLayout } from '../components/charts/DefaultLayout'

import Select from '../components/ant-design/AntSelect'
import RangePicker from '../components/ant-design/AntRangePicker'
import moment from 'moment'

import { useDispatch } from 'react-redux'
import chartSlice, {
	setInitialChartData,
	fetchChartData,
} from '../redux/features/chartData/chartSlice'

export default function Home({ chartData }) {
	const dispatch = useDispatch()
	useEffect(function onFirstMount() {
		initDefaultCharLayout()
		dispatch(fetchChartData())
		//dispatch(setInitialChartData(chartData))
		// call store - mutate data
	}, []) // empty dependencies array means "run this once on first mount"

	const [rangePickerSelectedValues, setRangePickerSelectedValues] = useState([
		moment('2021-01', 'YYYY-MM'),
		moment('2021-12', 'YYYY-MM'),
	])

	const rangePickerEnabledValues = [
		'2021-01',
		'2021-02',
		'2021-03',
		'2021-04',
		'2021-05',
		'2021-06',
		'2021-07',
		'2021-08',
		'2021-09',
		'2021-10',
		'2021-11',
		'2021-12',
	]

	const onRangePickerValuesChanged = (newValues) => {
		setRangePickerSelectedValues(newValues)
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
					selectedValues={rangePickerSelectedValues}
					enabledValues={rangePickerEnabledValues}
					onChange={onRangePickerValuesChanged}
				/>
			</div>
			<DataGraph selectedValues={rangePickerSelectedValues} />
		</div>
	)
}
