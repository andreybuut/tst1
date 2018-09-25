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
require.register("s/App.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TheCenterContainer = require('s/components/layout/TheCenterContainer');

var _TheCenterContainer2 = _interopRequireDefault(_TheCenterContainer);

var _NavBar = require('s/components/layout/NavBar');

var _NavBar2 = _interopRequireDefault(_NavBar);

var _vuetify = require('vuetify');

var _vuetify2 = _interopRequireDefault(_vuetify);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vuetify2.default);
_vue2.default.use(_vuetify2.default, {
  components: {
    VNavigationDrawer: _vuetify2.default
  },
  theme: {
    primary: '#ee44aa',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
});

exports.default = {
  name: 'App',
  data: function data() {
    return {
      lorem: 'Lorem ipsum dolor sit amet, mel at clita quando. Te oratio vit.'
    };
  },
  components: {
    'nav-bar': _NavBar2.default
  },
  template: '<App/>'
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app"}},[_c('v-app',{attrs:{"id":"inspire"}},[_c('nav-bar'),_vm._v(" "),_c('v-container',{attrs:{"fluid":"","grid-list-md":""}},[_c('v-layout',{attrs:{"row":"","wrap":""}},[_c('v-flex',{attrs:{"d-flex":"","xs12":"","sm6":"","md4":""}},[_c('v-card',{attrs:{"color":"purple","dark":""}},[_c('v-card-title',{staticClass:"title",attrs:{"primary":""}},[_vm._v("Lorem")]),_vm._v(" "),_c('v-card-text',{domProps:{"textContent":_vm._s(_vm.lorem)}})],1)],1),_vm._v(" "),_c('v-flex',{attrs:{"d-flex":"","xs12":"","sm6":"","md3":""}},[_c('v-layout',{attrs:{"row":"","wrap":""}},[_c('v-flex',{attrs:{"d-flex":""}},[_c('v-card',{attrs:{"color":"indigo","dark":""}},[_c('v-card-text',{domProps:{"textContent":_vm._s(_vm.lorem.slice(0, 70))}})],1)],1),_vm._v(" "),_c('v-flex',{attrs:{"d-flex":""}},[_c('v-layout',{attrs:{"row":"","wrap":""}},_vm._l((2),function(n){return _c('v-flex',{key:n,attrs:{"d-flex":"","xs12":""}},[_c('v-card',{attrs:{"color":"red lighten-2","dark":""}},[_c('v-card-text',{domProps:{"textContent":_vm._s(_vm.lorem.slice(0, 40))}})],1)],1)}))],1)],1)],1),_vm._v(" "),_c('v-flex',{attrs:{"d-flex":"","xs12":"","sm6":"","md2":"","child-flex":""}},[_c('v-card',{attrs:{"color":"green lighten-2","dark":""}},[_c('v-card-text',{domProps:{"textContent":_vm._s(_vm.lorem.slice(0, 90))}})],1)],1),_vm._v(" "),_c('v-flex',{attrs:{"d-flex":"","xs12":"","sm6":"","md3":""}},[_c('v-card',{attrs:{"color":"blue lighten-2","dark":""}},[_c('v-card-text',{domProps:{"textContent":_vm._s(_vm.lorem.slice(0, 100))}})],1)],1)],1)],1)],1)],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c709952e", __vue__options__)
  } else {
    hotAPI.reload("data-v-c709952e", __vue__options__)
  }
})()}
});

;require.register("s/components/layout/MainPage.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: "MainPage"
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app"}},[_c('v-app',{attrs:{"id":"inspire"}},[_c('v-container',{attrs:{"fluid":"","grid-list-md":""}},[_c('v-layout',{attrs:{"row":"","wrap":""}},[_c('v-flex',{attrs:{"d-flex":"","xs12":"","sm6":"","md4":""}},[_c('v-card',{attrs:{"color":"purple","dark":""}},[_c('v-card-title',{staticClass:"title",attrs:{"primary":""}},[_vm._v("Lorem")]),_vm._v(" "),_c('v-card-text',{domProps:{"textContent":_vm._s(_vm.lorem)}})],1)],1),_vm._v(" "),_c('v-flex',{attrs:{"d-flex":"","xs12":"","sm6":"","md3":""}},[_c('v-layout',{attrs:{"row":"","wrap":""}},[_c('v-flex',{attrs:{"d-flex":""}},[_c('v-card',{attrs:{"color":"indigo","dark":""}},[_c('v-card-text',{domProps:{"textContent":_vm._s(_vm.lorem.slice(0, 70))}})],1)],1),_vm._v(" "),_c('v-flex',{attrs:{"d-flex":""}},[_c('v-layout',{attrs:{"row":"","wrap":""}},_vm._l((2),function(n){return _c('v-flex',{key:n,attrs:{"d-flex":"","xs12":""}},[_c('v-card',{attrs:{"color":"red lighten-2","dark":""}},[_c('v-card-text',{domProps:{"textContent":_vm._s(_vm.lorem.slice(0, 40))}})],1)],1)}))],1)],1)],1),_vm._v(" "),_c('v-flex',{attrs:{"d-flex":"","xs12":"","sm6":"","md2":"","child-flex":""}},[_c('v-card',{attrs:{"color":"green lighten-2","dark":""}},[_c('v-card-text',{domProps:{"textContent":_vm._s(_vm.lorem.slice(0, 90))}})],1)],1),_vm._v(" "),_c('v-flex',{attrs:{"d-flex":"","xs12":"","sm6":"","md3":""}},[_c('v-card',{attrs:{"color":"blue lighten-2","dark":""}},[_c('v-card-text',{domProps:{"textContent":_vm._s(_vm.lorem.slice(0, 100))}})],1)],1)],1)],1)],1)],1)}
__vue__options__.staticRenderFns = []
__vue__options__._scopeId = "data-v-9eb02cc8"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9eb02cc8", __vue__options__)
  } else {
    hotAPI.reload("data-v-9eb02cc8", __vue__options__)
  }
})()}
});

;require.register("s/components/layout/NavBar.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: "NavBar",
  data: function data() {
    return {
      items: [{ title: 'Dashboard', icon: 'dashboard' }, { title: 'Account', icon: 'account_box' }, { title: 'Admin', icon: 'gavel' }]
    };
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"nav-bar"},[_c('v-app',{attrs:{"id":"inspire"}},[_c('v-navigation-drawer',{staticClass:"blue lighten-3",attrs:{"permanent":"","dark":""}},[_c('v-list',_vm._l((_vm.items),function(item){return _c('v-list-tile',{key:item.title,on:{"click":function($event){}}},[_c('v-list-tile-action',[_c('v-icon',[_vm._v(_vm._s(item.icon))])],1),_vm._v(" "),_c('v-list-tile-content',[_c('v-list-tile-title',[_vm._v(_vm._s(item.title))])],1)],1)}))],1)],1)],1)}
__vue__options__.staticRenderFns = []
__vue__options__._scopeId = "data-v-988beeb8"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-988beeb8", __vue__options__)
  } else {
    hotAPI.reload("data-v-988beeb8", __vue__options__)
  }
})()}
});

;require.register("s/components/layout/TheCenterContainer.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'CenterContainer'
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"center-container"},[_c('h1',[_vm._v("Hello from !!!! Center Component@@@")]),_vm._v(" "),_vm._t("default")],2)}
__vue__options__.staticRenderFns = []
__vue__options__._scopeId = "data-v-278b342f"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-278b342f", __vue__options__)
  } else {
    hotAPI.reload("data-v-278b342f", __vue__options__)
  }
})()}
});

;require.register("s/router/index.js", function(exports, require, module) {
'use strict';

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
});

require.alias("process/browser.js", "process");
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


//# sourceMappingURL=vue_frontend.js.map