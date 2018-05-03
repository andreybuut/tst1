// -------------------------------------------------------
// Common config values should go here
// =======================================================
const common = {};

const BASE_URL = '/api/v1/';

// -------------------------------------------------------
// Local config
// =======================================================
const local = Object.assign({}, common, {
  api: {
    host: `http://localhost:8000${BASE_URL}`,
  },
});

// -------------------------------------------------------
// Development config
// =======================================================
const development = Object.assign({}, common, {
  api: {
    host: BASE_URL,
  },
});

// -------------------------------------------------------
// Staging config
// =======================================================
const staging = Object.assign({}, common, {
  api: {
    host: BASE_URL,
  },
});

// -------------------------------------------------------
// Production config
// =======================================================
const production = Object.assign({}, common, {
  api: {
    host: BASE_URL,
  },
});

/**
 * Returns the configuration based on domain
 * @returns {object}
 */
function getConfig () {
  switch (window.location.hostname) {
    case 'localhost': // fallthrough

    case '127.0.0.1':
      return local;

    case 'livechat.saritasa-hosting.com':
      return development;

    case 'livechat-staging.saritasa-hosting.com':
      return staging;

    case 'yourdomain.com':
      return production;

    default:
      // we do not know yet production server DNS so we use production
      // environment by default
      // throw new Error(`Unknown environment: ${window.location.hostname}`);
      return production;
  }
}

/**
 * Define actual configuration to be used
 */
const config = Object.assign({}, getConfig());

/**
 * @summary Returns the configuration parameter.
 *
 * @author Dmitry Semenov
 *
 * @param {str} key - config's key
 */
function getItem (key) {
  return key in config ? config[key] : null;
}

/**
 * @summary Sets the configuration parameter.
 *
 * @author Dmitry Semenov
 *
 * @param {str} key - config's key
 * @param {str|number|boolean} value - config's key value
 */
function setItem (key, value) {
  config[key] = value;
}

Object.assign(config, {
  getItem,
  setItem,
});

module.exports = config;
