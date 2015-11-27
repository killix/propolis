module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'dev/index.js'
    },
    devtool: 'eval',
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel?stage=0', exclude: /node_modules/},
            {test: /\.css$/, loader: 'style!css'},
            {test: /\.png$/, loader: 'url'}
        ]
    }
};
