// https://ahmedfaaid.com/blog/importing-a-browser-only-package-into-nextjs
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
import { useState } from 'react'

const LineAreaChart = () => {
	const [options, setOptions] = useState({
		title: { text: 'Largest U.S Cities By Population' },
		subtitle: { text: 'Statistics' },
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
			colors: ['#008FFB', '#00E396', '#FEB019'],
			curve: 'straight', // smooth / straight / stepline
		},
		markers: {
			size: 0,
			strokeWidth: 0, // stroke around marker
			hover: {
				size: 6,
			},
		},
	})
	const [series, setSeries] = useState([
		{
			name: 'Music',
			data: [1, 15, 26, 20, 33, 27],
		},
		{
			name: 'Photos',
			data: [3, 33, 21, 42, 19, 32],
		},
		{
			name: 'Files',
			data: [0, 39, 52, 11, 29, 43],
		},
	])

	return (
		// Fake-DOM Element - not rendered inside the DOM
		<>
			<Chart
				options={options}
				series={series}
				type='area'
				height='328'
				width='100%' // will be defined through flex
			/>
		</>
	)
}

export default LineAreaChart
