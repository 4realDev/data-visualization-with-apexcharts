import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
import { useEffect } from 'react'

// CircleChart currently only supports no range settings (values will be always related to 100% range)

const CircleChart = ({ label, serieValue, maxValue, color }) => {
	const options = {
		chart: {
			type: 'radialBar',
			background: undefined,
		},
		plotOptions: {
			radialBar: {
				startAngle: 0,
				endAngle: 360,
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
				//gradientToColors: ['#fff'],
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
		colors: [color],
		responsive: [
			{
				breakpoint: 600,
				options: {
					chart: {
						height: 160,
					},
					plotOptions: {
						radialBar: {
							dataLabels: {
								name: {
									offsetY: -5,
									fontSize: '14px',
								},
								value: {
									offsetY: 5,
									fontSize: '18px',
								},
							},
						},
					},
				},
			},
		],
	}

	const max = maxValue
	const valueToPercent = (value) => {
		return (value * 100) / max
	}

	return (
		<div>
			<Chart
				options={options}
				series={[serieValue]}
				type='radialBar'
				height='250'
				width='100%'
			/>
		</div>
	)
}

export default CircleChart
