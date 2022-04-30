const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const config = {
    target: 'browserslist',
    mode: 'production',
    context: path.resolve(__dirname, './src/js'),
    entry: {
        app: './app.js',
    },
    output: {
        devtoolModuleFilenameTemplate: '[resource-path]?[loaders]',
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/js'),
        libraryTarget: 'var',
        library: '[name]Module',
        environment: {
            arrowFunction: false,
            const: false,
            destructuring: false,
            forOf: false,
        },
    },
    resolve: {
        alias: {
        },
    },
    module: {
        rules: [
            {
                test: /\.js*$/,
                use: {
                    loader: 'strip-trailing-space-loader',
                    options: {
                        line_endings: 'unix',
                    },
                },
            },
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
        usedExports: true,
        sideEffects: true,
        minimize: false,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        ecma: 6,
                        comments: false,
                    },
                },
            }),
        ],
    },
    stats: {
        colors: true,
    },
    plugins: [
        new ESLintPlugin(),
    ],
    devtool: 'source-map',
    watchOptions: {
        ignored: /node_modules|dist/,
    },
};

module.exports = (env, argv) => {
    if (argv.mode === 'production') {
        config.output.filename = '[name].min.js';
        config.optimization.minimize = true;
    }

    return config;
};
