import { lineChartDataLabels } from '../../../data'

export default function handler(req, res) {
	res.status(200).json(lineChartDataLabels)
}

// in the store
// use redux
// when components mount
// store fetches the data -> api call
// reduce returns new data
