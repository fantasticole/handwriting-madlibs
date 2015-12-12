var path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: {
        app: ['./app/index.js']
    },
    output: {
        path: path.resolve(__dirname, 'static'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: "./static",
    },
    module: {
        loaders: [
            // Babel loader
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel?optional[]=runtime'
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            // CSS loader
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            // LESS
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
            },
            // JPGs
            {
                test: /\.jpg$/,
                loader: "url-loader",
                query: { mimetype: "image/jpg" }
            }
        ]
    },
    resolve: {
        // where to find modules
        modulesDirectories: [
            'node_modules',
            'resources',
            'app'
        ],
        extensions: ['.js', '.json', '.jsx', '']
    },
    plugins: [
        new ExtractTextPlugin('styles.css')
    ]
}
