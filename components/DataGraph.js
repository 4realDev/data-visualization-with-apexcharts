import React from 'react'
import BarChart from '../components/charts/BarChart'
import LineChart from '../components/charts/LineChart'
import CircleChart from '../components/charts/CircleChart'
import LineAreaChart from '../components/charts/LineAreaChart'
import HeatMapChart from '../components/charts/HeatMapChart'
import { useSelector } from 'react-redux'

const DataGraph = ({ selectedValues }) => {

	const userSeriesData = useSelector((state) => state.chartData.series)

	const selectedMonths = selectedValues.map((selectedValue) =>
		parseInt(selectedValue.month())
	)

	console.log('data-1', userSeriesData);
	const userSeriesDataFilteredBySelection = userSeriesData.map((serie) =>
		serie.data.reduce(
			(filtered, dataTuple) => {
				let month = undefined
				switch (dataTuple.x) {
					case 'January':
						month = 0
						break
					case 'February':
						month = 1
						break
					case 'March':
						month = 2
						break
					case 'April':
						month = 3
						break
					case 'May':
						month = 4
						break
					case 'June':
						month = 5
						break
					case 'July':
						month = 6
						break
					case 'August':
						month = 7
						break
					case 'September':
						month = 8
						break
					case 'October':
						month = 9
						break
					case 'November':
						month = 10
						break
					case 'December':
						month = 11
						break
					default:
						console.warn(
							'Month name ' +
								dataTuple.x +
								' does not match normalisation!'
						)
				}
				if (month <= selectedMonths[1] && month >= selectedMonths[0])
					filtered.push(dataTuple)
				return filtered
			},
			[]
			//(dataTuple) => filter(dataTuple.y)

			// console.log(month)
			// console.log(
			// 	month <= selectedMonths[1] && month >= selectedMonths[0]
			// )

			// month <= selectedMonths[1] && month >= selectedMonths[0]
		)
	)

	const userSeriesDataSum = userSeriesDataFilteredBySelection.map((serie) => {
		let total = 0
		serie.forEach((dataSet) => {
			total = total + dataSet.y
		})
		return total
	})

	console.log(userSeriesDataFilteredBySelection)
	console.log(userSeriesDataSum)

	const music = userSeriesDataFilteredBySelection[0]

	return (
		<div className='min-h-screen flex items-center bg-gray-800'>
			<div className='flex-1 mx-auto text-gray-300 p-10 sm:p-10 md:p-15'>
				<div className='grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-y-0 gap-x-4 grid-flow-row'>
					<div className='col-span-1 sm:col-span-1 md:col-span-2'>
						<CircleChart
							label='Music'
							//labels={lineChartDataLabels}
							serieValue={userSeriesDataSum[0] || 0}
							maxValue={200}
							color='#008ffb'
						/>
					</div>
					<div className='col-span-1 sm:col-span-1 md:col-span-2'>
						<CircleChart
							label='Photos'
							//labels={lineChartDataLabels}
							serieValue={userSeriesDataSum[1] || 0}
							maxValue={200}
							color='#00e396'
						/>
					</div>
					<div className='col-span-1 sm:col-span-1 md:col-span-2'>
						<CircleChart
							label='Files'
							//labels={lineChartDataLabels}
							serieValue={userSeriesDataSum[2] || 0}
							maxValue={200}
							color='#feb019'
						/>
					</div>
					<div className='col-span-3'>
						<LineChart
							title='Largest U.S Cities By Population'
							subtitle='Statistics'
							//labels={lineChartDataLabels}
							series={userSeriesData}
							zoom={selectedValues}
						/>
					</div>
					<div className='col-span-3'>
						<BarChart
							title='Largest U.S Cities By Population'
							subtitle='Statistics'
							series={userSeriesData}
							zoom={selectedValues}
						/>
					</div>
					<div className='col-span-3'>
						<LineAreaChart />
					</div>
					<div className='col-span-3'>
						<HeatMapChart />
					</div>
				</div>
			</div>
		</div>
	)
}

export default DataGraph
