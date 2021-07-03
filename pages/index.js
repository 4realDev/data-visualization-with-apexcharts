import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import DataGraphsContainer from '../components/DataGraphsContainer';
import DataFiltersContainer from '../components/DataFiltersContainer';
import { initDefaultCharLayout } from '../components/charts/DefaultLayout';
import { fetchChartData } from '../redux/features/chartData/chartSlice';
import { COLORS } from '../helper/colors';

export default function Home() {
	const dispatch = useDispatch();

	useEffect(() => {
		initDefaultCharLayout();
		dispatch(fetchChartData());
	}, []); // empty dependencies array means "run this once on first mount"

	return (
		<div
			className='min-h-screen p-5 sm:p-10 md:p-20'
			style={{ backgroundColor: COLORS.mainLayoutBackground }}
		>
			<h1 className='text-white text-center text-4xl font-semibold py-5'>
				DASHBOARD
			</h1>
			<DataFiltersContainer />
			<DataGraphsContainer />
		</div>
	);
}
