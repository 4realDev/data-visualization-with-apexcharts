import '../styles/globals.css'
import 'antd/dist/antd.css'
import { Provider } from 'react-redux'
import store from '../redux/store'

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	)
}

export default MyApp
