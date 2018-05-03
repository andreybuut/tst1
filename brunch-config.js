// -------------------------------------------------------
// Check against what environment we work
// =======================================================
const environment = process.env.NODE_ENV;
const production = environment === 'production';

console.log(environment, 'ENV');

let jsFkey = 'js/frontend.js';
let jsBkey = 'js/backend.js';
let jsVkey = 'js/vendor.js';
let jsCkey = 'js/common.js';
let vueFkey = 'js/vue_frontend.js';
let vueCkey = 'css/vue_frontend.css';
let cssFkey = 'css/frontend.css';
let cssBkey = 'css/backend.css';
let cssVkey = 'css/vendor.css';

// adjust file names
if (production) {
  jsFkey = 'js/frontend.min.js';
  jsBkey = 'js/backend.min.js';
  jsVkey = 'js/vendor.min.js';
  jsCkey = 'js/common.min.js';
  vueFkey = 'js/vue_frontend.min.js';
  cssFkey = 'css/frontend.min.css';
  cssBkey = 'css/backend.min.css';
  cssVkey = 'css/vendor.min.css';
  vueCkey = 'css/vue_frontend.min.css';
}

// -------------------------------------------------------
// Brunch paths
// =======================================================
exports.paths = {
  watched: ['ui', ],
  public:  '.ui',
};

// -------------------------------------------------------
// Brunch instructions for css and js assembly
// =======================================================
exports.files = {
  javascripts: {
    joinTo: {
      [jsFkey]:  /^ui\/frontend/,
      [jsBkey]:  /^ui\/backend/,
      [jsCkey]:  /^ui\/common/,
      [jsVkey]:  /^node_modules/,
      [vueFkey]: /^ui\/src/,
    },
  },
  stylesheets: {
    joinTo: {
      [cssFkey]: /^ui\/frontend\/apps\/apps.scss/,
      [cssBkey]: /^ui\/backend\/apps\/apps.scss/,
      [vueCkey]: /^ui\/src\/assets\/scss\/app.scss/,
      [cssVkey]: /^node_modules/,
    },
  },
};

// -------------------------------------------------------
// Make javascript globals available to window interface
// =======================================================
exports.npm = {
  enabled: true,
  globals: {
    $:             'jquery',
    jQuery:        'jquery',
    bootstrap:     'bootstrap',
    selectpicker:  'bootstrap-select',
    datepicker:    'bootstrap-datepicker',
    table:         'bootstrap-table',
    svg4everybody: 'svg4everybody',
  },
  aliases: {
    vue: 'vue/dist/vue.common.js',
  },
  styles: {
    bootstrap:                 ['dist/css/bootstrap.css', ],
    'bootstrap-select':        ['dist/css/bootstrap-select.css', ],
    'select2-bootstrap-theme': ['dist/select2-bootstrap.css', ],
    'bootstrap-datepicker':    ['dist/css/bootstrap-datepicker.css', ],
    'bootstrap-table':         ['dist/bootstrap-table.css', ],
    'font-awesome':            ['css/font-awesome.css', ],
  },
};

exports.conventions = {
  // Source SVG files should be placed under assets.
  assets: /^(ui\/frontend\/common\/assets\/(?!svg))/,
};
// -------------------------------------------------------
// Define plugins options
// =======================================================
exports.plugins = {
  babel: {
    presets: ['es2015', ],
    ignore:  [ /^ui\/[a-z0-9_\\/]+\/vendor\//, /node_modules/, ],
  },
  vue: {
    extractCSS: true,
    out:        `./.ui/${vueCkey}`,
  },
  autoReload: {
    enabled: true,
  },
  sass: {
    mode:           'native',
    sourceMapEmbed: true,
  },
  copycat: {
    fonts: [
      'node_modules/font-awesome/fonts',
      'node_modules/bootstrap/dist/fonts',
      './ui/backend/common/assets/fonts',
    ],
    verbose:     false,
    onlyChanged: true,
  },
  cleancss: {
    keepSpecialComments: 0,
    removeEmpty:         true,
  },
  svgsprite: {
    shape: {
      transform: [{
        svgo: {
          plugins: [
            { sortAttrs: true, },
            { removeTitle: true, },
            { removeRasterImages: true, },
            { removeStyleElement: true, },
            { removeAttrs: { attrs: '(class|fill-rule|stroke-miterlimit)', }, },
          ],
          js2svg: { pretty: true, indent: 4, },
        },
      }, ],
    },
    svg: {
      xmlDeclaration:     false,
      doctypeDeclaration: false,
      precision:          3,
      transform:          [
        function (svg) {
          return svg.replace(/<symbol/gi, '\n  <symbol').replace(/<\/symbol>/gi, '  </symbol>\n');
        },
      ],
    },
    mode: {
      symbol: { dest: './.ui/', sprite: 'img/sprite.svg', },
    },
  },
};

// -------------------------------------------------------
// To avoid getting empty files
// see: http://brunch.io/docs/troubleshooting
// =======================================================
exports.watcher = {
  awaitWriteFinish: true,
  usePolling:       true,
};


// -------------------------------------------------------
// Modules configuration
// see: http://brunch.io/docs/config#-modules-
// nameCleaner is used to reduce path to module like
// require('frontend/js/index') => ('index')
// autoRequire is used to get code called automatically
// at the end of merged file
// =======================================================

exports.modules = {
  nameCleaner(path) {
    return path
      .replace(/^ui\/common\/js\//, 'c/')
      .replace(/^ui\/frontend\/apps\//, 'f/')
      .replace(/^ui\/frontend\/common\/js\//, 'fc/')
      .replace(/^ui\/backend\/apps\//, 'b/')
      .replace(/^ui\/src\//, 's/')
      .replace(/^ui\/backend\/common\/js\//, 'bc/')
      .replace(/\/js\//, '/')
      .replace(/\/\//, '/');
  },
  autoRequire: {
    [jsFkey]: ['fc/index', ],
    [jsBkey]: ['bc/index', ],
  },
};

