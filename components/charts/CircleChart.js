import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
import { useEffect } from 'react'

const CircleChart = ({ label, series }) => {
	const options = {
		chart: {
			type: 'radialBar',
			background: undefined,
		},
		plotOptions: {
			radialBar: {
				startAngle: -135,
				endAngle: 225,
				hollow: {
					margin: 0,
					size: '70%',
					background: '#1f2937',
					image: undefined,
					imageOffsetX: 0,
					imageOffsetY: 0,
					position: 'front',
					dropShadow: {
						enabled: true,
						top: 3,
						left: 0,
						blur: 4,
						opacity: 0.24,
					},
				},
				track: {
					background: '#1f2937',
					strokeWidth: '67%',
					margin: 0, // margin is in pixels
					dropShadow: {
						enabled: true,
						top: -3,
						left: 0,
						blur: 4,
						opacity: 0.35,
					},
				},

				dataLabels: {
					show: true,
					name: {
						offsetY: -10,
						show: true,
						color: '#ccc',
						fontSize: '17px',
					},
					value: {
						formatter: function (val) {
							return parseInt(val)
						},
						color: '#fff',
						fontSize: '36px',
						show: true,
					},
				},
			},
		},
		fill: {
			type: 'gradient',
			gradient: {
				shade: 'dark',
				type: 'horizontal',
				shadeIntensity: 0.5,
				gradientToColors: ['#ABE5A1'],
				inverseColors: true,
				opacityFrom: 1,
				opacityTo: 1,
				stops: [0, 100],
			},
		},
		stroke: {
			lineCap: 'round',
		},
		labels: [label],
	}

	return (
		<div>
			<Chart
				options={options}
				series={series}
				type='radialBar'
				height='280'
				width='100%'
			/>
		</div>
	)
}

export default CircleChart
