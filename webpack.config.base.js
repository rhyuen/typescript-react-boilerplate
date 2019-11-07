const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
    entry: {
        "index": path.join(__dirname, "frontend/src/Index.tsx")
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: [
            "*", ".js", ".ts", ".jsx", ".tsx"
        ]
    },
    module: {
        rules: [{
            test: /\.(js|ts|jsx|tsx)$/,
            exclude: /node_modules/,
            loader: "babel-loader",
        }, {
            test: /\.json$/,
            use: {
                loader: "json-loader"
            }
        }, {
            test: /\.(png|jpg|gif)$/,
            use: {
                loader: "file-loader"
            }

        }]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.join(__dirname, "frontend/src/templates/index.html"),
            filename: "index.html",
            inject: "body",
            title: "Front End Boilerplate Project"
        }),
        new ForkTsCheckerWebpackPlugin()
    ]
};