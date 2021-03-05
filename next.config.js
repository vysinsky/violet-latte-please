// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

module.exports = {
  env: {
    DATOCMS_ENDPOINT: process.env.DATOCMS_ENDPOINT,
    DATOCMS_TOKEN: process.env.DATOCMS_TOKEN,
    GOOGLE_ANALYTICS_TRACKING_ID: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
    LOGROCKET_APP_ID: process.env.LOGROCKET_APP_ID,
    DISQUS_URL: process.env.DISQUS_URL,
    SITE_DOMAIN: process.env.SITE_DOMAIN || 'localhost:3000',
  },
}
