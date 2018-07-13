const path = require('path')
    , MiniCssExtractPlugin = require('mini-css-extract-plugin')
    , OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
    , BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    , UglifyJsPlugin = require('uglifyjs-webpack-plugin')
    , eslint_formatter_pretty = require('eslint-formatter-pretty')
    , CleanWebpackPlugin = require('clean-webpack-plugin')
    , HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'main': ['babel-polyfill', './app/js/main/index.js'],
    },
    output: {
        path: path.resolve(__dirname, '../dist/assets'),
        filename: '[name].[chunkhash:6].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['syntax-dynamic-import'],
                    }
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'eslint-loader',
                    options: {
                        formatter: eslint_formatter_pretty,
                        fix: true,
                    }
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    {loader: 'css-loader', options: {minimize: true}},
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')]
                        }
                    },
                    'sass-loader',
                ]
            }
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCssAssetsPlugin({})
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    plugins: [
        new BundleAnalyzerPlugin({analyzerMode: 'static', reportFilename: 'report.html'}),
        new CleanWebpackPlugin([
            'dist/assets',
        ], {
            root: process.cwd()
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash:6].css',
            chunkFilename: '[id].[hash:6].css',
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.opitmize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {safe: true, discardComments: {removeAll: true}},
            canPrint: true
        }),
        new HtmlWebpackPlugin({
            template: './app/tpl/index.html',
            filename: '../index.html',
            chunks: ['vendors~main', 'main']
        })
    ]
};