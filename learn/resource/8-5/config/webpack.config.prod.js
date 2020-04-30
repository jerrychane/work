const webpackMerge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config.base')
const TerserWebpackPlugin = require('terser-webpack-plugin') // webpack4 以后推荐的对 js 进行压缩的插件
const webpackConfig = webpackMerge(baseWebpackConfig, {
    mode: 'production',
    stats: { children: false, warnings: false },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin({
                terserOptions: {
                    warnings: false,
                    compress: {
                        warnings: false,
                        drop_console: false,// 是否注释掉console
                        dead_code: true,
                        drop_debugger: true,
                    },
                    output: {
                        comments: false,
                        beautify: false,
                    },
                    mangle: true,
                },
                parallel: true,
                sourceMap: false,
            }),
        ],
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 3,
                    enforce: true
                }
            }
        }
    },
})

module.exports = webpackConfig