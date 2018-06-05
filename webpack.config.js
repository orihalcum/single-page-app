const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');

const inProduction = (process.env.NODE_ENV === 'production');

const config = {
    mode: 'development', // production
    entry: [
        './src/index.js',
        'jquery'        
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "./assets/", // string        
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: 'style-loader', // inject CSS to page
                    }, {
                        loader: 'css-loader', // translates CSS into CommonJS modules
                    }, {
                        loader: 'postcss-loader', // Run post css actions
                        options: {
                            plugins: function () { // post css plugins, can be exported to postcss.config.js
                                return [
                                    require('precss'),
                                    require('autoprefixer')
                                ];
                            }
                        }
                    }, {
                        loader: 'sass-loader' // compiles Sass to CSS
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '../assets/images/[name].[hash].[ext]'
                }
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: '../assets/fonts/[name].[hash].[ext]'
                }
            }
        ]
    },
    plugins: [
        // new HtmlWebpackPlugin({ template: './index.html' }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
        // new webpack.LoaderOptionsPlugin({
        //     minimize: inProduction
        // }),
        // new CleanWebPackPlugin(['dist'], {
        //     root: __dirname,
        //     verbose: true,
        //     dry: false
        // })
    ],
    watch: true,
    cache: false // boolean

};

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
}

module.exports = config;