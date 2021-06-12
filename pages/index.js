import { server } from '../config/config'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react'

import DataGraph from '../components/DataGraph'
import LineChart from '../components/charts/LineChart'
import LineAreaChart from '../components/charts/LineAreaChart'
import HeatMapChart from '../components/charts/HeatMapChart'
import { initDefaultCharLayout } from '../components/charts/DefaultLayout'

import Select from '../components/ant-design/AntSelect'
import RangePicker from '../components/ant-design/AntRangePicker'
import moment from 'moment'

import { useDispatch } from 'react-redux'
import barChartSlice, {
	setInitialBarChartData,
} from '../redux/features/barChart/barChartSlice'

export default function Home({
	lineChartDataSeries,
	lineChartDataLabels,
	barChartData,
}) {
	const dispatch = useDispatch()
	useEffect(function onFirstMount() {
		initDefaultCharLayout()
		dispatch(setInitialBarChartData(barChartData))
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
		<div className='min-h-screen flex items-center bg-gray-800'>
			<div className='flex-1 mx-auto text-gray-300 p-20'>
				<h1 className='text-white text-center text-4xl font-semibold pb-5'>
					DASHBOARD
				</h1>
				<div className='flex-1 mb-3.5'>
					<p className='font-semibold p-0 mg-0'>Select data-range:</p>
					<RangePicker
						selectedValues={rangePickerSelectedValues}
						enabledValues={rangePickerEnabledValues}
						onChange={onRangePickerValuesChanged}
					/>
				</div>
				<div className='grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-y-0 gap-x-4 grid-flow-row'>
					<div className='col-span-3'>
						<LineChart
							title='Largest U.S Cities By Population'
							subtitle='Statistics'
							labels={lineChartDataLabels}
							series={lineChartDataSeries}
						/>
					</div>
					<div className='col-span-3'>
						<LineAreaChart />
					</div>
					<div className='col-span-3'>
						{/* <div className='flex absolute top-0 right-0 z-10 mx-1.5 my-3.5'>
							<Select />
						</div>

						<button
							onClick={() =>
								dispatch(setInitialBarChartData(barChartData))
							}
						>
							Add all Months
						</button> */}
						<DataGraph selectedValues={rangePickerSelectedValues} />
					</div>
					<div className='col-span-3'>
						<HeatMapChart />
					</div>
				</div>
			</div>
		</div>
	)
}

export const getStaticProps = async () => {
	const resLineChartSeries = await fetch(`${server}/api/lineChartDataSeries`)
	const lineChartDataSeries = await resLineChartSeries.json()

	const resLineChartLabels = await fetch(`${server}/api/lineChartDataLabels`)
	const lineChartDataLabels = await resLineChartLabels.json()

	const resBarChartData = await fetch(`${server}/api/barChartData`)
	const barChartData = await resBarChartData.json()

	return {
		props: {
			lineChartDataSeries,
			lineChartDataLabels,
			barChartData,
		},
	}
}
