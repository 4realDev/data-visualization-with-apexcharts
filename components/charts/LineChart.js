// https://ahmedfaaid.com/blog/importing-a-browser-only-package-into-nextjs
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
import { useEffect } from 'react'

const LineChart = ({ title, subtitle, series, zoom }) => {
	useEffect(() => {
		onZoomX(parseInt(zoom[0].format('MM')), parseInt(zoom[1].format('MM')))
	}, [zoom]) // empty dependencies array means "run this once on first mount"

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
			colors: ['#008FFB', '#00E396', '#FEB019'],
			curve: 'smooth', // smooth / straight / stepline
		},
		markers: {
			size: 6,
			strokeWidth: 0, // stroke around marker
			hover: {
				size: 9,
			},
		},
		xaxis: {
			min: parseInt(zoom[0].format('MM')),
			max: parseInt(zoom[1].format('MM')),
			hideOverlappingLabels: true, // needed for zooming
			tickPlacement: 'on', // needed for zooming
		},
	}

	const onZoomX = (start, end) => {
		if (window.ApexCharts) {
			ApexCharts.exec('zoomChart', 'updateOptions', {
				xaxis: {
					min: start,
					max: end,
					hideOverlappingLabels: true,
					tickPlacement: 'on',
				},
			})
		}
	}

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
	)
}

export default LineChart
