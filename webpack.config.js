const path=require('path');
const htmlPlugin=require('html-webpack-plugin');

module.exports={
    entry:{
        index: './src/js/index.js'
    },
    output:{
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js'
    },
    module:{ rules:[
        {
            test: /\.css$/i,
            use: ['style-loader','css-loader'] //loader work from right to left or from bottom to top, so first css-loader run and pass its datas to style-loader
        },
        {
            test: /\.js$/i,
            exclude: /node_modules/, //evita che la traspilazione venga effettuata anche nella cartella node modules in modo da risparmiare risorse
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }
    ]},
    plugins: [
        new htmlPlugin({
            title:'Webpack App',
            template:'./src/index.html'
        })
    ],
    devServer:{
        port: 3000,
        open: true,
        static: path.resolve(__dirname,'dist')
    },
    mode: "production"
}