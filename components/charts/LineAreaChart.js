// https://ahmedfaaid.com/blog/importing-a-browser-only-package-into-nextjs
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import React, { useState } from 'react';
import { COLORS } from '../../helper/colors';
import PropTypes from 'prop-types';

const LineAreaChart = ({ title, subtitle, seriesColor, zoom }) => {
	const [options, setOptions] = useState({
		title: { text: title },
		subtitle: { text: subtitle },
		labels: [
			'New York',
			'Los Angeles',
			'Chicago',
			'Houston',
			'Philadelphia',
			'Phoenix',
			'San Antonio',
			'San Diego',
			'Dallas',
			'San Jose',
		],
		stroke: {
			show: true,
			width: 2,
			colors: [COLORS.chartDataBlue, COLORS.chartDataGreen, COLORS.chartDataOrange],
			curve: 'straight', // smooth / straight / stepline
		},
		markers: {
			size: 0,
			strokeWidth: 0, // stroke around marker
			hover: {
				size: 6,
			},
		},
	});

	const [series, setSeries] = useState([
		{
			name: 'Children',
			data: [1, 15, 26, 20, 33, 27],
		},
		{
			name: 'Teenager',
			data: [3, 33, 21, 42, 19, 32],
		},
		{
			name: 'Adults',
			data: [0, 39, 52, 11, 29, 43],
		},
	]);

	return (
		// Fake-DOM Element - not rendered inside the DOM
		<>
			<Chart
				options={options}
				series={series}
				seriesColor={seriesColor}
				type='area'
				height='328'
				width='100%' // will be defined through flex
			/>
		</>
	);
};

LineAreaChart.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
	series: PropTypes.any,
	seriesColor: PropTypes.any,
	zoom: PropTypes.any,
};

export default LineAreaChart;
