// https://ahmedfaaid.com/blog/importing-a-browser-only-package-into-nextjs
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false }) // latency
import { useEffect } from 'react'
import { COLORS } from '../../helper/colors'

const BarChart = ({ title, subtitle, series, zoom }) => {
	useEffect(() => {
		onZoomX(zoom[0], zoom[1])
	}, [zoom]) // empty dependencies array means "run this once on first mount"

	const options = {
		title: { text: title },
		subtitle: { text: subtitle },
		// Necessary to stack multiple series of data on one category
		chart: {
			id: 'zoomChart',
			stacked: true,
			zoom: {
				enable: true,
			},
		},
		plotOptions: {
			bar: {
				columnWidth: '30%',
				horizontal: false,
			},
		},
		fill: {
			// Array of color - possible to give every bar a specific color
			colors: [
				COLORS.chartDataBlue,
				COLORS.chartDataGreen,
				COLORS.chartDataOrange,
			],
		},
		xaxis: {
			min: zoom[0],
			max: zoom[1],
			hideOverlappingLabels: true, // needed for zooming
			tickPlacement: 'on', // needed for zooming
		},
	}

	// TODO: REMOVE TO EXTERNAL BUTTON COMPONENT
	const onClick = () => {
		// if we want to change the horizontal option inside the IMMUTABLE STATE
		// we need to go deep inside the nested objects and copy everything before with the SPREAD-OPERATOR
		// options > plotOptions > bar > horizontal
		const newOptions = {
			...options,
			plotOptions: {
				...options.plotOptions,
				bar: {
					...options.plotOptions.bar,
					horizontal: !options.plotOptions.bar.horizontal,
				},
			},
		}

		setOptions(newOptions)
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
				type='bar'
				height='328'
				width='100%'
			/>
		</>
	)
}

export default BarChart
