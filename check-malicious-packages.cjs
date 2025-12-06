#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Malicious packages list
const maliciousPackages = [
  'assert-json-not',
  'auth-handler',
  'bcrypt-js-edge',
  'bcryptjs-node',
  'bcryptjs-node-js',
  'bcryptjs-nodejs',
  'bootstrap-flexgrid',
  'bootstrap-setcolor',
  'bootstrap-setcolors',
  'bootstrap-setflexcolor',
  'chai-as-deploy',
  'chai-as-deployed',
  'chai-as-sorted',
  'chai-as-tested',
  'chai-async',
  'chai-async-chain',
  'chai-async-flow',
  'chai-auth',
  'chai-await-asserts',
  'chai-await-test',
  'chai-await-utils',
  'chai-jsons',
  'chai-pack',
  'chai-promise-chain',
  'chai-promised-expect',
  'chai-promise-suite',
  'chai-proxify',
  'chai-status',
  'chai-sync',
  'chai-test-await',
  'chai-type',
  'cookie-breaker',
  'cookie-mapper',
  'cookie-validate',
  'cross-sessions',
  'custom-log-viewer',
  'cwanner',
  'dataflow-unified',
  'dist-decoder',
  'dotenv-intend',
  'elevate-log',
  'email-validated',
  'func-analysist',
  'glowmotion',
  'grid-settings',
  'grid-settings-align',
  'gridmancer',
  'init-router',
  'initial-path',
  'js-coauth',
  'js-copack',
  'js-cotype',
  'js-repack',
  'js-uponcaps',
  'json-getin',
  'json-oauth',
  'jsonauthcap',
  'jsonapptoken',
  'jsonauth',
  'jsonauto',
  'json-panels',
  'jsonify-settings',
  'jsonpino',
  'jsonrecap',
  'jsonretype',
  'jsswapper',
  'jstoauto',
  'kyjnzu',
  'lintcolor',
  'log-pino',
  'logify-pino',
  'module-listener',
  'muleforge',
  'multi-provider-settings',
  'node-tailwind',
  'node-tailwind-magic',
  'pgforce',
  'pino-logging',
  'pixel-bloom',
  'pixelblm',
  'pretty-text-formatter',
  'radix-ui-react-modal',
  'react-adparser',
  'react-alerts-template-basic',
  'react-bindify-decorators',
  'react-flex-tools',
  'react-icon-updater',
  'react-ipack',
  'react-mandes',
  'react-medias',
  'react-modal-select',
  'react-notifications-alert',
  'react-prop-types-helper',
  'react-resizable-text',
  'react-sideflow',
  'react-stateflow',
  'react-svg-bundler',
  'react-svg-fill',
  'react-svgs-helper',
  'react-svg-helper-fast',
  'react-svg-supporter',
  'react-tchart',
  'react-tmedia',
  'react-ui-animates',
  'react-ui-notify',
  'reactify-utils',
  'reactjs-fabric',
  'redux-motion',
  'seeds-alert',
  'seeds-random',
  'session-expire',
  'session-keeper',
  'session-parer',
  'session-parse',
  'session-validate',
  'shadeforge',
  'signale-log',
  'smart-parser',
  'stram-log',
  'stringify-coder',
  'style-config-tailwind',
  'style-tailwind-variant',
  'tailwind-areachart',
  'tailwind-barchart',
  'tailwind-chart',
  'tailwind-config-view',
  'tailwind-dynamic',
  'tailwind-fa-bridge',
  'tailwind-forms-plus',
  'tailwind-gradient-image',
  'tailwind-grid-tools',
  'tailwind-interact',
  'tailwind-justify',
  'tailwind-magic',
  'tailwind-merge-setting',
  'tailwind-morph',
  'tailwind-node',
  'tailwind-piechart',
  'tailwind-react-plugin',
  'tailwind-setting',
  'tailwind-state',
  'tailwind-style-override',
  'tailwind-utils-plus',
  'tailwind-utilx',
  'tailwind-variance',
  'tailwind-view-ui',
  'tailwind-widgets',
  'tailwindcss-aerowind',
  'tailwindcss-animatedfly',
  'tailwindcss-animation-css',
  'tailwindcss-animation-helper',
  'tailwindcss-animation-style',
  'tailwindcss-awesomefont',
  'tailwindcss-bootstrap-color',
  'tailwindcss-breezium',
  'tailwindcss-csstree',
  'tailwindcss-containers',
  'tailwindcss-flexbox',
  'tailwindcss-flexflow',
  'tailwindcss-fontawesome',
  'tailwindcss-forms',
  'tailwindcss-gustify',
  'tailwindcss-helpers',
  'tailwindcss-motionflex',
  'tailwindcss-react-animation',
  'tailwindcss-react-sass',
  'tailwindcss-setanimation',
  'tailwindcss-setfavicon',
  'tailwindcss-setflexgrid',
  'tailwindcss-setfont',
  'tailwindcss-setfontstyle',
  'tailwindcss-setgrid',
  'tailwindcss-setgrids',
  'tailwindcss-setmotion',
  'tailwindcss-setremotion',
  'tailwindcss-tailkit',
  'tailwindcss-twflare',
  'tailwindcss-web-font-awesome',
  'testing-react-dom',
  'validator-node',
  'vite-chunk-master',
  'vite-commonjs-support',
  'vite-compiler-tools',
  'vite-dynachunk',
  'vite-dynamic-chunks',
  'vite-manual-chunker',
  'vite-plugin-es6-compat',
  'vite-plugin-parseflow',
  'vite-plugin-parsify',
  'vite-plugin-postcss-tools',
  'vite-smart-chunk',
  'vite-support-kit',
  'web-vitals-help',
  'webpack-compilejsx',
  'webpack-jsxcompile',
  'webpack-loadcss',
  'xdater'
];

// Read package-lock.json
const packageLockPath = path.join(__dirname, 'package-lock.json');
const packageLock = JSON.parse(fs.readFileSync(packageLockPath, 'utf8'));

// Check all packages in package-lock.json
const foundMalicious = [];
const allPackages = Object.keys(packageLock.packages || {});

maliciousPackages.forEach(maliciousPkg => {
  if (allPackages.includes(`node_modules/${maliciousPkg}`) || allPackages.includes(maliciousPkg)) {
    foundMalicious.push(maliciousPkg);
  }
});

// Also check in dependencies recursively
function checkDependencies(obj, path = '') {
  if (typeof obj !== 'object' || obj === null) return;
  
  if (obj.dependencies) {
    Object.keys(obj.dependencies).forEach(dep => {
      if (maliciousPackages.includes(dep)) {
        if (!foundMalicious.includes(dep)) {
          foundMalicious.push(dep);
        }
      }
    });
  }
  
  Object.keys(obj).forEach(key => {
    checkDependencies(obj[key], `${path}.${key}`);
  });
}

checkDependencies(packageLock);

// Report results
console.log('\n🔍 OtterCookie Malware Package Check\n');
console.log('='.repeat(50));

if (foundMalicious.length === 0) {
  console.log('✅ АЮУЛГҮЙ: Төсөлд аюултай package олдсонгүй!');
  console.log('\nТаны төсөлд OtterCookie malware-тай package байхгүй байна.');
} else {
  console.log('⚠️  АЮУЛТАЙ: Дараах аюултай package-ууд олдлоо:');
  console.log('\n');
  foundMalicious.forEach(pkg => {
    console.log(`  ❌ ${pkg}`);
  });
  console.log('\n⚠️  ЭНЭ PACKAGE-УУДЫГ ШУУД УСТГАХ ХЭРЭГТЭЙ!');
  console.log('   npm uninstall <package-name>');
}

console.log('\n' + '='.repeat(50));
console.log(`Нийт шалгасан: ${maliciousPackages.length} package`);
console.log(`Олдсон: ${foundMalicious.length} package\n`);

