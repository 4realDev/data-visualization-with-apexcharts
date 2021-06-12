import React from 'react'
import BarChart from '../components/charts/BarChart'
import LineChart from '../components/charts/LineChart'
import LineAreaChart from '../components/charts/LineAreaChart'
import HeatMapChart from '../components/charts/HeatMapChart'
import { useSelector } from 'react-redux'

const DataGraph = ({ selectedValues }) => {
	const userSeriesData = useSelector((state) => state.barChart.series)
	// const userSeriesDataFilteredBySelection = userSeriesData.map((serie) =>
	// 	serie.data.filter((dataTuple) => selectedValues.include(dataTuple.x))
	// )

	return (
		<div className='min-h-screen flex items-center bg-gray-800'>
			<div className='flex-1 mx-auto text-gray-300 p-20'>
				<div className='grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-y-0 gap-x-4 grid-flow-row'>
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
