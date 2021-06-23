import React, { useEffect } from 'react'
import BarChart from '../components/charts/BarChart'
import LineChart from '../components/charts/LineChart'
import CircleChart from '../components/charts/CircleChart'
import LineAreaChart from '../components/charts/LineAreaChart'
import HeatMapChart from '../components/charts/HeatMapChart'
import { useSelector } from 'react-redux'

import { renderSeriesDataMonths } from '../components/helper/NormalizerMonths'

import { Spin } from 'antd'

const DataGraphsContainer = () => {
	const userSeriesData = useSelector((state) => state.chartData.series)

	const rangePickerSelection = useSelector(
		(state) => state.rangePicker.selection
	)

	const filteredNormalizedSeriesData = useSelector(
		(state) => state.chartData.filteredNormalizedSeries
	)

	const filteredRenderedSeriesData = renderSeriesDataMonths(
		filteredNormalizedSeriesData
	)

	const userSeriesLoading = useSelector((state) => state.chartData.loading)

	useEffect(() => {
		if (userSeriesLoading === 'idle') {
			console.log(userSeriesLoading)
		} else {
			console.log(userSeriesLoading)
		}
	}, [userSeriesLoading])

	const userSeriesDataSum = filteredRenderedSeriesData.map((serie) => {
		let total = 0
		serie.data.forEach((dataSet) => {
			total = total + dataSet.y
		})
		return total
	})

	const musicDataSum = userSeriesLoading === 'idle' ? userSeriesDataSum[0] : 1
	const photoDataSum = userSeriesLoading === 'idle' ? userSeriesDataSum[1] : 1
	const fileDataSum = userSeriesLoading === 'idle' ? userSeriesDataSum[2] : 1

	return (
		<div className='min-h-screen flex items-center bg-gray-800'>
			<div className='flex-1 mx-auto text-gray-300'>
				<div className='grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 grid-rows-3 gap-y-0 gap-x-4 grid-flow-row'>
					<div className='col-span-1 row-span-1 sm:col-span-1 md:col-span-2 justify-center items-center my-10'>
						<CircleChart
							label='Music'
							serieValue={[musicDataSum]}
							maxValue={200}
							color='#008ffb'
						/>
					</div>
					<div className='col-span-1 row-span-1 sm:col-span-1 md:col-span-2 justify-center items-center my-10'>
						<CircleChart
							label='Photos'
							//labels={lineChartDataLabels}
							serieValue={[photoDataSum]}
							maxValue={200}
							color='#00e396'
						/>
					</div>
					<div className='col-span-1 row-span-1 sm:col-span-1 md:col-span-2 justify-center items-center my-10'>
						<CircleChart
							label='Files'
							//labels={lineChartDataLabels}
							serieValue={[fileDataSum]}
							maxValue={200}
							color='#feb019'
						/>
					</div>
					<div className='col-span-3 row-span-1'>
						<LineChart
							title='Largest U.S Cities By Population'
							subtitle='Statistics'
							//labels={lineChartDataLabels}
							series={filteredRenderedSeriesData}
							zoom={rangePickerSelection}
						/>
					</div>
					<div className='col-span-3 row-span-1'>
						<BarChart
							title='Largest U.S Cities By Population'
							subtitle='Statistics'
							series={filteredRenderedSeriesData}
							zoom={rangePickerSelection}
						/>
					</div>
					<div className='col-span-3 row-span-1'>
						<LineAreaChart />
					</div>
					<div className='col-span-3 row-span-1'>
						<HeatMapChart />
					</div>
				</div>
			</div>
		</div>
	)
}

export default DataGraphsContainer
