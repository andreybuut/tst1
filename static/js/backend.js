(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("b/config.js", function(exports, require, module) {
'use strict';

// -------------------------------------------------------
// Common config values should go here
// =======================================================
var common = {};

var BASE_URL = '/api/v1/';

// -------------------------------------------------------
// Local config
// =======================================================
var local = Object.assign({}, common, {
  api: {
    host: 'http://localhost:8000' + BASE_URL
  }
});

// -------------------------------------------------------
// Development config
// =======================================================
var development = Object.assign({}, common, {
  api: {
    host: BASE_URL
  }
});

// -------------------------------------------------------
// Staging config
// =======================================================
var staging = Object.assign({}, common, {
  api: {
    host: BASE_URL
  }
});

// -------------------------------------------------------
// Production config
// =======================================================
var production = Object.assign({}, common, {
  api: {
    host: BASE_URL
  }
});

/**
 * Returns the configuration based on domain
 * @returns {object}
 */
function getConfig() {
  switch (window.location.hostname) {
    case 'localhost': // fallthrough

    case '127.0.0.1':
      return local;

    case 'd-hosting.com':
      return development;

    case 's-hosting.com':
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
var config = Object.assign({}, getConfig());

/**
 * @summary Returns the configuration parameter.
 *
 * @author Dmitry Semenov
 *
 * @param {str} key - config's key
 */
function getItem(key) {
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
function setItem(key, value) {
  config[key] = value;
}

Object.assign(config, {
  getItem: getItem,
  setItem: setItem
});

module.exports = config;
});

require.register("bc/index.js", function(exports, require, module) {
"use strict";
});

;require.alias("process/browser.js", "process");
require.alias("vue/dist/vue.common.js", "vue");process = require('process');require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window["$"] = require("jquery");
window.jQuery = require("jquery");
window.bootstrap = require("bootstrap");
window.selectpicker = require("bootstrap-select");
window.datepicker = require("bootstrap-datepicker");
window.table = require("bootstrap-table");
window.svg4everybody = require("svg4everybody");
window.vuetify = require("vuetify");


});})();require('___globals___');

require('bc/index');
//# sourceMappingURL=backend.js.map