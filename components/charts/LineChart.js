// https://ahmedfaaid.com/blog/importing-a-browser-only-package-into-nextjs
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const LineChart = ({ title, subtitle, series, seriesColor, zoom }) => {
	useEffect(() => {
		onZoomX(zoom[0], zoom[1]);
	}, [zoom]); // empty dependencies array means "run this once on first mount"

	const options = {
		title: { text: title },
		subtitle: { text: subtitle },
		chart: {
			dropShadow: {
				enabled: true,
				top: 3,
				left: 2,
				blur: 4,
				opacity: 1,
			},
		},
		stroke: {
			show: true,
			width: 2,
			colors: seriesColor,
			curve: 'smooth', // smooth / straight / stepline
		},
		markers: {
			size: 6,
			strokeWidth: 0, // stroke around marker
			colors: seriesColor,
			hover: {
				size: 9,
			},
		},
		xaxis: {
			min: zoom[0],
			max: zoom[1],
			hideOverlappingLabels: true, // needed for zooming
			tickPlacement: 'on', // needed for zooming
		},
		legend: {
			showForSingleSeries: true,
			markers: {
				fillColors: seriesColor,
			},
		},
	};

	const onZoomX = (start, end) => {
		if (window.ApexCharts) {
			ApexCharts.exec('zoomChart', 'updateOptions', {
				xaxis: {
					min: start,
					max: end,
					hideOverlappingLabels: true,
					tickPlacement: 'on',
				},
			});
		}
	};

	return (
		// Fake-DOM Element - not rendered inside the DOM
		<>
			<Chart
				options={options}
				series={series}
				type='line'
				height='328'
				width='100%' // will be defined through flex
			/>
		</>
	);
};

LineChart.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
	series: PropTypes.any,
	seriesColor: PropTypes.any,
	zoom: PropTypes.any,
};

export default LineChart;
