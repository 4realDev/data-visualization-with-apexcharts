// https://ahmedfaaid.com/blog/importing-a-browser-only-package-into-nextjs
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const BarChart = ({ title, subtitle }) => {
	const [options, setOptions] = useState({
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
		// categories -> chose on which axis [xaxis, zaxis]
		xaxis: {
			// type: 'catergory',
			// categories: [
			// 	'January',
			// 	'February',
			// 	'March',
			// 	'April',
			// 	'May',
			// 	'June',
			// 	'July',
			// 	'August',
			// 	'September',
			// 	'October',
			// 	'November',
			// 	'December',
			// ],
			hideOverlappingLabels: true,
			tickPlacement: 'on',
		},
		plotOptions: {
			bar: {
				// switch barchart to horizontal
				// borderRadius: 4,
				columnWidth: '30%',
				horizontal: false,
			},
		},
		fill: {
			// Array of color - possible to give every bar a specific color
			colors: ['#008FFB', '#00E396', '#FEB019'],
		},
	})
	// const [series, setSeries] = useState([
	// 	{
	// 		name: 'Music',
	// 		data: [14, 25, 21, 17, 12, 13, 11, 19, 23, 10, 14, 9],
	// 	},
	// 	{
	// 		name: 'Photos',
	// 		data: [13, 23, 20, 8, 13, 27, 33, 12, 8, 11, 21, 7],
	// 	},
	// 	{
	// 		name: 'Files',
	// 		data: [11, 17, 15, 15, 21, 14, 15, 13, 5, 15, 7, 11],
	// 	},
	// ])

	const series = useSelector((state) => state.barChart.series)

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
		ApexCharts.exec('zoomChart', 'updateOptions', {
			xaxis: {
				categories: [
					'January',
					'February',
					'March',
					'April',
					'May',
					'June',
					'July',
					'August',
					'September',
					'October',
					'November',
					'December',
				],
				min: start,
				max: end,
			},
		})
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
			<button
				style={{
					marginBottom: 15,
					background: '#2B2D3E',
					color: '#cccccc',
					border: 'none',
					padding: 10,
					marginRight: 15,
				}}
				onClick={() => onZoomX(1, 3)}
			>
				ZoomTest
			</button>
			<button
				style={{
					marginBottom: 15,
					background: '#2B2D3E',
					color: '#cccccc',
					border: 'none',
					padding: 10,
					marginRight: 15,
				}}
				onClick={() => onClick()}
			>
				Change Orientation
			</button>
		</>
	)
}

export default BarChart
