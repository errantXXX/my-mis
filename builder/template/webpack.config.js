const fs = require('fs');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = function (webpackConfig, env) {
    webpackConfig.babel.plugins.push('transform-runtime');

    // Support hmr
    if (env === 'development') {
        const config = {
            apibase: 'http://qatest.api.ofo.com/',
            // apibase: 'http://kefu.api.ofo.com/',
            workhost: 'https://test-pyramid-api.ofo.so/',
            version: 'v2.1',
            buildtime: require('moment')().format('YYYY-MM-DD HH:mm:ss'),
            path: 'ofo-kefu-api/',
            content: 'Noah优化了用户体验。',
            support: '吕永卫、张鹏川,有问题钉钉咨询,会尽快回复。',
        };
        
        fs.exists('src/config/index.js', function (exist) {
            if (exist) {
                fs.writeFileSync('src/config/index.js', `module.exports=${JSON.stringify(config)}`);
            } else {
                fs.mkdirSync('src/config');
                fs.writeFileSync('src/config/index.js', `module.exports=${JSON.stringify(config)}`);
            }
        })
        webpackConfig.devtool = '#eval';
        webpackConfig.babel.plugins.push(['dva-hmr', {
            entries: [
                './src/index.js',
            ],
        }]);
    } else {
        const config = {
            apibase: 'http://qatest.api.ofo.com/',
            workhost: 'https://pyramid-api.ofo.so/',
            version: 'v2.1',
            buildtime: require('moment')().format('YYYY-MM-DD HH:mm:ss'),
            path: 'ofo-kefu-api/',
            content: 'Noah学校围栏,优化了用户体验。',
            support: '吕永卫、张鹏川,有问题钉钉咨询,会尽快回复。',
        };
        fs.exists('src/config/index.js', function (exist) {
            if (exist) {
                fs.writeFileSync('src/config/index.js', `module.exports=${JSON.stringify(config)}`);
            } else {
                fs.mkdirSync('src/config');
                fs.writeFileSync('src/config/index.js', `module.exports=${JSON.stringify(config)}`);
            }
        })
        webpackConfig.babel.plugins.push('dev-expression');
    }

    // Support CSS Modules
    // Parse all less files as css module.
    webpackConfig.module.loaders.forEach((loader, index) => {
        if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.less$') > -1) {
            loader.include = /node_modules/;
            loader.test = /\.less$/;
        }
        if (loader.test.toString() === '/\\.module\\.less$/') {
            loader.exclude = /node_modules/;
            loader.test = /\.less$/;
        }
        if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.css$') > -1) {
            loader.include = /node_modules/;
            loader.test = /\.css$/;
        }
        if (loader.test.toString() === '/\\.module\\.css$/') {
            loader.exclude = /node_modules/;
            loader.test = /\.css$/;
        }
    });

    webpackConfig.plugins.push(new OpenBrowserPlugin({url: 'http://localhost:8989'}));

    webpackConfig.resolve.alias = {
        components: `${__dirname}/src/components`,
        utils: `${__dirname}/src/utils`,
    }

    return webpackConfig;
};
