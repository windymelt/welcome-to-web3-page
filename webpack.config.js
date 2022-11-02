const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // entry: {
    //     main: './src/index.js'
    // },
    output: {
        path: path.resolve(__dirname, '/dist'),
        filename: '[name].js'
    },
    resolve: {
        alias: {
            svelte: path.resolve('node_modules', 'svelte')
        },
        extensions: ['.mjs', '.js', '.svelte'],
        mainFields: ['svelte', 'browser', 'module', 'main']
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                include: path.resolve(__dirname, './src'),
                use: [
                    {
                        loader: 'svelte-loader'
                    }
                ]
            },
            {
                // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
                test: /node_modules\/svelte\/.*\.mjs$/,
                resolve: {
                    fullySpecified: false
                }
            },
            {
                test: /\.css/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: { url: false }
                    }
                ]
            }
        ]
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    }
};
