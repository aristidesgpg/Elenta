const mix = require('laravel-mix');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

//mix.js('resources/js/app.js', 'public/js')
    //.sass('resources/sass/app.scss', 'public/css');


mix.webpackConfig({
	 resolve: {
	    extensions: [".js", ".ts", ".tsx"]
	  },
	module: {
	    rules: [
	      {
	        test: /\.(ts|tsx)$/,
	        exclude: /node_modules/,
	        loader: "awesome-typescript-loader",
	        options: {
	          useBabel: true,
	          babelCore: "@babel/core" // needed for Babel v7
	        }
	      },
	      {
	        test: /\.scss$/,
	        use: [
	            {
	                loader: "style-loader" // creates style nodes from JS strings
	            },
	            {
	                loader: "css-loader", // translates CSS into CommonJS                
	            },
	            {
	                loader: "sass-loader" // compiles Sass to CSS
	            }
	        ]
	      },
	      {
	        test: /\.(png|jpg|gif|svg)$/,
	        loader: "file-loader",
	        options: {
	          name: "assets/img/[name].[ext]?[hash]"
	        }
	      }
	    ]
	  },
	  plugins: [
	    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
	    new HtmlWebpackPlugin({
	      filename: "index.html", //Name of file in ./dist/
	      template: "./resources/js/formbuilder/index.html", //Name of template in ./src
	      hash: true
	    }),
	    new MiniCssExtractPlugin({
	      filename: "[name].css",
	      chunkFilename: "[id].css"
	    })
	  ]
});

mix.react('resources/js/formbuilder/index.tsx', 'public/js/formbuilder.js')
.sass('resources/sass/app.scss', 'public/css');

