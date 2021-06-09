// data could come from anywhere (here file - but could also be DB)

import { lineChartDataSeries } from '../../../data' // import data from backend rest api
export default function handler(req, res) {
	// serving data from api
	// if everything is good (200) attach data to response
	// accessible by: localhost:3000/api/lineChartDataSeries
	res.status(200).json(lineChartDataSeries)
}
