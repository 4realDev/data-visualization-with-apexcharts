import React from 'react'
import BarChart from '../components/charts/BarChart'
import { useSelector } from 'react-redux'

const DataGraph = ({ selectedValues }) => {
	const userSeriesData = useSelector((state) => state.barChart.series)
	// const userSeriesDataFilteredBySelection = userSeriesData.map((serie) =>
	// 	serie.data.filter((dataTuple) => selectedValues.include(dataTuple.x))
	// )

	return (
		<div>
			<BarChart
				title='Largest U.S Cities By Population'
				subtitle='Statistics'
				series={userSeriesData}
				zoom={selectedValues}
			/>
		</div>
	)
}

export default DataGraph
