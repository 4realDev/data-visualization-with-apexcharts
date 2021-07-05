// https://ahmedfaaid.com/blog/importing-a-browser-only-package-into-nextjs

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { COLORS } from '../../helper/colors'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const HeatMapChart = () => {
	const [options] = useState({
		title: { text: 'Random Data HeatMap' },
		subtitle: { text: 'Single Color' },
		plotOptions: {
			heatmap: {
				// useFillColorAsStroke: true,
				colorScale: {
					ranges: [
						{
							from: -30,
							to: 5,
							color: COLORS.chartZoneMinimum,
							name: 'minimum',
						},
						{
							from: 6,
							to: 20,
							color: COLORS.chartZoneLow,
							name: 'low',
						},
						{
							from: 21,
							to: 45,
							color: COLORS.chartZoneMedium,
							name: 'medium',
						},
						{
							from: 46,
							to: 60,
							color: COLORS.chartZoneHigh,
							name: 'high',
						},
						{
							from: 61,
							to: 75,
							color: COLORS.chartZoneVeryHigh,
							name: 'very high',
						},
						{
							from: 76,
							to: 90,
							color: COLORS.chartZoneDangerous,
							name: 'dangerous',
						},
					],
				},
			},
		},
		labels: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Philadelphia', 'Phoenix', 'San Antonio', 'San Diego'],
		stroke: {
			show: true,
			width: 1.5,
			colors: [COLORS.chartLayoutBackground],
		},
		// fill: {
		// 	opacity: 0.5,
		// },
	})

	const [series] = useState([
		{
			name: 'Metric1',
			data: [12, 12, 4, 2, 64, 2, 4, 7],
			/*
			also possible:
			data: [{x: 12, y: 1}, {x:3, y:8}, ..]
			*/
		},
		{
			name: 'Metric2',
			data: [34, 34, 23, 54, 23, 2, 45, 7],
		},
		{
			name: 'Metric3',
			data: [12, 8, 12, 67, 34, 2, 54, 7],
		},
		{
			name: 'Metric4',
			data: [35, 45, 45, 65, 22, 7, 2, 64],
		},
		{
			name: 'Metric5',
			data: [45, 54, 87, 23, 4, 2, 33, 45],
		},
	])

	return (
		// Fake-DOM Element - not rendered inside the DOM
		<>
			<Chart
				options={options}
				series={series}
				type='heatmap'
				height='328'
				width='100%' // will be defined through flex
			/>
		</>
	)
}

export default HeatMapChart
