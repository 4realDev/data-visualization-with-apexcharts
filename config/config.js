const dev = process.env.Node_ENV !== 'production' // check the node environment
export const server = dev ? 'http://localhost:3000' : 'https://ADJUST_ACCORDING_TO_DOMAIN_NAME.com'
