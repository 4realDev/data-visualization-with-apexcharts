import Head from 'next/head'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'

import DataGraphsContainer from '../components/DataGraphsContainer'
import DataFiltersContainer from '../components/DataFiltersContainer'
import { initDefaultCharLayout } from '../components/charts/DefaultLayout'

import { useDispatch } from 'react-redux'
import chartSlice, {
	fetchChartData,
} from '../redux/features/chartData/chartSlice'

import { COLORS } from '../helper/colors'

export default function Home({ chartData }) {
	const dispatch = useDispatch()

	useEffect(function onFirstMount() {
		initDefaultCharLayout()
		dispatch(fetchChartData())
	}, []) // empty dependencies array means "run this once on first mount"

	return (
		<div
			className='min-h-screen p-10 sm:p-10 md:p-20'
			style={{ backgroundColor: COLORS.mainLayoutBackground }}
		>
			<h1 className='text-white text-center text-4xl font-semibold py-5'>
				DASHBOARD
			</h1>
			<DataFiltersContainer />
			<DataGraphsContainer />
		</div>
	)
}
