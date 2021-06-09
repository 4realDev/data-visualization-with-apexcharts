// https://ahmedfaaid.com/blog/importing-a-browser-only-package-into-nextjs
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
import { useState } from 'react'

const LineChart = ({ title, subtitle, labels, series }) => {
	const [options, setOptions] = useState({
		title: { text: title },
		subtitle: { text: subtitle },
		labels: labels,
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
	})

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
