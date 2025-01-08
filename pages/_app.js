import '../styles/globals.css';
import 'antd/dist/antd.css';
import React, { Component } from 'react';
import store from '../redux/store';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

MyApp.propTypes = {
	Component: PropTypes.any,
	pageProps: PropTypes.any,
};

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
