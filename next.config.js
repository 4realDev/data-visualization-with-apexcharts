/**
 * @type {import('next').NextConfig}
 */

module.exports = {
	cssModules: true,
	cssLoaderOptions: {
		importLoaders: 1,
		localIdentName: '[]',
	},
	output: 'export',
	// Optional: Enable static export
	target: 'serverless',
	// Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
	trailingSlash: true,
	// TODO: IMPORTANT: command out for running on localhost
	// basePath: '/data-visualization',

	// Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
	// skipTrailingSlashRedirect: true,

	// Optional: Change the output directory `out` -> `dist`
	// distDir: 'dist',
};
